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
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 0 }" @click="toggleBranner(0)"><span>全部</span></div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 1 }" @click="toggleBranner(1)"><span>红酒</span></div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 2 }" @click="toggleBranner(2)"><span>白酒</span></div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 3 }" @click="toggleBranner(3)"><span>饮料</span></div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 4 }" @click="toggleBranner(4)"><span>方便面</span></div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 5 }" @click="toggleBranner(5)"><span>饼干</span></div>
                            <div class="swiper-slide" :class="{ active: isActiveNUm == 6 }" @click="toggleBranner(6)"><span>鞋子</span></div>
                        </div>
                        <div class="swiper-button-prev swiper-button-black"></div><!--左箭头-->
                        <div class="swiper-button-next swiper-button-black"></div><!--右箭头-->
                    </div>
                </div>
                <ul>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/common/activity/goods1.png">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0</p>
                            <div class="endTime-Div">
                               <div class="gift_Div">
                                   <span>赠品:</span>
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/more.png" alt="">
                               </div>
                               <router-link to="/common/ACombination/ACombinationInfo" tag="div"><el-button  class="goods_buy_btn">立即抢购</el-button></router-link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/common/activity/goods1.png">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0</p>
                            <div class="endTime-Div">
                               <div class="gift_Div">
                                   <span>赠品:</span>
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/more.png" alt="">
                               </div>
                               <el-button  class="goods_buy_btn">立即抢购</el-button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/common/activity/goods1.png">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0</p>
                            <div class="endTime-Div">
                               <div class="gift_Div">
                                   <span>赠品:</span>
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/more.png" alt="">
                               </div>
                               <el-button  class="goods_buy_btn">立即抢购</el-button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/common/activity/goods1.png">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0</p>
                            <div class="endTime-Div">
                               <div class="gift_Div">
                                   <span>赠品:</span>
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/more.png" alt="">
                               </div>
                               <el-button  class="goods_buy_btn">立即抢购</el-button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/common/activity/goods1.png">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0</p>
                            <div class="endTime-Div">
                               <div class="gift_Div">
                                   <span>赠品:</span>
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/more.png" alt="">
                               </div>
                               <el-button  class="goods_buy_btn">立即抢购</el-button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/common/activity/goods1.png">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0</p>
                            <div class="endTime-Div">
                               <div class="gift_Div">
                                   <span>赠品:</span>
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/goods1.png" alt="">
                                   <img src="../../../assets/common/activity/more.png" alt="">
                               </div>
                               <el-button  class="goods_buy_btn">立即抢购</el-button>
                            </div>
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
            background: url(../../../assets/common/activity/combination.png) no-repeat top center;
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
                span{
                    width: 100%;
                    border-right: 1px solid #e0e0e0;
                }
            }
            .active{
                background-color: #e51818;
                color: #fff;
                span{
                    border-right: 1px solid #e51818;
                }
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
                    height: 562px;
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
                        padding: 0 20px 20px;
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
                        }
                        .endTime-Div{
                            height: 48px;
                            line-height: 48px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .gift_Div{
                                height: 100%;
                                span{
                                    color: #999;
                                    font-size: 16px;
                                }
                                img{
                                    max-width: 48px;
                                    max-height: 48px;
                                    vertical-align: middle;
                                }
                            }
                            .goods_buy_btn {
                                height: 48px;
                                width: 125px;
                                border-radius: 4px;
                                font-size: 16px;
                                color: #fff;
                                border: 1px solid #e51818;
                                background-color: #e51818;
                            }
                        }
                    }
                }
            }
        }
    }
</style>