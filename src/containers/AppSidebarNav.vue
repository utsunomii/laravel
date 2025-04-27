<template>
    <CSidebarNav :nav-items="navItems" />
  </template>

  <script>
  // CoreUI のナビゲーションコンポーネントをインポート
  import { CSidebarNav } from '@coreui/vue';

  // ★ _nav.js からナビゲーションデータをインポート ★
  // _nav.js が src/containers にある場合
  import navItems from './_nav';

  export default {
    name: 'AppSidebarNav',
    components: {
      CSidebarNav,
      // _nav.js で component: 'CNavItem', 'CNavGroup' などと指定しているコンポーネントは
      // CSidebarNav が内部で解決するため、通常ここでインポートする必要はありません。
    },
    setup() {
      // インポートした navItems データをテンプレートに渡す
      return {
        navItems,
      };
    },
  };
  </script>

  <style scoped>
  /* AppSidebarNav 固有のスタイルがあればここに記述 */
  /* 例: リンクの色やホバー時のスタイルなど */
  /* .sidebar-nav .nav-link { color: #fff; } */
  /* .sidebar-nav .nav-link:hover { background-color: rgba(255, 255, 255, 0.1); } */

  /* AppSidebar.vue のスタイルも参照しつつ、必要に応じて調整 */
  </style>