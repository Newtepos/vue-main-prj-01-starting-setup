<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="registerCoach"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: { CoachForm },
  methods: {
    registerCoach(formData) {
        this.$store.dispatch('coaches/coachesRegister', formData);
    },
  },
};
</script>
