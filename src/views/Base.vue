<template>
  <div>
    <v-btn fab elevation="2" x-large v-if="Object.keys(state).length <= 0">
      <v-icon>add</v-icon>
    </v-btn>
    <v-carousel
      :light="true"
      :hide-delimiter-background="true"
      :hide-delimiter="true"
      :hide-delimiters="true"
      :show-arrows="Object.keys(state).length > 1"
    >
      <v-carousel-item v-for="(goal, i) in state" :key="i">
        <viewGoal :state="goal" :id="Number(i)" :timer="Number(now)"></viewGoal>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
// @ is an alias to /src
import viewGoal from "@/components/ViewGoal.vue";
import db from "../store/localdata";

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
    db.retriveGoals()
      .then(data => {
        this.state = data;
        console.info(Object.keys(this.state).length);
      })
      .catch(error => {
        console.error(error);
      });
    this.timer();
  },
  methods: {
    timer: function() {
      
      setInterval(() => {
        this.now = new Date(Date.now()).getTime()  ;
      }, 1000);
    }
  }
};
</script>
