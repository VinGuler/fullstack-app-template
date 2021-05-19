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
  created () {
    this.$store.dispatch('fetchUser')
  }
}
</script>

<style lang="scss">

</style>

