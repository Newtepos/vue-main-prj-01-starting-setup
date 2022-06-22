const authModule = {
  state: {
    userId: null,
    apiKey: 'AIzaSyAckKTgB9DqGRx8jYz-oO34OluHApSMexQ',
    token: null,
    tokenExpriation: null,
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpriation = payload.tokenExpriation;
    },
  },
  actions: {
    async login(context, payload) {
      const apiKey = context.state.apiKey;
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey} `,
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.error.message || 'Failed to authenticate.'
        );
        throw error;
      }

      console.log(response);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpriation: responseData.expiresIn,
      });
    },
    async signup(context, payload) {
      const apiKey = context.state.apiKey;
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey} `,
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.error.message || 'Failed to authenticate.'
        );
        throw error;
      }

      console.log(response);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpriation: responseData.expiresIn,
      });
    },
  },
};

export default authModule;
