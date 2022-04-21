<template>
  <div class="container">
    <!-- 영화의 정보가 없다면 no-result 출력 -->
    <div :class="{ 'no-result': !movies.length }" class="inner">
      <!-- 결과가 나오기까지 로딩바 출력 on/off -->
      <Loder  v-if="loading" />
      <div v-if="message" class="message">{{ message }}</div>
      <div v-else class="movies">
        <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
      </div>
    </div>
  </div>
</template>


<script>

import MovieItem from '~/components/MovieItem'
// lodingbar
import Loder from '~/components/Loader'

export default {
  components: {
    MovieItem,
    Loder
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies
    },
    message() {
      return this.$store.state.movie.message
    },
    loading() {
      return this.$store.state.movie.loading
    }
  }
}
</script>


<style lang="scss" scoped>

@import "~/scss/main";

.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>