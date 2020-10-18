<template>
  <div id="app" class="wrapper">
    <!-- 把 isLoading 載進 -->
    <!-- <loading :active.sync="isLoading"></loading> -->
    <alert-msg></alert-msg>
    <!-- 使用 router-link 組件來導航. -->
    <!-- 通過傳入 `to` 屬性指定鏈接. -->
    <!-- <router-link> 默認會被渲染成一個 `<a>` 標籤 -->

    <!-- 路由出口 -->
    <!-- 路由匹配到的組件將渲染在這裡 -->
    <router-view/>
  </div>
</template>

<script>
import AlertMsg from './components/AlertMsg.vue'
// 匯出 loading
export default {
  components: {
    AlertMsg
  },
  // 元件裡面的資料要用 function return 的方式
  // false 效果不會出現
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    // 以 node.js 運行，所以要加 process.env
    this.isLoading = true
    this.$http.get(`${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`)
      .then((res) => {
        this.isLoading = false
        // console.log(res)
      })
  }
}
</script>

<style lang="scss">
  @import "./assets/scss/all";
</style>
