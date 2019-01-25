<template>
    <div>
        <header-top></header-top>
        <Header></Header>
        <div class="goodSaleDiv">
            <div class="img_box"></div>
            <!-- 商品区 -->
            <div class="goods_Div banxin">
                <div class="time_banner">
                    <div class="swiper-container timeBanner">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 0 }" @click="toggleBranner(0)">8:00<span>进行中</span></div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 1 }" @click="toggleBranner(1)">10:00</div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 2 }" @click="toggleBranner(2)">12:00</div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 3 }" @click="toggleBranner(3)">明日8:00</div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 4 }" @click="toggleBranner(4)">明日10:00</div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 5 }" @click="toggleBranner(5)">明日12:00</div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 6 }" @click="toggleBranner(6)">明日18:00</div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 7 }" @click="toggleBranner(7)">明日20:00</div>
                        </div>
                        <div class="swiper-button-prev swiper-button-black"></div><!--左箭头-->
                        <div class="swiper-button-next swiper-button-black"></div><!--右箭头-->
                    </div>
                </div>
                <ul>
                    <!-- 进行中 -->
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                            <img class="imgIcon" src="../../../assets/common/activity/ingIcon.png" alt="">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                        </div>
                        <div class="endTime-Div">
                            <div class="count_down">
                                <span class="written">距结束</span>
                                <div class="count_down_box"><count-down></count-down></div>
                            </div>
                            <el-button  class="goods_buy_btn">立即购买</el-button>
                        </div>
                    </li>
                    <!-- 已参与 -->
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                        </div>
                        <div class="endTime-Div">
                            <div class="count_down">
                                <span class="written">距结束</span>
                                <div class="count_down_box"><count-down></count-down></div>
                            </div>
                            <el-button  class="goods_buy_btn partake">已参与</el-button>
                        </div>
                    </li>
                    <!-- 已抢光 -->
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                        </div>
                        <div class="endTime-Div">
                            <div class="count_down">
                                <span class="written">距结束</span>
                                <div class="count_down_box"><count-down></count-down></div>
                            </div>
                            <el-button  class="goods_buy_btn partake">已抢光</el-button>
                        </div>
                    </li>
                    <!-- 敬请期待 -->
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                            <img class="imgIcon" src="../../../assets/common/activity/begin.png" alt="">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                        </div>
                        <div class="endTime-Div beginMinute">
                            <a href="javascript:void(0);">敬请期待</a>
                        </div>
                    </li>
                    <!-- 进行中 -->
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                            <img class="imgIcon" src="../../../assets/common/activity/ingIcon.png" alt="">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                        </div>
                        <div class="endTime-Div">
                            <div class="count_down">
                                <span class="written">距结束</span>
                                <div class="count_down_box"><count-down></count-down></div>
                            </div>
                            <el-button  class="goods_buy_btn">立即购买</el-button>
                        </div>
                    </li>
                    <!-- 进行中 -->
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                            <img class="imgIcon" src="../../../assets/common/activity/ingIcon.png" alt="">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                        </div>
                        <div class="endTime-Div">
                            <div class="count_down">
                                <span class="written">距结束</span>
                                <div class="count_down_box"><count-down></count-down></div>
                            </div>
                            <el-button  class="goods_buy_btn">立即购买</el-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
    import Swiper from "swiper";
    import CountDown from '../../../components/CountDown.vue'
    export default {
        data() {
            return {
                isActiveNUm: 0,
            }
        },
        mounted(){
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        },
        methods:{
            toggleBranner(index){
                this.isActiveNUm = index
            }
        },
        components:{
            CountDown,
        }
    }
</script>

<style scoped lang="scss">
    .goodSaleDiv{
        .img_box {
            background: url(../../../assets/common/activity/seckillTimeBG.png) no-repeat top center;
            width: 100%;
            height: 993px;
        }
        .time_banner{
            border-radius: 10px;
            .swiper-container {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 0 80px;
                border-radius: 10px;
            }
            .swiper-slide {
                text-align: center;
                font-size: 18px;
                background: #fff;
                /* Center slide text vertically */
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                align-items: center;
            }
            .active{
                background-color: #e51818;
                color: #fff;
            }
            .swiper-button-prev,.swiper-button-next{
                top: 0;
                bottom: 0;
                width: 80px;
                height: 80px;
                margin-top: 0;
                background-color: #fff;
                background-size: 19px 19px;
            }
            .swiper-button-prev{
                left: 0;
                border-radius: 10px 0 0 5px;
                box-shadow: 5px 0 10px rgba(226,224,224,0.84);
            }
            .swiper-button-next{
                right: 0;
                border-radius: 0 10px 10px 0;
                box-shadow: -5px 0 5px rgba(226,224,224,0.84);
            }
        }
        .goods_Div{
            background-color:#f5f5f5;
            margin-top: -533px;
            border-radius: 10px 10px 0 0;
            .time_banner{
                height: 80px;
                margin-bottom: 30px;
                background-color: #fff;
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    width: 386px;
                    height: 537px;
                    background-color: #fff;
                    margin-right: 21px;
                    margin-bottom: 20px;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    .goods_img{
                        height: 346px;
                        width: 346px;
                        padding: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        img{
                            max-height: 100%;
                            max-width: 100%;
                        }
                        .imgIcon{
                            position: absolute;
                            top: 20px;
                            right: 20px;
                        }
                    }
                    .goods_info{
                        padding: 0 20px;
                        p{
                            margin-bottom: 16px;
                        }
                        .goods_title{
                            font-size: 16px;
                            color: #333;
                            line-height: 24px;
                        }
                        .goods_price{
                            color: #e51818;
                            font-size: 24px;
                            .old_price{
                                color: #999;
                                font-size: 16px;
                                text-decoration: line-through;
                            }
                        }
                    }
                    .endTime-Div{
                        height: 48px;
                        padding-left: 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: url(../../../assets/common/activity/countDown.png) no-repeat;
                        .count_down{
                            position: relative;
                            .written{
                                color: #fff;
                                font-size: 16px;
                            }
                            .count_down_box{
                                width: 142px;
                                height: 26px;
                                position: absolute;
                                top: 63%;
                                left: 64px;
                                transform: translateY(-50%);
                                -webkit-transform: translateY(-50%);    /* for Chrome || Safari */
                                -moz-transform: translateY(-50%);       /* for Firefox */
                                -ms-transform: translateY(-50%);        /* for IE */
                                -o-transform: translateY(-50%);
                                & /deep/ .countDivComponents{
                                    height: 26px;
                                    span{
                                        width: 24px;
                                        height: 26px;
                                        line-height: 26px;
                                        font-size: 18px;
                                        color: #eb1023;
                                        margin-right: 29px;
                                        padding-left: 5px;
                                    }
                                }
                            }
                        }
                        .goods_buy_btn {
                            height: 48px;
                            width: 125px;
                            font-size: 18px;
                            color: #fff;
                            border: 1px solid #ef910b;
                            background-color: #ef910b;
                        }
                        // 已参与
                        .partake{
                            border: 1px solid #734549;
                            background-color: #734549;
                        }
                    }
                    // 敬请期待
                    .beginMinute{
                        text-align: center;
                        line-height: 48px;
                        background: url(../../../assets/common/activity/beginBottom.png) no-repeat;
                        padding-left: 0;
                        a{
                            display: block;
                            width: 100%;
                            height: 100%;
                            color: #fff;
                            font-size: 20px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
</style>