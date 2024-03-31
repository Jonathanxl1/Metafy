<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Metafy</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <NavMenu v-on:view="view" :state="drawer"></NavMenu>

    <v-main style="width:100%;max-width:100%">
      <loadingPage :overlay="loading" />
      <router-view
        @hook:created="loading = true"
        @hook:mounted="loading = false"
      ></router-view>
    </v-main>
  </v-app>
</template>
<script>
// import HelloWorld from "./components/HelloWorld";
import NavMenu from "./components/NavMenu";
import loadingPage from "./views/loadingPage";

import { mountDb } from "./store/localdata";

export default {
  name: "App",
  components: { NavMenu, loadingPage },
  created() {
    mountDb();
  },
  data() {
    return {
      drawer: false,
      loading: false
    };
  },
  methods: {
    view: function(value) {
      this.drawer = value;
    }
  }
};
</script>
