/**
 * Data vuex module
 * Manages the data in the app
 */

const state = {
  user: {},
  messages: []
}
const getters = {
  getUser: state => state.user,
  getMessages: state => state.messages
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setMessages(state, messages) {
    state.messages = messages
  }
}

const actions = {
  // REST API data handling
  async fetchUser ({ commit }) {
    const response = await fetch('http://localhost:3000/get-user')
    const body = await response.json()
    const data = body
    console.log('data', data)
    commit('setUser', data)
  },
  async updateUser ({ dispatch }, payload) {
    await fetch('/update-user', { method: 'POST', body: payload, headers: { 'content-type': 'application/json' } })
    dispatch('fetchUser')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
