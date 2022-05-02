// 페이지를 관리해주는 구성파일 -> router
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({

  history: createWebHashHistory(),
  // 스크롤 이동시 무조건 스크롤위 위치가 top : 0인 상태로 시작된다 (최상단)
  scrollBehavior() {
    return { top : 0 }
  },
  
  // 웹사이트의 하나의 페이지
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      // 보통 주소부분에서 특정 정보를 가지고있는 페이지로 접근을 했을때 id정보를 주소에서 추출해서 사용할 수 있다
      // 동적으로 변경될 수 있는 주소로 변경 -> :으로 시작하는 파라미터 이름 -> 파라미터 이름은 원하는 이름으로 정의한다
      // 정의한 이름을 가져와서 활용하는 방법은 -> 해당 라우터의 컴포넌트로 이동을 해서 정의한 이름으로 $route.params.정의한 이름 으로 활용할 수 있다
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})

