<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="cyan darken-1">
          <span class="headline white--text">사용자 정보 등록</span>

          <div class="flex-grow-1"></div>
          <v-btn dark icon @click="closeWindow">
            <v-icon>check</v-icon>
          </v-btn>

          <v-btn dark icon @click="closeWindow">
            <v-icon>cancel</v-icon>
          </v-btn>
        </v-card-title>

        <v-list>
          <v-list-item @click="">

            <v-list-item-action>
              <v-icon>face</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field
                    v-model="user.id"
                    type="text"
                    placeholder="아이디 입력"
                  ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>lock</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field 
                placeholder="패스워드 입력"
                v-model="user.password"
                type="password"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>


          <v-divider inset></v-divider>

          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field 
                placeholder="소속 입력"
                v-model="user.company"
                type="text"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>            
          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>person</v-icon>
            </v-list-item-action>

            <v-list-item-content>
                <v-text-field 
                placeholder="직책 입력"
                v-model="user.position"
                type="text"
              ></v-text-field>
            </v-list-item-content>
            </v-list-item>


            <v-list-item @click="">
              <v-list-item-action>
                <v-icon>people</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-text-field 
                  placeholder="부서 입력"
                  v-model="user.division"
                  type="text"
                ></v-text-field>
              </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      list_company : {},
      user : { 
        id : '',
        password : '',
        position : '',
        company : '',
        division: '',
      },
    }
  },
  methods : {
    closeWindow(){
      this.$emit('close')
    },
  }
}
</script>