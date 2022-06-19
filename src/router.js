import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetails.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import CoachList from './pages/coaches/CoachsList.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestedRecevied from './pages/requests/RequestsRecevied.vue';
import NotFound from './pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      children: [{ path: '/contact', component: ContactCoach }],
    },
    { path: '/register', component: CoachRegister },
    { path: '/requests', component: RequestedRecevied },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
