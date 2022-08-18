<template>
  <v-navigation-drawer app v-model="viewer" temporary>
    <v-list>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/add">
        <v-list-item-icon>
          <v-icon>create</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Add Goal</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/config">
        <v-list-item-icon>
          <v-icon>settings</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Config</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      viewer: false
    };
  },
  watch: {
    state: function(val) {
      this.viewer = val;
    },
    viewer: function(value, oldvalue) {
      if (value != oldvalue) {
        this.$emit("view", value);
      }
    },
    $route: function() {
      this.viewer = false;
    }
  }
};
</script>

<style scoped></style>
