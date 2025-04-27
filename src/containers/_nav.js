// src/containers/_nav.js
import { markRaw } from 'vue';
// CoreUI Vue のナビゲーション用コンポーネントをインポート
import { CNavItem, CNavTitle } from '@coreui/vue';
// アイコンを使用する場合は、CoreUI Icons Vue ライブラリからインポート
// import { cilSpeedometer, cilLinkAlt } from '@coreui/icons-vue'; // 例


const _nav = [
  {
    // ダッシュボードへのリンク
    component: markRaw(CNavItem), // コンポーネント指定
    name: 'ダッシュボード', // 表示名
    to: '/', // 遷移先URL (Inertia.js のルートやURLパス)
    // icon: markRaw(cilSpeedometer), // アイコンを使用する場合
    badge: {
      color: 'primary',
      text: 'Home', // バッジ表示 (任意)
    },
  },
   {
     // 区切りやタイトルの表示 (任意)
     component: markRaw(CNavTitle),
     name: '管理メニュー',
   },
  {
    // URL登録ページへのリンク
    component: markRaw(CNavItem),
    name: 'URL登録',
    to: '/urls/create', // 遷移先URL (Inertia.js のルートやURLパス)
    // icon: markRaw(cilLinkAlt), // アイコンを使用する場合
  },
  // 他のナビゲーション項目があればここに追加
];

export default _nav;