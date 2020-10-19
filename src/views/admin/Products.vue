
<template>
  <div class="container mt-3">
    <Loading :active.sync="isLoading"></Loading>
    <h2 class="text-primary">產品列表</h2>
    <div class="text-right mt-4">
        <button @click="openModal('new')" class="btn btn-primary">
          建立新的產品
        </button>
      </div>
      <table class="table table-striped text-primary mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th wid th="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price | money }}</td>
            <td>{{ item.price | money }}</td>
            <td>
              <span v-if="item.enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <!-- loadingBtn === item.id 會觸發 disabled -->
                <button
                  @click="openModal('edit', item)"
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  :disabled="loadingBtn === item.id"
                >
                編輯
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loadingBtn === item.id"></span>
                </button>
                <button
                  @click="openModal('delete', item)"
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @update="getProducts"></Pagination>
      <!-- pagination -->
      <!-- 前面是內層元件屬性名稱 ->pages,後面是外面傳住進來的資料名稱 -->
      <!-- 使用 updatePage 推送內層監聽事件， getProducts 接收外層所定義的函式-->
      <!-- <pagination :pages="pagination" @update="getProducts"></pagination> -->
      <!-- Modal -->
      <div
        id="productModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <ProductModal
          :tem-product="temProduct" :is-new="isNew" :status="status"
          @update="getProducts"
        >
        </ProductModal>
        <!-- <upload-image
          :tem-product="temProduct" :is-new="isNew" :status="status"
          @update="getProducts"
        >
        </upload-image> -->
      </div>
      <DelProductModal :tem-product="temProduct" @update="getProducts"></DelProductModal>
  </div>
</template>

<script>
/* global $ */
import DelProductModal from '@/components/admin/DelProductModal.vue'
import ProductModal from '@/components/admin/ProductModal.vue'
// import UploadImage from '../../components/UploadImage.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Products',
  components: {
    DelProductModal,
    ProductModal,
    // UploadImage,
    Pagination
  },
  data () {
    return {
      temProduct: {
        imageUrl: [] // 資料結構
      }, // 用來存寫進來的 products 物件
      status: {
        fileUploading: false
      },
      isLoading: false,
      pagination: {}, // 存放頁碼
      products: [],
      // openModal 的變數
      isNew: false,
      loadingBtn: '',
      messages: [
        {
          name: '失敗',
          content: '出現錯誤'
        }
      ]
    }
  },
  props: ['token'],
  methods: {
    openModal (isNew, item) {
      // 觸發時帶入參數
      switch (
        isNew // 判斷 modal 一個一個打開
      ) {
        case 'new': // 判斷時看參數
          this.temProduct = { imageUrl: [] }
          this.isNew = true
          $('#productModal').modal('show')
          break
        case 'edit':
          this.isLoading = true
          this.loadingBtn = item.id
          // 列表的資料有缺 description，所以要重新取得單一產品資料
          // 這裡不能用 const
          var url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`
          // console.log(item);
          this.$http.get(url)
            .then(res => {
              this.temProduct = res.data.data
              $('#productModal').modal('show')
              this.loadingBtn = '' // 清除
              this.isLoading = false
            })
          this.isNew = false
          // 打開 modal 先 copy 這個產品資料到 temProduct
          // 淺拷貝 -> Object.assign({}, 要插入的值)
          // this.temProduct = Object.assign({}, item); // item = edit 傳來的資料
          break
        case 'delete':
          this.temProduct = Object.assign({}, item) // 抓到要刪除的產品名稱顯示在 modal
          $('#delProductModal').modal('show')
          break
        default:
          break
      }
    },
    getProducts (num = 1) {
      this.isLoading = true
      // 帶上分頁：
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${num}`
      this.$http
        .get(url)
        .then(res => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
          // 如果 id 存在
          if (this.temProduct.id) {
            this.temProduct = {
              imageUrl: [] // 資料結構
            } // 把 temProduct 清除，避免重覆觸發
            $('#productModal').modal('hide')
          }
        })
        .catch(() => {
          this.$bus.$emit('push-messages', this.messages[0])
          $('.l-toast').toast('show')
          this.isLoading = false
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
