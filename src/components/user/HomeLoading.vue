<template>
  <div id="loading" class="l-loading">
    <div class="load-center">
      <div class="line-wrap">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <div id="progress-bar" class="load-line"></div>
  </div>
</template>

<script>
/* global $ */
import { gsap, Quart } from 'gsap'

export default {
  created () {
    const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
    this.$http
      .get(url)
      .then((res) => {
        // console.log(res)
        gsap.to('.load-line', 0.5, {
          width: '100%',
          ease: Quart.easeOut
        })
        gsap.to('#loading', 1, {
          delay: 2,
          display: 'none',
          autoAlpha: 0,
          ease: Quart.easeOut,
          onComplete: function () {
            // onComplete do something
            $('.l-home').addClass('on')
            // $('.l-navbar ').addClass('on')
            setTimeout(function () {
              $('.l-home__content').addClass('on')
              $('.l-home__carousel .container').addClass('on')
            }, 500)
          }
        })
      })
  }
}
</script>
