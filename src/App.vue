<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Metafy</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <NavMenu v-on:view="view" :state="drawer"></NavMenu>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
// import HelloWorld from "./components/HelloWorld";
import NavMenu from "./components/NavMenu";
import db from "./store/localdata";

export default {
  name: "App",
  components: { NavMenu },
  created() {
    db.mountDb();
  },
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    view: function(value) {
      this.drawer = value;
    }
  }
};
</script>
