<template>
  <div>
    <v-progress-circular :rotate="270" :width="15" :size="this.$vuetify.breakpoint.width * 0.2" :value="value" color="orange">
      <template v-slot:default>
         <h1 class="body-1">Metas personales</h1> 
          <v-btn  icon color="red" >
            <v-icon>create</v-icon>
          </v-btn>
      </template>
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "viewGoal",
  components: {},
  mounted(){
    console.log(this.$vuetify.breakpoint)
  },
  data() {
    return {
      value:10
    }
  }
};
</script>

<style scoped></style>
