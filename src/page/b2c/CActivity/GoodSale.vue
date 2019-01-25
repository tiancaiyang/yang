<template>
    <div>
        <header-top></header-top>
        <Header></Header>
        <div class="goodSaleDiv">
            <div class="img_box"></div>
            <!-- 商品区 -->
            <div class="goods_Div banxin">
                <ul>
                    <li v-for=" item in goodsSaleList" :key="item.index">
                        <div class="goods_img">
                            <img :src="item.thumb">
                            <img  v-if="item.ratio != 100" class="imgIcon" src="../../../assets/common/activity/ingIcon.png" alt="">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">{{ item.title }}</p>
                            <p class="goods_price">¥ {{ item.discount_price }} <span class="old_price">￥{{ item.price }}</span></p>
                            <div class="goods_buy">
                                <div>
                                    <p class="buy_progress"><img src="../../../assets/common/activity/fire.png" alt=""> 已抢购{{item.ratio}}%</p>
                                    <el-progress class="progress"  :stroke-width="12" :percentage="parseInt(item.ratio)" :show-text="false" color="#e51818"></el-progress>
                                </div>
                                <div>
                                    <el-button v-if="item.ratio == 100"  type="info" class="goods_buy_btn info">已抢光</el-button>
                                    <router-link :to="'/one/b2c/CBodyCommon/CProductDetail/'+item.activity_type+'/'+item.product_id+'/'+item.activity_id" tag="a" v-else ><el-button type="danger" class="goods_buy_btn">立即购买</el-button></router-link>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div><page-base :pagesize="limit" :currentPage="page" :total="totalPage" @listen ="getCurrentPage"></page-base></div>
            </div>
        </div>
        <Footer></Footer>
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>
import { b2cSaleCProductList } from '../../../api/index.js'
export default {
    data() {
        return {
            goodsSaleList:[],//获取销售列表
            page: 0,
            limit: 6,
            totalPage:0,//总页数
        }
    },
    created(){
      this.getgoodsSale()
    },
    methods:{
        //获取当前页码
        getCurrentPage(pageNum){
            this.page = pageNum-1;
            this.getgoodsSale()
        },
        getgoodsSale(){
            let params = {
                page: this.page,
                limit : this.limit
            }
            b2cSaleCProductList(params).then(res=>{
                if(res.code == 0){
                    this.goodsSaleList = res.data.list
                    this.totalPage = parseInt(res.data.total_num)
                }
            })
        } 
    },
}
</script>

<style scoped lang="scss">
.goodSaleDiv{
    .img_box {
        background: url(../../../assets/common/activity/goodSaleBG.png) no-repeat top center;
        width: 100%;
        height: 993px;
    }
    .goods_Div{
        // background-color:#f5f5f5;
        margin-top: -533px;
        ul {
            display: flex;
            flex-wrap: wrap;
            li {
                width: 386px;
                height: 562px;
                background-color: #fff;
                margin-right: 21px;
                margin-bottom: 20px;
                @include common_li_hover;
                &:nth-child(3n) {
                    margin-right: 0;
                }
                .goods_img{
                    height: 386px;
                    width: 386px;
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
                        margin-bottom: 20px;
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
                    .goods_buy{
                        display: flex;
                        justify-content: space-between;
                        .buy_progress{
                            font-size: 14px;
                            color: #999;
                            margin-bottom: 10px;
                        }
                        .progress{
                            width: 193px;
                            border: 1px solid #e51818;
                            border-radius: 100px;
                        }
                        .goods_buy_btn {
                            border-radius: 4px;
                            background-color: #e51818;
                        }
                        .info{
                            background-color: #5f2525;
                        }
                    }
                }
            }
        }
    }
}
</style>