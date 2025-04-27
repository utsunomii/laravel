import './bootstrap';
import '../css/app.css'; // アプリケーション独自のCSSがあれば残します

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

// ★★★ CoreUI のインポートと登録を追加 ★★★
import CoreuiVue from '@coreui/vue';
import '@coreui/coreui/dist/css/coreui.min.css'; // 例: CoreUI の CSS ファイルを直接インポート

// ★★★ Vuex のインポートと登録を追加 ★★★
import store from '@/store';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        app.use(plugin);
        app.use(ZiggyVue, Ziggy);

        // CoreUI を使用するための登録
        app.use(CoreuiVue);

        // Vuex を使用するための登録
        app.use(store);


        app.mount(el);
        return app;
    },
    progress: {
        color: '#4B5563',
    },
});