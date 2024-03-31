<template>
  <v-container>
    <v-row align-content="center">
      <v-col lg="6" offset-lg="3">
        <v-row justify="center" class="align-center">
          <v-btn
            fab
            elevation="2"
            x-large
            v-if="Object.keys(state).length <= 0"
            @click="addGoal()"
          >
            <v-icon color="success">add</v-icon>
          </v-btn>
        </v-row>
        <v-carousel
          :light="true"
          :hide-delimiter-background="true"
          :hide-delimiter="true"
          :hide-delimiters="true"
          :show-arrows="Object.keys(state).length > 1"
        >
          <v-carousel-item v-for="(goal, i) in state" :key="i">
            <viewGoal
              :state="goal"
              :id="Number(i)"
              :timer="Number(now)"
            ></viewGoal>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import viewGoal from "@/components/ViewGoal.vue";
import { retriveGoals } from "../store/localdata";

export default {
  name: "Base",
  components: { viewGoal },
  data() {
    return {
      state: {},
      now: ""
    };
  },
  created() {
    retriveGoals()
      .then(data => {
        this.state = data;
      })
      .catch(error => {
        console.error(error);
      });
    this.timer();
  },
  methods: {
    timer: function() {
      setInterval(() => {
        this.now = new Date(Date.now()).getTime();
      }, 1000);
    },
    addGoal() {
      this.$router.push("add");
    }
  }
};
</script>
<style scoped>
::v-deep .v-carousel__item {
  align-items: center;
}
</style>
