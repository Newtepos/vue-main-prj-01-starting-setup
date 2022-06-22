import { createStore } from 'vuex';
import coachesModules from './modules/coaches/index.js';
import requestModules from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    coaches: coachesModules,
    request: requestModules,
    auth: authModule,
  },
});

export default store;
