<template>
  <v-row
    class="d-flex"
    justify="center"
  >

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
      <v-menu offset-y>
      <template v-slot:activator="{ on:menu }">
      <v-icon v-on="menu"@click="setState">power_settings_new</v-icon>
      </template>
      <v-list>
        <v-list-item
          v-for="(my, index) in items"
          :key="index"
          @click="setState(my.title)"
        >
          <v-list-item-title>{{ my.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-toolbar>

  <v-dialog v-model="dialog" scrollable max-width="300px">
        <template #activator="{ on: dialog }">
    <v-list subheader
        style="max-height: 2000px" 
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
    
      </template>
      <v-card>
        <Chat :title="cur" :feed="this.convs" />
      </v-card>

      </v-dialog>
  </v-card>    
      </v-list>

  </v-row>

</template>

<script>
  import Chat from '../components/basic-vue-chat/src/components/basic-vue-chat/BasicVueChat.vue'
  export default {
    
    components: {
     Chat,
    },
    data: () => {
      return {
        menu: null,
        dialog: null,
        state_menu: false,
        sub: [
          { title: '대화하기' },
        ],
        cur : '',
        convs: [],
        items: [
        { title: '당직상황병' },
        { title: '당직사관' },
        { title: '당직부관' },
        { title: '당직사령' },
      ],
      }
    },
    methods: {
      setState(title){
        
      },
      setCur(to, idx){
        this.cur = to
        this.$store.state.bus.$emit('setTo', this.cur)
        this.convs = this.$store.state.others[idx].convs
        console.log('setCur:', this.convs)
        this.$store.state.bus.$emit('openChat', {convs : this.convs})
      },
      subCall(idx){
        switch(idx){
          case 0:
            this.conversation()
            break
        }
      },
      conversation(){
        this.$modal.show(Chat,
					{
						modal : this.$modal
					},
					{
						name: 'dynamic-modal',
						width: '100%',
						height: '100%',
						draggable: true
					}
				)
      },
    },
    mounted(){
      this.$store.commit('checkMsg')
      console.log('other:', this.$store.state.others)
    },
  }
</script>