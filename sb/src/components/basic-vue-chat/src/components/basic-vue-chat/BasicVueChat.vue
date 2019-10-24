<template>
  <div
    class="basic-vue-chat"
    @click="setEmojiPickerToggle(false)">
    <section class="window">
      <header class="window__header__container">
        <slot name="header">
          {{ title }}
        </slot>
      </header>
      <section
        id="window__messages__container"
        class="window__messages__container">
        <slot>
          <messages-list
            :feed="feed"
            :author-id="authorId"
            class="messages-list" />
        </slot>
      </section>
      <div class="window__input__container">
        <slot name="input-container">
          <input-container
            :sel="title"
            :toggle-emoji-picker="toggleEmojiPicker"
            @newOwnMessage="setInput"
            @openEmojiPicker="onOpenEmojiPicker"
          />
        </slot>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { scrollToBottom } from '../../helpers/scroll.js'
import MessagesList from './messages/MessagesList.vue'
import InputContainer from './input/InputContainer.vue'
export default {
  name: 'BasicVueChat',
  components: {
    MessagesList,
    InputContainer,
  },
  props: {
    title: {
      type: String,
      default: 'Chat',
      required: false
    },
    initialAuthorId: {
      type: Number,
      default: 0,
      required: false
    },
    attachMock: {
      type: Boolean,
      default: false,
      required: false
    },
    initialFeed: {
      type: Array,
      default: function () {
        return []
      },
      required: false
    },
    newMessage: {
      type: Object,
      default: function () {
        return {}
      },
      required: false
    }
  },
  data: function () {
    return {
      feed: [],
      authorId : this.$store.getters.getUser.id,
      toggleEmojiPicker: false,
      to : ''
    }
  },
  watch: {
    newMessage: function (newValue, oldValue) {
      console.log('scrollbottom')
      this.pushToFeed(newValue)
      scrollToBottom()
    }
  },
  mounted () {
    if (this.attachMock) {
      import('./mocks/mock-messages-list.js')
        .then(mockData => {
          this.feed = mockData.default.feed
          this.setAuthorId(mockData.default.authorId)
        })
        .catch(error => {
          console.error('Failed to load mock data from file. ', error)
        })
    } else {
      this.feed = this.initialFeed
    }
    console.log('TTTTTTTTTTTTT')
    this.$store.commit('setTo', this.title)
    this.recvMsg()

    var convs  = []
    this.$store.state.others.forEach(x=>{
      if(x.position === this.title){
        convs = x.convs
      }
    })
    this.myPushFeed(convs)
  },
  created(){
  },
  methods: {
    myPushFeed(convs){
      this.feed = []
      console.log('myPushFeed', convs)
      convs.forEach(x=>{
        this.pushToFeed(x)
      })
    },
    recvMsg(){

      //복원 채팅메시지
      var eve = 'openChat'
      if(this.$store.getters.getMountedCheck.indexOf(eve) == -1){
        this.$store.commit('pushMountedCheck', eve)
        this.$store.state.bus.$on(eve,  (data)=>{
          console.log('call openChat', data)
          this.myPushFeed(data.convs)
        })
      }
      //지금 대화창 열린 사람
      var eve = 'setTo'
      if(this.$store.getters.getMountedCheck.indexOf(eve) == -1){
        this.$store.commit('pushMountedCheck', eve)
        this.$store.state.bus.$on(eve,  (data)=>{
          this.$store.commit('setTo', data.title)
        })
      }
      //작업 메시지 보내기
      var eve = 'work'
      if(this.$store.getters.getMountedCheck.indexOf(eve) == -1){
        this.$store.commit('pushMountedCheck', eve)
        this.$store.state.bus.$on(eve,  (data)=>{

        //수신자 배열을 루프돌아서 동일한 work 메시지를 전송시킨다.
        var selects = data.selects
        delete data['selects']
        var selDivisions = []
        var others = this.$store.getters.getOthers

        selects.forEach(ele=>{
          //보내는 대상이 부서면
          console.log('company_division :', this.$store.state.user)
          if(this.$store.state.user.company_division.indexOf(ele) != -1){
            //전체 유저 검색
              for(var i = 0; i<others.length; i++){
                if(others[i].division == ele){
                  this.setInput('', '', '', data, others[i].position)
                }
              }
                //나중에 또 안보내기 위해서 보낸 부서는 저장
              selDivisions.push(ele)
            }
        })
        //부서 설정이 아닌 사람 대상인 경우에 대해 보내기
        selects.forEach(ele=>{
            if(selDivisions.indexOf(ele) != -1){
            }else{
              this.setInput('', '', '', data, ele)
            }
        })
      })
      }
    },
    setInput(message, image, imageUrl, works, to){
      const msg = {
        id: this.authorId,
        position: this.$store.getters.getUser.position,
        contents: message,
        image: image,
        imageUrl: imageUrl,
        date: moment().format('HH:mm:ss'),
        works: works
      }

      if(to === undefined){
        to = this.title
      }
      const header = {
        to : to,
        from : this.$store.getters.getUser.position
      }
      if(works != undefined)
        works.works_id = msg.date
      var data = {msg: msg, header: header}
      if(works != undefined)
        this.$store.commit('sendAddWorks', data)
      
      this.$store.state.sock.emit('msg', data)

      if(to === this.title){
        this.onNewOwnMessage(msg)
      }
    },
    setEmojiPickerToggle (toggle) {
      this.toggleEmojiPicker = toggle
    },
    pushToFeed (element) {
      this.feed.push(element)
      setTimeout(()=>{
        scrollToBottom()
      }, 20)
    },
    onNewOwnMessage (msg) {
      console.log('onNewMsg', msg)
			this.$store.commit('pushMsg', {msg: msg, header: { from: this.title, to: this.$store.state.user.position }})
      this.pushToFeed(msg)
    },
    onOpenEmojiPicker (toggle) {
      this.setEmojiPickerToggle(toggle)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/main.scss";
</style>
