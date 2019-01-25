<template>
    <div>
        <header-top></header-top>
        <Header></Header>
        <div class="goodSaleDiv">
            <div class="img_box"></div>
            <!-- 商品区 -->
            <div class="goods_Div banxin">
                <ul>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                            <img class="imgIcon" src="../../../assets/common/activity/ingIcon.png" alt="">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                            <div class="goods_buy">
                                <div>
                                    <p class="buy_progress"><img src="../../../assets/common/activity/fire.png" alt=""> 已抢购50%</p>
                                    <el-progress class="progress"  :stroke-width="12" :percentage="50" :show-text="false" color="#e51818"></el-progress>
                                </div>
                                <div>
                                    <el-button type="danger" class="goods_buy_btn">立即购买</el-button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                            <div class="goods_buy">
                                <div>
                                    <p class="buy_progress"><img src="../../../assets/common/activity/fire.png" alt=""> 已抢购50%</p>
                                    <el-progress class="progress"  :stroke-width="12" :percentage="50" :show-text="false" color="#e51818"></el-progress>
                                </div>
                                <div>
                                    <el-button type="danger" class="goods_buy_btn">立即购买</el-button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                            <div class="goods_buy">
                                <div>
                                    <p class="buy_progress"><img src="../../../assets/common/activity/fire.png" alt=""> 已抢购50%</p>
                                    <el-progress class="progress"  :stroke-width="12" :percentage="50" :show-text="false" color="#e51818"></el-progress>
                                </div>
                                <div>
                                    <el-button type="danger" class="goods_buy_btn">立即购买</el-button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                            <div class="goods_buy">
                                <div>
                                    <p class="buy_progress"><img src="../../../assets/common/activity/fire.png" alt=""> 已抢购50%</p>
                                    <el-progress class="progress"  :stroke-width="12" :percentage="50" :show-text="false" color="#e51818"></el-progress>
                                </div>
                                <div>
                                    <el-button type="danger" class="goods_buy_btn">立即购买</el-button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                            <div class="goods_buy">
                                <div>
                                    <p class="buy_progress">已抢购50%</p>
                                    <el-progress class="progress"  :stroke-width="12" :percentage="50" :show-text="false" color="#e51818"></el-progress>
                                </div>
                                <div>
                                    <el-button type="danger" class="goods_buy_btn">立即购买</el-button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="goods_img">
                            <img src="../../../assets/images/b2b/banner.jpg">
                        </div>
                        <div class="goods_info">
                            <p class="goods_title">牛栏山 二锅头典藏15 清香型白酒 42度 500ml*6瓶 整箱装</p>
                            <p class="goods_price">¥ 249.0 <span class="old_price">￥550</span></p>
                            <div class="goods_buy">
                                <div>
                                    <p class="buy_progress">已抢购50%</p>
                                    <el-progress class="progress"  :stroke-width="12" :percentage="50" :show-text="false" color="#e51818"></el-progress>
                                </div>
                                <div>
                                    <el-button type="danger" class="goods_buy_btn">立即购买</el-button>
                                </div>
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
    export default {
        data() {
            return {
                
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
            background-color:#f5f5f5;
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
                        }
                    }
                }
            }
        }
    }
</style>