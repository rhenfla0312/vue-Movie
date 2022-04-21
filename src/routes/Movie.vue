<template>
  <div class="container">
    <!-- v-if -> 두개의 요소에 동시에 사용할 수 없기 떄문에 template로 묶어서 v-if를 추가한다 -->
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <!-- : -> 데이터바인딩으로 넣지 않으면 문자데이터로 들어간다, 데이터 바인딩으로 넣어야 지정한곳에서의 타입으로 들어간다-->
      <!-- props -> html에서 작성할땐 카멜케이스를 사용하면 안된다 대쉬케이스로 사용해야한다 -->
      <!-- boolena 데이터 추가할때 단순하게 속성의 유무만으로도 true/flase 지정이 가능하다 -> 명시하는거만으로도 true가 된다, 명시하지 않으면 false다 = 바인딩으로 할때는 명시지만 아닐경우 바인딩 안하는 방식으로 명시만 하면 된다-->
      <Loader :size="4" :z-index="9" fixed />
    </template>

    <div v-else class="movie-details">
      <div :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`}" class="poster">
        <Loader v-if="imageLoading" absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <!-- 반복해야할 속성이 두개이상이라면 객체구조분해서 불러온다 -->
            <!-- 속성의 이름을 변경할때는 속성뒤쪽에 :를 붙여 사용할 이름을 명시하면 된다 -->
            <!-- 데이터로 바인딩할땐 :을 붙여사용 아니면 안붙인다 -->
            <!-- :title -> html의 전역속성 -->
            <div v-for="{ Source: name, Value: score } in theMovie.Ratings" :key="name" :title="name" class="rating">
              <!-- 반복으로 가져오는 값들하고 사진의 이름하고 일치시켜서 활용한다 -->
              <img :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" :alt="name">
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// lodingBar
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    theMovie() {
      return this.$store.state.movie.theMovie
    },
    loading() {
      return this.$store.state.movie.loding
    }
  },
  created() {
    // this.$route - 현재 페이지에 대한 정보를 얻을 수 있다(url주소에 대한 정보다) -> 거기에 params같이 index.js에서 동적으로 정의한 부분도 접근할 수 있다
    // console.log(this.$route)
    // dispatch -> store의 함수에 접근할때 매개변수는 2번째 인수로 줄 수 있다
    this.$store.dispatch('movie/searchMovieWithId', {
      // index.js에서 동적으로 정의한 : id 부분이 $route.params.id 부분에 들어간다 
      id : this.$route.params.id
    })
  },
  methods: {
    // 매개변수의 기본값을 지정할땐 ex) 매개변수 = ""로 지정할 수 있다
    requestDiffSizeImage(url, size = 700) {
      const src = url.replace('SX300', `SX${size}`)
        // await을 사용하면 로딩이 끝나고 나서야 src 이미지 주소를 반환하는 문제가 있으므로 여기선 then 메소드를 사용한다
        // 비동기가 실행되고나서 then 메소드가 실행된다, return 키워드는 그것과는 별개이므로 이미지 로딩을 기다리지 않고도 이미지 주소를 변경한 내용을 바로 반환이 가능하다
        // 이렇게 async await을 사용할 수 없는 부분들이 있다 이럴경운 then() 같은 비동기 메소드를 사용하므로써 로직의 흐름을 방해하지 않고도 비동기를 처리해줄 수 있다 
      this.$loadImage(src).then(() => {
        this.imageLoading = false
      })
      return src
    }
  }
}
</script>


<style lang="scss" scoped>

@import "~/scss/main";

.container {
  padding-top: 40px;
}
.skeletons {
  display: flex;
  .poster {
    // 줄어들수록 비율에 맞게 출력이 되어야해서 -> 감소너비를 사용하지 않겠다 정의 -> flex -shrink 0으로 초기화
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
  }
  .specs {
    // flex-grow - 최대한 많은 너비를 사용할 수 있게 만든다
    flex-grow: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;

    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;

    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    // 사진은 줄어든다고해서 사진안의 내용까지 줄어들면 안되고 유지시켜줘야하기때문에 flex-shrink로 감소너비를 0으로 해야한다
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position :relative;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;

    }
    .labels {
      color: $primary;
      span {
        &::after {
          // .표기법
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 25px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
}
</style>