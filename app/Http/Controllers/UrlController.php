<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUrlRequest;
use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UrlController extends Controller
{
    // URL登録画面の表示
    public function index()
    {
        return Inertia::render('Urls');
    }

    // URL登録画面の入力内容と保存する
    public function store(StoreUrlRequest $request)
    {
        // ログインをしているユーザーのIDを取得
        $userId = auth()->id();

        // 認識されていない場合はエラーメッセージを表示
        if (!$userId) {
            return redirect()->route('urls.index')->withErrors(['error' => 'ユーザーが認識されていません。']);
        }

        // バリデーションを通過したデータを取得
        $validatedData = $request->validated();

        $dateToCreate = $validatedData;
        $dateToCreate['user_id'] = $userId;

        // リンクの保存処理をここに追加
        Link::create($dateToCreate);

        // 成功メッセージをセッションに保存
        session()->flash('success', 'URLが登録されました。');

        // リダイレクト
        return redirect()->route('urls.index');
    }
}
