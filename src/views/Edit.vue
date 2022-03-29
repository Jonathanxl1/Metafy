<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9" lg="9" md="8" sm="9">
        <v-form v-model="valid" ref="form">
          <v-row justify="center">
            <v-switch label="Reiniciar desde cero" v-model="reboot"> </v-switch>
            <div v-if="!reboot" class="text-center justify-center mt-5 ml-2">
              Fecha de Inicio: {{ this.state.currentdate }}
            </div>
          </v-row>
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
                v-model="state.date"
                label="Custom Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="state.date"
              @input="menu2 = false"
              color="green"
              :min="this.actually()"
            ></v-date-picker>
          </v-menu>
          <v-menu
            ref="time"
            v-if="state.value == 4"
            v-model="menu3"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            :return-value.sync="state.time"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="state.time"
                label="Custom time"
                prepend-icon="access_time"
                v-bind="attrs"
                readonly
                v-on="on"
                :rules="ruleDateTime"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="state.time"
              color="green"
              v-if="menu3"
              @click:minute="$refs.time.save(state.time)"
            ></v-time-picker>
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
              @click="updateGoal()"
              :x-large="true"
              :disabled="!valid"
              class="addGoal"
              color="success"
              >Actualizar</v-btn
            >
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { retriveGoal, updateGoal } from "../store/localdata";

export default {
  name: "Edit",
  props: ["time"],
  data() {
    return {
      id: this.$route.params.id,
      process: "",
      reboot: false,
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
      ruleDateTime: [
        v => !!v || "Required",
        () => this.validDateTime() || "La hora ya paso"
      ],
      date: "",
      menu2: false,
      menu3: false,
      update: null,
      error: null,
      step: "",
      state: {
        title: "",
        currentdate: "",
        description: "",
        value: "",
        time: "",
        date: "",
        datetime: "",
        steps: {
          active: false,
          values: []
        },
        status: {
          value: "active",
          date: this.actually()
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
    this.goal();
    console.log(this.$store.state.goals);
    console.log(this.$refs.form);
  },
  watch: {
    update: function(val) {
      if (val && val !== null) {
        this.$router.go(-1);
      }
    },
    "state.steps.active": function(val) {
      if (!val) {
        this.state.steps.values = [];
      }
    },
    // date: function(val) {
    //   // this.state.datetime = val;
    // },
    "state.value": function(v) {
      if (v != 4) {
        this.state.datetime = this.actually();
        // Pendiente de configurar shot,long medium time
      }
    },
    "state.steps.values": function() {
      this.validList();
    },
    "state.time": function() {
      if (this.state.value == 4) {
        this.state.datetime = `${this.state.date} ${this.state.time}`;
      }
    },
    "state.date": function() {
      if (this.state.value == 4) {
        this.state.datetime = `${this.state.date} ${this.state.time}`;
      }
    }
  },
  methods: {
    goal() {
      let id = this.id;
      retriveGoal(id)
        .then(data => {
          this.state = Object.assign({}, this.state, data);
          console.info(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateGoal() {
      if (this.reboot) {
        this.state.currentdate = this.currentdate();
      }
      updateGoal(this.state, this.id)
        .then(data => {
          this.update = data;
        })
        .catch(error => {
          this.error = error;
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
        1}-${date.getDate()}`;
      let dateT = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      return `${dateY} ${dateT}`;
    },
    actually() {
      let date = new Date();
      let year = date.getFullYear();
      let month;
      if (Number(date.getMonth()) <= 9) {
        month = String("0" + (date.getMonth() + 1));
      } else {
        month = String(date.getMonth() + 1);
      }
      let day;
      if (Number(date.getDate()) <= 9) {
        day = String("0" + date.getDate());
      } else {
        day = String(date.getDate());
      }

      let actually = `${year}-${month}-${day}`;
      return String(actually);
    },
    validate() {
      this.$refs.form.validate();
    },
    remove: function(index) {
      this.state.steps.values.splice(index, 1);
    },
    validDateTime() {
      let goal = new Date(this.state.datetime).getTime();
      let now = new Date(Date.now()).getTime();

      if (goal > now) {
        return true;
      } else {
        return false;
      }
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
