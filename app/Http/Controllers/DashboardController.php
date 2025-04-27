<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Link;
use App\Http\Requests\LinkRequest;
use App\Http\Requests\UpdatePriorityRequest;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index()
    {
        // ログインしているユーザーのIDを取得
        $userId = auth()->id();

        // 取得したユーザーIDに該当するデータベースからリンク、名前、優先順を取得
        $links = Link::where('user_id', $userId)
            ->orderBy('priority', 'desc')
            ->get([
                'id',
                'link_name as name',
                'link_url as url',
                'priority',
            ]);

        // 取得したデータをビューに渡す
        return Inertia::render('Dashboard', [
            'links' => $links,
        ]);
    }

    public function updatePriority(UpdatePriorityRequest $request, $id)
    {
        // --- ★デバッグログを追加 ---
        Log::info('Update priority request received for ID: ' . $id);
        Log::info('Request Data:', $request->all()); // リクエストの全データをログに出力
        Log::info('Priority Value from request:', [$request->input('priority')]); // priority の値を具体的にログに出力 (配列に入れると null なども分かりやすい)

        // バリデーション
        $validated = $request->validated();


        Log::info('Validation passed. Priority to save: ' . $validated['priority']); // バリデーション通過後の値もログに

        try {
            $link = Link::where('user_id', auth()->id())->findOrFail($id);
            $link->priority = $validated['priority'];
            $link->save();

            Log::info('Priority updated successfully in DB for ID: ' . $id);

            return back()->with('message', 'Priority updated successfully!');

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
             Log::error('Link not found or access denied for ID: ' . $id . ' UserID: ' . auth()->id());
             return back()->withErrors(['update' => 'Link not found or access denied.']);
        } catch (\Exception $e) {
             Log::error('Error updating priority: ' . $e->getMessage());
             return back()->withErrors(['update' => 'Failed to update priority.']);
        }
    }
}
