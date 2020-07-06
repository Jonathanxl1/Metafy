<template>
  <div>
     <v-carousel :light="true"  :hide-delimiter-background="true" :hide-delimiter="true" :hide-delimiters="true" >
      <v-carousel-item v-for="(goal,i) in state" :key="i"> 
        <viewGoal :state="goal" :id="Number(i)"></viewGoal>
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
      state: {}
    };
  },
  created() {
    db.retriveGoals()
      .then(data => {
        this.state = data;
        console.info(data);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
