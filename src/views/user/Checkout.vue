<template>
  <div class="l-checkout">
    <Loading :active.sync="isLoading"></Loading>
    <div class="pt-5 pb-7">
      <div class="container">
        <div class="row justify-content-center flex-md-row flex-column-reverse">
          <div class="col-md-6">
            <validation-observer v-slot="{ invalid, handleSubmit }">
              <div class="p-4 border ">
                <h4 class="font-weight-bold">聯絡資料</h4>
                <form @submit.prevent="handleSubmit(createOrder)">
                  <div class="form-group mb-2">
                    <validation-provider rules="required|email" v-slot="{ errors, classes }">
                      <label for="ContactMail" class="text-muted mb-0">Email</label>
                      <input id="ContactMail" name="email" v-model="user.email" type="email" class="form-control rounded-0" placeholder="example@gmail.com" :class="classes">
                      <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <!-- <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input rounded-0" id="ContactLorem">
                    <label class="form-check-label" for="ContactLorem">Lorem ipsum dolor sit amet, consetetur</label>
                  </div> -->
                  <div class="form-group mb-2">
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                      <label for="ContactName" class="text-muted mb-0">收件人姓名</label>
                      <input id="ContactName" name="姓名" v-model="user.name" type="text" class="form-control rounded-0" placeholder="王大明" :class="classes">
                      <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group mb-4">
                    <validation-provider rules="required|min:10" v-slot="{ errors, classes }">
                      <label for="ContactPhone" class="text-muted mb-0">收件人手機號碼</label>
                      <input id="ContactPhone" name="手機號碼" v-model="user.tel" type="tel" class="form-control rounded-0" placeholder="0933-123-123" :class="classes">
                      <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <h4 class="font-weight-bold mb-2">運送及付款資訊</h4>
                  <div class="form-group">
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                      <label for="ContactAddress" class="text-muted mb-0">運送地址</label>
                      <input id="ContactAddress" name="運送地址" v-model="user.address" type="tel" class="form-control rounded-0" placeholder="地址" :class="classes">
                      <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                      <label for="payment" class="text-muted">付款方式</label>
                      <select id="payment" name="付款方式" v-model="user.payment" class="form-control rounded-0" :class="classes">
                        <option value="" disabled>
                          請選擇付款方式
                        </option>
                        <option value="WebATM">
                          WebATM
                        </option>
                        <option value="ATM">
                          ATM
                        </option>
                        <option value="Credit">
                          信用卡
                        </option>
                        <option value="ApplePay">
                          ApplePay
                        </option>
                        <option value="GooglePay">
                          GooglePay
                        </option>
                      </select>
                      <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <!-- button 如果掛 function @:click="goPage ()" 表單送出就會失效 -->
                  <!-- 資料傳送事件在 form -->
                  <button type="submit" class="btn btn-dark btn-block py-3 px-7 rounded-0" :disabled="invalid">確定付款</button>
                  <!-- <router-link to="/checkout-success" class="btn btn-dark py-3 px-7 rounded-0" :disabled="invalid"></router-link> -->
                </form>
              </div>
                <router-link to="/product" class="text-light btn btn-dark btn-block py-3 mt-5 rounded-0"><i class="fas fa-chevron-left mr-2"></i> 回訂單列表 </router-link>
            </validation-observer>
          </div>
          <div class="col-md-4">
            <div class="border p-4 mb-4">
              <h4 class="mb-4 ">訂單資料</h4>
              <div class="d-flex mb-2" v-for="item in carts" :key="item.product.id + 1">
                <img :src="item.product.imageUrl" alt="" class="mr-2" style="width: 48px; height: 48px; object-fit: cover">
                <div class="w-100">
                  <div class="d-flex justify-content-between font-weight-bold">
                    <p class="mb-0 font-weight-light">{{ item.product.title }}</p>
                    <p class="mb-0 font-weight-light">x{{ item.quantity }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="text-muted mb-0"><small>{{ item.product.origin_price | money }}</small></p>
                    <p class="mb-0">{{ item.product.price | money }}</p>
                  </div>
                </div>
              </div>
              <table class="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">折扣</th>
                    <td class="text-right border-0 px-0 pt-4">{{ discount | money }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">付款方式</th>
                    <td class="text-right border-0 px-0 pt-0 pb-4">{{ user.payment }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 font-weight-bold">總計</p>
                <p class="mb-0 h4 font-weight-bold">{{ cartTotal | money }}</p>
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
      tempProduct: {},
      products: [],
      carts: [],
      cartTotal: 0,
      discount: 0,
      status: {
        loadingItem: '', // 要預先定義 loadingItem, 不然會出錯
        loadingUpdateCart: ''
      },
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      }
    }
  },
  methods: {
    updateTotal () {
      // 累加總金額，先歸零後重新計算
      this.cartTotal = 0
      this.carts.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity
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
          // 把購物車資料推送到 navbar 購物車 icon
          this.$bus.$emit('get-cart')
        })
    },
    createOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`
      this.$http.post(url, this.user).then((response) => {
        if (response.data.data.id) {
          this.isLoading = false
          // 跳出提示訊息
          // $('#orderModal').modal('show')
          // 重新渲染購物車
          // console.log('成功')
          this.getCart()
          this.$router.push({
            path: `/checkout-success/${response.data.data.id}`
          })
        }
      }).catch((error) => {
        this.isLoading = false
        console.log(error.response.data.errors)
      })
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
  },
  created () {
    this.updateTotal()
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.l-checkout{
  padding-top: 6rem;
  padding-bottom: 6rem;
}
</style>
