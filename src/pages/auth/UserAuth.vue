<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occureed"
      @close="handleError"
      >{{ error }}</base-dialog
    >
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      enteredEmail: '',
      enteredPassword: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
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
    async submitForm() {
      //validation
      if (
        this.enteredEmail === '' ||
        !this.enteredEmail.includes('@') ||
        this.enteredPassword.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.enteredEmail,
        password: this.enteredPassword,
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
      } catch (err) {
        this.error = err.message || 'Failed to authentication..';
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
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
