<template>
  <div class="l-background">
    <div class="container">
        <div class="my-5 mb-7">
          <div class="row">
            <div class="col" >
              <div class="row align-items-stretch" style="min-height: calc(100vh - 56px - 76px); margin-top:10vh">
                <div class="col-md-6 mb-4 mb-md-5">
                  <div class="rounded-0 border p-4">
                    <h2 class="font-weight-light">訂單成功</h2>
                    <p class="letter-spacing-xl font-weight-lighter">感謝您的訂購，商品將儘快送達！</p>
                    <router-link to="/products" class="btn btn-outline-light mr-2 rounded-0 mb-4 letter-spacing-xl">繼續選購</router-link>
                  </div>
                </div>
                <!-- 取得已清空的訂單資料 -->
                <div class="col-md-6">
                  <div class="card rounded-0 border-light py-4 bg-transparent">
                    <div class="card-header border-bottom-0 px-4 py-0">
                      <h2>訂單資料</h2>
                    </div>
                    <div class="card-body px-4 py-0">
                      <ul class="list-group list-group-item-white list-group-flush bg-transparent">
                        <li class="list-group-item bg-transparent px-0">
                          <div class="d-flex mt-4" v-for="(order,index) in tempOrders.products" :key="index">
                            <img :src="order.product.imageUrl[0]" alt="" class="mr-2" style="width: 60px; height: 60px; object-fit: cover">
                            <div class="w-100 d-flex flex-column justify-content-center">
                              <div class="d-flex justify-content-between font-weight-bold">
                                <h6 class="font-weight-light0">{{ order.product.title }}</h6>
                                <p class="mb-0 font-weight-light">x <span>{{ order.quantity }} {{ order.product.unit }}</span></p>
                              </div>
                              <div class="d-flex justify-content-between">
                                <p class="text-muted mb-0"> <del><small>{{ order.product.origin_price | money }}</small></del> </p>
                                <p class="mb-0">{{ order.product.price | money }}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item bg-transparent px-0 pb-0">
                          <table class="table text-muted">
                            <tbody>
                              <tr>
                                <th scope="row" class="border-0 px-0 font-weight-normal">折扣</th>
                                <td class="text-right border-0 px-0">{{ discount | money }}</td>
                              </tr>
                              <tr>
                                <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">付款方式</th>
                                <td class="text-right border-0 px-0 pt-0">{{ tempOrders.payment }}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div class="d-flex justify-content-between mt-2">
                            <p class="mb-0 h4 font-weight-bold">總計</p>
                            <p class="mb-0 h4 font-weight-bold">{{ cartTotal | money }}</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      cartTotal: 0,
      discount: 0,
      orders: [],
      tempOrders: {
        id: '',
        payment: '',
        products: []
      },
      messages: [
        {
          name: '加入失敗 - 重複加入',
          content: '已有這筆訂單在購物車'
        },
        {
          name: '訂單成功',
          content: ''
        }
      ],
      id: this.$route.params.id
      // status: {
      //   loadingItem: '', // 要預先定義 loadingItem, 不然會出錯
      //   loadingUpdateCart: ''
      // }
    }
  },
  methods: {
    updateTotal () {
      // 累加總金額，先歸零後重新計算
      this.cartTotal = 0
      this.discount = 0
      this.tempOrders.products.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity
        this.discount += item.product.origin_price - item.product.price
      })
      // console.log(this.cartTotal)
    },
    // 抓下結帳後的訂單資料
    getThisOrder () {
      this.orders.forEach((item) => {
        if (item.id === this.id) {
          this.tempOrders = item
          // console.log(this.tempOrders)
          // console.log(item.id)
        }
      })
    },
    getOrders () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        // console.log('orders', res)
        this.orders = res.data.data
        this.getThisOrder()
        this.updateTotal()
      }).catch(() => {
        this.isLoading = false
      })
    },
    // getCart () { // 取得購物車資料
    //   this.isLoading = true
    //   const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
    //   this.$http.get(url)
    //     .then(res => {
    //       console.log('cart', res)
    //       this.isLoading = false
    //       this.carts = res.data.data
    //       this.updateTotal()
    //       this.calculateDiscount() // 取得購物車的時候才會做計算
    //     })
    // },
    calculateDiscount () {
      this.discount = 0
      this.originCartTotal = 0
      this.tempOrders.forEach((item) => {
        this.discount += item.product.origin_price - item.product.price
        this.originCartTotal += item.product.origin_price
      })
      // console.log(this.discount)
      // console.log(this.originCartTotal)
    }
  },
  created () {
    this.getOrders()
    // this.updateTotal()
    // this.getCart()
  }
}
</script>
