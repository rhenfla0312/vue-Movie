<template>
  <!-- 부모와 자식 컴포넌트 -> 데이터 전달 -> props -->
  <!--  -->
  <Headline />
  <Search />
  <MovieList />
</template>


<script>

import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'

export default {
  components: {
    Headline,
    Search,
    MovieList
  }
}
</script>

