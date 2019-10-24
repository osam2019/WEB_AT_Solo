<template>
<v-container>

	<v-row 
		row wrap
	>
		<v-col
			cols="9"
		>
			<v-container>
			<!--
				<v-row row wrap>
					<v-col cols="6">
						<Preview :jobs="$store.state.user.works.fromWork" :idx_title="idx2"/>
					</v-col>
					<v-col cols="6">
						<Preview :jobs="$store.state.user.works.toWork" :idx_title="idx"/>
					</v-col>
					<v-col cols="6">
						<Preview :jobs="$store.state.user.works.fromNotice" :idx_title="idx4"/>
					</v-col>
					<v-col cols="6">
						<Preview :jobs="$store.state.user.works.toNotice" :idx_title="idx3"/>
					</v-col>					
				</v-row>
				-->
				
		<v-row 
		row wrap
		>
			<v-col>
				<Preview :jobs="$store.state.user.works.fromWork" :idx_title="idx2"/>
			</v-col>
			<v-col>
				<Preview :jobs="$store.state.user.works.toWork" :idx_title="idx"/>
			</v-col>

			<v-col>
				<Preview :jobs="$store.state.user.works.fromNotice" :idx_title="idx4"/>
			</v-col>

			<v-col>
				<Preview :jobs="$store.state.user.works.toNotice" :idx_title="idx3"/>
			</v-col>
		</v-row>
	</v-container>
		</v-col>	
		<v-col 
		cols="3"
		>
		<v-row row wrap>
		<List />
		</v-row>
		</v-col>
	</v-row>
	
</v-container>
</template>
<script>
	import Preview from './Preview.vue'
	import List from './List.vue'
	import Bar from './Bar.vue'
	export default{
		name: 'App',
		components: {
			List,
			Bar,
			Preview,
		},
		data: function (){
			return {
				idx: 0,
				idx2: 1,
				idx3: 2,
				idx4: 3,		
			}
		},
		mounted(){
			this.$store.state.sock.on('msg', data =>{
			//단순 메시지 수신 처리
			console.log('메시지 받음!', data)
			if(data.header.to === this.$store.getters.getUser.position){
				if(data.header.from === this.$store.state.cur_to){
					//채팅값에 입력
					console.log('msg 푸쉬함 ')

					var convs = []
					this.$store.commit('pushMsg', data)
					this.$store.state.others.forEach(x=>{
						console.log(x)
						if(x.position === data.header.from)
							convs = x.convs
					})
					console.log('msg 푸쉬함 ', convs.push(data.msg))
					this.$store.state.bus.$emit('openChat', {convs : convs})
					
				}
				else{
					this.$store.commit('pushMsg', data)
					console.log('convs: ', this.$store.state.others)
				}
			}
		})
		},
		methods: {			
		}
	};
</script>
