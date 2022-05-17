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
            <!-- :title -> html의 전역속성 -->
            <div v-for="{ Source: name, Value: score } in theMovie.Ratings" :key="name" :title="name" class="rating">
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
import { mapState, mapActions } from 'vuex'
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
    ...mapState('movie', [
      'theMovie',
      'loding'
    ]) 
  },
  created() {
    this.$store.dispatch('movie/searchMovieWithId', {
      id : this.$route.params.id
    })
  },
  methods: {
    // ...mapActions('movie', [
    //   'searchMovieWithId'
    // ]),
    
    requestDiffSizeImage(url, size = 700) {
      if(!url || url == "N/A") {
        this.imageLoading = false
        // 해당사항이 없어도 background-img는 표시해야하니 빈문자열을 보내준다, undefiend가 나오면 background-img도 안나온다
        return ''
      }
      const src = url.replace('SX300', `SX${size}`)
      this.$loadImage(src).then(() => {
        this.imageLoading = false
      })
      return src
    }
  }
}
</script>


<style lang="scss" scoped>


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
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3 / 2;
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>