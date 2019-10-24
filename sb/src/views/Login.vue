<template>
  <v-app id="inspire">
    <v-content>
      <v-container
      class="fill-height"
      fluid
      >
        <v-row
          align="center" justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <modals-container hide-backdrop />
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="form.id"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password"
                    prepend-icon="lock"                    
                    name="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="reg">등록</v-btn>
                <v-btn color="primary" @click="check">로그인</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
              <div>
        	<v-alert v-model="wd.state" :type="wd.type" dismissible >
              {{wd.msg}}
            </v-alert>
        </div>


  </v-app>
</template>

<script>
	import Register from './Register.vue'
	export default {
		components:{
			Register,
		},
		data () {
			return {
				form: {
					id: '',
					password: ''
				},
				wd: {
					msg: '',
					state: false,
					type: 'error'
				}
			}
		},
		methods: {
			reg(){

				this.$modal.show(Register,
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
			check(){
        console.log('id :', this.form.id)
				this.$store.commit('initUser', {id: this.form.id}) //유저 정보 설정
        localStorage.setItem('tk', '12312319adfasd12312#!@sadf')
        this.$store.commit('setToken')
        this.$router.push('/')
      },
		}
	}

</script>
