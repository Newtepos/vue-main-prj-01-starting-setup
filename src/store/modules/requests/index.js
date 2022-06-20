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
    setMessage(state, payload) {
      state.messages = payload;
    },
  },
  actions: {
    async contactCoach(context, payload) {
      const newRequest = {
        // id: new Date().toISOString(),
        // coachID: payload.coachID,
        email: payload.email,
        message: payload.messages,
      };

      const resposne = await fetch(
        `https://vue-http-demo-869d8-default-rtdb.asia-southeast1.firebasedatabase.app/messages/${payload.coachID}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest),
        }
      );

      if (!resposne.ok) {
        const error = new Error(resposne.message || 'Failed to send message!');
        throw error;
      }

      const resposneData = await resposne.json();

      newRequest.id = resposneData.name;
      newRequest.coachID = payload.coachID;

      context.commit('addMessages', newRequest);
    },
    async loadMessage(context) {
      const coachId = context.rootState.userId;

      const response = await fetch(
        `https://vue-http-demo-869d8-default-rtdb.asia-southeast1.firebasedatabase.app/messages/${coachId}.json`
      );

      if (!response.ok) {
        const error = new Error(response.message || 'Failed to fetch message!');
        throw error;
      }

      const responseData = await response.json();

      const messages = [];

      for (const key in responseData) {
        const message = {
          id: key,
          coachID: coachId,
          email: responseData[key].email,
          message: responseData[key].message,
        };
        messages.push(message);
      }

      context.commit('setMessage', messages);
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
