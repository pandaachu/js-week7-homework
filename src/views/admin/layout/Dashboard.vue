<template>
  <div class="admin">
    <div class="bg-white sticky-top">
      <div class="container">
        <nav class="navbar px-0 navbar-expand-lg navbar-light bg-white d-flex justify-content-between">
          <router-link to="/admin/" class="logo navbar-brand position-absolute text-secondary d-flex m-0" href="#" >
            <Logo class="mr-3"></Logo>
            FOREST
          </router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNavAdimn">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/admin/products" class="nav-link pl-0">產品列表 <span class="sr-only">(current)</span></router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/orders" class="nav-link">訂單列表</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/coupons" class="nav-link">優惠卷</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/storages" class="nav-link">圖片管理</router-link>
              </li>
            </ul>
          </div>
          <!-- <router-link to="/" class="nav-link" @click="signout">登出</router-link> -->
          <div>
            <button class="btn btn-outline-primary btn-block" type="button" @click="signout">
              登出
            </button>
          </div>
        </nav>
      </div>
    </div>
    <div class="container">
      <router-view :token="token" v-if="checkSuccess"/>
      <!-- 當驗證沒有問題，checkSuccess = true ，再跑下面的區塊 -->
    </div>
  </div>
</template>

<script>
/* global $ */
// 這裡是後台入口，驗證要做在這
import Logo from '@/components/Logo.vue'
export default {
  name: 'Dashboard',
  components: {
    Logo
  },
  data () {
    return {
      token: '',
      checkSuccess: false,
      messages: [
        {
          name: '失敗',
          content: '回到登入畫面'
        }
      ]
    }
  },
  methods: {
    checkLogin () {
      // 登入後取得 token
      // 帶上 token
      // 外層已經把 token 儲存，所以外層就不用再寫一次了
      // 但是要把 token 從外層傳到內層，使用 props
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`

      const api = `${process.env.VUE_APP_APIPATH}/auth/check`
      // 發送 api 來檢查
      this.$http.post(api, {
        api_token: this.token
      })
      // 看驗證結果
      // then & catch 都要做
        .then(res => {
          // console.log(res)
          this.checkSuccess = true
        })
        .catch(error => {
          console.log(error.response)
          this.$bus.$emit('push-messages', this.messages[0])
          $('.l-toast').toast('show')
          // 如果驗證失敗畫面回到 login
          this.$router.push('/admin/login')
        })
    },
    signout () {
      // 清除 cookie
      this.$router.push('/admin/login')
      document.cookie = 'hexToken=; expires=;'
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>
