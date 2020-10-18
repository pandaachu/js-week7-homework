<template>
  <nav class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': pages.current_page === 1}">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        v-for="i in pages.total_pages" :key="i"
        :class="{ active: pages.current_page === i }">
          <a class="page-link" href="#" @click.prevent="updatePage(i)">{{ i }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled': pages.current_page === pages.total_pages }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: [],
      filePath: ''
    }
  },
  // 把外面的資料傳入
  props: ['pages'],
  // 切換頁
  methods: {
    updatePage (num) {
      // 要知道點的是哪個，所以上面要帶上 -> updatePage(i) ，這裡用 num 接收
      // console.log(num)
      this.$emit('update', num)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-item.disabled .page-link, .page-link {
    background-color: transparent;
}
.page-item.active .page-link {
  border: 1px solid #dee2e6;
}
</style>
