<template>
<div class="imageFrameGroup__frame">
  <svg id="border" data-name="border" class="svgIcon-border" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 534 534">
    <defs>
      <!-- <style>.cls-1{fill:#e68e20;}</style> -->
      <mask id="theMask">
        <rect id="theSquare" class="theSquare" x="0" y="-534" width="534" height="534" fill="#fff" />
      </mask>
    </defs>
    <g id="toBeRevealed" mask="url(#theMask)" fill="#e68e20">
      <polygon class="svgIcon-border__border" points="2 266.9 266.16 1.26 266.99 0.42 267.84 1.26 301.14 34.19 334.33 67.23 400.5 133.5 466.41 200.04 499.26 233.41 532 266.9 531.79 267.11 498.31 234.37 464.94 201.51 398.4 135.61 332.12 69.43 299.08 36.25 266.16 2.95 267.84 2.95 2.21 267.11 2 266.9"/>
      <polygon class="svgIcon-border__border" points="532 267.95 267.84 533.59 267.01 534.42 266.16 533.59 232.86 500.66 199.67 467.62 133.5 401.35 67.59 334.8 34.73 301.44 2 267.95 2.21 267.74 35.69 300.48 69.06 333.34 135.6 399.24 201.88 465.42 234.92 498.6 267.84 531.9 266.16 531.9 531.79 267.74 532 267.95"/>
    </g>
  </svg>
</div>
</template>

<script>
// /* global $ */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export default {
  name: 'imageFrameGroup__frame',
  methods: {
    showBorder () {
      gsap.utils.toArray('.imageFrameGroup__frame').forEach((section) => {
        gsap.to(section.querySelector('.theSquare'), {
          scrollTrigger: {
            trigger: section,
            start: '-100px 80%',
            toggleActions: 'restart none none none'
            // markers: true
          },
          y: 534,
          duration: 3.5
        })
      })
    }
  },
  mounted () {
    this.showBorder()
  }
}
</script>

<style lang="scss" scoped>
  .svgIcon-border{
    &__border{
      fill:#e68e20;
      stroke: #e68e20;
    }
  }
</style>
