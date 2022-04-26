<template>
  <div class="container">
    <input class="form-control" v-model="title" type="text" @keyup.enter="apply" placeholder="Search for Movies, Series & more" />
    <div class="selects">

      <select  v-for="filter in filters" v-model="$data[filter.name]" :key="filter.name" class="form-select">
        <option v-if="filter.name === 'year'" value="">All Years</option>
        <option v-for="item in filter.items" :key="item">{{ item }}</option>
      </select>
    </div>
    <button class="btn btn-primary" @click="apply">
      Apply
    </button>
  </div>
</template>


<script>


export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          // 현재날짜부터 1985년도까지의 날짜를 즉시 실행함수로 반복문을 이용해서 로직을 만든다
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear() // 현재 년도 구하기
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods: {
    // 비동기처리
    async apply() {
      // dispatch - actions에 접근하는 메소드, 첫번째 인자 - 경로가 아닌 모듈이름 자체를 가져와서 -> 생략이 아닌 제거 , / 를 기준으로 함수에 접근한다, 두번째 인자 - 데이터를 전달할 payload (객체 데이터로)
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.yaer,
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    // flex에서 너비가 감소하지 않게 지정
    flex-shrink: 0;
  }
  // bootstrap 반응형 수정
  @include media-breakpoint-down(lg) {
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>