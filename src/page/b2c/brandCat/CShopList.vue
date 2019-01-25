<template>
    <div class="AShopInfo">
        <header-top></header-top>
        <!-- 顶部 -->
        <div class="shop_top">
            <div class="banxin">
                <div class="shop_top_left fl">
                    <img src="../../../assets/common/logo.png" alt="">
                    <div class="shop_left_shop">
                        <span class="shop_top_name">店铺：不二家官方旗舰店</span>
                        <span class="shop_category">批发</span>
                        <div class="evaluateStart fr"><span class="write fl">评分</span><el-rate v-model="value5" :colors="['#e51818', '#e51818', '#e51818']" disabled disabled-void-color="#bbbbbb"></el-rate></div>
                    </div>
                </div>
                <div class="shop_top_right fr">
                    <div class="search_box">
                        <input type="search" id="" placeholder="">
                        <span><img src="../../../assets/common/search.png"></span>
                    </div>
                    <div class="shop_collection">
                        <p class="fr"> <img src="../../../assets/common/shop/shopErwei.png" alt=""> 用手机逛逛</p>
                        <p class="fr collection">收藏店铺</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 头部 -->
        <div class="shop_header">
            <div class="shop_header_name banxin">
                <div class="shopName"><img src="../../../assets/common/shop/shopName.png" alt=""></div>
                <div class="shopCategory">
                    <div class="allShop" @click="toggleBranner(catAll)">{{ catAll.cat_name }}</div>
                    <div class="category">
                        <div class="swiper-container timeBanner">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" 
                                  v-for="item in catList" :key="item.index"
                                   @click="toggleBranner(item)"
                                > 
                                    <span :class="{ active: isActiveNUm == item.cat_id }">{{ item.cat_name }}</span>
                                </div>
                            </div>
                            <div class="swiper-button-prev swiper-button-white"></div><!--左箭头-->
                            <div class="swiper-button-next swiper-button-white"></div><!--右箭头-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品展示列表 -->
        <div class="shop_content banxin">
            <ul>
                <li>
                    <div class="goodsImg"><img src="../../../assets/images/b2b/banner.jpg" alt=""></div>
                    <div class="goodsInfo">
                        <p class="goodsPrice"> <img src="../../../assets/common/shop/combination.png" alt=""> ￥<span>567.0</span></p>
                        <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱</p>
                        <span class="goodsEvaluate">已有 <span>109873</span>人评论</span>
                         <el-button class="detail_btn">立即购买</el-button>
                    </div>
                </li>
                <li>
                    <div class="goodsImg"><img src="../../../assets/common/activity/goods1.png" alt=""></div>
                    <div class="goodsInfo">
                        <p class="goodsPrice"> <img src="../../../assets/common/shop/seckill.png" alt=""> ￥<span>567.0</span></p>
                        <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱</p>
                        <span class="goodsEvaluate">已有 <span>109873</span>人评论</span>
                        <a class="addShopCar" href="javascript:void(0);"><img src="../../../assets/images/common/add_shopcar.png" alt=""></a>
                    </div>
                </li>
                <li>
                    <div class="goodsImg"><img src="../../../assets/images/b2b/banner.jpg" alt=""></div>
                    <div class="goodsInfo">
                        <p class="goodsPrice"> <img src="../../../assets/common/shop/combination.png" alt=""> ￥<span>567.0</span></p>
                        <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱</p>
                        <span class="goodsEvaluate">已有 <span>109873</span>人评论</span>
                        <a class="addShopCar" href="javascript:void(0);"><img src="../../../assets/images/common/add_shopcar.png" alt=""></a>
                    </div>
                </li>
                <li>
                    <div class="goodsImg"><img src="../../../assets/images/b2b/banner.jpg" alt=""></div>
                    <div class="goodsInfo">
                        <p class="goodsPrice"> <img src="../../../assets/common/shop/combination.png" alt=""> ￥<span>567.0</span></p>
                        <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱</p>
                        <span class="goodsEvaluate">已有 <span>109873</span>人评论</span>
                        <a class="addShopCar" href="javascript:void(0);"><img src="../../../assets/images/common/add_shopcar.png" alt=""></a>
                    </div>
                </li>
                <li>
                    <div class="goodsImg"><img src="../../../assets/images/b2b/banner.jpg" alt=""></div>
                    <div class="goodsInfo">
                        <p class="goodsPrice"> <img src="../../../assets/common/shop/combination.png" alt=""> ￥<span>567.0</span></p>
                        <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱</p>
                        <span class="goodsEvaluate">已有 <span>109873</span>人评论</span>
                        <a class="addShopCar" href="javascript:void(0);"><img src="../../../assets/images/common/add_shopcar.png" alt=""></a>
                    </div>
                </li>
                <li>
                    <div class="goodsImg"><img src="../../../assets/images/b2b/banner.jpg" alt=""></div>
                    <div class="goodsInfo">
                        <p class="goodsPrice"> <img src="../../../assets/common/shop/combination.png" alt=""> ￥<span>567.0</span></p>
                        <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱</p>
                        <span class="goodsEvaluate">已有 <span>109873</span>人评论</span>
                        <a class="addShopCar" href="javascript:void(0);"><img src="../../../assets/images/common/add_shopcar.png" alt=""></a>
                    </div>
                </li>
                <li>
                    <div class="goodsImg"><img src="../../../assets/images/b2b/banner.jpg" alt=""></div>
                    <div class="goodsInfo">
                        <p class="goodsPrice"> <img src="../../../assets/common/shop/combination.png" alt=""> ￥<span>567.0</span></p>
                        <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱</p>
                        <span class="goodsEvaluate">已有 <span>109873</span>人评论</span>
                        <a class="addShopCar" href="javascript:void(0);"><img src="../../../assets/images/common/add_shopcar.png" alt=""></a>
                    </div>
                </li>
                <li>
                    <div class="goodsImg"><img src="../../../assets/images/b2b/banner.jpg" alt=""></div>
                    <div class="goodsInfo">
                        <p class="goodsPrice"> <img src="../../../assets/common/shop/combination.png" alt=""> ￥<span>567.0</span></p>
                        <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱</p>
                        <span class="goodsEvaluate">已有 <span>109873</span>人评论</span>
                        <a class="addShopCar" href="javascript:void(0);"><img src="../../../assets/images/common/add_shopcar.png" alt=""></a>
                    </div>
                </li>
            </ul>
        </div>
        <Footer></Footer>
        <footer-bottom></footer-bottom>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import { b2cMemberProductList,b2cStoreDetail } from '../../../api/index.js'
    export default {
        data() {
            return {
                brandId: this.$route.params.brandId,
                isActiveNUm: '',
                value5: 4,
                catList:[],
                catAll:'',//全部
            }
        },
        created(){
            this.getshopInfo()
            this.getshopList()
        },
        updated(){
            this.swiperMethod()
        },
        methods:{
            swiperMethod(){
                var swiper = new Swiper('.swiper-container', {
                    slidesPerView: 5,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            },
            toggleBranner(item){
                this.isActiveNUm = item.cat_id
                this.getshopList()
            },
            // 店铺详情
            getshopInfo(){
                let params = {
                    brand_member_id	: this.brandId
                }
                b2cStoreDetail(params).then(res=>{
                    console.log(res)
                    if(res.code == 0){
                        this.catList = res.data.cat
                        this.catAll = res.data.cat_all
                        this.isActiveNUm =  this.catAll.cat_id
                    }
                })
            },
            // 店铺商品列表
            getshopList(){
                let params = {
                    brand_member_id:this.brandId,
                    cat_id: this.isActiveNUm
                }
                b2cMemberProductList(params).then(res=>{
                    console.log(res)
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .AShopInfo{
        background-color: #efefef;
    }
    .shop_top{
        height: 110px;
        background-color: #ccc;
        .shop_top_left{
            margin-top: 20px;
            .shop_left_shop{
                padding-top: 10px;
                .shop_top_name{
                    font-size: 16px;
                    color: #333;
                    margin-right: 20px;
                }
                .shop_category{
                    background-color: #e51818;
                    color: #fff;
                    font-size: 18px;
                    padding: 4px 15px;
                    border-radius: 4px;
                }
                .evaluateStart{
                    background-color: rgba(0,0,0,0.38);
                    border-radius: 13px;
                    margin-left: 10px;
                    padding:2px 13px;
                    width: 165px;
                    .write{
                        color: #fff;
                        line-height: 20px;
                        padding-right: 10px;
                    }
                }
            }
        }
        .shop_top_right{
            .search_box {
                height: 50px;
                margin-top: 10px;
                display: flex;
                input {
                outline: none;
                border: 1px solid #e51818;
                width: 383px;
                height: 100%;
                font-size: 16px;
                color: #aaa;
                }
                span {
                display: inline-block;
                width: 82px;
                height: 100%;
                background-color: #e51818;
                display: flex;
                justify-content: center;
                align-items: center;
                }
            }
            .shop_collection{
                margin-top: 20px;
                p{
                    font-size: 16px;
                    color: #333;
                    img{
                        vertical-align: middle;
                        max-width: 22px;
                    }
                }
                .collection{
                    margin-right: 30px;
                }
            }
        }
    }
    .shop_header{
        height: 294px;
        background: url(../../../assets/common/shop/shopBG.png) no-repeat top center;
        .shop_header_name{
            height: 100%;
            text-align: center;
            .shopName{
                padding-top: 60px;
            }
            .shopCategory{
                height: 50px;
                margin-top: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                .allShop{
                    width: 50px;
                    font-size: 24px;
                    color: #fff;
                    font-weight: bold;
                    margin-right: 80px;
                    padding-bottom: 5px;
                    border-bottom: 5px solid #fff;
                }
                .category{
                    width: 850px;
                    .swiper-slide{
                        span{
                            color: #fff;
                        }
                        .active{
                            color: #e51818;
                        }
                    }
                }
            }
        }
    }
    .shop_content{
        margin-top: 20px;
        border-radius: 20px;
        ul{
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 20px;
            display: flex;
            flex-wrap: wrap;
            background-color: #fff;
            li{
                width: 230px;
                height: 420px;
                border: 1px solid #ddd;
                position: relative;
                @include common_li_hover;
                .goodsImg{
                    padding: 10px;
                    width: 210px;
                    height: 210px;
                    background-color: #ccc;
                    @include common_center;
                    img{
                        max-width: 100%;
                    }
                }
                .goodsInfo{
                    margin-top: 10px;
                    padding: 0 12px;
                    .goodsPrice{
                        font-size: 16px;
                        color: #df2926;
                        padding-bottom: 20px;
                        img{ 
                            vertical-align: top;
                        }
                        span{
                            font-size: 20px;
                        }
                    }
                    .goodsName{
                        font-size: 14px;
                        color:#333;
                        padding-bottom: 15px;
                    }
                    .goodsEvaluate{
                        font-size: 14px;
                        color: #999;
                        span{
                            color: #005aa0;
                            font-weight: bold;
                        }
                    }
                    .detail_btn {
                        width: 160px;
                        height: 40px;
                        padding: 0;
                        border-radius: 6px;
                        background-color: #e51818;
                        color: #fff;
                        position: absolute;
                        right: 35px;
                        bottom: 18px;
                    }
                }
            }
        }
    }
</style>