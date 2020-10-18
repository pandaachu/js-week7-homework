<template>
  <div class="l-productModal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0 text-primary">
        <div class="modal-header bg-dark">
          <h5 id="exampleModalLabel" class="modal-title text-white">
            <span>新增產品</span>
          </h5>
          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div>
                <div v-if="!temProduct.id" id="my-strictly-unique-vue-upload-multiple-image" style="display: flex; justify-content: center;">
                  <vue-upload-multiple-image
                    @upload-success="uploadImageSuccess"
                    @before-remove="beforeRemove"
                    @edit-image="editImage"
                    :data-images="images"
                    idUpload="myIdUpload"
                    editUpload="myIdEdit"
                    dragText="HI"
                    browseText="圖片不可超過 2 MB"
                    primaryText="默認圖片"
                    markIsPrimaryText="設為默認圖片"
                    popupText="該圖像將默認顯示"
                    ></vue-upload-multiple-image>
                </div>
                <div v-else>
                  <vue-upload-multiple-image
                    @before-remove="beforeRemove"
                    @edit-image="editImage"
                    :data-images="images"
                    idUpload="myIdUpload"
                    editUpload="myIdEdit"
                    dragText="HI"
                    browseText="圖片不可超過 2 MB"
                    primaryText="默認圖片"
                    markIsPrimaryText="設為默認圖片"
                    popupText="該圖像將默認顯示"
                    ></vue-upload-multiple-image>
                </div>
              </div>
                  <!-- <div v-for="i in temProduct.imageUrl" :key="i + 'img'" class="form-group">
                    <img :src="temProduct.imageUrl" class="img-fluid" alt />
                  </div> -->
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  v-model="temProduct.title"
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    v-model="temProduct.category"
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="unit" >單位</label>
                  <input
                    v-model="temProduct.unit"
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    v-model="temProduct.origin_price"
                    id="origin_price"
                    type="number"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    v-model="temProduct.price"
                    id="price"
                    type="number"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />
              <div class="form-group">
                <label for="content">產品描述</label>
                <textarea
                  v-model="temProduct.content"
                  id="content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="description">說明內容</label>
                <textarea
                  v-model="temProduct.description"
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                ></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    id="enabled"
                    class="form-check-input"
                    type="checkbox"
                    v-model="temProduct.enabled"
                  />
                  <label class="form-check-label" for="enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
            取消
          </button>
          <button @click="updateProduct" type="button" class="btn btn-primary">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
/* global $ */
import VueUploadMultipleImage from 'vue-upload-multiple-image'

export default {
  components: {
    VueUploadMultipleImage
  },
  data () {
    return {
      images: [],
      imageUrl: [],
      filePath: ''
    }
  },
  // 要把外層的 api 傳進來
  props: ['isNew', 'temProduct', 'status'],
  methods: {
    uploadImageSuccess (formData, index, fileList) {
      console.log('data', formData, index, fileList)
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove (index, done, fileList) {
      console.log('index', index, fileList)
      var r = confirm('remove image')
      if (r === true) {
        done()
      } else {
      }
    },
    editImage (formData, index, fileList) {
      console.log('edit data', formData, index, fileList)
    },
    onChange () {
      console.log('New picture selected!')
      if (this.$refs.pictureInput.image) {
        console.log('Picture loaded.')
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    // 上傳產品資料
    updateProduct () {
      // 新增商品
      // this.isNew = true; 要符合此條件
      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product`
      let axiosMethod = 'post'
      // 如果不是新增產品 -> 編輯產品
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.temProduct.id}`
        axiosMethod = 'patch'
      }
      this.$http[axiosMethod](api, this.temProduct).then(() => {
        $('#productModal').modal('hide')
        this.$emit('update')
      }).catch((error) => {
        console.log(error)
      })
    },
    uploadFile () {
      // 選取 DOM 中的檔案資訊
      // 取得 DOM 物件
      const uploadedfile = document.querySelector('#customFile').files[0]
      // const uploadedfile = this.$refs.file.files[0];
      // files 屬性
      // console.dir(uploadedfile)

      // 轉成 Form Data ( 固定寫法 )
      const formData = new FormData()
      formData.append('file', uploadedfile) // 加新的欄位 -> 對應 API

      // 路由、驗證
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`

      // 利用狀態碼製作上傳東西時顯示 loading 圖示的做法，之後可應用在各頁面之讀取
      this.status.fileUploading = true

      // 透過 Ajax 上傳
      this.$http.post(url, formData, {
        headers: { // 聲明這段內容要傳送的時候必需使用 formData 格式
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response)
          // 接到參數後關閉 loading 圖示
          this.status.fileUploading = false
          // 把路徑帶到畫面
          if (response.status === 200) {
            this.temProduct.imageUrl.push(response.data.data.path)
          }
          // 圖片上傳有大小限制，過度使用會被停權
        })
        .catch(() => {
          console.log('上傳不可超過 2 MB')
          this.status.fileUploading = false
        })
    }
  }
  // mounted () {
  //   console.log('temProduct', this.temProduct)
  // },
  // computed: {
  //   productFilter () {
  //     const oldProduct = this.temProduct.filter(item => {
  //       return item.imageUrl
  //     })
  //     // console.log(oldProduct)
  //     return oldProduct
  //   }
  // }
}
</script>
