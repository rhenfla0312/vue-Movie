<template>
  <!-- props- > size의 기본값은 2이므로 데이터바인딩으로 따로 값을 할당하지않으면 기본값인 2rem을 할당한다 -->
  <!-- :style 바인딩 할경우 직접 지정해서 ex 'z-index' : "" 할 수 있는데 기본적으로 vue에선 style 바인딩에서 카멜 -> 대쉬케이스로 변환시켜줄 수 있어서 따로 문자열로 작성안하고 바로 카멜케이스로 작성해도 vue에서 자동으로 대쉬케이스로 바꿔져서 들어간다 (-빼고 대문자로 넣어준다) -->
  <div :style="{ width: `${size}rem`, height: `${size}rem`, zIndex }" :class="{ absolute, fixed}" class="spinner-border text-primary"></div>
</template>


<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-border {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}
</style>