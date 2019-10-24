
<template>
<!-- 컬러 -->
<!--
              <v-btn v-if="works.state === '미제출'" depressed large color="error">미제출</v-btn>
              <v-btn v-if="works.state === '승인대기'" depressed large color="primary">승인대기</v-btn>
              <v-btn v-if="works.state === '승인거절'" depressed large color="orange darken-3 white--text">승인거절</v-btn>
              <v-btn v-if="works.state === '승인완료'" depressed large color="green darken-1 white--text">승인완료</v-btn>
            </div>
            <div class="flex-grow-1"></div>
              <v-btn v-if="works.state === '미확인'" depressed large color="error">미확인</v-btn>
              <v-btn v-if="works.state === '확인'" depressed large color="green darken-1 white--text">확인</v-btn>
              <v-btn v-if="works.state === '확인-대기'" depressed large color="orange darken-3 white--text">확인</v-btn>
              -->

<v-card>
  <v-row>
    <v-col cols="12" sm="8">
      
        <v-card-title class="cyan darken-1">

            <span class="headline white--text">상세 보기</span>
            <div class="flex-grow-1"></div>
              <v-btn v-if="works.state === '미제출'" depressed large color="error">미제출</v-btn>
              <v-btn v-if="works.state === '승인대기'" depressed large color="primary">승인대기</v-btn>
              <v-btn v-if="works.state === '승인거절'" depressed large color="orange darken-3 white--text">승인거절</v-btn>
              <v-btn v-if="works.state === '승인완료'" depressed large color="green darken-1 white--text">승인완료</v-btn>
            </div>
            <div class="flex-grow-1"></div>
              <v-btn v-if="works.state === '미확인'" depressed large color="error">미확인</v-btn>
              <v-btn v-if="works.state === '확인'" depressed large color="green darken-1 white--text">확인</v-btn>
              <v-btn v-if="works.state === '확인-대기'" depressed large color="orange darken-3 white--text">확인</v-btn>
            </div>

          <v-btn dark icon @click="closeWindow">
            <v-icon>cancel</v-icon>
          </v-btn>
        </v-card-title>

        <v-list full-width>
          <v-list-item>
            <v-list-item-action>
              <v-icon>title</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field 
                readonly
                v-model="works.title"
                type="text"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>            
          <v-list-item>
            <v-list-item-action>
              <v-icon>text_fields</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-textarea 
                v-model="works.contents"
                counter
                single-line
                type="text"
                readonly
              />
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>            
          <v-list-item>
            <v-row >
              <v-col cols="1">
            <v-list-item-action @click="showState(period)">
              <v-icon>date_range</v-icon>
            </v-list-item-action>
          </v-col>
                <v-col cols="5">
              <v-text-field
                readonly
                v-model="period">
              </v-text-field>
            </v-col>
            <v-col cols="1">
            <v-list-item-action 
              @click="showState(works)"
            >
              <v-icon>system_update_alt</v-icon>
            </v-list-item-action>
          </v-col>
            <v-col cols="5">
              <v-list-item-content>
                <v-chip
                  v-if="works.flag_upload"
                  color="deep-purple"
                  text-color="white"
                  width="5px"
                >
      <a :href="s_file_up" style="text-decoration:none;color: white" :download="works.file_down">{{works.file_down}}</a>
                </v-chip>
          </v-list-item-content>
            </v-col>
            </v-row>

          </v-list-item>
          <v-divider inset></v-divider>
        <v-list three-line
          class="overflow-y-auto"  
          style="max-height: 200px" 
          full-width
        >
        <v-row v-for="(item, index) in works.to">
            <v-subheader
              v-if="index == 0"
            >대상</v-subheader>

            <v-divider
              :key="index"
              :inset="inset"
            ></v-divider>

            <v-list-item
              :key="item.position"
            >
            <v-col>
                <v-list-item-avatar  @click="showState(item)">
                <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
</v-col>
            <v-col>

                <v-list-item-title v-html="item.position"></v-list-item-title>

                            </v-col>

                <!-- 요청자일 때 -->
                <div v-if="works.by_id === $store.getters.getUser.id">
                            <v-col>

                    <v-btn v-if="item.state === '미제출'" depressed small color="error">미제출</v-btn>
                    <v-btn v-if="item.state === '승인대기'" depressed small color="primary">승인대기</v-btn>
                    <v-btn v-if="item.state === '승인거절'" depressed small color="orange darken-3 white--text">승인거절</v-btn>
                    <v-btn v-if="item.state === '승인완료'" depressed small color="green darken-1 white--text">승인완료</v-btn>
                  <v-btn v-if="item.state === '미확인'" depressed small color="error">미확인</v-btn>
                  <v-btn v-if="item.state === '확인'" depressed small color="green darken-1 white--text">확인</v-btn>
                  <v-btn v-if="item.state === '확인-대기'" depressed small color="orange darken-3 white--text">확인</v-btn>
                              </v-col>
                            <v-col v-if="item.notice === false">

                      <v-icon :color="item.flag_upload ? 'deep-purple accent-4' : 'grey'">insert_drive_file</v-icon>
                                                  </v-col>
                            <v-col v-if="item.state === '미확인' || item.state === '미제출'">

                      <v-list-item-subtitle >{{item.sendDate}}</v-list-item-subtitle>
                                                  </v-col>

                            <v-col v-if="item.state === '승인대기'">

                      <v-btn class="mx-2" fab dark small color="indigo" @click="sendWork([{obj: works.to[index], key: 'state', value: '승인완료'}],works.to[index].position)">
                        <v-icon dark>done</v-icon>
                      </v-btn>

                      <v-dialog v-model="rejects[index].state" scrollable>
                        <template v-slot:activator="{ on:rej }">
                          <v-btn class="mx-2" fab dark small color="pink" v-on="rej" >
                          <v-icon dark>close</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                        <v-card-title>거절 사유를 입력하세요.</v-card-title>
                        <v-divider></v-divider>
                        <v-textarea 
                          placeholder="내용 입력"
                          v-model="rejects[index].comment"
                          counter
                          maxlength="80"
                          single-line
                          type="text"
                        />
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn color="blue darken-1" text @click="rejects[index].state = false">취소</v-btn>
                          <v-btn color="blue darken-1" text @click="sendWork([{obj: works.to[index], key: 'state', value: '승인거절'}, {obj: works.to[index], key: 'comment', value : rejects[index].comment}], works.to[index].position)">확인</v-btn>
                        </v-card-actions>
                        </v-card>
                      </v-dialog>
                                                  </v-col>
                        
                      <v-dialog v-model="reject.state" scrollable>
                        <template v-slot:activator="{ on:rej2 }">
                            <v-col v-if="item.state === '승인거절'">
                            
                          <v-icon v-on="rej2" :color="item.comment ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
                            </v-col>
                          </template>
                          <v-card >
                          <v-card-title>거절 사유</v-card-title>
                        <v-divider></v-divider>
                        <v-textarea 
                          v-model="item.comment"
                          counter
                          maxlength="80"
                          single-line
                          type="text"
                          readonly
                        />
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn color="blue darken-1" text @click="reject.state = false">확인</v-btn>
                        </v-card-actions>
                        </v-card>
                          </v-dialog>
                            <v-col>
                          <v-list-item-subtitle >{{item.sendDate}}</v-list-item-subtitle>
                            </v-col>
                </div>

                <!-- 수신자일 경우 -->
                <div v-else>
                      <v-row>
                      
                                
                        <v-list-item v-if="works.state === '미확인'">
                        <v-btn @click="sendWork([{obj: works, key: 'state', value: '확인'}], works.to[0].position)" depressed large color="cyan darken-4 white--text">확인</v-btn>
                      </v-list-item>
                      <v-list-item>
                      
      <a :href="c_file_up" style="text-decoration:none;color: white" :download="works.file_c_down">
        <v-icon @click="showState(works)" :color="works.flag_c_upload ? 'deep-purple accent-4' : 'grey'">insert_drive_file</v-icon>
      </a>
                      </v-list-item>
                      <v-dialog v-model="rejects[index].state" scrollable>
                        <template v-slot:activator="{ on:rej }">
                      <v-list-item v-if="works.state==='승인거절'">
                        <v-icon v-on="rej" :color="works.comment ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
                      </v-list-item>
                      </template>
                          <v-card>
                          <v-card-title>거절 사유</v-card-title>
                        <v-divider></v-divider>
                        <v-textarea 
                          v-model="works.comment"
                          counter
                          maxlength="80"
                          single-line
                          type="text"
                          readonly
                        />
                        <v-divider></v-divider>
                        </v-card>
                          </v-dialog>
                    </v-row>
                    <!-- 미제출시 -->
                    <div v-if="works.state === '미제출' || works.state === '승인거절'">
                      
                      <v-list-item>
                        <v-file-input
                          v-model="upFiles"
                          id="bin"
                          color="deep-purple accent-4"
                          counter
                          label="File input"
                          multiple
                          placeholder="Select your files"
                          outlined
                        >
                          <template v-slot:selection="{ index, text }">
                            <v-chip
                              v-if="index < 2"
                              color="deep-purple accent-4"
                              dark
                              label
                              small
                            >
                              {{ text }}
                            </v-chip>
                          </template>
                        </v-file-input>
                      </v-list-item>
                      <v-list-item>
                          <div class="flex-grow-1"></div>
                            <v-btn @click="sub([{obj: works, key: 'state', value: '승인대기'}], works.to[0].position)" depressed large color="cyan darken-4 white--text">제출하기</v-btn>
                            </v-list-item>
                    </div><!-- 미제출 -->   
                    
                      <v-list-item>
                        <v-list-item-subtitle >{{works.sendDate}}</v-list-item-subtitle>
                      </v-list-item> 
                </div><!-- 수신자 -->
          </v-list-item>
        </v-row>
    </v-list>              
        </v-list>
    </v-col>
  </v-row>
      </v-card>
</template>
<script>
  import axios from 'axios'
  export default{
    props:{
      idx_window: 0,
      works: undefined,
    },
    data(){
      return {
        period: this.$store.state.period,
        inset: true,
        upFiles: [],
        reject:{
          state: false,
          comment: '',
        },
        rejects: [{
          state: false,
          comment: '',
        },
        {
          state: false,
          comment: '',
        },
        {
          state: false,
          comment: '',
        },
        {
          state: false,
          comment: '',
        },
        {
          state: false,
          comment: '',
        }],
        dialog: false,
        s_file_up: '',
        c_file_up: '',
      }
    },
    mounted(){
      var eve = 'openViewWork'
      if(this.$store.getters.getMountedCheck.indexOf(eve) == -1){
        this.$store.commit('pushMountedCheck', eve)
        this.$store.state.bus.$on(eve, works => {
          this.works = works
          this.$store.commit('initPeriod', works.startDate + '~' + works.endDate)
          
          console.log('period', this.store.state.period)
          this.s_file_up = 'http://localhost:3000/apis/download?fileName='+works.file_up
          this.c_file_up = 'http://localhost:3000/apis/download?fileName='+works.file_c_up
          this.checkStateServ()
        })
      }
      console.log('works: ', this.works)
    },
    methods: {
      checkStateServ(){
        console.log('checkStateServe :::', this.works)
        if(this.works.by_id === this.$store.getters.getUser.id){
          
            var count = 0
            var s_state = this.works.to[0].state

            if(s_state != this.works.state){
              for(var i = 1; i<this.works.to.length; i++){
                if(this.works.to[i].state == state){
                  count++
                }
              }
                
                  

              if(count + 1 == this.works.to.length)
                this.works.state = state
            }
        }
      },
      sub(arr_dic, to){
        
        var ret = 0
        console.log('call the sub function');
        
        const fd = new FormData()
        fd.append('bin', document.getElementById('bin').files[0])
        
        if(this.upFiles.length > 0 )
          fd.append('flag_upload', true)
        
        //파일 처리 부분(업로드, )
        axios.post(this.$store.state.url_axios+`/apis/upload`, fd)
        .then(r => {
          console.log('save: ', r.data.temp.file_down)
          console.log('real: ', r.data.temp.file_up)
          console.log('obj:', arr_dic[0].obj)
          arr_dic.push({obj: arr_dic[0].obj, key: 'file_c_up', value: r.data.temp.file_up})
          arr_dic.push({obj: arr_dic[0].obj, key: 'file_c_down', value: r.data.temp.file_down})
          arr_dic.push({obj: arr_dic[0].obj, key: 'flag_c_upload', value: r.data.temp.flag_upload})
          this.sendWork(arr_dic, to)
        })
        .catch(e => console.error(e))
        
      },
      closeWindow(){
        this.$store.state.bus.$emit('closeViewWork', this.idx_window)
      },
      sendWork(arr_dic, to){
        arr_dic.forEach(x=>{
            console.log('key::', x.key)
            console.log('value::', x.value)
          x.obj[x.key] = x.value
          x.obj.sendDate = new Date().toISOString().substr(0, 10)
        })
        console.log('sendWork :::', this.works)
        this.$store.commit('sendUpdateWorks', {works: this.works, to: to})
        this.checkStateServ()
      },
      showState(item){
          console.log('showState::item::', item)
          console.log('this.s_file_up', this.s_file_up)
      },
    },
  }
</script>
