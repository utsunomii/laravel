import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // ★★★ path モジュールを使うためにこの行を追加 ★★★

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js', // エントリーポイント
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],

    // ★★★ ここから resolve.alias ブロックを追加 ★★★
    resolve: {
        alias: {
            // '@' というエイリアスが src ディレクトリを指すように設定します
            // __dirname は現在のファイル (vite.config.js) があるディレクトリを指します
            '@': path.resolve(__dirname, 'src'),

            // もし resources/js 以下にもエイリアスが必要な場合は、以下のように複数設定できます
            // '~resources': path.resolve(__dirname, 'resources/js'),
        },
    },
    // ★★★ ここまで resolve.alias ブロックを追加 ★★★

});