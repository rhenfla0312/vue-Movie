// store(vuex)
import { createStore } from 'vuex'

// module
import movie from './movie'
import about from './about'

// createStore - Store 생성
export default createStore({
  // 데이터 타입의 모듈들 연결
  modules: {
    movie,
    about    
  }
})