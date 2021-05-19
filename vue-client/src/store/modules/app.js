/**
 * App vuex module
 * Manages general functionality
 */

const state = {
  connection: null
}
const getters = {
  getConnection: state => state.connection,
  getIsConnected: state => !!state.connection
}
const mutations = {
  setConnection: (state, connection) => {
    state.connection = connection
  }
}
const actions = {
  // This is how I would connect to ws.js
  establishConnection({ commit, dispatch, getters }) {
    return new Promise(resolve => {
      const wsURL = 'ws://localhost:3000'
      const connection = new WebSocket(wsURL)
      connection.onerror = error => {
        console.log('onerror error', error)
      }
      connection.onclose = () => {
        commit('setConnection', null)
        const reconnect = setInterval(() => {
          if (getters.getConnection) {
            clearInterval(reconnect)
          } else {
            dispatch('establishConnection').then(() => {
              resolve()
              clearInterval(reconnect)
            })
          }
        }, 1000)
      }
      connection.onmessage = message => {
        const data = JSON.parse(message.data)
        if (data.id === 'get-cities') {
          commit('setData', data.data)
          // Setting unique criteria and cities from the data, used for filtering
          commit(
            'setAvailableCriteria',
            [...new Set(data.data.map(row => row.criteria))].sort()
          )
          commit(
            'setAvailableCities',
            [...new Set(data.data.map(row => row.city))].sort()
          )
          commit('setIsDataReceived', true)
        }
      }
      connection.onopen = () => {
        commit('setConnection', connection)
        resolve()
      }
    })
  },
  async sendConnectionMessage({ rootGetters, dispatch }, message) {
    try {
      const connection = getters.getConnection
      if (!connection || connection.readyState !== WebSocket.OPEN) {
        await dispatch('establishConnection')
      }
      connection.send(message)
    } catch (error) {
      dispatch('establishConnection')
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
