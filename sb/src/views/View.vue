<template>
  <v-card>
    <v-tabs
      v-model="$store.state.idxJobs"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

        <v-tab 
        v-for="(item,idx) in tabs"
        :key="item"
        @click="setWorks(idx)"
        >
        {{ item.title }}
        <v-icon>{{item.icon}}</v-icon>
      </v-tab>
      </v-tabs>

    <v-tabs-items v-model="$store.state.idxJobs">
      <v-tab-item
        v-for="(item, idx) in tabs"
        :key="item"
      >
          <ViewParts :jobs="jobs"/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
	import ViewParts from './ViewParts.vue'
	export default{
    components:{
      ViewParts,
    },
    props:{
    },
		data(){
			return {
                tab: null,
                tabs: [{
                  title:'요청작업', 
                  icon: 'call_made',
                },{
                  title:'받은작업', 
                  icon: 'call_received',
                },
                {
                  title:'보낸알림', 
                  icon: 'call_made',
                },{
                  title:'받은알림', 
                  icon: 'call_received',
                }
                ],
		        jobs: undefined,
			}
		},
    mounted(){
      this.setWorks(this.$store.getters.getIdxJobs)
    },
    methods: {
      setWorks(idx){
        console.log('setWorks :::', idx)
        switch(idx){
          case 0:
            this.jobs = this.$store.getters.getUser.works.toWork
            break
          case 1:
            this.jobs = this.$store.getters.getUser.works.fromWork
            break
          case 2:
            this.jobs = this.$store.getters.getUser.works.toNotice
            break
          case 3:
            this.jobs = this.$store.getters.getUser.works.fromNotice
            break
        }
        console.log('jobs: ', this.jobs)
      var eve = 'setViewParts'
        this.$store.state.bus.$emit(eve, this.jobs)
      },
    },
	}
</script>
