<template>
  <div class="movie" :style="{ backgroundImage: `url(${movie.Poster})`}">
    <Loader v-if="imageLoading" :size="1.5" absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
        <div class="title">
          {{ movie.Title }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  props: {
    movie: {
      type: Object,
      default: () => ({
      })
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  methods: {
    // 무엇인가를 초기화
    async init() {
      await this.$loadImage(this.movie.Poster)
      this.imageLoading = false
    }
  },
  // 연결이 된 직후 실행
  mounted() {
    this.init()
  }
}
</script>


<style lang="scss" scoped>

@import "~/scss/main";

.movie {
  // height는 width의 2 / 3 만큼의 넓이를 가지길 원하지만 width를 세밀하게 정할경우 변수에 넣어 나눠준다
  $width: 200px;
  width: $width;
  height: $width * 3 / 2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  // cover - 배경이미지를 요소에 더 넓은 너비에 맞춰서 출력한다
  background-size: cover;
  // overflow : hidden - 넘치는 값들을 숨긴다
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .info {
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>