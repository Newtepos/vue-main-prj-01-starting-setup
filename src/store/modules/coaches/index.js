const coachesModules = {
  namespaced: true,
  state() {
    return {
      fetchTime: null,
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
    setCoach(state, payload) {
      state.coaches = payload;
    },
    setFetchTime(state) {
      state.fetchTime = new Date().getTime();
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

      const token = context.rootGetters.token;

      const response = await fetch(
        `https://vue-http-demo-869d8-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${coachId}.json?auth=` +
          token,
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
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdateCoach) {
        return;
      }

      const response = await fetch(
        `https://vue-http-demo-869d8-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
      );

      if (!response.ok) {
        const error = new Error(response.message || 'Failed to fetch!');
        throw error;
      }

      const coachesData = await response.json();
      const coaches = [];
      for (const key in coachesData) {
        const coachData = {
          id: key,
          firstName: coachesData[key].firstName,
          lastName: coachesData[key].lastName,
          areas: coachesData[key].areas,
          description: coachesData[key].description,
          hourlyRate: coachesData[key].hourlyRate,
        };

        coaches.push(coachData);
      }

      context.commit('setCoach', coaches);
      console.log('new Fetch');
      context.commit('setFetchTime');
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
    shouldUpdateCoach(state) {
      const lastFetchTime = state.fetchTime;
      if (!lastFetchTime) {
        return true;
      }
      const currentTime = new Date().getTime();

      return (currentTime - lastFetchTime) / 1000 > 60;
    },
  },
};

export default coachesModules;
