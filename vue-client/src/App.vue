<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('fetchSocketData')
    this.$socket.emit('get-data', { data: 'data' })
    this.$socket.on('get-data', (data) => {
      console.log('get-data', data)
    })
  }
}
</script>


