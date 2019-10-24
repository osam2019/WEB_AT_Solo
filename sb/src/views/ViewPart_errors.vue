<template>
	<v-container>
	<v-row >
	   <v-col cols="6">
      <v-card
        class="mx-auto"
        @click="setWindow(1)"
      >
        <v-card-title>진행중</v-card-title>
        <div class="flex-grow-1"></div>

      <v-list 
          two-line
          class="overflow-y-auto"
      >
          <div v-if="works.to!=undefined" v-for="(works, index)  in jobs">
            <div v-if="works.flag_expired == false">
            <v-list-item :key="works.title">

                <v-row   @click="setWork(works, index)">

      <v-dialog v-model="viewWork">
        <template v-slot:activator="{ on:dial }">
                <v-list-item-content v-on="dial">
                  <v-list-item-title>


                <div v-if="works.to != undefined">
                 <v-chip
                  class="ma-2"
                  color="primary"
                  v-for="(one, idx) in works.to.slice(0,3)"
                >
                  {{one.position}}
                </v-chip>
                

                  <v-icon
                    v-if="works.to.length>3">more_horiz</v-icon>
                </div>
                </v-list-item-title>
                    <v-list-item-subtitle class="text--primary" >{{works.title}}</v-list-item-subtitle>
                  <v-list-item-subtitle v-text="works.contents"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                <div class="flex-grow-1"></div>
                  <v-btn v-if="works.state === '미제출'" depressed small color="error">미제출</v-btn>
                  <v-btn v-if="works.state === '승인대기'" depressed small color="primary">승인대기</v-btn>
                  <v-btn v-if="works.state === '승인거절'" depressed small color="orange darken-3 white--text">승인거절</v-btn>
                  <v-btn v-if="works.state === '승인완료'" depressed small color="green darken-1 white--text">승인완료</v-btn>
                  <v-btn v-if="works.state === '미확인'" depressed small color="error">미확인</v-btn>
                  <v-btn v-if="works.state === '확인'" depressed small color="green darken-1 white--text">확인</v-btn>
                  <v-btn v-if="works.state === '확인-대기'" depressed small color="orange darken-3 white--text">확인</v-btn>
                  </v-list-item-content>
                  
          </template> 
           <ViewWork  :idx_sep="thisWindow" :period="period" /> 

    </v-dialog>
    
              <v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text v-text="works.due"></v-list-item-action-text>
                  
                  <v-icon
                    v-if="!works.favor"
                    color="grey lighten-1"
                    @click="setWork([{obj: jobs, key: 'favor', value: !works.favor, idx: index}])"
                  >
                    star_border
                  </v-icon>

                  <v-icon
                    v-else
                    color="yellow"
                  >
                    star
                  </v-icon>
                </v-list-item-action>
                
                </v-list-item-content>
                
                  </v-row>
            </v-list-item>
       

            <v-divider
              v-if="index + 1 < jobs.length"
              :key="index"
            ></v-divider>
            </div>
          </div>
      </v-list>
    </v-card>

  </v-col>
	   <v-col cols="6">
      <v-card
        class="mx-auto"
        @click="setWindow(2)"
      >
        <v-card-title>지나간</v-card-title>
        <div class="flex-grow-1"></div>


      <v-dialog v-model="viewWork">
        <template v-slot:activator="{ on:dial2 }">
      <v-list 
          two-line
          style="max-height: 400px"
          class="overflow-y-auto">
          <div v-for="(works, index) in jobs">
            <div v-if="works.flag_expired == true">
            <v-list-item :key="works.title">

                <v-list-item-content v-on="dial2"  @click="setWork(works, index)">

                  <v-list-item-title>
                  
                <div v-if="works.to != undefined">
                 <v-chip
                  class="ma-2"
                  color="primary"
                  v-for="(one, idx) in works.to.slice(0,3)"
                >
                  {{one.position}}
                </v-chip>
                

                  <v-icon
                    v-if="works.to.length>3">more_horiz</v-icon>
                </div>

                </v-list-item-title>
                    <v-list-item-subtitle class="text--primary" >{{works.title}}</v-list-item-subtitle>
                  <v-list-item-subtitle v-text="works.contents"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="works.due"></v-list-item-action-text>
                  
                  <v-icon
                    v-if="!works.favor"
                    color="grey lighten-1"
                    @click="showItem(works)"
                  >
                    star_border
                  </v-icon>

                  <v-icon
                    v-else
                    color="yellow"
                  >
                    star
                  </v-icon>
                </v-list-item-action>
            </v-list-item>
       

            <v-divider
              v-if="index + 1 < jobs.length"
              :key="index"
            ></v-divider>
            </div>
          </div>
      </v-list>
          </template> 
           <ViewWork  :works="works" :idx_window="thisWindow"/> 

    </v-dialog>
    </v-card>

  </v-col>

</v-row>
</v-container>

</template>
<script>
  import ViewWork from './ViewWork.vue'
  export default {
    components:{
      ViewWork,
    },
    props:{
      idx_sep: undefined,
      jobs: undefined,
  	},
    data: () => ({
      works: undefined,
      period: '',
      active: undefined,
      thisWindow: undefined,
      viewWork: false,
      viewWork2: false,
    }),
    mounted(){
      console.log('ViewParts mounted!!!')
      var eve = 'closeViewWork'
      if(this.$store.getters.getMountedCheck.indexOf(eve) == -1){
        this.$store.commit('pushMountedCheck', eve)
        this.$store.state.bus.$on(eve,  (idx)=>{
          console.log('closeViewWork!!', idx)
          if(idx == 1)
            this.viewWork = false
          else if(idx == 2)
            this.viewWork2 = false
          
        })
      }
      var eve = 'setViewParts'
      if(this.$store.getters.getMountedCheck.indexOf(eve) == -1){
        this.$store.commit('pushMountedCheck', eve)
        this.$store.state.bus.$on(eve,  (jobs)=>{
          console.log(eve,':::', jobs)
          this.jobs = jobs
          this.calcDue()
        })
      }
    },
    methods: {
      setWindow(idx){
        this.thisWindow = idx
      },
      setWork(works, idx_works){
        this.$store.commit('initIdxWorks', idx_works)
        this.$store.commit('setWorks')
        this.works = this.$store.getters.getCurWorks
      },
      showItem(works){
        console.log('works ::: ViewParts.vue :::', works)
      },
      getDiff(startDate, endDate){
          var diff_start = startDate instanceof Date ? startDate :new Date(startDate)
          var diff_end = endDate instanceof Date ? endDate :new Date(endDate)
      
          diff_start = new Date(diff_start.getFullYear(), diff_start.getMonth()+1, diff_start.getDate())
          diff_end = new Date(diff_end.getFullYear(), diff_end.getMonth()+1, diff_end.getDate())
      
          var diff = Math.abs(diff_end.getTime() - diff_start.getTime())
          diff = Math.ceil(diff / (1000 * 3600 * 24))
      
          return diff;
      },
      calcDue(){
        console.log('calcDue: ', this.jobs)
        this.jobs.forEach(x=>{
          if(x.flag_expired === false){
            //진행중인 경우만
            x.due = '- ' + String(this.getDiff(new Date().toISOString().substr(0, 10), x.endDate)) + ' days'
          }
          else
            x.due = 'expired'
          
        })
      },
      mySort(){
      }
    },
  }
</script>