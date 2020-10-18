<template>
  <div class="container">
    <Loading :active.sync="isLoading"></Loading>
    <div class="row justify-content-center my-5">
      <div class="col-md-6 bg-transparent py-5" >
        <div class="p-2 border" style="min-height: calc(100vh - 56px - 76px);">
          <div class="d-flex justify-content-between align-items-end border-bottom pb-3">
          <h2 class="mt-2">購物車列表 </h2>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click="deleteAllCartItem()">
              <i class="far fa-trash-alt"> 清空購物車</i>
          </button>
        </div>
        <div
          class="d-flex align-items-center py-3 bg-transparent border-bottom"
          v-for="item in carts" :key="item.product.id + 1"
        >
          <img :src="item.product.imageUrl" alt="" style="width: 120px; height: 120px; object-fit: cover;">
          <div class="w-100 p-3 position-relative">
            <a
              href="#"
              class="position-absolute"
              style="top: 16px; right: 16px;"
              @click="removeItem(item.product.id)"
            >
              <i class="fas fa-times"></i>
            </a>
            <span
              class="badge badge-secondary badge-pill text-white font-weight-light mb-1"
            >
              {{ item.product.category }}
            </span>
            <p class="mb-1 font-weight-bold">{{ item.product.title }}</p>
            <p class="mb-1 text-muted" style="font-size: 14px;">{{ item.product.content }}</p>
            <div class="d-flex justify-content-between align-items-center w-100">
              <div class="input-group w-50 align-items-center" style="background-color:#191b1d">
                <div class="input-group-prepend pr-1">
                  <button class="btn"
                    type="button" :disabled="item.quantity === 1 "
                    @click="item.quantity --; updateQuantity(item.product.id, item.quantity)"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control border-0 text-center my-auto shadow-none bg-transparent text-white px-0"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  value="1"
                  v-model="item.quantity"
                  @change="updateQuantity(item.product.id, item.quantity)"
                >
                <div class="input-group-append pl-1">
                  <button class="btn"
                    type="button" @click="item.quantity ++; updateQuantity(item.product.id, item.quantity)"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                  <!-- <a href="#" @click.prevent="item.quantity ++; updateQuantity(item.product.id, item.quantity)"
                    :disabled="status.loadingUpdateCart === item.product.id"><i class="fas fa-plus" ></i></a> -->
                </div>
              </div>
              <p class="mb-0 ml-auto">${{ item.product.price }}</p>
            </div>
          </div>
        </div>
        <table class="table mt-4 text-muted">
          <tbody>
            <tr>
              <th scope="row" class="border-0 px-0 font-weight-normal">原價</th>
              <td class="text-right border-0 px-0">${{ originCartTotal }}</td>
            </tr>
            <tr>
              <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">折扣</th>
              <td class="text-right border-0 px-0 pt-0">${{ discount }}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between mt-4">
          <p class="mb-0 h4 font-weight-bold">總計</p>
          <p class="mb-0 h4 font-weight-bold">${{ cartTotal }}</p>
        </div>
        <router-link to="/checkout" class="btn btn-dark btn-block mt-4 rounded-0 py-3">確認訂單</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      tempProduct: {},
      products: [],
      carts: [],
      discount: 0,
      cartTotal: 0,
      originCartTotal: 0,
      status: {
        loadingItem: '', // 要預先定義 loadingItem, 不然會出錯
        loadingUpdateCart: ''
      },
      messages: [
        {
          name: '刪除成功',
          content: ''
        }
      ]
    }
  },
  methods: {
    // 取出產品列表
    getProducts (page = 1) { // 參數預設值
      this.isLoading = true // 打開 isLoading
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${page}`
      // 取得遠端資料
      this.$http.get(url)
        .then(res => {
          // console.log(res);
          this.isLoading = false // 讀取完關閉 isLoading
          this.products = res.data.data
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false // 讀取失敗時關閉 isLoading, 不然會一直在 loading 畫面
        })
    },
    addToCart (id, quantity = 1) { // 加入購物車，帶入商品 id 及數量
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = { // 定義資料
        product: id,
        quantity: quantity // ES6 的寫法: quantity
      }
      // console.log(cart);
      this.$http.post(url, cart)
        .then(res => {
          this.isLoading = false
          // console.log(res)
          this.getCart()
        })
        .catch(error => {
          this.isLoading = false
          // axios 固定的寫法，否則 error 訊息不會出現
          console.log(error.response)
        })
    },
    getProduct (id) { // 單一產品資料取出
      this.status.loadingItem = id // 把產品 id 存在 status.loadingItem
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`
      // console.log(id)
      this.$http.get(url)
        .then(res => {
          // console.log(res)
          this.status.loadingItem = '' // 清空
          this.tempProduct = res.data.data
          // 沒有辦法直接寫入的時候，可以使用這兩種方法把值寫進去
          this.tempProduct.num = 1 // 方法一：補上數量，預設為 1
          // 方法二：this.$set(this.tempProduct, 'num' , 1;);
          // 存完資料把 modal 打開
          // $('#productModal').modal('show')
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
          this.updateTotal()
          this.calculateDiscount() // 取得購物車的時候才會做計算
        })
    },
    // 在取得購物車的時候才會做計算，刪除購物車的時候就沒有重計算
    // 所以這段要挑出來寫
    updateTotal () {
      // 累加總金額，先歸零後重新計算
      this.cartTotal = 0
      this.carts.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity
      })
    },
    updateQuantity (id, quantity) { // 更新數量
      this.isLoading = true
      this.status.loadingUpdateCart = id // 當更新購物車的時候把 id 取出
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = { // 定義資料
        product: id,
        quantity: quantity // ES6 的寫法: quantity
      }
      // console.log(cart);
      this.$http
        .patch(url, cart)
        .then(res => {
          this.status.loadingUpdateCart = '' // 執行完時清空
          this.isLoading = false
          // console.log(res)
          this.getCart() // 更新完數量要重新取得購物車資料
        })
        .catch(error => {
          this.isLoading = false
          // axios 固定的寫法，否則 error 訊息不會出現
          console.log(error.response)
        })
    },
    removeItem (id) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.isLoading = true
      this.$http
        .delete(url)
        .then(res => {
          this.isLoading = false
          this.getCart()
          this.$bus.$emit('get-cart')
          // 刪除成功訊息
          this.messages.content = res.data.message
          // console.log(this.messages.content)
          this.$bus.$emit('push-messages', this.messages[0])
        })
    },
    deleteAllCartItem () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.$http.delete(url) // 以 axios.delete 的方法直接清空購物車後，關掉 loading 並刷新購物車
        .then(res => {
          this.isLoading = false
          this.getCart()
          this.$bus.$emit('get-cart')
          // console.log(response)
        })
        // console.log(this.total_cost)
      this.cartTotal = 0
    },
    calculateDiscount () {
      this.discount = 0
      this.originCartTotal = 0
      this.carts.forEach((item) => {
        this.discount += item.product.origin_price - item.product.price
        this.originCartTotal += item.product.origin_price
      })
      // console.log(this.discount)
      // console.log(this.originCartTotal)
    }
    // sendOrder () {
    //   alert("訂單完成")
    // }
  },
  created () {
    this.isLoading = true
    this.getProducts() // 要使用 this 去取得 getProducts()
    this.getCart()
    // this.calculateDiscount()
  }
}

</script>
