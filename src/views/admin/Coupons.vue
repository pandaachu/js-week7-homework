<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openCouponModal('created')"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4 text-primary">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="coupon in coupons"
          :key="coupon.id"
        >
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}</td>
          <td>{{ coupon.deadline.datetime }}</td>
          <td>
            <span
              v-if="coupon.enabled"
              class="text-success"
            >
            啟用
            </span>
            <span
              v-else
              class="text-muted"
            >
            未起用
            </span>
          </td>
          <td>
            <div class="btn-group">
              <!-- 把當下按的 coupon 資料帶到 modal -->
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openCouponModal('edit', coupon)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openCouponModal('delete', coupon)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @update="getCoupons"></Pagination>
    <div
      id="couponModal"
      class="modal fade text-primary"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              {{ status === 'created' ? '新增優惠卷' : '編輯優惠券' }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                id="title"
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
              >
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                id="coupon_code"
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
                placeholder="請輸入優惠碼"
              >
            </div>
            <div class="form-group">
              <label for="deadline_date">到期日</label>
              <input
                id="deadline_date"
                v-model="deadline_date"
                type="date"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="deadline_time">到期時間</label>
              <input
                id="deadline_time"
                v-model="deadline_time"
                type="time"
                step="1"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                id="price"
                v-model="tempCoupon.percent"
                type="number"
                class="form-control"
                placeholder="請輸入折扣數量"
              >
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  id="enabled"
                  v-model="tempCoupon.enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                >
                <label
                  class="form-check-label"
                  for="enabled"
                >是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateCoupon"
            >
              {{ status === 'created' ? '新增優惠卷' : '更新優惠券' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="delCouponModal"
      class="modal fade text-primary"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除優惠卷</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>

            <button
              type="button"
              class="btn btn-danger"
              @click="delCoupon(tempCoupon.id)"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Coupons',
  components: {
    Pagination
  },
  data () {
    return {
      coupons: {},
      isLoading: false,
      status: '',
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: ''
      },
      deadline_date: '',
      deadline_time: '',
      pagination: {},
      messages: [
        {
          name: '失敗',
          content: '出現錯誤'
        },
        {
          name: '刪除成功',
          content: '已刪除優惠券'
        }
      ]
    }
  },
  methods: {
    getCoupons (num = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${num}`
      this.$http.get(url)
        .then(res => {
          this.coupons = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
    },
    openCouponModal (status, coupon) {
      this.status = status // 把上面的 status 帶下來存在 this.status 以此更換 modal title
      // console.log(coupon)
      switch (status) {
        case 'created':
          this.tempCoupon = {} // 新增時清空 tempCoupon
          $('#couponModal').modal('show')
          break
        case 'edit': {
          this.tempCoupon = { ...coupon } // 展開運算子
          // 使用 split 切割相關時間戳
          // console.log(this.tempCoupon.deadline.datetime) // 2020-10-31 12:04:56
          const deadlineAt = this.tempCoupon.deadline.datetime.split(' '); // 分割日期時間
          [this.deadline_date, this.deadline_time] = deadlineAt // 日期
          // console.log(deadlineAt) // "2020-10-31", "12:04:56"
          $('#couponModal').modal('show')
          break
        }
        case 'delete':
          this.tempCoupon = coupon
          $('#delCouponModal').modal('show')
          break
        default:
          break
      }
    },
    updateCoupon () {
      this.isLoading = true
      let url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon`
      let httpMethod = ''
      if (this.status === 'created') {
        httpMethod = 'post'
      } else {
        url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
        httpMethod = 'patch' // update
      }
      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      // 建立 coupon
      this.tempCoupon.deadline_at = `${this.deadline_date} ${this.deadline_time}`

      this.$http[httpMethod](url, this.tempCoupon)
        .then(() => {
          $('#couponModal').modal('hide')
          this.getCoupons() // 重新取得 coupons
        })
        .catch(() => {
          this.$bus.$emit('push-messages', this.messages[0])
          $('.l-toast').toast('show')
          this.isLoading = false
        })
    },
    delCoupon (id) {
      this.isLoading = true
      // console.log(id)
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`
      this.$http.delete(url)
        .then(() => {
          $('#delCouponModal').modal('hide')
          this.$bus.$emit('push-messages', this.messages[1])
          $('.l-toast').toast('show')
          this.getCoupons()
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
    this.getCoupons()
  }
}
</script>
