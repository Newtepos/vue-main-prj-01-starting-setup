<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="enteredEmail" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="enteredPassword" />
      </div>
      <p v-if="!formIsValid">
        Please enter a valid email and password must be at least 6 character
        long
      </p>
      <base-button>{{ actionButtonWording }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{
        switchButtonWording
      }}</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      enteredEmail: '',
      enteredPassword: '',
      formIsValid: true,
      mode: 'login',
    };
  },
  computed: {
    actionButtonWording() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchButtonWording() {
      if (this.mode === 'login') {
        return 'Signup Instead..';
      } else {
        return 'Login Instead..';
      }
    },
  },
  methods: {
    submitForm() {
      //validation
      if (
        this.enteredEmail === '' ||
        !this.enteredEmail.includes('@') ||
        this.enteredPassword.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      //http request
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  /* border: 1px solid #ccc; */
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 1.5rem 0;
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
</style>
