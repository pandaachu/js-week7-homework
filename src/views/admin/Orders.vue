<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <h2 class="h3 m-3 text-left">訂單列表</h2>
    <table class="table table-striped text-primary mt-4">
      <thead>
        <tr class="bg-light">
          <th class="text-center" width="175">訂單日期</th>
          <th>購買產品</th>
          <th class="text-center">訂單總額</th>
          <th >訂單付款方式</th>
          <th width="130" class="text-center">付款狀態</th>
          <th width="130">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="text-center align-middle">{{ order.created.datetime }}</td>
          <td class="align-middle">
            <span v-for="(pdt, idx) in order.products" :key="idx">
              {{ pdt.product.title }}
              <font v-if="idx < (order.products.length - 1)">,</font>
            </span>
          </td>
          <td class="text-center align-middle">{{ order.amount }}</td>
          <td class="align-middle">{{ order.payment }}</td>
          <td class="text-center align-middle">
            <span class="text-success" v-if="order.paid">已付款</span>
            <span class="text-danger" v-else>未付款</span>
          </td>
          <td class="align-middle">
              <!-- <button type="button" class="btn btn-outline-danger btn-sm btn-block" v-if="item.paid"
                @click="changePaidStatus(false, item.id)">更新為未付款</button>
              <button type="button" class="btn btn-outline-success btn-sm btn-block" v-else
                @click="changePaidStatus(true, item.id)">更新為已付款 </button> -->
                <!-- <button type="button" class="btn btn-outline-danger btn-sm btn-block"
                @click="test() ">更新為未付款</button> -->
                <router-link class="btn btn-outline-success btn-sm btn-block" :to="`/admin/order/${order.id}`" >檢視</router-link>
                <!-- <div type="div" class="btn btn-outline-success btn-sm btn-block"
                @click="goOrders(order.id)"> 檢視 </div> -->
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @update="getOrders"></Pagination>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Orders',
  components: {
    Pagination
  },
  data () {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isLoading: false,
      messages: [
        {
          name: '失敗',
          content: '出現錯誤'
        }
      ]
    }
  },
  methods: {
    getOrders (num = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${num}`
      this.$http
        .get(api)
        .then((res) => {
          // console.log('orders', res)
          this.orders = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch(() => {
          this.$bus.$emit('push-messages', this.messages[0])
          $('.l-toast').toast('show')
          this.isLoading = false
        })
    },
    changePaidStatus (paid, id) {
      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`
      api += `/${paid ? 'paid' : 'unpaid'}`
      this.isLoading = true
      this.$http
        .patch(api)
        .then(() => {
          this.getOrders(this.pagination.paged)
          this.isLoading = false
        })
        .catch(() => {
          this.$bus.$emit('push-messages', this.messages[0])
          $('.l-toast').toast('show')
          this.isLoading = false
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
