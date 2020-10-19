<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        :disabled="selected.length <= 0"
        @click.prevent="openModelDel('delStorages')"
      >
        刪除選擇的圖片
      </button>
    </div>
    <table class="table mt-4 text-primary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th>選擇</th>
            <th>圖片縮圖</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-if="storages.length">
          <tr
            v-for="(item,index) in  storages"
            :key="item.id"
          >
            <th style="vertical-align: middle;" scope="row">{{ index+1 }}</th>
            <td style="vertical-align: middle;">
              <div class="form-check">
                <input type="checkbox" @change="getCheckedValues"  :value="item.id" class="storages-checkbox form-check-input m-0" style="width:1.2rem; height:1.2rem" id="exampleCheck1">
              </div>
              <!-- <input type="checkbox" :value="item.id" class="form-check-input" id="exampleCheck1"> -->
            </td>
            <td style="vertical-align: middle;">
              <img
                :src="item.path"
                width="100px"
                class="img-fluid"
              >
            </td>
            <td style="vertical-align: middle;">
              <div class="btn-group btn-group-sm">
                <button
                  class="btn btn-outline-danger"
                  @click.prevent="openModelDel('delStorage',item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @update="getStorages"></Pagination>
      <div
        id="deleteModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog text-primary"
          role="document"
        >
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5
                id="exampleModalLabel"
                class="modal-title"
              >
                <span>刪除資料</span>
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
              是否刪除選擇的圖片 (刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
              <div>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-if="status === 'delStorage'"
                  @click="delStorage"
                >
                  確認刪除
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-else
                  @click="delSlected"
                >
                  確認刪除全部
                </button>
              </div>
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
  name: 'Storages',
  components: {
    Pagination
  },
  data () {
    return {
      isLoading: false,
      storages: [],
      pagination: {},
      tempStorage: {},
      selected: [],
      status: '',
      checkboxs: [],
      isCheck: false,
      messages: [
        {
          name: '失敗',
          content: '出現錯誤'
        },
        {
          name: '刪除成功',
          content: '已刪除圖片'
        }
      ]
    }
  },
  methods: {
    getStorages (num = 1) { // 帶上分頁的參數
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage?page=${num}`
      this.$http.get(url)
        .then(res => {
          // console.log(res)
          this.storages = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch(() => {
          this.$bus.$emit('push-messages', this.messages[0])
          $('.l-toast').toast('show')
          this.isLoading = false
        })
    },
    openModelDel (status, item) {
      this.status = status
      $('#deleteModal').modal('show')
      // console.log(item)
      // this.tempStorage = { ...item } // 把陣列從 [1,2,3,4,5] 轉換成 1,2,3,4,5
      this.tempStorage = item
    },
    delStorage () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${this.tempStorage.id}`
      this.$http.delete(url)
        .then(() => {
          $('#deleteModal').modal('hide')
          this.$bus.$emit('push-messages', this.messages[1])
          $('.l-toast').toast('show')
          this.getStorages()
          this.isLoading = false
        })
    },
    getCheckedValues () { // 抓出已選擇的 checkbox for 的寫法
      this.selected = []
      const checkboxs = document.querySelectorAll("input[type='checkbox']")
      // for (var i = 0; i < checkboxs.length; i++) {
      //   if (checkboxs[i].checked) {
      //     this.selected.push(checkboxs[i].value)
      //   }
      // }
      checkboxs.forEach(element => {
        if (element.checked) {
          this.selected.push(element.value)
        }
      })
      // console.log('selected a', this.selected)
    },
    delSlected () {
      this.isLoading = true
      this.getCheckedValues()
      // 先抓出已選擇的 checkbox
      // const checkboxs = document.querySelectorAll("input[type='checkbox']")
      // checkboxs.forEach(element => {
      //   if (element.checked) {
      //     this.selected.push(element.value)
      //   }
      // })
      // console.log(this.selected)
      // 刪除選擇的圖片
      this.selected.forEach(item => {
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${item}`
        // console.log(url)
        this.$http.delete(url)
          .then(() => {
            this.$bus.$emit('push-messages', this.messages[1])
            $('.l-toast').toast('show')
            this.isLoading = false
          })
      })
      $('#deleteModal').modal('hide')
      this.getStorages()
      // console.log(this.selected)
    }
  },
  created () {
    this.getStorages()
  }
}
</script>
