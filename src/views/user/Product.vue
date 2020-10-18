<template>
<div class="l-background">
    <Loading :active.sync="isLoading"></Loading>
    <div class="l-product container">
      <!-- v-if="product.id" -> 讓資料先跑出來再跑畫面，解決 filter 錯誤-->
      <div class="row justify-content-between align-items-center mt-5 mb-7" v-if="product.id">
        <div class="col-12 col-md-6 position-relative  overflow-hidden">
          <div class="l-product__bottle position-absolute" style="bottom:0; right:-67px">
            <img v-if="product.category === '香精油'" src="@/../public/images/oil-bottle.jpg" alt="" class="rounded-circle mr-5" style="width: 185px; height: 185px; object-fit: cover;border:solid 2px #e68e20">
            <img v-else-if="product.category === '蠟燭'" src="@/../public/images/candle.jpg" alt="" class="rounded-circle mr-5" style="width: 185px; height: 185px; object-fit: cover; border:solid 2px #e68e20">
          </div>
          <div
            class="my-4"
            style="height: 650px;background-position: center center;background-size:cover"
            :style="{ backgroundImage: `url(${product.imageUrl[0]})`}"
          >
          </div>
          <!-- <div class="my-4">
            <img :src="product.imageUrl[0]" alt="" class="img-fluid mt-2">
          </div> -->
        </div>
        <div class="col-12 col-md-5 offset-md-1">
          <div class="scrollbarHide" style="overflow:auto; height: 60vh;">
            <span
                class="badge badge-secondary badge-pill text-white mb-3"
              >
              {{ product.category }}
            </span>
            <h2 class="mb-0 mb-4 optimaNovaFont letter-spacing-l font-weight-light">{{ product.title }}</h2>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- 售價(price)欄位是可選的，因此售價若為空，就顯示原價(origin_price)
              售價若不為空，就顯示原價(origin_price)與售價(price) -->
              <!-- v-if 去判斷 -->
              <div class="h5 letter-spacing-m mb-5" v-if="!product.price || product.price === product.origin_price">
              {{ product.origin_price | money }}
              </div>
              <div v-else class="mb-5">
                <div class="h5 letter-spacing-m pl-2 mr-3">
                  {{ product.price | money }}
                  <span class="font-m letter-spacing-m">
                    ( <del> {{ product.origin_price | money }}</del> )
                  </span>
                </div>
              </div>
            </div>
            <div class="bg-transparent mb-3">
              <div class="card border-0 bg-transparent">
                <div class="card-header px-0 pt-4 mb-3 border border-bottom border-top-0 border-left-0 border-right-0">
                  <h4 class="mb-0 letter-spacing-l">
                    產品介紹
                  </h4>
                </div>
                <div class="card-body font-weight-lighter">
                  <h5 class="text-secondary font-weight-lighter text-center letter-spacing-m mb-4">{{ product.content }}</h5>
                  <p class="brackets py-4 px-4 font-weight-lighter" style="letter-spacing:1.3px; line-height:1.6">{{ product.description }}</p>
                </div>
              </div>
              <div class="card border-0 bg-transparent">
                <div class="card-header px-0 pt-4 mb-3 border border-bottom border-top-0 border-left-0 border-right-0">
                  <h4 class="mb-0 letter-spacing-l">
                    使用方法
                  </h4>
                </div>
                <div class="card-body font-weight-lighter">
                  <ol v-if="product.category === '香精油'" class="p-0 letter-spacing-s">
                    <li class="pb-3">可以滴在吸收精油的材料，如紙類、布類、木類讓它自然揮發。</li>
                    <li class="pb-3">用罐子裝一些自然材料如乾花草，松果相思子這些，處理乾淨後，就可以當做最自然的擴香。</li>
                    <li class="pb-3">精油水氧機，一次5-10滴，用水稀釋後擴香，可以用一晚上。</li>
                    <li class="pb-3">使用精油擴香儀，精油沒有稀釋，原汁原味的擴香。</li>
                  </ol>
                  <ol v-if="product.category === '蠟燭'" class="p-0 letter-spacing-s">
                    <li class="pb-3">香氛蠟燭點燃前要修剪燭芯至0.5cm的長度。</li>
                    <li class="pb-3">初次使用至少要燃燒持續兩個小時，讓所有蠟燭能夠均勻燒融。</li>
                    <li class="pb-3">使用長型點火器，可以避免難以點燃和被燙傷的危險。</li>
                    <li class="pb-3">不要用嘴吹熄蠟燭，可以使用長型點火器把燭芯推倒，或使用專業滅燭器具。</li>
                  </ol>
                </div>
              </div>
              <div class="card border-0 bg-transparent">
                <div class="card-header px-0 pt-4 mb-3 border border-bottom border-top-0 border-left-0 border-right-0">
                  <h4 class="mb-0 letter-spacing-l">
                    注意事項
                  </h4>
                </div>
                <p class="card-body pb-5 font-weight-lighter letter-spacing-s">
                  可能導致肌膚敏感，請放置在兒童無法拿取處。 <br>
                  懷孕、哺乳或接受治療者，請先諮詢醫師後再使用。 <br>
                  避免接觸眼睛、耳內和敏感部位。
                </p>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <div class="input-group mb-3 border mt-3">
              <div class="input-group-prepend">
                <!-- 減數量 -->
                <button
                  class="btn btn-outline-dark rounded-0 border-0 py-3 text-gray"
                  id="button-addon2"
                  type="button"
                  :disabled="productAddToCart.quantity === 1"
                  @click="productAddToCart.quantity -- ; updateQuantity(productAddToCart.quantity)"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control border-0 text-center my-auto shadow-none bg-transparent text-white px-0"
                placeholder=""
                aria-label="Example text with button addon" aria-describedby="button-addon1"
                v-model="productAddToCart.quantity"
              >
              <div class="input-group-append">
                <!-- 加數量 -->
                <button
                  class="btn btn-outline-dark rounded-0 border-0 py-3 text-gray"
                  id="button-addon2"
                  type="button" @click="productAddToCart.quantity ++ ; updateQuantity(productAddToCart.quantity)"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <button
              class="btn btn-dark btn-block rounded-0 py-3 letter-spacing-m"
              @click="addToCart ()"
              >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// /* global $ */
import { gsap } from 'gsap'

export default {
  data () {
    return {
      isLoading: false,
      productAddToCart: {
        // product: this.$route.params.id,
        quantity: 1
      },
      carts: [],
      product: {
        imageUrl: []
      },
      order: {},
      status: { // 讀取效果
        loadingItem: '', // 要預先定義 loadingItem, 不然會出錯
        loadingUpdateCart: ''
      }
    }
  },
  methods: {
    // 加入購物車後要觸發另外的元件更新資料 -> $bus.$emit
    // navbar 的購物車 icon 用 $bus.$on 接收
    addToCart () {
      // console.log(this.productAddToCart)
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.post(url, this.productAddToCart)
        .then((res) => {
          this.isLoading = false
          // console.log(res)
          // $emit 推送資料
          this.$bus.$emit('get-cart') // $bus.$on 定義的方法
        })
    },
    getCart () { // 取得購物車資料
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url)
        .then(res => {
          // console.log('cart', res)
          this.isLoading = false
          this.carts = res.data.data
        })
    },
    updateQuantity (quantity) { // 更新數量
      this.productAddToCart.quantity = quantity
      // console.log(quantity)
    }
  },
  created () {
    this.isLoading = true
    // 取得產品 id
    // console.log(this.$route.params.id)
    // 屬性 $route
    // 方法 $router
    const id = this.$route.params.id
    const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`
    this.$http.get(url) // 取得當前產品資料
      .then((res) => {
        this.isLoading = false
        this.product = res.data.data
      })
    this.getCart()
  },
  mounted () {
    gsap.from('.l-product__bottle', {
      opacity: 0,
      y: 100,
      delay: 1,
      duration: 2,
      ease: 'back'
    })
    gsap.from('.card', {
      opacity: 0,
      x: 50,
      delay: 1,
      duration: 2,
      stagger: 0.5
    })
  }
}
</script>

<style lang="scss" scoped>
.scrollbarHide::-webkit-scrollbar{
  display: none;
}
</style>
