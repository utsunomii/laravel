import { createStore } from 'vuex';

const store = createStore({
  state: {
    // サイドバーの表示/非表示状態を管理
    // 初期値は必要に応じて変更してください (例: true でデフォルト表示)
    sidebarVisible: false,
    // サイドバーの折りたたみ状態を管理
    // 初期値は必要に応じて変更してください (例: false でデフォルト非表示)
    sidebarUnfoldable: false,
  },
  mutations: {
    // sidebarVisible の状態を更新するミューテーション
    // payload.value があればその値に設定、無ければ現在の状態を反転
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value !== undefined ? payload.value : !state.sidebarVisible;
    },
    // sidebarUnfoldable の状態を反転するミューテーション
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable;
    },
    // 必要に応じて他のミューテーションを追加
  },
  actions: {
    // 必要に応じてアクションを定義
  },
  getters: {
    // 必要に応じてゲッターを定義
  },
  modules: {
    // ストアをモジュールに分割する場合に定義
  },
});

export default store;