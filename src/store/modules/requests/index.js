const requestModule = {
  namespaced: true,
  state() {
    return {
      messages: [],
    };
  },
  mutations: {
    addMessages(state, payload) {
      state.messages.push(payload);
    },
  },
  actions: {
    contactCoach(context, payload) {
      const newRequest = {
        id: new Date().toISOString(),
        coachID: payload.coachID,
        email: payload.email,
        message: payload.messages,
      };

      context.commit('addMessages', newRequest);
    },
  },
  getters: {
    requests(state) {
      return state.messages;
    },
    hasRequests(state) {
      return state.messages && state.messages.length > 0;
    },
  },
};

export default requestModule;
