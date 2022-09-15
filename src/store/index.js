import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TUOTIAO',
      reducer({ tokenObj, mychannels, historylist }) {
        return { tokenObj, mychannels, historylist }
      }
    })
  ],
  state: {
    tokenObj: {},
    mychannels: [],
    historylist: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    /**
     *
     * @param {Array} channels 添加或删除之后的新数组
     */
    SET_MY_CHANNELS(state, channels) {
      state.mychannels = channels
    },
    SET_HISTORYLIST(state, historylist) {
      state.historylist = historylist
    }
  }
})
