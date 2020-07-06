<template>
  <v-app>
    <v-app-bar app color="green" dark :collapse-on-scroll="true">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Metafy</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
// import HelloWorld from "./components/HelloWorld";
import db from "./store/localdata";

export default {
  name: "App",
  mounted() {
    db.mountDb();
  },
  

  data: () => ({})
};
</script>
