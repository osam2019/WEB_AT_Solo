<template>
	<v-card color="#EC7865">

		<div v-if="!convs.works.notice" class="overline mb-4">
			<div v-if="convs.date != convs.works.flag_date">
				<v-icon>work</v-icon>작업요청
			</div>
			<div v-else>
				<v-icon>work</v-icon>작업요청
			</div>
		</div>
		<div v-else class="overline mb-4">
			<v-icon>notification_important</v-icon>알림</div>
		<v-card-title class="mx-auto">{{convs.works.title}}</v-card-title>
        <v-card-actions>
        <v-dialog v-model="viewWork" width="1000px"  justify="center">
        <template v-slot:activator="{ on:dial }">
            <v-btn color="deep-purple accent-4" v-on="dial" @click="setThisWork()" text>더보기</v-btn>
             </template> 
           <ViewWork  :period="period" /> 
    </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script>
	import ViewWork from './ViewWork.vue'
	export default{
		components:{
			ViewWork,
		},
		props:{
			convs: {},
			goings: undefined,
			idx_sep: undefined,
		},
		data(){2
			return {
				viewWork: false,
				btnColor: '#EC7865',
				btnMsg: '',
				thisJob: undefined,
				period: undefined,
			}
		},
		mounted(){
			var eve = 'closeViewWork'
			this.$store.state.bus.$on(eve,  (idx)=>{
			    this.viewWork = false
			})
		},
		methods:{
			setThisWork(){
				this.$store.commit('find_work', this.convs)
				this.period = this.convs.works.startDate + '~' + this.convs.works.endDate
			},
			showState(){
				console.log(this.convs)
			},
		},
	}
</script>