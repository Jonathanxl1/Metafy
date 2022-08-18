<template>
  <v-card max-width="100%" width="100%">
    <v-overlay :value="overlay" dark>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  name: "loadingPage",
  props: {
    overlay: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style></style>
