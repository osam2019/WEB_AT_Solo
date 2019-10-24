<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        당직소통
        <v-icon>mdi-phone</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        즐겨찾기
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        인수인계
        <v-icon>mdi-account-box</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
        <v-row>

            <v-col><Chat :title="title" /></v-col>
            <v-col>
            <template>
  <v-row
    class="d-flex"
    justify="center"
  >

  <v-dialog v-model="dialog" scrollable max-width="300px">
        <template #activator="{ on: dialog }">
        <v-card
    class="mx-auto"
  >
    <v-toolbar
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
         <v-toolbar-title>인원 보고</v-toolbar-title>

      <div class="flex-grow-1"></div>

    </v-toolbar>

    <v-list subheader
        style="max-height: 450px" 
        class="overflow-y-auto" 
    >
      <v-subheader>나</v-subheader>

      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="$store.state.user.image"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="$store.state.user.position"></v-list-item-title>
        </v-list-item-content>
              <v-list-item-icon>
                    <v-icon :color="$store.state.user.active ? 'deep-purple accent-4' : 'grey'"></v-icon>
                  <v-icon :color="$store.state.user.active ? 'deep-purple accent-4' : 'grey'"></v-icon>
                  <v-icon :color="$store.state.user.active ? 'deep-purple accent-4' : 'grey'"></v-icon>
                </v-list-item-icon>
      </v-list-item>
      <v-divider></v-divider>

        <div v-for="(division) in $store.state.user.company_division">
          <v-subheader>{{division}}</v-subheader>
          <div
            v-for="(other, idx) in $store.state.others"
            v-if="other.position != $store.state.user.position"
          >
              <v-list-item
                v-if="other.division === division"
                v-on="dialog"
                @click = "setCur(other.position, idx)"
              >
                  <v-list-item-avatar>
                    <v-img :src="other.image"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="other.position"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon :color="other.active_work ? 'deep-purple accent-4' : 'grey'">work</v-icon>
                  <v-icon :color="other.active_notice ? 'deep-purple accent-4' : 'grey'">notification_important</v-icon>
                  <!--<v-icon :color="other.active_message ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>-->
                </v-list-item-icon>
            </v-list-item>
        </div>
        <v-divider></v-divider>
      </div>
    </v-list>
  </v-card>    
      </template>
      <v-card>
        <Chat :title="cur" :feed="this.convs" />
      </v-card>

      </v-list>
      </v-dialog>

  </v-row>

</template>
            </v-col>
        </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
    import Chat from '../components/basic-vue-chat/src/components/basic-vue-chat/BasicVueChat.vue'
  	export default {
	    components: {
        List,
	    	Chat,
	    },
      data () {
      return {
        title: '근무자톡',
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>