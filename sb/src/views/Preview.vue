<template>
  <v-card
  >
    <v-toolbar
		color="deep-purple accent-2"
		height="30px"
    width="1200px"
		dark 
    >
    <v-toolbar-title>
      {{title}}
    </v-toolbar-title>
    </v-toolbar>
    <v-dialog v-model="viewWork"
    >
      <template v-slot:activator="{ on:view }">
        <v-list 
          two-line
          height="125px"
          max-height="125px"
          class="overflow-y-auto"
        >
          <div v-if="item.to!=undefined" v-for="(item, index)  in jobs"
              @click="setWorks(index)"
            >
            <v-list-item height="30px" :key="index">

            <v-list-item-content v-on="view" >

            <v-list-item-title>

            <v-chip
              class="ma-2"
              color="primary"
              v-for="(one, idx) in item.to"
            >
              {{one.position}}
            </v-chip>

            <v-icon v-if="item.to.length > 3">more_horiz</v-icon>

            </v-list-item-title>
            <v-list-item-subtitle class="text--primary" >
              {{item.title}}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-text="item.contents"></v-list-item-subtitle>
            </v-list-item-content>

                <v-list-item-content>
                
                  <v-btn v-if="item.state === '미제출'" depressed small color="error">미제출</v-btn>
                  <v-btn v-if="item.state === '승인대기'" depressed small color="primary">승인대기</v-btn>
                  <v-btn v-if="item.state === '승인거절'" depressed small color="orange darken-3 white--text">승인거절</v-btn>
                  <v-btn v-if="item.state === '승인완료'" depressed small color="green darken-1 white--text">승인완료</v-btn>
                  <v-btn v-if="item.state === '미확인'" depressed small color="error">미확인</v-btn>
                  <v-btn v-if="item.state === '확인'" depressed small color="green darken-1 white--text">확인</v-btn>
                  <v-btn v-if="item.state === '확인-대기'" depressed small color="orange darken-3 white--text">확인</v-btn>
                </v-list-item-content>
            <v-list-item-action>
            <v-list-item-action-text v-text="item.due"></v-list-item-action-text>
            <v-icon
              v-if="!item.favor"
              color="grey lighten-1"
              @click="showItem(item)"
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
              v-if="index > 1"
              ></v-divider>
          </div>
        </v-list>
      </template> 
      <ViewWork :works="works" /> 
    </v-dialog>
    <v-card-actions>
      <v-btn @click="myNext" text>더보기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
	import ViewWork from './ViewWork.vue'
	export default {
		components:{
			ViewWork,
		},
		props:{
      idx_title: undefined,
			jobs: undefined,
		},
		data(){
			return {
				viewWork: false,
        titles: ['요청작업', '처리할일', '보낸알림', '받은알림'],
        title: '',
        works: undefined,
			}
		},
    mounted(){
      var eve = 'closeViewWork'

      this.$store.state.bus.$on(eve, works => {       
          this.viewWork = false
      })
      
      var eve = 'initWorks'
      if(this.$store.getters.getMountedCheck.indexOf(eve) == -1){
        this.$store.commit('pushMountedCheck', eve)
        this.$store.state.bus.$on(eve, (data) => {
          console.log('initWorks ::: Preview.vue :::', this.idx_title, this.$store.state.idxJobs)
          this.$store.commit('initIdxJobs', this.idx_title)
          this.$store.commit('setJobs')
          console.log(this.$store.state.cur_jobs)
          this.jobs = this.$store.state.cur_jobs
        })
      }
      this.title = this.titles[this.idx_title]
      this.calcDue()
    },
		methods:{
      setWorks(idx){
        this.works = this.jobs[idx]
        this.$store.commit('initIdxWorks', idx)
        this.$store.commit('initIdxJobs', this.idx_title)
        console.log('jobs', this.jobs)
        this.$store.state.bus.$emit('openViewWork', this.works)
      },
			myNext(){
        this.$store.commit('initIdxJobs', this.idx_title)
				this.$router.push('/view')
			},		
      showItem(item){
        console.log('show Item!!!:', item)
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
        console.log('calcDue:::', this.jobs)
        this.jobs.forEach(x=>{
          if(x.flag_expired === false){
            //진행중인 경우만
            x.due = '- ' + String(this.getDiff(new Date().toISOString().substr(0, 10), x.endDate)) + ' days'
          }
          else
            x.due = 'expired'
          
        })
      },
		}
	}
</script>