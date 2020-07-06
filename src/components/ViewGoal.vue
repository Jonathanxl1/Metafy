<template>
  <v-card class="mx-auto" elevation="0">
    <v-container>
      <v-row justify="center">
        <v-col align="center">
          <v-progress-circular
            :rotate="270"
            :width="this.$vuetify.breakpoint.width * 0.01"
            :size="this.$vuetify.breakpoint.width * 0.3"
            :value="value"
            :color="statusProgress(value)"
          >
            <v-btn
              icon
              color="red"
              v-if="
                this.$vuetify.breakpoint.md ||
                  this.$vuetify.breakpoint.sm ||
                  this.$vuetify.breakpoint.xs
              "
            >
              <v-icon>create</v-icon>
            </v-btn>
          </v-progress-circular>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-3">
        <h1
          v-if="
            this.$vuetify.breakpoint.sm ||
              this.$vuetify.breakpoint.md ||
              this.$vuetify.breakpoint.xs
          "
          class="text-lg-h5 text-sm-h5 text-h5"
        >
          {{ title }}
        </h1>
        <router-link
          class="d-none d-lg-flex  black--text"
          :to="'meta/' + id"
          ><h1 class="text-lg-h5 text-sm-h5 text-h5">
            {{ title }}
          </h1></router-link
        >

        <!-- <h1 class="body-1"></h1> -->
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "viewGoal",
  props: {
    state: {
      type: Object
    },
    id: {
      type:Number
    }
  },
  components: {},
  mounted() {
    console.log(this.$vuetify.breakpoint);
    this.diffDates();
  },
  data() {
    return {
      value: 10,
      goal: this.state,
      
    };
  },
  computed: {
    title: function() {
      if (this.goal.title.length > 20) {
        let text = this.goal.title.toString().slice(0, 19);
        return `${text}...`;
      } else {
        return this.goal.title;
      }
    }
  },

  methods: {
    diffDates() {
      let start = new Date(this.goal.currentdate.toString());
      let goal = new Date(this.goal.datetime);
      let diffCurrent = Math.ceil(Math.abs(goal - Date.now()) / 86400000);
      let diffDates = Math.ceil(Math.abs(goal - start) / 86400000);

      let total = (diffCurrent * 100) / diffDates;
      this.value = total;

      // Math.ceil(diffCurrent/86400000)
      console.log(total);
    },
    statusProgress(value) {
      if (value > 80 && value < 101) {
        return "green";
      } else if (value < 79 && value > 40) {
        return "orange";
      } else {
        return "red";
      }
    }
  }
};
</script>

<style scoped></style>
