// // import { createRouter, createWebHistory } from 'vue-router';
// import VueRouter from 'vue-router'
// import RegisterComponent from '../components/auth/RegisterComponent.vue'
// const router = new VueRouter({
//   routes: [
//     // dynamic segments start with a colon
//     { path: '/register', component: RegisterComponent,name:'register'}
//   ]
// })

// export default router;

import RegisterComponent from '../components/auth/RegisterComponent.vue'

export default[
  {path: '/register', component: RegisterComponent,name:'register'}
]
