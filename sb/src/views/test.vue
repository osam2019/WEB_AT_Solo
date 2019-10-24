<template>
<div id="app">
  <v-app>
    <v-content>
      <v-container style="min-height: 400vh;">
      <v-menu
        bottom
        left
      >
        <template #activator="{ attrs, on: menu }">
          <v-btn
            v-bind="attrs"
            v-on="menu"
          >
            open menu
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-dialog width="600">
              <template #activator="{ attrs, on: dialog }">
                <v-btn
                  text
                  v-bind="attrs"
                  v-on="dialog"
                >
                  <span>menu item 1</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-text>Hello there</v-card-text>
              </v-card>
            </v-dialog>
          </v-list-item>

          <v-list-item>
            <v-dialog width="600">
              <template #activator="{ attrs, on: dialog }">
                <v-btn
                  text
                  v-bind="attrs"
                  v-on="dialog"
                >
                  <span>menu item 2</span>
                </v-btn>
              </template>

              <v-card>
                <v-card-text>Hello there</v-card-text>
              </v-card>
            </v-dialog>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
import Vue from 'vue'
import vuetify from '../plugins/vuetify';
const VMenu = Vue.options.components.VMenu

Vue.component('v-menu', {
  extends: VMenu,
  
  methods: {
    getOpenDependents () {
      return []
    }
  }
})

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
      drawer: null,
      tempDrawer: false,
      isMini: false,
    }),
})
</script>