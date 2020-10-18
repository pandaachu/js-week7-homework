<template>
  <div class="l-background">
    <Loading :active.sync="isLoading"></Loading>
    <div class="l-products container text-light mt-5">
      <div class="row justify-content-center">
        <div class="input-group col-10 col-md-5">
          <select
            class="form-control btn btn-secondary text-white"
            style="width:35%"
            v-model="input.category"
          >
            <option>全部</option>
            <option>香精油</option>
            <option>蠟燭</option>
          </select>
          <!-- trim -> 去頭尾空白 -->
          <input v-model.trim="input.title" type="text" placeholder="搜尋" class="form-control btn btn-outline-secondary" style="width:65%">
        </div>
      </div>
      <div class="row mt-md-5 mt-3 mb-7 animation-scroll-section">
        <div class="col-md-4" v-for="product in titleFilter" :key="product.id">
          <div class="card bg-transparent border-secondary mb-4 position-relative rounded-0">
            <router-link :to="`/product/${product.id}`" class="p-2">
              <span
                class="badge badge-secondary badge-pill text-white position-absolute"
                style="left: 16px; top: 16px"
              >
              {{ product.category }}
              </span>
              <img :src="product.imageUrl[0]" class="card-img-top rounded-0" alt="...">
              <div class="card-body p-0">
                <h5 class="text-secondary mb-2 mt-2">{{ product.title }}</h5>
                <p class="card-text text-muted font-m mb-0" style="height: 2rem">{{ product.content }}</p>
                <div class="h6 letter-spacing-m mb-5" v-if="!product.price || product.price === product.origin_price">
                  {{ product.origin_price | money }}
                  </div>
                  <div v-else class="mb-5">
                    <div class="h6 text-muted letter-spacing-m mr-3">
                      {{ product.price | money }}
                      <span class="font-s text-muted letter-spacing-m">
                        ( <del> {{ product.origin_price | money }}</del> )
                      </span>
                    </div>
                  </div>
              </div>
            </router-link>
            <!-- 之後再加我的最愛 -->
            <!-- <a href="#" class="text-light">
              <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i>
            </a> -->
            <div class="position-absolute" style="font-size:1.2rem; right: 16px; bottom: 10px">
              <a href="#" class="text-light" @click.prevent="addToCart(product.id)" v-tooltip:top="'加到購物車'">
                <i class="fas fa-cart-plus" ></i>
                <i v-if="product.id === status.loadingItem" class="fas fa-spinner fa-spin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Pagination :pages="pagination" @update="getProducts"></Pagination>
    </div>
  </div>

</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      isLoading: false,
      status: {
        loadingItem: ''
      },
      messages: [
        {
          name: '加入失敗 - 重複加入',
          content: '已有這筆訂單在購物車'
        },
        {
          name: '加入成功',
          content: '已加入到購物車'
        }
      ],
      temProduct: {
        imageUrl: [] // 資料結構
      },
      products: [],
      pagination: {},
      input: {
        category: '全部',
        title: ''
      }
    }
  },
  methods: {
    addToCart (id) {
      // console.log(id)
      // this.isLoading = true
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.post(url, {
        product: id,
        quantity: 1
      })
        .then((res) => {
          // console.log(res)
          // $emit 推送資料
          this.$bus.$emit('get-cart') // $bus.$on 定義的方法
          this.status.loadingItem = ''
          this.$bus.$emit('push-messages', this.messages[1])
          $('.l-toast').toast('show')
        })
        .catch(error => {
          this.status.loadingItem = ''
          // axios 固定的寫法，否則 error 訊息不會出現
          console.log(error.response)
          this.$bus.$emit('push-messages', this.messages[0])
          $('.l-toast').toast('show')
        })
    },
    getProducts (num = 1) { // 帶上分頁的參數 -> 第一種寫法
      this.isLoading = true
      // 防止 'url: "https://course-ec-api.hexschool.io/api/289038e7-cea7-4a49-afd4-86ec766c3f7f/admin/ec/products?page=undefined" ' --> 出現 undefined
      // 第二種寫法：
      // 如果 num 不存在，num = 1：
      // if (!num) { num = 1 };
      // 帶上分頁：
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${num}`
      this.$http.get(api)
        .then(res => {
          this.isLoading = false
          // console.log(res)
          // 對應遠端傳回來的資料
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          // 如果 id 存在
          if (this.temProduct.id) {
            this.temProduct = {
              imageUrl: [] // 資料結構
            } // 把 temProduct 清除，避免重覆觸發
          }
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
    }
  },
  created () {
    this.getProducts()
  },
  // updated: function () { // 在重新渲染頁面後叫用，這時的頁面已經被重渲染成改變後的畫面。
  //   this.$nextTick(function () {
  //     $('[data-toggle="tooltip"]').tooltip()
  //   })
  // },
  computed: {
    // tooltipText: function () {
    //   // put your logic here to change the tooltip text
    //   return '加到購物車'
    // },
    categoryFilter () {
      if (this.input.category !== '全部') { // 如果 input.category 不是全部
        return this.products.filter(item => {
          return item.category === this.input.category
        })
      } else {
        return this.products
      }
    },
    titleFilter () {
      if (this.input.title) { // input.title 有資料的話
        return this.categoryFilter.filter(item => {
          // 先轉小寫 toLowerCase()
          const content = item.title.toLowerCase()
          const keyword = this.input.title.toLowerCase()
          // 在陣列中找到的第一個元素索引值；沒找到則為 -1。
          // 不等於 -1 -> 有找到資料，再進行比對
          // 比對 keyword 跟 content的字串
          return content.indexOf(keyword) !== -1
        })
      } else {
        return this.categoryFilter
      }
    }
  }
}

</script>
