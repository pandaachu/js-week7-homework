<template>
  <div class="l-home text-secondary">
    <home-loading></home-loading>
    <!-- hero banner -->
    <section class="l-home__hero-1 p-relative">
      <div class="bg-img l-bg-no-repeat-tc l-bg-no-repeat-tc--shine">
        <img class="d-none d-md-block" style="width:100vw "
          src="@/../public/images/heroBannerHeight.gif"
          alt=""
        />
        <img class="d-block d-md-none" style="width:100vw "
          src="@/../public/images/heroBannerHeight_mb.gif"
          alt=""
        />
      </div>
      <div class="l-content l-home__content p-absolute">
        <h2 class="l-home__subtitle color-text mb-4 font-weight-lighter">
          生活，從美好開始
        </h2>
        <h2 class="l-home__title color-text">
          Life is <br class="d-block d-md-none"> Getting <br class="d-block d-md-none">  <span class="splitText"></span><br> with Forest
        </h2>
      </div>
    </section>
    <!-- collection -->
    <section class="l-home__collection pt-md-5">
      <div class="container">
        <div class="row">
          <div class="col-12 titleGroup text-center pt-5">
            <h2
              class="titleGroup__title letter-spacing-l"
              data-aos="custom-fade-up"
              data-aos-duration="3000"
              data-aos-delay="400"
            >
              不同的方式
            </h2>
            <h6
              class="titleGroup__suptitle letter-spacing-xxl font-weight-light"
              style="margin-left:20px"
              data-aos="custom-fade-up"
              data-aos-duration="3000"
              data-aos-delay="500"
            >
              體驗不同的香氣
            </h6>
          </div>
          <div class="col l-home__collection__slider d-flex flex-column">
            <router-link to="/collections-oil" class="hoverGroup d-flex flex-md-row flex-column align-items-center justify-content-md-around l-home__collection__slider-item text-secondary mb-5 pb-5">
              <img
                class="custom-border-bottom hoverGroup__image"
                data-aos="custom-fade-up"
                data-aos-duration="3000"
                data-aos-delay="200"
                src="@/../public/images/oil-collection.jpg" alt=""
              >
              <!-- <div
                style="width:350px"
                class="d-flex flex-column justify-content-center align-items-center mt-5"
                data-aos="custom-fade-left"
                data-aos-duration="2000"
                data-aos-delay="1500"
              >
                <h4 class="hoverGroup__underline letter-spacing-l pb-2 mb-4">精油系列</h4>
                <p class="font-weight-lighter letter-spacing-m">選用來自世界各地的天然素材製作，再經過傳統的水分蒸餾方法提取精油。
                每個步驟皆確保只有品質最高的精油能夠順利通過品質控制、品質保證，
                讓顧客每次收到的精油品質都是最好的。</p>
              </div> -->
              <section
                style="width:350px"
                class="contentScrollUp d-flex flex-column justify-content-center align-items-center mt-5"
              >
                <h4 class="contentScrollUp__item hoverGroup__underline letter-spacing-l pb-2 mb-4">精油系列</h4>
                <p class="contentScrollUp__item line-height-m font-weight-lighter letter-spacing-m">選用來自世界各地的天然素材製作，再經過傳統的水分蒸餾方法提取精油。
                每個步驟皆確保只有品質最高的精油能夠順利通過品質控制、品質保證，
                讓顧客每次收到的精油品質都是最好的。</p>
                <p class="hoverGroup__showText text-white font-m letter-spacing-l">看更多<i class="fas fa-long-arrow-alt-right font-s ml-3"></i></p>
              </section>
            </router-link>
            <router-link to="/collections-candle" class="hoverGroup d-flex flex-column align-items-center flex-md-row-reverse justify-content-md-around l-home__collection__slider-item text-secondary mb-5">
              <img
                class="custom-border-bottom hoverGroup__image"
                data-aos="custom-fade-up"
                data-aos-duration="3000"
                data-aos-delay="200"
                src="@/../public/images/candle-collection.jpg" alt=""
              >
              <!-- <div
                style="width:350px"
                class="d-flex flex-column justify-content-center align-items-center mt-5"
                data-aos="custom-fade-right"
                data-aos-duration="3000"
                data-aos-delay="1500"
              >
                <h4 class="hoverGroup__underline letter-spacing-l pb-2 mb-4">蠟燭系列</h4>
                <p class="font-weight-lighter letter-spacing-m">堅持只用全天然成分，採非基改大豆蠟、蜜蠟、椰子油、乳油木果脂、不含鉛的棉線燭芯、芳療級植物精油製成。</p>
              </div> -->
              <section
                style="width:350px"
                class="contentScrollUp d-flex flex-column justify-content-center align-items-center mt-5"
              >
                <h4 class="contentScrollUp__item hoverGroup__underline letter-spacing-l pb-2 mb-4">蠟燭系列</h4>
                <p class="contentScrollUp__item font-weight-lighter line-height-m  letter-spacing-m">堅持只用全天然成分，採非基改大豆蠟、蜜蠟、椰子油、乳油木果脂、不含鉛的棉線燭芯、芳療級植物精油製成。</p>
                <p class="hoverGroup__showText text-white font-m letter-spacing-l">看更多<i class="fas fa-long-arrow-alt-right font-s ml-3"></i></p>
              </section>
            </router-link>
          </div>
        </div>
      </div>
      <hr style="padding-bottom:8rem" class="m-0">
    </section>
    <!-- function -->
    <section class="l-home__function py-5">
      <div class="container ">
        <div class="titleGroup text-center">
          <h2
            class="titleGroup__title letter-spacing-l"
            data-aos="custom-fade-up"
            data-aos-duration="3000"
            data-aos-delay="400"
          >
            不同的場合
          </h2>
          <h6
            class="titleGroup__suptitle letter-spacing-xxl font-weight-light"
            style="margin-left:20px"
            data-aos="custom-fade-up"
            data-aos-duration="3000"
            data-aos-delay="500"
          >
            搭配不同的香氣
          </h6>
        </div>
        <div class="d-flex flex-column">
          <div>
            <div href="#" class="imageFrameGroup hoverGroup position-relative d-flex justify-content-center text-secondary mb-4 mb-md-0">
                <ImageFrame></ImageFrame>
                <h4
                  class="imageFrameGroup__title hoverGroup__underline position-absolute optimaNovaFont letter-spacing-xl hover-underline pb-2"
                  data-aos="custom-fade-up"
                  data-aos-duration="3000"
                  data-aos-delay="200"
                >
                  Sleep
                  <span class="h6">/ 睡眠</span>
                </h4>
                <p
                  class="hoverGroup__showText position-absolute m-0 text-center"
                  style="top:40%;transform: translateY(50%);z-index: 1;"
                >
                  難以進入睡眠狀態的時候， <br>
                  搭配寧神靜心的香味，<br>
                  讓香氣飄散到屋裡的每個角落，讓你安然入眠
                </p>
                <img class="imageFrameGroup__image hoverGroup__image position-absolute" src="@/../public/images/function/function-1.png" alt="">
            </div>
          </div>
          <div class="d-flex flex-column flex-md-row justify-content-md-center mt-md-n5">
            <div href="#" class="imageFrameGroup hoverGroup position-relative d-flex justify-content-center mr-0 mr-md-5 text-secondary mb-4 mb-md-0">
              <ImageFrame></ImageFrame>
              <h4
                class="imageFrameGroup__title hoverGroup__underline position-absolute optimaNovaFont letter-spacing-xl hover-underline pb-2"
                data-aos="custom-fade-up"
                data-aos-duration="3000"
                data-aos-delay="300"
              >
                Work
                <span class="h6">/ 工作</span>
              </h4>
              <p
                class="hoverGroup__showText position-absolute m-0 text-center"
                style="top:40%;transform: translateY(50%);z-index: 1;"
              >
                需要集中精神於工作時，<br>
                搭配提神、增加專注力的香味， <br>
                能夠讓你事半功倍，工作也能保持好心情
              </p>
              <img class="hoverGroup__image imageFrameGroup__image position-absolute" src="@/../public/images/function/function-2.png" alt="">
            </div>
            <div href="#" class="imageFrameGroup hoverGroup position-relative d-flex justify-content-center text-secondary mb-4 mb-md-0">
              <ImageFrame></ImageFrame>
              <h4
                class="imageFrameGroup__title hoverGroup__underline position-absolute optimaNovaFont letter-spacing-xl hover-underline pb-2"
                data-aos="custom-fade-up"
                data-aos-duration="3000"
                data-aos-delay="400"
              >
                Relax
                <span class="h6">/ 放鬆</span>
              </h4>
              <p
                class="hoverGroup__showText position-absolute m-0 text-center"
                style="top:40%;transform: translateY(50%);z-index: 1;"
              >
                在休閒的假日裡想放鬆的時候， <br>
                搭配柔和舒緩的香味， <br>
                隨時隨地放鬆轉換心情，過一個美好的假日！
              </p>
              <img class="hoverGroup__image imageFrameGroup__image position-absolute" src="@/../public/images/function/function-3.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <hr style="padding-bottom:9rem">
    </section>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
import HomeLoading from '@/components/user/HomeLoading.vue'
import ImageFrame from '@/components/user/ImageFrame.vue'
gsap.registerPlugin(TextPlugin, ScrollTrigger)

export default {
  components: {
    HomeLoading,
    ImageFrame
  },
  data () {
    return {
    }
  },
  methods: {
    titleAnimation () {
      const tl = gsap.timeline({ repeat: -1, yoyo: false, repeatDelay: 3 }) // 建立 timeline
      tl.to('.splitText', 3, {
        text: {
          value: 'Better'
        },
        delay: 0.5
      })
        .to('.splitText', 2, {
          text: {
            value: 'Fun'
          },
          delay: 0
        })
        .to('.splitText', 2, {
          text: {
            value: 'Peace'
          },
          delay: 0
        })
    },
    contentScrollUp () {
      gsap.utils.toArray('.contentScrollUp').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: '+=100%',
            toggleActions: 'restart none none none',
            // markers: true,
            // pin: true,
            scrub: true
          },
          opacity: 0,
          ease: 'power3.out',
          y: 80,
          // stagger: 0.5,
          duration: 2
        })
      })
    }
  },
  mounted () {
    this.titleAnimation()
    this.contentScrollUp()
  }
// export default {
//   created () {
//     const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
//     this.$http
//       .get(url)
//       .then((res) => {
//         console.log(res)
//       })
//     this.$bus.$on('onEvent', (para) => {
//       console.log('觸發 Event Bus', para)
//     })
//   }
// }
}
</script>
