<template>
  <RouterLink to="/" class="logo">
    <span class="OMDbAPI">OMDbAPI</span>.COM
  </RouterLink>
</template>

<style lang="scss" scoped>
@import "~/scss/main";
  .logo {
    font-family: "Oswald", sans-serif;
    font-size: 20px;
    color: $black;
    text-decoration: none;
    &:hover {
      color: $black;
    }
  }
  .OMDbAPI {
    color: $primary;
  }
</style>