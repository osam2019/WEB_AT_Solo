<template>
	<v-container>
	<v-system-bar dark color="indigo darken-2">
		<v-dialog v-model="dialog" scrollable max-width="300px">
		    <template v-slot:activator="{ on }">
		    	<v-row align="start" justify="start">

		    			<div
		    			v-for="(x, idx) in rooms"
		    			>

							<v-btn 
								class="md-4"
								height="20px"
							>
		   						<div v-on="on">
									<v-icon>mdi-message</v-icon>
									{{x}}&nbsp;	
								</div>
								<v-icon @click="closeRoom(idx)">close</v-icon>					
							</v-btn>

						

						&nbsp;
					</div>
					</v-row>
			</template>
		</v-dialog>
		<div class="flex-grow-1"></div>
		<v-icon>mdi-wifi-strength-4</v-icon>
		<v-icon>mdi-signal-cellular-outline</v-icon>
		<v-icon>mdi-battery</v-icon>
		<span>12:30</span>
	</v-system-bar>
</v-container>
</template>

<script>
	import Chat from '../components/basic-vue-chat/src/components/basic-vue-chat/BasicVueChat.vue'
  	export default {
	    components: {
	    	Chat
	    },/*
	    props: {
	    	openDial: {
	    		type: Number,
	    		default: 0,
	    		required: false
	    	}
	    },*/
	    data: () => {
	    	return {
	    		to : '',
				dialog: false,
				rooms: ['체계과장', '군수과장']
	    	}
	  	},
		mounted(){
			//add Room 은 보류
		},
	  	methods:{
	  		closeRoom(idx){
	  			this.rooms.splice(idx, 1)
	  		}
	  	}
	}
</script>