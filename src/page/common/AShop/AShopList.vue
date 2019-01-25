<template>
    <div class="AShopList">
        <header-top></header-top>
        <Header></Header>
        <div class="shopList_Div">
            <!-- 头部面包屑 -->
            <div class="user_center_navbtn banxin">
                <a>搜索</a>
                <span class="el-icon-arrow-right"></span>
                <a>店铺列表</a>
            </div>
            <!-- 店铺列表 -->
            <div class="shopList banxin">
                <div class="shopList_tabs">
                    <div class="shopList_box">
                        <ul>
                            <li v-for="item in shopList" :key="item.index">
                                <div class="shopName">
                                    <div class="shopIcon fl"><img :src="item.head_img" alt=""></div>
                                    <h2>{{ item.brand_store_name }}</h2>
                                </div>
                                <div class="shopImg">
                                    <div @click="goGoodsInfo(items)" v-for="items in item.goods" :key="items.index" class="shopImg_box fl" >
                                        <img :src="items.thumb" alt="">
                                    </div>
                                </div>
                                <div class="concernShop">
                                    <a v-if="isToken && item.is_collection == 1" @click="collectionGoods(item)" >取消收藏</a>
                                    <a v-if="isToken && item.is_collection == 2" @click="collectionGoods(item)" >收藏店铺</a>
                                    <a v-if="!isToken" @click="nullToken">收藏店铺</a>
                                    <router-link :to="'/common/AShopList/AShopInfo/'+item.brand_member_id+'/'+'2'" tag="a" class="goShop">进入店铺</router-link>
                                </div>
                            </li>
                        </ul>
                        <div v-if="shopList.length != 0"><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
                        <!-- 无相关商品列表 -->
                        <div class="orderNull" v-if="shopList.length == 0">
                            <p class="iconfont icon-wusousuojieguo"></p>
                            <p>暂无相关店铺，先去逛逛别的吧！</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <footer-bottom></footer-bottom>
    </div>
</template>

<script>
import { b2cStoreList,publicCollect } from '../../../api/index.js'
export default {
    data() {
        return {
            keyWords:this.$route.query.keyWords,
            type: this.$route.query.type,//1商品 2店铺 3批发
            shopList:[],//商品数据
            collectType: 2,//收藏1，未收藏2
            isToken:false,//判断是否登录
            page:0,
            limit:10,
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
        this.getStoreList()
    },
    methods: {
        //获取当前页码
        getCurrentPage(pageNum){
            this.page = pageNum-1;
            this.getStoreList()
        },
        // 获取数据列表
        getStoreList(){
            let params = {
              keyword: this.keyWords,
              type: 2,
              page: this.page,
              limit: this.limit
            }
            b2cStoreList(params).then(res=>{
                console.log(res)
                if(res.code == 0){
                    this.shopList = res.data.list
                    this.totalPage = parseInt(res.data.total_num)
                }
            })
        },
        // 收藏
        collectionGoods (item) {
            if(item.is_collection == 1) {
                this.collectType = 2 //2取消
            } else if (item.is_collection == 2) {
                this.collectType = 1 //1收藏
            }
            let params = {
                id: item.brand_member_id,
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
                        this.getStoreList()
                    }else if(this.collectType ==2){
                        this.$message({
                            message: '取消收藏',
                            type: 'warning'
                        });
                        this.getStoreList()
                    }
                }
            })
        },
        // 未登录
        nullToken(){
            this.$message({
                message: '您还未登录，请先登录',
                type: 'success'
            });
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
    }
}
</script>

<style scoped lang="scss">
    .AShopList{
        background-color: #f5f5f5;
    }
    .user_center_navbtn{
        a{
            font-size: 14px;
            color:#999;
        }
    }
    .shopList{
        .shopList_tabs{
            & /deep/.el-tabs__nav-wrap{
                padding: 0 30px;
            }
            & /deep/ .el-tabs__item{
                font-size: 18px;
                color: #333;
            }
            & /deep/.el-tabs__item.is-active{
                color: #e73636;
            }
            & /deep/.el-tabs__active-bar{
                background-color: #e73636;
            }
            & /deep/.el-tabs__item:hover{
                color: #e73636;
            }
        }
        .shopList_box{
            ul{
                li{
                    height: 280px;
                    padding: 30px;
                    margin-bottom: 20px;
                    background-color: #fff;
                    box-sizing: border-box;
                    position: relative;
                    .shopName{
                        height: 50px;
                        line-height: 50px;
                        .shopIcon{
                            width: 66px;
                            height: 50px;
                            margin-right: 20px;
                            @include common_center;
                            img{
                                max-width:100%;
                                max-height:100%;
                            }
                        }
                        h2{
                            font-size: 24px;
                            color: #333;
                        }
                    }
                    .shopImg{
                        margin-top: 20px;
                        .shopImg_box{
                            width: 150px;
                            height: 150px;
                            margin-right: 15px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            img{
                                max-width: 100%;
                            }
                        }

                    }
                    .concernShop{
                        position: absolute;
                        top: 30px;
                        right: 30px;
                        a{
                            display: block;
                            width: 91px;
                            height: 32px;
                            line-height: 32px;
                            font-size: 14px;
                            color: #666;
                            text-align: center;
                            margin-bottom: 13px;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                        }
                        .goShop{
                            color: #fff;
                            background-color: #e4393c;
                            border: 1px solid #e4393c;
                        }
                    }
                }
            }
            .orderNull{
                text-align: center;
                margin-top: 50px;
                .icon-wusousuojieguo{
                height: 100px;
                font-size: 80px;
                }
                p{
                font-size: 18px;
                color: #bbb;
                margin-bottom: 10px;
                }
            }
        }
    }

</style>