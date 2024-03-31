<template>
  <v-card height="100%" max-height="100%" elevation="0" width="100%">
    <v-col align-self="center" cols="12" style="height:70%">
      <v-col align-self="center">
        <v-row justify="center">
          <v-col align="center">
            <div class="text-lg-h1" @click="viewer()" style="cursor:pointer">
              <div class="date" v-if="view">
                <v-icon color="red">mdi-flag-checkered</v-icon>
                <span> {{ timegoal() }} </span>
                <v-icon color="red">mdi-flag-checkered</v-icon>
              </div>
              <div class="coutdown" v-else>
                <v-icon class="mdi-spin" color="green"
                  >mdi-clock-time-twelve-outline</v-icon
                >
                <span v-if="year > 0">{{ year }} Y :</span>
                <span v-if="month > 0">{{ month }} M:</span>
                <span v-if="day > 0">{{ day }} d: </span>
                <span>{{ hour }} h:</span>
                <span>{{ min }}m:</span>
                <span>{{ sec }} S</span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <div class="text-lg-h3">{{ this.state.title }}</div>
        </v-row>
        <v-row justify="center" class="description text-center text-md-body-1">
          {{ this.state.description }}
        </v-row>
        <v-row justify="center" v-if="this.state.steps.active || false">
          <v-col align="center">
            <v-card class="mx-auto" elevation="10">
              <v-list>
                <v-list-item-title>
                  <div class="text-lg-h5">List</div>
                </v-list-item-title>
                <v-list-item
                  v-for="(goal, i) in this.state.steps.values"
                  :key="i"
                >
                  {{ goal }}
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-col>

    <v-col align-self="end" cols="12" style="height:30%">
      <v-row justify="space-between" class="d-flex align-self-end">
        <v-col>
          <v-btn
            v-if="this.state.status.value != 'done' || false"
            outlined
            width="100%"
            color="green"
            class="done mr-2"
            @click="done()"
          >
            <v-icon>done</v-icon> <span>Complete</span>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            width="100%"
            color="blue"
            outlined
            class="mr-2"
            :to="`${this.id}` + '/edit'"
          >
            <v-icon>create</v-icon><span>Edit</span>
          </v-btn>
        </v-col>
        <v-col>
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" outlined width="100%" v-bind="attrs" v-on="on">
                <v-icon>delete</v-icon><span>Delete</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline"
                >Sure delete this goal?</v-card-title
              >
              <v-card-text
                >Remember you can't do recover this goal after your
                delete!</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="red darken-1" text @click="del()">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-col>
  </v-card>
</template>

<script>
import { deleteGoal, retriveGoal, updateGoal } from "../store/localdata";
import moment from "moment";
// import time from "../time";
// var countdown = setInterval(counter,1000);

export default {
  name: "DetailsGoal",
  mounted() {
    this.overlay = true;
    this.goal();
  },
  data() {
    return {
      state: {
        status: {
          value: "done"
        },
        steps: {
          values: [],
          active: false
        }
      },
      time: "",
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
      view: false,
      dialog: false,
      delete: null,
      complete: null,
      id: this.$route.params.id,
      overlay: true,
      countId: ""
    };
  },

  methods: {
    countdown() {
      this.countId = setInterval(this.counter, 1000);
    },
    goal() {
      let id = this.id;
      retriveGoal(id)
        .then(data => {
          this.state = Object.assign({}, this.state, data);
          this.overlay = false;
          // let goal = new Date(this.state.datetime).getTime();
          let goal = moment(this.state.datetime);

          // let now = new Date(Date.now()).getTime();
          if (goal.isAfter(moment())) {
            this.countdown();
          }
          console.info(data);
        })
        .catch(error => {
          console.error(error);
        });
    },

    counter() {
      const sec = 1000,
        min = sec * 60,
        hour = min * 60,
        day = hour * 24;
      // let now = Date.now();
      let { datetime: goal } = this.state;

      // let diff = new Date(goal).getTime() - new Date(now).getTime();
      // let time = new Date(counter);
      let diff = moment(goal).diff(moment());

      this.time = diff;
      this.day = Math.floor(diff / day);
      this.hour = Math.floor((diff % day) / hour);
      this.min = Math.floor((diff % hour) / min);
      this.sec = Math.floor((diff % min) / sec);
    },
    viewer() {
      this.view = !this.view;
    },
    timegoal() {
      return moment(this.state.datetime).format("DD / MM / YYYY HH:mm");
    },
    done() {
      this.state.status.value = "done";
      this.state.status.date = Date.now();
      updateGoal(this.state, this.id)
        .then(data => (this.complete = data))
        .catch(data => (this.complete = data));
    },
    del() {
      deleteGoal(Number(this.id))
        .then(data => (this.delete = data))
        .catch(data => (this.delete = data));
    }
  },
  watch: {
    complete(value) {
      if (value && value !== null) {
        this.$router.push({ path: "/" });
        console.log("Complete to goal");
      } else {
        console.log("Failed");
      }
    },
    delete(value) {
      if (value && value !== null) {
        this.$router.push({ path: "/" });
        console.log("Delete goal");
      } else {
        console.log("Failed to Delete goals");
      }
    },
    time(value) {
      // let now = new Date (Date.now()).getTime();
      if (value < 999) {
        clearInterval(this.countId);
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital@1&display=swap");
.description {
  font-family: "Open Sans", sans-serif !important;
}

.done:hover {
  /* background-color:lawngreen;
  color:#fff; */
}
</style>
