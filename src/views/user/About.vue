<template>
  <div class="l-about">
    <div class="container my-5">
      <div class="row position-relative">
        <div class="col-12">
          <img class="mb-5" src="@/../public/images/apothecary-87-6uTS4cpkqjM-unsplash.jpg" alt="">
        </div>
        <div class="l-about__bg">
          <div class="l-about__text position-absolute p-5">
            <p class="l-about__text__item font-weight-light letter-spacing-l line-height-m">
              FOREST 的香氛系列是以單方植物作主要基底，加上其他植物成份所調配出來的蠟燭及精油香氛，
              全系列商品都以歐洲進口精油與天然植物調香以及植物萃取成分。
            </p>
            <p class="l-about__text__item font-weight-light letter-spacing-l line-height-m">
              精油在芳香調理的應用上非常廣泛。如果把精油噴灑在空氣中，有些精油能振奮我們的情緖，有些則能讓人穩定心神。除了對情緒的益處之外，噴灑精油還能凈化空氣，去除令人不悅的氣味和空氣中的雜質。
            </p>
            <p class="l-about__text__item font-weight-light letter-spacing-l line-height-m">
              我們相信香氛能創造記憶，希望讓每一種香氛味道變成生活中的一種專屬的記憶，每一個味道也代表著現在與未來的故事進行式。
            </p>
            <!-- <hr style="margin-bottom:5rem"> -->
            <!-- <p class="l-about__text__item line-height-m">
              天然精油是由植物的花、葉、果實、枝幹、根莖、樹脂... 等提煉萃取，將植物所蘊含的養份與精華，完全保留下來，天然香氛能使身體獲得活力與滋養， 更能讓心靈在無形之中，得到安定的力量。
              天然香氛像植物一般具有相互融合的特性，你可以盡情發揮創意，在同一個空間同時點燃2-3款香氛蠟燭，讓空氣的流動自然融合香氣，你會發現，每一次的香氛融合都會創造出不一樣的驚喜。你也可以同時使用2-3款不同的按摩精油蠟燭或滋潤香膏，來為自己創造出具有個人風格的香氛。
            </p> -->
            <p class="l-about__text__item font-weight-light letter-spacing-l line-height-m">植物在大自然中如何生長，我們忠實地將植物香氣傳遞到您的手上。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
gsap.registerPlugin(TextPlugin, ScrollTrigger)

export default {
  methods: {
    textAnimation () {
      gsap.from('.l-about__text__item', {
        opacity: 0,
        ease: 'power3.out',
        y: 40,
        duration: 3,
        stagger: 1
      })
    }
  },
  mounted () {
    this.textAnimation()
  }
}
</script>

<style lang="scss" scoped>
.l-about__text{
  // background-image: url(../../../public/images/apothecary-87-6uTS4cpkqjM-unsplash.jpg);
  // background-size: 100%;
  // background-repeat: no-repeat;
  // background-position: bottom center;
  background-color: rgba(0,0,0,0.7);
  width: 50%;
  top: 30%;
  left: 75%;
}
</style>
