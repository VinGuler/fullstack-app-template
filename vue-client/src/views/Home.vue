<template>
  <div class="view-container center-content">
    <h1>Welcome Home {{ username }}</h1>
    <div class="message-container" v-for="message in messages" :key="message.id">{{ message.user }} {{ message.content }}</div>
    <div>
      <textarea v-model="message" />
      <button @click="sendMessage">send</button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Home',
    data() {
      return {
        message: '',
        messages: []
      }
    },
    computed: {
      ...mapGetters(['getUser']),
      username() {
        return this.getUser.username || '-not conntected yet-'
      }
    },
    methods: {
      sendMessage() {
        this.$socket.emit('send-message', this.message)
      }
    },
    sockets: {
      getMessages({ messages }) {
        this.messages = messages
      }
    },
    created() {
      this.$socket.emit('get-messages')
    }
  }
</script>

<style lang="scss">
  .message-container {
    border: 1px solid black;
    padding: 0.5rem;
  }
</style>
