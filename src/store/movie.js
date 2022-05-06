// 모듈 정보

// axios
import axios from 'axios'
// uniq
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // module -> true
  namespaced: true,
  // data
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // computed
  // 상태의 매개변수를 받아와서 사용 ex) state.movies
  getters: {

  }, 
  // 해당 파일의 데이터를 변경시켜줄 수 있다
  mutations: {
    updateState(state, payload) {
      // Object.keys - 아래에서 받은 데이터가 각각 새로운 배열데이터로 만들어진다 ex) ['movies','message','loading']
      Object.keys(payload).forEach(key => {
        // 동적으로 []안에 정의
        // 자동화
        state[key] = payload[key]
      })
    },

    // 실행이되면 각가의 데이터들을 초기화시켜준다 -> 메인페이지로 돌아올때마다 실행
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loding = false
    }
  },
  // 비동기로 동작한다

  // async, await 사용할땐 try, catch문으로 오류가 날경우를 대비해야 한다, try에서 에러가 난것이 catch()문에 나타난다, catch문의 매개변수로 들어온 에러메세지를 처리할 수 있다
  actions: {
    async searchMovies({ state, commit }, payload) {
      // 최초의 값은 lodaing이 false라 아래 코드가 실행되다가 사용자가 로딩이 안끝났을때 여러번누를경우 이 함수를 다시 동작시킬경우 loding은 true로 바뀌면서 return문으로 종료시켜준다 -> 중복실행 방지
      // 한번실행되어 lodaing이 true로 바뀌면 중복클릭으로 인한 함수중복실행 방지 -> 이미 lodaing은 최초의 클릭으로 true가 되면서 함수 마지막쪽까지 실행되고있는거라 중복클릭시 멈춰주면된다 최초만 실행
      if(state.loading) {
        // 함수내부에서 return 키워드가 동작하면 함수종료
        // 조건문에서 표현식이 하나일경우 중괄호 제거후 한줄로 표현가능
        return 
      }
      // 처음시작할땐 message를 비워두고 검색이 시작되면 출력 -> 검색이 시작되기 전에 message 초기화
      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchMovie({ ...payload, page: 1})
        // totalResults - string, 총 개수
        const { Search, totalResults } = res.data
  
        commit('updateState', {
          // 중복 아이디 제거
          movies: _uniqBy(Search, 'imdbID'),
        })
  
        // string -> number
        const total = parseInt(totalResults, 10)
        // ex) total = 260 -> / 10 -> 26 -> ceil(26) -> 정수 -> 검색해야하는 페이지의 개수 -> 30개까지 가능하니까 추가요청이 필요한지 아닌지 검사
        const pageLength = Math.ceil(total / 10)
  
        if(pageLength > 1) {
          for(let page = 2; page <=pageLength; page += 1) {

            // page 3페이지까지 요청 -> 1페이지 이상부터 반복문 동작
            if(page > (payload.number / 10)) {
              break
            }
  
            // page : page -> page , 속성의 이름과 데이터의 이름이 같으면 한쪽의 내용 생략 가능
            const res = await _fetchMovie({ ...payload, page})
            const { Search } = res.data
  
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch ({ message }) {
        commit('updateState', {
          // 검색된 내용이 에러가 발생하면 검색된 내용이 화면에 안보이고 별도로 메세지를 출력한다
          movies: [],
          message
        })
        // 정상적으로 실행이 되든, 문제가되든 finally로 loding : false로 만들어준다
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },

    // 단일 영화 페이지 가져오는 함수 
    // 함수에서 state나 commit을 사용하기위해선 context를 일일이 붙여줘야 하는 번거로움이 있다 -> 객체구조분해로 사용할것만 가져와서 정의한다
    async searchMovieWithId({ state, commit }, payload) {
      if(state.loding) return
      
      commit('updateState', {
        // 기존의 검색된 영화의 상세목록이 잠깐이라도 화면에 출력되는 일을 방지한다 -> 새로고침 
        theMovie: {},
        loding: true
      })

      // payload에서 받아올 인수가 하나라면 굳이 객체 구조분해 할 필요없이 바로 넣어주면 된다
      try {        
        // 속성의 이름과 데이터의 이름이 같으면 생략해줄 수 있다 ex) id : id -> id
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch(error) {
        commit('updateState', {
          theMovie: {}
        })
        // try, catch가 모두 동작하고 나서 마지막에는 로딩부분의 데이터를 false로 만들어줘야 한다
      } finally {
        commit('updateState', {
          loding: false
        })
      }
    }
  }
}


// 함수가 실행되면 axios.post로 netlify -> serverlise functions가 동작하는데 내부적으로 처리가 완료될때까지 기다렸다가 처리가 완료된 결과를 함수 밖으로 리턴을 한다
// 리턴된 결과는 위에서 기존에 사용한 부분에서 사용해진다
async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}