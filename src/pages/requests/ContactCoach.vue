<template>
  <form @submit.prevent="sendMessage">
    <div class="form-control">
      <label for="email">Your Email</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Your Message</label>
      <textarea id="message" rows="5" v-model.trim="messages"></textarea>
    </div>
    <p class="errors" v-if="!formisValid">
      Please enter valid email and non-empty messages.
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      messages: '',
      formisValid: true,
    };
  },
  methods: {
    sendMessage() {
      this.formisValid = true;
      //Validation
      if (
        this.email == '' ||
        !this.email.includes('@') ||
        this.messages === ''
      ) {
        this.formisValid = false;
        return;
      }
      const newRequest = {
        coachID: this.$route.params.id,
        email: this.email,
        messages: this.messages,
      };

      console.log(newRequest);
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
