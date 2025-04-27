<template>
    <CSidebar
      position="fixed"
      :unfoldable="sidebarUnfoldable"
      :visible="sidebarVisible"
      @visible-change="
        (event) =>
          $store.commit({
            type: 'updateSidebarVisible',
            value: event,
          })
      "
      class="sidebar-background-color z-index-3500"
    >
      <AppSidebarNav />

      <CSidebarToggler
        class="d-none d-lg-flex"
        @click="$store.commit('toggleUnfoldable')"
      />
    </CSidebar>
  </template>

  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import AppSidebarNav from './AppSidebarNav.vue';


  export default {
    name: 'AppSidebar',
    components: {
      AppSidebarNav,
    },
    setup() {
      const store = useStore();

      return {
        sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
        sidebarVisible: computed(() => store.state.sidebarVisible),
      };
    },
  };
  </script>

  <style>
  .sidebar-background-color {
    background-color: darkolivegreen !important;
  }

  .z-index-3500 {
    z-index: 3500 !important;
  }
  </style>