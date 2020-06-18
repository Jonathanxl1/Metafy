<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9" lg="9" md="8" sm="9">
        <v-form v-model="valid" ref="form">
          <v-row>
            <v-text-field
              color="green"
              counter="30"
              label="Titulo de Meta"
              v-model="state.title"
              class="mb-5"
              required
              :rules="rulesTitle"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-textarea
              counter="300"
              label="Razones"
              id="description"
              :outlined="true"
              color="green"
              v-model="state.description"
              required
              :rules="ruleDescription"
            ></v-textarea>
          </v-row>

          <v-select
            color="green"
            label="Fecha limite"
            :items="options"
            v-model="state.value"
            :rules="ruleSelect"
            required
          >
            <!-- <template v-slot:item="{ item }">
              {{ item.text }} 
            </template> -->
          </v-select>
          <v-menu
            v-if="state.value == 4"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Custom Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
              color="green"
              :min="new Date().toISOString().substr(0, 10)"
            ></v-date-picker>
          </v-menu>

          <v-switch label="Pasos" color="green" v-model="state.steps.active" />
          <v-row>
            <v-text-field
              v-if="state.steps.active"
              v-model="step"
              color="green"
              @keyup.enter="addSteps(step)"
              :rules="ruleStep"
            >
              <template v-slot:append>
                <v-icon class="addList" @click="addSteps(step)">
                  add
                </v-icon>
              </template>
            </v-text-field>
          </v-row>
          <v-row justify="center">
            <v-col lg="12" md="7">
              <v-card
                v-if="state.steps.active"
                elevation="16"
                class="mx-auto listGoal mb-2"
              >
                <div class="text-center pt-2 subtitle-1 text-uppercase">
                  List
                </div>
                <v-list
                  v-for="(step, i) in state.steps.values"
                  :key="i"
                  :shaped="true"
                >
                  <v-list-item-group>
                    <v-list-item class="mb-1">
                      <v-list-item-content>
                        {{ i + 1 }}. {{ step }}
                      </v-list-item-content>
                      <v-list-item-action @click="remove(i)">
                        <v-btn icon class="delStep"
                          ><v-icon>clear</v-icon></v-btn
                        >
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-5" justify="center">
            <v-btn
              @click="addGoal"
              :x-large="true"
              :disabled="!valid"
              class="addGoal"
              color="success"
              >Agregar</v-btn
            >
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from "../store/localdata";

export default {
  name: "Add",
  props: ["time"],
  data() {
    return {
      process: "",
      valid: false,
      rulesTitle: [
        value => !!value || "Required",
        v => (v && v.length <= 30) || "Title must be less than 30 characters"
      ],
      ruleDescription: [
        value => !!value || "Required Description",
        v =>
          (v && v.length <= 300) ||
          "Description must be less than 300 characters"
      ],
      ruleStep: [() => this.validList() || "Add item to list"],
      ruleSelect: [value => !!value || "Select an Option"],
      date: this.actually(),
      menu2: false,
      step: "",
      state: {
        title: "",
        currentdate: "",
        description: "",
        value: "",
        datetime: this.actually(),
        steps: {
          active: false,
          values: []
        }
      },
      options: [
        {
          text: `Short Time`,
          value: 1
        },
        {
          text: "Medium Time",
          value: 2
        },
        {
          text: "Long Time",
          value: 3
        },
        {
          text: "Personalizado",
          value: 4
        }
      ]
    };
  },
  mounted() {
    this.state.currentdate = this.currentdate();
    console.log(this.$store.state.goals);
    console.log(this.$refs.form);
  },
  watch: {
    "process":function(val){
      if(val == "complete"){
        this.$refs.form.reset()
      }
    },
    "state.steps.active": function(val) {
      if (!val) {
        this.state.steps.values = [];
      }
    },
    date: function(val) {
      this.state.datetime = val;
    },
    "state.value": function(v) {
      if (v != 4) {
        this.state.datetime = this.actually();
      }
    },
    "state.steps.values": function() {
      this.validList();
    }
  },
  methods: {
    addGoal() {
      db.addGoal(this.state)
        .then(data => {
          this.process = data;
        })
        .catch(error => {
          this.process = error;
        });
    },
    validList() {
      if (this.state.steps.values.length <= 0) {
        return false;
      } else {
        return true;
      }
    },
    addSteps(value) {
      this.state.steps.values.push(value);
      this.step = "";
    },
    currentdate() {
      let date = new Date();
      let dateY = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getUTCDate()}`;
      let dateT = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      return `${dateY} ${dateT}`;
    },
    actually() {
      return new Date().toISOString().substr(0, 10);
    },
    validate() {
      this.$refs.form.validate();
    },
    remove: function(index) {
      this.state.steps.values.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.addList:hover {
  color: green;
  cursor: pointer;
}
.listGoal {
  @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
  font-family: "Lato", sans-serif;
}
.delStep:hover {
  color: red;
}
</style>
