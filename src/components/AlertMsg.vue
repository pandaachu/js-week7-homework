<template>
  <div class="container d-flex justify-content-end">
    <div class="mt-5" style="position: fixed; min-width: 10rem; z-index: 11000;">
      <div
        class="l-toast toast fade hide"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-autohide="false"
      >
        <div class="l-toast__header toast-header">
          <strong class="mr-auto text-white">{{ message.name }}</strong>
          <button
            type="button"
            class="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span class="text-white" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          {{ message.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  data () {
    return {
      message: []
    }
  },
  created () {
    this.$bus.$on('push-messages', (message) => {
      // console.log(message)
      this.message = message
      setTimeout(() => {
        $('.toast').toast('hide')
      }, 8000)
    })
  }
}
</script>
