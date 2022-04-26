<template>
  <Header />
  <RouterView />
  <Footer />
</template>


<script>

// header
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

