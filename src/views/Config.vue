<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9" lg="7" md="8" sm="9">
        <v-form v-model="valid" ref="form">
          <v-text-field
            label="Tu nombre"
            outlined
            filled
            v-model="data.name"
          ></v-text-field>

          <h1
            class="text-sm-subtitle-1 text-md-h6 text-center"
            v-text="'Corto Plazo'"
          ></h1>
          <v-select
            label="Tiempo de Corto Plazo"
            :items="numbers"
            :value="!data.short.value ? def.short.value : data.short.value"
            v-model="data.short.value"
          ></v-select>
          <v-select
            label="Periodos de Corto Plazo"
            :items="time"
            :value="!data.short.period ? def.short.period : data.short.period"
            v-model="data.short.period"
          >
          </v-select>

          <h1
            class="text-sm-subtitle-1 text-md-h6 text-center"
            v-text="'Medio plazo'"
          ></h1>

          <v-select
            label="Tiempo de Mediano plazo"
            :items="numbers"
            :value="!data.medium.value ? def.medium.value : data.medium.value"
          >
          </v-select>
          <v-select
            label="Periodos de Mediano Plazo"
            :items="time"
            :value="
              !data.medium.period ? def.medium.period : data.medium.period
            "
            v-model="data.medium.period"
          >
          </v-select>
          <h1
            class="text-sm-subtitle-1 text-md-h6 text-center"
            v-text="'Largo plazo'"
          ></h1>

          <v-select :items="numbers" label="Tiempo de Largo plazo"> </v-select>
          <v-select
            label="Periodos de Mediano Plazo"
            :items="time"
            :value="!data.long.period ? def.long.period : data.long.period"
            v-model="data.long.period"
          >
          </v-select>

          <v-row justify="center">
            <v-btn :x-large="true" color="success">Guardar</v-btn>
          </v-row>
        </v-form>
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <!-- <v-btn
              color="red"
              outlined
              x-large
              small
              large
              
            > -->
            <v-row justify="center">
              <span
                class="text-decoration-underline text--disabled mt-16"
                v-bind="attrs"
                v-on="on"
                >Delete data all</span
              >
            </v-row>
            <!-- </v-btn> -->
          </template>
          <v-card>
            <v-card-title class="headline"
              >Sure delete this everything?</v-card-title
            >
            <v-card-text
              >Remember you can't do recover this goal's and configuration after
              your delete!</v-card-text
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
  </v-container>
</template>

<script>
export default {
  name: "Config",
  data() {
    return {
      dialog: false,
      valid: false,
      def: {
        short: {
          period: 1,
          value: 3
        },
        medium: {
          period: 1,
          value: 6
        },
        long: {
          period: 2,
          value: 4
        }
      },
      data: {
        name: "",
        short: {
          period: null,
          value: null
        },
        medium: {
          period: null,
          value: null
        },
        long: {
          period: null,
          value: null
        }
      },
      time: [
        { text: "Meses", value: 1 },
        { text: "Años", value: 2 }
      ],
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
  }
};
</script>

<style lang="scss" scoped></style>
