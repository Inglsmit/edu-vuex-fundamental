import { createStore } from 'vuex'
import EventService from '../services/EventService'

export default createStore({
  state: {
    user: { id: '203', name: 'Its me' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    // 4. set event to state
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    //3. call fetch event
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  },
  modules: {}
})
