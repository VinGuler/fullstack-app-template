/**
 * Data vuex module
 * Manages the data in the app
 */

const state = {
  data: []
}
const getters = {
  getData: state => state.data
}

const mutations = {
  setData(state, data) {
    state.data = data
  }
}

const actions = {
  // REST API data handling
  async fetchData ({ commit }) {
    const response = await fetch('/get-data')
    const body = await response.json()
    const data = body.data
    commit('setData', data)
  },
  async updateData ({ dispatch }, data) {
    await fetch('/post-data', { method: 'POST', body: data, headers: { 'content-type': 'application/json' } })
    dispatch('fetchData')
  },
  // Socket.io data handling
  async fetchSocketData ({ dispatch }) {
    dispatch('sendConnectionMessage', { action: 'get-data' })
  },
  async updateSocketData ({ dispatch }, data) {
    dispatch('sendConnectionMessage', { action: 'post-data', payload: data })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
