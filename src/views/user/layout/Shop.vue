<template>
  <div class="user">
    <!-- 把 isLoading 載進 -->
    <!-- <loading :active.sync="isLoading"></loading> -->
    <!-- 呼叫元件 -->
    <Navbar></Navbar>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
// 匯入元件
import Navbar from '@/components/user/Navbar.vue'
import Footer from '@/components/user/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
