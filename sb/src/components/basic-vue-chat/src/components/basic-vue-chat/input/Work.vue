<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="cyan darken-1">
          <div v-if="!notice">
            <span class="headline white--text">작업 요청</span>
          </div>
          <div v-else>
            <span class="headline white--text">알림 등록</span>
          </div>
          
          <div class="flex-grow-1"></div>
          <v-btn dark icon @click="sub">
            <v-icon>check</v-icon>
          </v-btn>

          <v-btn dark icon @click="closeWindow">
            <v-icon>cancel</v-icon>
          </v-btn>
        </v-card-title>

        <v-list>
          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>people</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field 
                placeholder="대상 선택"
                v-model="v_searchPs.cur"
                type="text"
                @click=""
                v-on:keyup="searchPs"
              >
              </v-text-field>
            </v-list-item-content>
          </v-list-item>
             <!--show list result for searching -->
        <v-list-item @click="" v-if="v_searchPs.state" v-for="(ps) in v_searchPs.ps">
          <v-list-item-action>
            <v-icon>search</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="selPs(ps)" v-bind:style="{color: 'gray'}">{{ps}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-chip
                align="end"
                v-for="(item, idx) in v_work.selects"
                class="ma-2"
                close
                color="deep-purple"
                text-color="white"
                @click:close="popPs(idx)"
              >
                {{item}}
              </v-chip>
          <v-divider inset></v-divider>

          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>title</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field 
                placeholder="제목 입력"
                v-model="v_work.title"
                type="text"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>

        <!-- -->
          <v-divider inset></v-divider>            
          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>text_fields</v-icon>
            </v-list-item-action>

            <v-list-item-content>
                <v-textarea 
                placeholder="내용 입력"
                v-model="v_work.contents"
                counter
                maxlength="120"
                full-width
                single-line
                type="text"
              />
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>            
          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>date_range</v-icon>
            </v-list-item-action>

            
              
                  <v-list-item-content>
              <v-row >
                <v-menu
                  v-model="cal1"
                  absolute
                  offset-y
                >
                <template v-slot:activator="{ on:pick1 }">
            <v-col cols="6">

              <v-text-field 
                placeholder="시작일"
                v-model="v_work.startDate"
                v-on="pick1"
              />
            </v-col>
                         </template>
            <v-date-picker
             v-model="v_work.startDate" 
             :max="v_work.endDate" 
             :min="$store.state.today"
             show-current="$store.state.today"
             />
           </v-menu>

            <v-menu
                  v-model="cal2"
                  absolute
                  offset-y
                >
                <template v-slot:activator="{ on:pick2 }">

            <v-col cols="6">

              <v-text-field 
                placeholder="종료일"
                v-model="v_work.endDate"
                v-on="pick2"
              />
            </v-col>
                         </template>
            <v-date-picker
             v-model="v_work.endDate" 
             :min="v_work.startDate ? $store.state.today : v_work.startDate"
             show-current="$store.state.today"
             />
     </v-menu>

            </v-row>

            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>            
          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>system_update_alt</v-icon>
            </v-list-item-action>

            <v-list-item-content align="center">

            <v-file-input
              v-model="upFiles"
              id="bin"
              color="deep-purple accent-4"
              counter
              label="File input"
              multiple
              placeholder="Select your files"
              outlined
              :show-size="1000"
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

            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
 
<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  props: {
    sel : '',
    notice: undefined
  },
  data () {
    return {
      v_chip: true,
      v_divisions : [],
      v_ps: [],
      v_searchPs : {
        cur: '',
        ps: [],
        state: false
      },
      v_work : { 
        selects: [],
        title: '',
        contents: '',
        startDate: '',
        endDate: '',
        notice: false, //true : notice false: work
      },
      selectDate: '',
      startEnd: '',
      cal1: undefined,
      cal2: undefined,
      upFiles: []
    }
  },
  mounted: function () {
    this.initWorks()
    this.v_work.selects.push(this.sel)
    this.$store.state.bus.$on('openWork', () => {
      console.log('receive openWWork::::')
      this.initWorks()
      this.v_work.selects.push(this.sel)
    })
  
    this.v_divisions = this.$store.getters.getUser.list_division
    this.v_ps = this.$store.getters.getOthers
  },
  methods : {
    initWorks(){
      this.v_work = {
        selects: [],
        title: '',
        contents: '',
        startDate: '',
        endDate: '',
        notice: this.notice,
      }
      this.upFiles = []
    },
    popPs(idx){
      this.v_work.selects.splice(idx, 1)
    },
    selPs(position){
      this.v_work.selects.push(position)
      this.v_searchPs.state = false
      this.v_searchPs.cur = ''
    },
    uploadFile(){
      console.log('call uploadFile')
    },
    sub(){
      var ret = 0
      console.log('call the sub function');
      
      const fd = new FormData()
      fd.append('bin', document.getElementById('bin').files[0])

      if(this.upFiles.length > 0 )
        fd.append('flag_upload', true)
      else
        fd.append('flag_upload', false)
      console.log('axios :::')
      //파일 처리 부분(업로드, )
      axios.post(this.$store.state.url_axios+'/apis/upload', fd)
      .then(r => {
        console.log('emit work', r)
        var works = {
          title : this.v_work.title,
          selects : this.v_work.selects,
          contents : this.v_work.contents,
          startDate : this.v_work.startDate,
          endDate : this.v_work.endDate,
          notice : this.v_work.notice,
          by : this.$store.getters.getUser.id,
          by_position : this.$store.getters.getUser.position,
          file_up : r.data.temp.file_up,
          file_down : r.data.temp.file_down,
          flag_upload : r.data.temp.flag_upload,
        }        
        console.log('works ::: Work.vue :::', works)
        this.$store.state.bus.$emit('work', works)
      })
      .catch(e => console.error(e))
      this.closeWindow();
    },
    closeWindow(){
      console.log('call the closeWindow function');
      this.$store.state.bus.$emit('closeWork')
    },
    searchPs(){
      this.v_searchPs.ps = []
      this.v_searchPs.state = false
      //ps, division 합침
      var temp_arr = []
      this.v_ps.forEach(x=>{
        temp_arr.push(x.position)
      })
      var arr_m = temp_arr.concat(this.v_divisions)
      arr_m.splice(arr_m.indexOf(this.$store.state.user.position), 1)
      var len = Object.keys(arr_m).length
      for(var i=0; i<len; i++){
        var temp = undefined
        
        temp = arr_m[i]
        if( (temp.includes(this.v_searchPs.cur)) && (this.v_searchPs.cur.length > 0)){//search ps
          //중복 검사, selects에 없어야 push
          if(this.v_work.selects.indexOf(temp)== -1){
            this.v_searchPs.ps.push(temp)
            this.v_searchPs.state = true
          }
        }
      }
    },
  },
  created () {
  }
}
</script>