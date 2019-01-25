<template>
    <div class="AShopInfo">
        <header-top></header-top>
        <Header></Header>
        <!-- 顶部 -->
        <div class="shop_top banxin">
            <div class="shop_top_left fl">
                <div class="shop_left_shop">
                    <span class="shop_top_name">店铺：{{ shopInfo.brand_store_name }}</span>
                    <span class="shop_category">{{ shopInfo.store_identification }}</span>
                    <div class="evaluateStart fr"><span class="write fl">评分</span><el-rate v-model="value5" :colors="['#e51818', '#e51818', '#e51818']" disabled disabled-void-color="#bbbbbb"></el-rate></div>
                </div>
            </div>
            <div class="shop_top_right fr">
                <div class="shop_collection">
                    <!-- <p class="fr"> <img src="../../../assets/common/shop/shopErwei.png" alt=""> 用手机逛逛</p> -->
                    <p v-if="isToken" @click="collectionGoods" :class='collectType == 1?"iconfont icon-shoucangshixin":"iconfont icon-shoucang"' class="fr collection">&nbsp;收藏店铺</p>
                    <p v-else  @click="nullToken" class="iconfont icon-shoucang fr collection">&nbsp;收藏店铺</p>
                </div>
            </div>
        </div>
        <!-- 头部 -->
        <div class="shop_header">
            <div class="shop_header_name banxin">
                <div class="shopName"><img :src="shopInfo.head_img" alt=""></div>
                <div class="shopCategory">
                    <div class="allShop" :class="isActiveNUm == catAll.cat_id ? 'allshopActive':''" @click="toggleBranner(catAll)">{{ catAll.cat_name }}</div>
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
                <li v-for="item in productList" :key="item.index">
                    <div class="goodsImg"><img :src="item.thumb" alt=""></div>
                    <div class="goodsInfo">
                        <p class="goodsPrice"> <img v-if="item.activity_type == 1" src="../../../assets/common/shop/combination.png" alt=""> ￥<span>{{ item.price }}</span></p>
                        <p class="goodsName">{{ item.title }}</p>
                        <span class="goodsEvaluate">已有 <span>{{ item.sale }}</span>人评论</span>
                         <el-button class="detail_btn" @click="goGoodsInfo(item)">立即购买</el-button>
                    </div>
                </li>
            </ul>
            <div><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
        </div>
        <Footer></Footer>
        <footer-bottom></footer-bottom>
    </div>
</template>

<script>
import Swiper from "swiper";
import { getStoreGoods,StoreDetail,publicCollect } from '../../../api/index.js'
export default {
    data() {
        return {
            brandId: this.$route.params.brandId,
            type: this.$route.params.type,
            shopInfo:[],//店铺数据
            isActiveNUm: '',//默认选中全部
            value5: 0,//评分
            catList:[],//分类数据
            catAll:'',//全部
            productList:[],//商品数据
            collectType: '',   // 商品收藏 1收藏 2取消收藏
            isToken:false,//判断是否登录
            page:0,
            limit:20,
            totalPage:0,
        }
    },
    created(){
        // 检测是否登录
        var token = localStorage.getItem('token');
        if(token){
            this.isToken = true
        }else{
            this.isToken = false
        }
        this.getshopInfo()
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
        //获取当前页码
        getCurrentPage(pageNum){
            this.page = pageNum-1;
            this.getBrowseHistory()
        },
        // 切换分类
        toggleBranner(item){
            this.isActiveNUm = item.cat_id
            this.page = 0
            this.getshopList()
        },
        // 店铺详情
        getshopInfo(){
            let params = {
                brand_member_id	: this.brandId,
                type: this.type,
            }
            console.log(params)
            StoreDetail(params).then(res=>{
                console.log(res)
                if(res.code == 0){
                    this.shopInfo = res.data
                    this.value5 = parseFloat(res.data.score)
                    this.catList = res.data.cat
                    this.catAll = res.data.cat_all
                    this.isActiveNUm =  this.catAll.cat_id
                    this.collectType = res.data.is_collection
                    this.getshopList()
                }
            })
        },
        // 店铺商品列表
        getshopList(){
            let params = {
                brand_member_id:this.brandId,
                type: this.type,
                cat_id: this.isActiveNUm,
                page: this.page,
                limit:this.limit
            }
            getStoreGoods(params).then(res=>{
                if(res.code == 0){
                    this.productList = res.data.goods_list
                    this.totalPage = parseInt(res.data.total_num)
                }
            })
        },
        // 商品详情跳转
        goGoodsInfo(item){
            if(item.type == 1){//B端
                let goodsData = {
                    product_id: item.product_id,
                    activity_type: item.activity_type,
                    activity_id: item.activity_id
                }
                this.$router.push({name: 'BProductDetail', query: goodsData})
            }else if(item.type == 2){//c端
                this.$router.push({name:'CProductDetail',params: { type: item.activity_type, activityId:item.activity_id, productId: item.product_id } })
            }
        },
        // 未登录
        nullToken(){
            this.$message({
                message: '您还未登录，请先登录',
                type: 'success'
            });
        },
        // 收藏
        collectionGoods () {
            if(this.collectType == 1) {
                this.collectType = 2 //2取消
            } else if (this.collectType == 2) {
                this.collectType = 1 //1收藏
            }
            let params = {
                id: this.brandId,
                type: this.type,
                collection_type: '3',//1商品 2文章 3店铺
                collect: this.collectType,
            }
            publicCollect(params).then(res=>{
                    if(res.code == 0){
                        if(this.collectType ==1){
                            this.$message({
                            message: '收藏成功',
                            type: 'success'
                            });
                        }else if(this.collectType ==2){
                            this.$message({
                            message: '取消收藏',
                            type: 'warning'
                            });
                        }
                    }
            })
        },
    },
}
</script>

<style scoped lang="scss">
    .AShopInfo{
        background-color: #efefef;
    }
    .shop_top{
        height: 70px;
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
                margin-top: 20px;
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
                .icon-shoucangshixin{
                    color: #e51818;
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
                height: 110px;
                @include common_center;
                img{
                    max-width:100%;
                    max-height:100%;
                }
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
                    cursor: pointer;
                }
                .allshopActive{
                    border-bottom: 5px solid #fff;
                }
                .category{
                    width: 850px;
                    .swiper-slide{
                        span{
                            color: #fff;
                            display: inline-block;
                            cursor: pointer;
                        }
                        .active{
                            padding-bottom: 5px;
                            border-bottom: 3px solid #fff;
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
                margin-bottom: 10px;
                border: 1px solid #ddd;
                position: relative;
                @include common_li_hover;
                .goodsImg{
                    padding: 10px;
                    width: 210px;
                    height: 210px;
                    background-color: #fff;
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