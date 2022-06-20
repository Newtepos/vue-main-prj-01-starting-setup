<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-if="hasRequests">
        <request-item
          v-for="req in receivedRequest"
          :key="req.id"
          :email="req.email"
          :message="req.message"
        >
        </request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: { RequestItem },
  computed: {
    receivedRequest() {
      return this.$store.getters['request/requests'];
    },
    hasRequests() {
      return this.$store.getters['request/hasRequests'];
    },
  },
  created() {
    this.loadMessages();
  },
  methods: {
    async loadMessages() {
      this.isLoading = true;
      await this.$store.dispatch('request/loadMessage');
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
