<template>
  <span>Cat length {{ catLength }}</span>

  <div class="form-container">
    <form @submit.prevent="createEvent">
      <label>Select a category: </label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === event.category"
          >{{ option }}</option
        >
      </select>

      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" />

      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Description"
      />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" />

      <h3>When is your event?</h3>
      <label>Date</label>
      <input v-model="event.date" type="text" placeholder="Date" />

      <label>Time</label><br />
      <select v-model="event.time">
        <option v-for="time in times" :key="time">{{ time }}</option> </select
      ><br /><br />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  computed: {
    catLength() {
      return this.$store.getters.catLength
    }
    // ...mapState(['user', 'categories'])
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch('createEvent', this.event)
        .then(() => {
          this.$router.push({
            path: `/event/${this.event.id}`
          })
          this.event = this.createFreshEventObject()
        })
        .catch(error => {
          console.log(error, 'There some problems')
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: ''
      }
    }
  }
}
</script>
