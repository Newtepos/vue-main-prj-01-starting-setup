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
      return context.dispatch('auth', {
        ...payload,
        mode: 'login',
      });
    },
    async signup(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup',
      });
    },
    async auth(context, payload) {
      const mode = payload.mode;
      const apiKey = context.state.apiKey;
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
      if (mode == 'signup') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.error.message || 'Failed to authenticate.'
        );
        throw error;
      }

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpriation: responseData.expiresIn,
      });
    },

    logout(context) {
      context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpriation: null,
      });
    },

    tryLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        context.commit('setUser', {
          token: token,
          userId: userId,
          tokenExpriation: null,
        });
      }
    },
  },
};

export default authModule;
