<template>
    <div class="c-app">

      <AppSidebar />

      <div class="c-wrapper">

        <CHeader position="sticky" class="mb-4">
          <CContainer fluid>
             <CHeaderToggler
              class="ms-md-3"
              @click="() => store.commit('updateSidebarVisible')"
            />
            </CContainer>
        </CHeader>

        <div class="c-body">

          <main class="c-main">
            <CContainer fluid>
              <slot />
            </CContainer>
          </main>

          </div>
      </div>
    </div>
  </template>

  <script setup>
  // Vue および Vuex のインポート
  import { computed, watch } from 'vue'; // watch をインポート
  import { useStore } from 'vuex'; // useStore をインポート

  // サイドバーコンポーネントをインポート
  import AppSidebar from './AppSidebar.vue';

  // CoreUI のレイアウト関連コンポーネントをインポート
  // CHeader, CHeaderToggler, CContainer が必要
  import { CContainer, CHeader, CHeaderToggler } from '@coreui/vue';

  // Vuex ストアにアクセス
  const store = useStore();

  // Vuex ストアのサイドバー状態を取得
  const sidebarVisible = computed(() => store.state.sidebarVisible);
  const sidebarUnfoldable = computed(() => store.state.sidebarUnfoldable); // 折りたたみ状態も取得

  // ★ サイドバーの表示状態に応じて body クラスを操作するウォッチャー ★
  // CoreUI CSS はこれらの body クラスを見てメインコンテンツのパディングを調整します
  watch(sidebarVisible, (newValue) => {
    if (newValue) {
      document.body.classList.add('sidebar-show'); // サイドバー表示時は 'sidebar-show' クラスを追加
    } else {
      document.body.classList.remove('sidebar-show'); // 非表示時はクラスを削除
    }
  }, { immediate: true }); // コンポーネント初期化時にも実行されるように immediate: true を設定

  // ★ サイドバーの折りたたみ状態に応じて body クラスを操作するウォッチャー ★
   // 折りたたみ時 (.sidebar-narrow クラスなど) にもコンテンツシフトが必要な場合
   watch(sidebarUnfoldable, (newValue) => {
     if (newValue) {
       // CoreUI v4 のデフォルトクラスは 'sidebar-narrow' のことが多い
       document.body.classList.add('sidebar-narrow');
     } else {
       document.body.classList.remove('sidebar-narrow');
     }
   }, { immediate: true });


  // ★★★★ AppSidebarNav.vue はこの DefaultLayout.vue では直接使いません ★★★★
  // AppSidebarNav.vue は AppSidebar.vue の中で使用されています。
  // インポートの必要はありません。


  </script>

  <style>
  /* ★★★ レイアウト全体の構造に関するスタイル (既存のままでOK) ★★★ */

  /* 例: c-app が画面全体の高さを占めるようにする */
  .c-app {
    display: flex; /* サイドバーとラッパーを横に並べるための flexbox */
    min-height: 100vh; /* 画面いっぱいの高さ */
  }

  /* ラッパーが残りの幅を全て占めるようにする */
  .c-wrapper {
    flex-grow: 1; /* 画面幅に合わせて広がる */
    display: flex;
    flex-direction: column; /* ヘッダー、ボディ、フッターを縦に並べる */
    /* CoreUI CSS (body.sidebar-show {...}) によって padding-left が自動で適用されます */
    /* body.sidebar-narrow {...} も同様 */
  }

  /* ボディがヘッダーとフッターの間の領域を占める */
  .c-body {
    flex-grow: 1; /* 残りの高さを占める */
    display: flex;
    flex-direction: column; /* メインコンテンツなどを縦に並べる */
  }

  /* メインコンテンツエリア */
  .c-main {
    flex-grow: 1; /* 残りの高さを占める */
    padding: 1rem; /* 必要に応じて内側の余白を調整 */
  }

  /*
  CoreUI の CSS ファイルが適切にインポートされていれば、
  body.sidebar-show .c-wrapper { padding-left: 256px; } (デフォルト幅の場合)
  のようなスタイルが自動で適用されるため、ここで手動で padding-left を設定する必要はありません。
  */

  </style>