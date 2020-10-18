<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <h2 class="h3 m-3 text-left text-primary">訂單細節</h2>
    <table class="table table-striped text-primary mt-4 mb-5">
      <thead>
        <tr>
          <!-- <th width="235">訂單日期</th> -->
          <th>產品縮圖</th>
          <th>產品名稱</th>
          <th>數量</th>
          <th>原價</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody v-for="product in order.products" :key="product.id">
        <td> <div style="height: 100px; width: 80px;
      background-position: center center;background-size:cover" :style="{ backgroundImage: `url(${product.product.imageUrl[0]})`}"></div></td>
        <td>{{ product.product.title }}</td>
        <td>{{ product.product.unit }}</td>
        <td>{{ product.product.origin_price }}</td>
        <td>{{ product.product.price }}</td>
      </tbody>
      <thead>
        <tr>
          <th>總計</th>
          <th></th>
          <th></th>
          <th></th>
          <th>{{ order.amount }}</th>
        </tr>
      </thead>
    </table>
    <h2 class="h3 m-3 text-left text-primary">訂購者資料</h2>
    <table class="table table-striped text-primary mt-4">
      <thead>
        <tr>
          <th width="235">訂單日期</th>
          <th>姓名</th>
          <th>電話</th>
          <th>地址</th>
          <th>付款狀態</th>
        </tr>
      </thead>
      <tbody>
        <td>{{ order.created.datetime }}</td>
        <td>{{ order.user.name }}</td>
        <td>{{ order.user.tel }}</td>
        <td>{{ order.user.address }}</td>
        <td>{{ order.payment }}</td>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: { // 定義資料
        created: [],
        user: []
      },
      isLoading: false
    }
  },
  created () {
    this.isLoading = true
    // console.log(this.$route.params.id)
    const id = this.$route.params.id
    const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`
    // this.getOrder()
    this.$http.get(url)
      .then((res) => {
        // console.log(res)
        this.isLoading = false
        this.order = res.data.data
      })
  }
}
</script>
