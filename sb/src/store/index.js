import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
Vue.use(Vuex)

export default new Vuex.Store({

	state: {
		url_sock : 'localhost:8082',
		url_axios : 'http://localhost:3000',
		period: '2019-10-25~2019-11-21',
		mountedCheck: [],
		bus: new Vue(),
		tk: undefined,
		idxJobs: 0,
		idxWorks: 0,
		cur_jobs: undefined,
		cur_works: undefined,
		cur_to : undefined,
		sock: undefined,
		others:[{
				image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
				position: '체계과장',
				division: '체계과',
				active_work : false,
				active_notice : false,
				active_message : false,
				convs: [],
			},{
				image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
				position: '정보보호병',
				division: '체계과',
				active_work : false,
				active_notice : false,
				active_message : false,
				convs: [],
			},{
				image: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
				position: '군수과장',
				division: '군수과',
				active_work : false,
				active_notice : false,
				active_message : false,
				convs: [],
			},{
				image: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
				position: '군수계원',
				division: '군수과',
				active_work : false,
				active_notice : false,
				active_message : false,
				convs: [],
			},{
				image: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
				position: '계획과장',
				division: '계획운용과',
				active_work : false,
				active_notice : false,
				active_message : false,
				convs: [],
			},{
				image: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
				position: '본부중대장',
				division: '본부중대',
				active_work : false,
				active_notice : false,
				active_message : false,
				convs: [],
			},{
				image: 'https://cdn.vuetifyjs.com/images/lists/6.jpg',
				position: '인사과장',
				division: '인사과',
				active_work : false,
				active_notice : false,
				active_message : false,
				convs: [],
			}],
			user : undefined,
			user_test: {
				id: 'test',
				position: '체계과장',
				company_division : ['체계과', '인사과', '계획과', '본부중대', '군수과'],
				works:{
				toWork: [{
					works_id : '08:22:23',
					by_id : 'test',
					state: '미제출',
					title: '창고 재고파악',
					contents: '장비 분류하여 재고정리 후 한글파일로 제출할 것',
					startDate: '2019-10-27',
					endDate: '2019-11-06',
					file_up: '',
					file_down: '',
					flag_expired: false,
					notice: false,
					to: [{
						position: '정보보호병',
						state: '미제출',
						avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
						flag_upload: false,
						sendDate: '',
						comment: undefined,
						file_up: '',
						file_down: '',
						favor: false,
					},
					{
						position: '군수과장',
						state: '미제출',
						avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
						flag_upload: false,
						sendDate: '',
						comment: undefined,
						file: '',
						favor: false,
					}], 
				}],
				fromWork: [{  					
				}],
				toNotice: [{
					works_id : '10:22:23',
					by_id : 'test',
					state: '미확인',
					title: '사이버보안 점검 기간',
					contents: '사이버보안 점검 기간입니다. 정밀검사 실시하세요',
					startDate: '2019-10-20',
					endDate: '2019-10-29',
					file_up: '',
					file_down: '',
					flag_expired: false,
					notice: true,				
					to: [{
						position: '군수과장',
						avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
						flag_upload: false,
						sendDate: '2019-10-20',
						comment: undefined,
						file_up: '',
						file_down: '',
						state: '미확인',
						favor: true,
					},{
						position: '정보보호병',
						avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
						flag_upload: false,
						sendDate: '2019-10-20',
						comment: undefined,
						file_up: '',
						file_down: '',
						state: '미확인',
						favor: true,
					}
					], 
				}],
				fromNotice: [{
				}],
				}
				},//user
			user_test2: {
					id: 'test2',
					company_division : ['체계과', '인사과', '계획과', '본부중대', '군수과'],
					position: '정보보호병',
					works:{
					toWork: [{		
					}],
					fromWork: [{
						works_id : '08:22:23',
						by_id : 'test',
						state: '미제출',
						title: '창고 재고파악',
						contents: '장비 분류하여 재고정리 후 한글파일로 제출할 것',
						startDate: '2019-10-27',
						endDate: '2019-11-06',
						file_up: '',
						file_down: '',
						flag_expired: false,
						notice: false,
						to: [{
							position: '체계과장',
							state: '미제출',
							avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
							flag_upload: false,
							sendDate: '',
							comment: undefined,
							file_up: '',
							file_down: '',
							favor: false,
						}],
					}],
					toNotice: [{   
					}],
					fromNotice: [{
						works_id : '10:22:23',
						by_id : 'test',
						state: '미확인',
						title: '사이버보안 점검 기간',
						contents: '사이버보안 점검 기간입니다. 정밀검사 실시하세요',
						startDate: '2019-10-20',
						endDate: '2019-10-29',
						file_up: 'sss.jpg',
						file_down: 'pic.png',
						flag_expired: false,
						flag_upload: true,	
						notice: true,			
						to: [{
							position: '체계과장',
							avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
							flag_upload: false,
							sendDate: '2019-10-20',
							comment: undefined,
							file_up: '',
							file_down: '',
							state: '미확인',
							favor: true,
						}], 
					}],
				},
			},//user		
				user_test3: {
					id: 'test3',
					position: '군수과장',
					company_division : ['체계과', '인사과', '계획과', '본부중대', '군수과'],
					works:{
					toWork: [{ 				
					}],
					fromWork: [{
						works_id : '08:22:23',
						by_id : 'test',
						state: '미제출',
						title: '창고 재고파악',
						contents: '장비 분류하여 재고정리 후 한글파일로 제출할 것',
						startDate: '2019-10-27',
						endDate: '2019-11-06',
						file_up: '',
						file_down: '',
						flag_expired: false,
						notice: false,
						to: [{
							position: '체계과장',
							state: '미제출',
							avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
							flag_upload: false,
							sendDate: '',
							comment: undefined,
							file_up: '',
							file_down: '',
							favor: false,
						}],
					}],
					toNotice: [{          
					}],
					fromNotice: [{
						works_id : '10:22:23',
						by_id : 'test',
						state: '미확인',
						title: '사이버보안 점검 기간',
						contents: '사이버보안 점검 기간입니다. 정밀검사 실시하세요',
						startDate: '2019-10-20',
						endDate: '2019-10-29',
						file_up: '',
						file_down: '',
						flag_expired: false,	
						notice: true,			
						to: [{
							position: '체계과장',
							avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
							flag_upload: false,
							sendDate: '2019-10-20',
							comment: undefined,
							file_up: '',
							file_down: '',
							state: '미확인',
							favor: false,
						}],     				
					}],
			},
		},	 //user   		
	},
	mutations: {
		initPeriod(state, period){
			state.period = period
		},
		setJobs(state){
			var jobs = undefined
			switch(state.idxJobs){
				case 0:
				  jobs = state.user.works.toWork
				  break
				case 1:
				  jobs = state.user.works.fromWork
				  break
				case 2:
				  jobs = state.user.works.toNotice
				  break
				case 3:
				  jobs = state.user.works.fromNotice
				  break
			  }
			  state.cur_jobs = jobs
			  console.log('setJobs:', state.cur_jobs)
		},
		setWorks(state){
			var jobs = undefined
			switch(state.idxJobs){
				case 0:
				  jobs = state.user.works.toWork
				  break
				case 1:
				  jobs = state.user.works.fromWork
				  break
				case 2:
				  jobs = state.user.works.toNotice
				  break
				case 3:
				  jobs = state.user.works.fromNotice
				  break
			  }
			  state.cur_works = jobs[state.idxWorks]
		},
		pushMountedCheck(state, eve){
			state.mountedCheck.push(eve)
		},
		initUser(state, data){
			//소켓 초기화
			state.sock = io(state.url_sock)
			//소켓 세팅
			//업데이트 works
			state.sock.on('works_update', (works_frame)=>{
				console.log('works_update!!!')
				var key = ''
				var idx = -1
				if(works_frame.header.to != state.user.position)
					return console.log('나한테 온거 아님:', works_frame)
				if(works_frame.works.notice){
					console.log('notice')
					if(works_frame.works.by_id === state.user.id){
						var i = 0
						key = 'toNotice'
						state.user.works.toNotice.forEach(x=>{
							if(x.works_id === works_frame.works.works_id){
								x.to.forEach(y=>{
									if(y.position === works_frame.header.from){
										y.state = works_frame.works.state
										y.file_up = works_frame.works.file_up
										y.file_down = works_frame.works.file_down
										y.flag_upload = works_frame.works.flag_upload
										y.comment = works_frame.works.comment
										y.sendDate =new Date().toISOString().substr(0, 10)
										idx = i
									}
								})
							}
							i++
						})
					}
					else{
						var i = 0
						key = 'fromNotice'
						state.user.works.fromNotice.forEach(x=>{
							if(x.works_id === works_frame.works.works_id){
								works_frame.works.to.forEach(y=>{
									if(y.position === state.user.position){
										idx = i
										x.state = y.state
										x.comment = y.comment
										x.file_up = y.file_up
										x.file_down = y.file_down
										x.flag_upload = y.flag_upload
										x.sendDate = new Date().toISOString().substr(0, 10)
									}
								})
							}
							i++
						})
					}
				}
				else{
					if(works_frame.works.by_id === state.user.id){
						console.log('work')
						var i = 0
						key = 'toWork'
						state.user.works.toWork.forEach(x=>{
							if(x.works_id === works_frame.works.works_id){
								x.to.forEach(y=>{
									if(y.position === works_frame.header.from){
										
										y.state = works_frame.works.state
										y.file_up = works_frame.works.file_up
										y.file_down = works_frame.works.file_down
										y.flag_upload = works_frame.works.flag_upload
										y.comment = works_frame.works.comment
									
										y.sendDate = new Date().toISOString().substr(0, 10)
										idx = i
									
									}
								})
							}
							i++
						})
					}
					else{
						var i = 0
						key = 'fromWork'
						state.user.works.fromWork.forEach(x=>{
							if(x.works_id === works_frame.works.works_id){
								works_frame.works.to.forEach(y=>{
									if(y.position === state.user.position){
										idx = i
										x.state = y.state
										x.comment = y.comment
										x.file_up = y.file_up
										x.file_down = y.file_down
										x.flag_upload = y.flag_upload
										console.log('x.comment ::', x.comment)
										x.sendDate = new Date().toISOString().substr(0, 10)
									}
								})
							}
							i++
						})
					}
					console.log('updateWorks ! : ', state.user.works[key][idx])
					//ViewWork 업데이트
					//ViewWork가 활성화된 상태이므로
					state.bus.$emit('openViewWork', state.user.works[key][idx])
					//나머지 업데이트
					state.bus.$emit('initWorks')

				}
			})
			//add works
			state.sock.on('works_add', (data)=>{
				console.log('check this:::store.js', this)
				this.commit('addWorks', data)
			})
			//유저정보 초기화
			if(data.id === 'test') //체계과장
				state.user = state.user_test
			else if(data.id === 'test2')
				state.user = state.user_test2
			else
				state.user = state.user_test3
		},
		addWorks(state, data){
			var jobs = []
			var works = data.msg.works
			var msg_state = ''
			var to = ''
			var from = ''
			console.log('header ::: store.js :::', data)
			//내가 받은거거나 보낸거
			if(!(data.header.to === state.user.position || data.header.from === state.user.position))
				return console.log('나한테 온거 아님:', data)
			if(data.msg.works.notice){
				console.log('notice')
				if(data.msg.works.by_position=== state.user.position){
					console.log('111111111111111111111')
					jobs = state.user.works.toNotice
					msg_state = '미확인'
					to = data.header.to
					from = data.header.from
				}
				else{
					console.log('222222222222222')
					jobs = state.user.works.fromNotice
					msg_state = '미확인'
					to = data.header.from
					from = data.header.to
				}
			}
			else{
				console.log('works')
				if(data.msg.works.by_position === state.user.position){
					console.log('111111111111111111111')
					jobs = state.user.works.toWork
					msg_state = '미제출'
					to = data.header.to
					from = data.header.from
				}
				else{
					console.log('22222222222222222222222')
					jobs = state.user.works.fromWork
					msg_state = '미제출'
					to = data.header.from
					from = data.header.to
				}
			}

			//검색
			var ret = 0
			var i = 0
			for(i = 0; i<jobs.length; i++){
				if(jobs[i].works_id === works.works_id){
					console.log('있는 작업임', jobs[i])
					ret = 1
					break
				}
			}

			if(ret === 0){
				//없으면 새로추가
				var newWork = {
					works_id : works.works_id,
					by_id: works.by,
					by_position : works.by_position,
					state: msg_state,
					title: works.title,
					contents: works.contents,
					startDate: works.startDate,
					endDate: works.endDate,
					file_up: works.file_up,
					file_down: works.file_down,
					flag_upload : works.flag_upload,
					flag_expired : false,
					notice: works.notice,
					to: [{
						position: to,
						state: msg_state,
						avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
						flag_upload: false,
						sendDate: '',
						comment: undefined,
						file_up: '',
						file_down: '',
						favor: false,
					}],
				}
				console.log('새로추가하는데 파일 있나?:', newWork)
				jobs.push(newWork)
				console.log('새로 추가함 ', jobs)
			}
			else{
				//있으면 to만 추가
				jobs[i].to.push({
					position: to,
					state: msg_state,
					avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
					flag_upload: false,
					sendDate: '',
					comment: undefined,
					file_up: '',
					file_down: '',
					favor: false,
				})
				console.log('to만 추가함', jobs)
			}
			
			this.commit('checkMsg')
		},
		delToken (state) {
			state.tk = null
		},
		setToken(state){
			state.tk = localStorage.getItem('tk')
		},
		setTo(state, to){
			state.cur_to = to
		},
		initIdxJobs(state, idx){
			state.idxJobs = idx
		},
		initIdxWorks(state, idx){
			state.idxWorks = idx
		},
		sendUpdateWorks(state, data){
			//업데이트는 send할 때 이미 되있으므로
			//소켓에 전송만
			//즐겨찾기 같은 혼자만 갖는 특성은 return
			if(data.to === undefined)
				return
			console.log('sendUpdateWorks : ', {state: state, data: data})
			var works_frame = {header: {to : data.to, from: state.user.position}, works: data.works}
			state.sock.emit('works_update', works_frame)
		},
		sendAddWorks(state, data){
			//로컬 works에 추가
			this.commit('addWorks', data)
			//다른애들 소켓에 전송
			state.sock.emit('works_add', data)
		},
		checkMsg(state, frame_msg){
			var i =0
			console.log('checkMsg!!!!', frame_msg)
			if(frame_msg != undefined){
				state.others.forEach(x=>{
					if(x.position === frame_msg.header.from){
						x.active_message = true
						console.log(x)
					}
				})

				return
			}
			state.user.works.fromWork.forEach(x=>{
				if(x.to != undefined){
					
					state.others.forEach(y=>{
						console.log('others111', y)
						if(y.position === x.to[0].position && x.flag_expired === false){
							y.active_work = true
						}
						i++
					})
				}
			})
			i=0
			state.user.works.fromNotice.forEach(x=>{
				if(x.to != undefined){
					state.others.forEach(y=>{
						console.log('others222', y)
						if(y.position === x.to[0].position && x.flag_expired === false){
							y.active_notice = true
						}
					})
				}
			})
		},
		pushMsg(state, data){
			console.log('pushMsg :: store.js', data)
			var i = 0
			var idx = -1
			state.others.forEach(x=>{
				if(x.position === data.header.from){
					console.log('before ::', state.others[i], i)
					console.log('msg 저장함', x)
					x.convs.push(data.msg)
					idx = i
				}
				i++
			})
			console.log('after ::', state.others[idx], i)
		},
	},
	actions: {
		
	},
	modules: {
		
	},
	getters: {
		getUser(state){
			return state.user
		},
		getOthers(state){
			return state.others
		},
    	getIdxView(state){
			return state.idxView
		},
		getMountedCheck(state){
			return state.mountedCheck
		},
		getCurWorks(state){
			return state.cur_works
		},
		getCurJobs(state){
			return state.cur_Jobs
		},
		getIdxJobs(state){
			return state.idxJobs
		}
	},
})
