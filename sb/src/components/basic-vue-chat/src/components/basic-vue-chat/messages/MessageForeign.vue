<template>
  <div
    class="message--foreign">
    <div class="message__author">
      {{ position }}
    </div>
    
    <div class="message__contents">
      <div v-if="convs.works">
        <WorkCard :convs="convs" />
      </div>
      <div v-else>
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt=""
        style="width: 100%" >
      {{ contents }}
    </div>
  </div>
    <div class="message__date">
      {{ date }}
    </div>
  </div>
</template>

<script>
  import WorkCard from './WorkCard.vue'
  export default {
    components: {
      WorkCard
    },
    name: 'MessageForeign',
    props: {
      position: {
        type: String,
        default: 'Person',
        required: false
      },
      date: {
        type: String,
        default: '16:30:00',
        required: false
      },
      imageUrl: {
        type: String,
        default: '',
        required: false
      },
      contents: {
        type: String,
        default: '',
        required: false
      },
      convs: {
      }
    }
  }
</script>

<style>

</style>
