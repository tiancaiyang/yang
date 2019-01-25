<template>
    <div class="swiperDiv">
        <div class="swiper-container gallery-top">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in swiperData" :key="index"><img :src="item" alt=""></div>
            </div>
            
        </div>
        <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper thumbnail">
                <div class="swiper-slide" v-for="item in swiperData" :key="item.index"><img :src="item" alt=""></div>
            </div>
            <div class="swiper-button-next swiper-button-black"></div>
            <div class="swiper-button-prev swiper-button-black"></div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper";
    export default {
        data() {
            return {
                
            }
        },
        props: { swiperData:Array },
        updated(){
            this.swiperList()
        },
        methods:{
            swiperList(){
                var galleryThumbs = new Swiper('.gallery-thumbs', {
                    spaceBetween: 5,
                    slidesPerView: 4,
                    freeMode: true,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
                var galleryTop = new Swiper('.gallery-top', {
                    spaceBetween: 5,
                    watchSlidesVisibility: true,
                    thumbs: {
                        swiper: galleryThumbs
                    },
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .swiperDiv{
      position: relative;
      height: 430px;
      width: 350px;
    }
    body {
      background: #000;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color:#000;
      margin: 0;
      padding: 0;
    }

    .swiper-container {
      width: 100%;
      height: 300px;
      margin-left: auto;
      margin-right: auto;
    }
    .swiper-slide {
      background-size: cover;
      background-position: center;
        img{
          max-width: 100%;
          max-height: 100%;
        }
    }
    .gallery-top {
      height: 80%;
      width: 100%;
    }
    .gallery-thumbs {
      height: 20%;
      box-sizing: border-box;
      padding: 10px 40px 0;
    }
    .gallery-thumbs .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.6;
    }
    .gallery-thumbs .swiper-slide-thumb-active {
      opacity: 1;
    }
    .swiper-button-prev,.swiper-button-next{
        top: 20px;
        bottom: 0;
        width: 24px;
        height: 53px;
        margin-top: 0;
        border: 1px solid #eee;
        background-color: #fff;
        background-size: 19px 19px;
    }
    .swiper-button-prev{
        left: 0;
    }
    .swiper-button-next{
        right: 0;
    }

</style>