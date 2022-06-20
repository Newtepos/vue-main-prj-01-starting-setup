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
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      return state.messages.filter((req) => req.coachID === coachId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};

export default requestModule;
