<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div class="nav-item" v-for="nav in navigations" :key="nav.name">
        <RouterLink :to="nav.href" active-class="active" class="nav-link" :class="{ active: isMatch(nav.path)}">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <!-- RouterLink말고도 페이지 이동을 해줄수 있는 방법은 있다 ex) @click event -->
    <div @click="toAbout" class="user">
      <span></span>
    </div>
  </header>
</template>


<script>
import { mapState } from 'vuex'
// logo
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          // 동적으로 변경하기 위해 이 부분도 변경해야한다
          // 여기에 적은 tt4520988값은 아무것도 선택이 안될경우 기본값으로 넣기위해 적어줬다
          href: '/movie/tt4520988',
          // 기본값을 선택할때만 movie부분이 active가 활성화되는 문제로 옵션값을 하나 더 추가해준다
          path: /^\/movie/ // movie로 시작하는 부분을 일치시킨다
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapState('about',[
      'image',
      'name'
    ])
  },
  methods: {
    isMatch(path) {
      if(!path) return false
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      // $route - 프로젝트 페이지에 대한 정보를 가지고있다
      // $router - push()라는 메소드를 붙임으로써 그안에 이동하고싶은 경로를 적으면 routerlink를 사용안하고도 이동할수있다
      this.$router.push('/about')
    }
  }
}
</script>


<style lang="scss" scoped>

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      // darken() - scss 내장함수, 얼마나 어둡게 만들건지 정의
      background-color: darken($gray-200, 10%);
    }
    span {
      width: 100%;
    }
  }
  // bootstrap 반응형 수정
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>