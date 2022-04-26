<template>
  <!-- container - 부트스트랩에서 사용하는 뷰포트가 변할때마다 뷰포트의 크기를 확인을해서 컨테이너의 크기도 변경되는 기능, 손쉽게 반응형으로 만들 수 있는 유용한 클래스다 -->
  <!-- break point - 각각의 바뀌는 지점들 -->
  <div class="container">
    <h1>
      <span>OMDb API</span><br />
      THE OPEN<br />MOVIE DATABASE
    </h1>

    <p>
      The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.<br />
      If you find this service useful, please consider making a one-time donation or become a patron.
    </p>
  </div>
</template>


<style lang="scss" scoped>
.container {
  padding-top: 40px;
  h1 {
    line-height: 1;
    font-family: "Oswald", sans-serif;
    font-size: 80px;
    span {
      color: $primary;
    }
  }
  p {
    margin: 30px 0;
    color: $gray-600;
  }
}

</style>