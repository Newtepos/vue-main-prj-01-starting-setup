const coachesModules = {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations: {
    addCoach(state, payload) {
      state.coaches.push(payload);
    },
  },
  actions: {
    async coachesRegister(context, payload) {
      const coachId = context.rootGetters.userId;

      const coacheDetail = {
        firstName: payload.first,
        lastName: payload.last,
        areas: payload.areas,
        description: payload.desc,
        hourlyRate: payload.rate,
      };

      const response = await fetch(
        `https://vue-http-demo-869d8-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${coachId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(coacheDetail),
        }
      );

      if (!response.ok) {
        //error handling
      }

      context.commit('addCoach', coacheDetail);
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some((coach) => coach.id === userId);
    },
  },
};

export default coachesModules;
