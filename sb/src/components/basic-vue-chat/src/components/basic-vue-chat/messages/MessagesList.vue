<template>
  <transition-group
    name="messages-list"
    tag="div">
    <div
      v-for="(message, index) in feed"
      :key="index"
      class="messages-list-item">

      <message-own
        v-if="message.id === authorId"
        :date="message.date"
        :image-url="message.imageUrl"
        :contents="message.contents"
        :convs="message" />
      <message-foreign
        v-else
        :position="message.position"
        :date="message.date"
        :image-url="message.imageUrl"
        :contents="message.contents"
        :convs="message" />
    </div>
  </transition-group>
</template>

<script>
import MessageOwn from './MessageOwn.vue'
import MessageForeign from './MessageForeign.vue'

export default {
  name: 'MessagesList',
  components: {
    MessageOwn,
    MessageForeign
  },
  props: {
    feed: {
      type: Array,
      default: function () {
        return []
      },
      required: false
    },
    authorId: {
      type: String,
      default: undefined,
      required: false
    }
  },
  mounted(){
    this.authorId = this.$store.getters.getUser.id
  }
}
</script>

<style lang="scss" scoped>

</style>
