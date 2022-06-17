import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:"/profilepicture"
    },
    {
      path: '/profilepicture',
      name:'profilepicture',
      component: () =>
          import ('../components/profilePicture/profilePicture')
    }
  ]
})
