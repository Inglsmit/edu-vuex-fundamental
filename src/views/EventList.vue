<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  created() {
    //1. dispatch Events
    this.$store.dispatch('fetchEvents')
  },
  // 2. get acces to event strore
  computed: mapState(['events'])
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
