<template>
  <v-container>
    <v-row justify="center">
      <v-col align="center">
        <div class="text-lg-h1" @click="viewer()">
          <div class="date" v-if="view">
            <span>{{ timegoal() }}</span>
          </div>
          <div class="coutdown" v-else>
            <span v-if="year != 0">{{ year }} Y :</span>
            <span v-if="month != 0">{{ month }} M:</span>
            <span v-if="day != 0">{{ day }} d: </span>
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
            <v-list-item v-for="(goal, i) in this.state.steps.values" :key="i">
              {{ goal }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        v-if="this.state.status.value != 'done' || false"
        outlined
        x-large
        small
        large
        color="green"
        class="done mr-2"
        @click="done()"
      >
        <v-icon>done</v-icon> <span>Complete</span>
      </v-btn>
      <v-btn x-large small large color="blue" outlined class="mr-2" :to="`${this.id}`+'/edit'">
        
        <v-icon>create</v-icon><span>Edit</span>
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red"
            outlined
            x-large
            small
            large
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>delete</v-icon><span>Delete</span>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Sure delete this goal?</v-card-title>
          <v-card-text
            >Remember you can't do recover this goal after your
            delete!</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" text @click="dialog = false"
              >Cancel</v-btn
            >
            <v-btn color="red darken-1" text @click="del()"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    
  </v-container>
  
    
  
  
</template>

<script>
import db from "../store/localdata";

export default {
  name: "DetailsGoal",
  mounted() {
    this.goal();
  },
  created() {
    window.setInterval(this.counter, 1000);
  },
  data() {
    return {
      state: {
        status: {
          value: "done"
        },
        steps:{
          values: [],
          active: false
        }
      },
      time: "",
      year: "",
      month: "",
      day: "",
      hour: "",
      min: "",
      sec: "",
      view: false,
      dialog: false,
      delete: null,
      complete: null,
      id:this.$route.params.id
    };
  },

  methods: {
    goal: function() {
      let id = this.id;
      db.retriveGoal(id)
        .then(data => {
          this.state = Object.assign({}, this.state, data);
          console.info(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    counter: function() {
      let now = Date.now();
      let goal = this.state.datetime;
      let counter = new Date(goal) - new Date(now);
      let time = new Date(counter);
      this.time = time;
      this.year = time.getFullYear() - 1970;
      this.month = time.getMonth();
      this.day = time.getDate();
      this.hour = time.getHours();
      this.min = time.getMinutes();
      this.sec = time.getSeconds();
    },
    timegoal: function() {
      let date = new Date(this.state.datetime);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate() + 1;
      let hour = date.getHours();
      let min = date.getMinutes();

      return `${day} / ${month} / ${year} ${hour} : ${min}`;
    },
    viewer: function() {
      this.view = !this.view;
    },
    done: function() {
      this.state.status.value = "done";
      this.state.status.date = Date.now();
      db.updateGoal(this.state,this.id)
        .then(data => (this.complete = data))
        .catch(data => (this.complete = data));
    },
    del: function() {
      db.deleteGoal(Number(this.id))
        .then(data => (this.delete = data))
        .catch(data => (this.delete = data));
    }
  },
  watch: {
    complete: function(value) {
      if (value && value !== null) {
        this.$router.push({ path: "/base" });
        console.log("Complete to goal");
      } else {
        console.log("Failed");
      }
    },
    delete: function(value) {
      if (value && value !== null) {
        this.$router.push({ path: "/base" });
        console.log("Delete goal");
      } else {
        console.log("Failed to Delete goals");
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
