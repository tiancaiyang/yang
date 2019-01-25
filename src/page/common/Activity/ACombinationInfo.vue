<template>
    <div class="combinationInfo">
        <header-top></header-top>
        <Header></Header>
        <div class="combination_Div">
            <!-- 头部面包屑 -->
            <div class="user_center_navbtn banxin">
                <a>首页</a>
                <span class="el-icon-arrow-right"></span>
                <a>组合活动</a>
                <span class="el-icon-arrow-right"></span>
                <a>组合活动详情</a>
            </div>
            <div class="combination_box">
                <div class="combination_title">
                    <div class="banxin">
                        <h2>蓝月亮洗衣液家庭装5kg桶装+1kg护理液送雨伞一把</h2>
                        <div class="combination_title_info">
                            <span>单笔组合订单满20件起送</span>
                            <span>单笔组合订单满20件起送</span>
                            <span>单笔组合订单满20件起送</span>
                        </div>
                    </div>
                </div>
                <div class="combination_content banxin">
                    <!-- 任选商品 -->
                    <div class="optional">
                        <div class="content_title">
                            <h3>任选商品</h3>
                        </div>
                        <div class="goodsLIst">
                            <ul>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/images/b2b/banner.jpg" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <h3>蓝月亮洗衣液家庭装5kg装 <span class="goodsLimit fr">限购15件</span></h3>
                                        <p class="goodsSpec">规格：5kg/套</p>
                                        <div class="fr goodsNumbox">
                                            <p class="goodsPrice">￥128.6 /箱</p>
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/common/activity/goods.png" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <h3>蓝月亮洗衣液家庭装5kg装 <span class="goodsLimit fr">限购15件</span></h3>
                                        <p class="goodsSpec">规格：5kg/套</p>
                                        <div class="fr goodsNumbox">
                                            <p class="goodsPrice">￥128.6 /箱</p>
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/common/activity/goods.png" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <h3>蓝月亮洗衣液家庭装5kg装 <span class="goodsLimit fr">限购15件</span></h3>
                                        <p class="goodsSpec">规格：5kg/套</p>
                                        <div class="fr goodsNumbox">
                                            <p class="goodsPrice">￥128.6 /箱</p>
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/common/activity/goods.png" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <h3>蓝月亮洗衣液家庭装5kg装 <span class="goodsLimit fr">限购15件</span></h3>
                                        <p class="goodsSpec">规格：5kg/套</p>
                                        <div class="fr goodsNumbox">
                                            <p class="goodsPrice">￥128.6 /箱</p>
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 必选商品 -->
                    <div class="require">
                        <div class="content_title">
                            <h3>必选商品 <span class="requireTips">（ * 以下商品请至少选择一种商品 ）</span></h3>
                        </div>
                        <div class="goodsLIst">
                            <ul>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/common/activity/goods.png" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <h3>蓝月亮洗衣液家庭装5kg装 <span class="goodsLimit fr">限购15件</span></h3>
                                        <p class="goodsSpec">规格：5kg/套</p>
                                        <div class="fr goodsNumbox">
                                            <p class="goodsPrice">￥128.6 /箱</p>
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/common/activity/goods.png" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <h3>蓝月亮洗衣液家庭装5kg装 <span class="goodsLimit fr">限购15件</span></h3>
                                        <p class="goodsSpec">规格：5kg/套</p>
                                        <div class="fr goodsNumbox">
                                            <p class="goodsPrice">￥128.6 /箱</p>
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- 件数和组数 -->
                <div class="groupNumber banxin">
                    <span class="AllNumber">件数: 22件</span>
                    <div class="fr goodsNumbox">
                        <span>组数:</span>&nbsp;&nbsp;
                        <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                    </div>
                </div>
                <!-- 赠品 -->
                <div class="gift_Div banxin">
                    <div class="content_title">
                        <h3>赠品</h3>
                    </div>    
                    <div class="goodsLIst">
                            <ul>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/images/b2b/banner.jpg" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <p class="goodsInfo_title">双用遮阳伞</p>
                                        <p class="goodsPrice">市场价：¥25</p>
                                        <div class="goodsNumbox">
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/images/b2b/banner.jpg" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <p class="goodsInfo_title">双用遮阳伞</p>
                                        <p class="goodsPrice">市场价：¥25</p>
                                        <div class="goodsNumbox">
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/images/b2b/banner.jpg" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <p class="goodsInfo_title">双用遮阳伞</p>
                                        <p class="goodsPrice">市场价：¥25</p>
                                        <div class="goodsNumbox">
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="goodsImg">
                                        <img src="../../../assets/images/b2b/banner.jpg" alt="">
                                    </div>
                                    <div class="goodsInfo">
                                        <p class="goodsInfo_title">双用遮阳伞</p>
                                        <p class="goodsPrice">市场价：¥25</p>
                                        <div class="goodsNumbox">
                                            <el-input-number class="numbox_butteon"  v-model="num3" :min="0" :step="1"></el-input-number>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                    </div>
                </div>
                <!-- 备注 -->
                <div class="remarks banxin">
                    <div class="content_title">
                        <h3>备注</h3>
                    </div>
                    <div class="goodsLIst">
                        <el-input placeholder="请在此输入备注内容" v-model="input10" clearable></el-input>
                    </div>
                </div>
                <!-- 提交订单 -->
                <div class="submitOrder banxin clearfix">
                    <span class="AllPrice">总计: <b>￥780.00</b></span>
                    <el-button  class="goods_buy_btn fr">提交订单</el-button>
                </div>
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
                num3: 1,
                input10:'',
            }
        },
    }
</script>

<style scoped lang="scss">
    .combinationInfo{
       background-color: #f5f5f5; 
    }
    .user_center_navbtn{
        a{
            font-size: 14px;
            color:#999;
        }
    }
    .combination_box{
        .combination_title{
            height: 228px;
            background-color: #e4393c;
            padding-top: 40px;
            box-sizing: border-box;
            h2{
                font-size: 32px;
                color: #fff;
            }
            .combination_title_info{
                padding-top: 30px;
                span{
                    font-size: 18px;
                    color: #fff;
                    margin-right: 50px;
                    &::before{
                        content: "";
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        vertical-align: middle;
                        border-radius: 2px;
                        margin-right: 5px;
                        background-color: #f7c883;
                    }
                }
            }
        }
        .content_title{
            h3{
                color: #333;
                font-size: 22px;
                &::before{
                    content: "";
                    display: inline-block;
                    width: 4px;
                    height: 23px;
                    vertical-align: top;
                    border-radius: 2px;
                    margin-right: 12px;
                    background-color: #e22a34;
                }
            }
        }
        .combination_content{
            background-color: #fff;
            margin-top: -65px;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            box-sizing: border-box;
            .goodsLIst{
                ul {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    li{
                        width: 560px;
                        height: 168px;
                        border: 1px solid #ececec;
                        margin: 20px 0  0;
                        display: flex;
                        justify-content: space-between;
                        box-sizing: border-box;
                        .goodsImg{
                            width: 166px;
                            height: 166px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            img{
                                max-width: 100%;
                            }
                        }
                        .goodsInfo{
                            width: 394px;
                            padding: 20px;
                            box-sizing: border-box;
                            h3{
                                color: #333;
                                font-size: 20px;
                                .goodsLimit{
                                    font-size: 14px;
                                    color: #f96745;
                                    padding: 3px 10px;
                                    background-color: rgba(252,116,84,0.1);
                                    border: 1px solid #f96745;
                                    border-radius: 4px;
                                }
                            }
                            .goodsSpec{
                                color: #999;
                                font-size: 16px;
                                margin-top: 13px;
                            }
                            .goodsNumbox{
                                width: 100%;
                                margin-top: 38px;
                                display: flex;
                                justify-content: space-between;
                                align-items: flex-end;
                                .goodsPrice{
                                    font-size: 16px;
                                    color: #e51818;
                                }
                                .numbox_butteon{
                                    & /deep/ .el-input__inner {
                                        height: 40px;
                                        border-radius: 18px;
                                    }
                                    & /deep/ .el-input-number__decrease{
                                        border-radius: 18px 0 0 18px;
                                    }
                                    & /deep/ .el-input-number__increase{
                                        border-radius: 0 18px 18px 0;
                                    }
                                }
                                .el-input-number{
                                    width: 128px;
                                    height: 36px;
                                }
                            }
                        }
                    }
                }
            }
            // 必选商品
            .require{
                margin-top: 40px;
                .requireTips{
                    color: #e74848;
                    font-size: 16px;
                }
            }
        }
        // 件数和组数
        .groupNumber{
            height: 112px;
            line-height: 112px;
            padding:  0 20px;
            box-shadow: 0 -5px 5px rgba(219,216,216,0.57);
            background-color: #fff;
            box-sizing: border-box;
            .AllNumber{
                color: #333;
                font-size: 24px;
                font-weight: bold;
            }
            .goodsNumbox{
                span{
                    font-size: 18px;
                    color: #333;
                }
                .numbox_butteon{
                    & /deep/ .el-input__inner {
                        height: 54px;
                        border-radius: 26px;
                    }
                    & /deep/ .el-input-number__decrease{
                        width: 60px;
                        color: #fff;
                        background-color: #e4393c;
                        border-radius: 26px 0 0 26px;
                    }
                    & /deep/ .el-input-number__increase{
                        width: 60px;
                        color: #fff;
                        background-color: #e4393c;
                        border-radius: 0 26px 26px 0;
                    }
                }
                .el-input-number{
                    width: 181px;
                    height: 52px;
                    line-height: 52px;
                }              
            }
        }
        // 赠品
        .gift_Div{
            margin-top: 30px;
            padding: 20px;
            background-color: #fff;
            box-sizing: border-box;
            .goodsLIst{
                ul{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    li{
                        width: 366px;
                        height: 168px;
                        border: 1px solid #ececec;
                        margin: 20px 0  0;
                        display: flex;
                        justify-content: space-between;
                        box-sizing: border-box;
                        .goodsImg{
                            width: 166px;
                            height: 166px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            img{
                                max-width: 100%;
                            }
                        }
                        .goodsInfo{
                            width: 199px;
                            padding: 20px;
                            box-sizing: border-box;
                            .goodsInfo_title{
                                color: #333;
                                font-size: 20px;
                            }
                            .goodsPrice{
                                color: #f72333;
                                font-size: 16px;
                                margin-top: 15px;
                            }
                            .goodsNumbox{
                                margin-top: 40px;
                                .numbox_butteon{
                                    & /deep/ .el-input__inner {
                                        height: 40px;
                                        border-radius: 18px;
                                    }
                                    & /deep/ .el-input-number__decrease{
                                        border-radius: 18px 0 0 18px;
                                    }
                                    & /deep/ .el-input-number__increase{
                                        border-radius: 0 18px 18px 0;
                                    }
                                }
                                .el-input-number{
                                    width: 128px;
                                    height: 36px;
                                }
                            }
                        }    
                    }
                }
            }
        }
        // 备注
        .remarks{
            margin-top: 30px;
            padding: 20px;
            background-color: #fff;
            box-sizing: border-box;
            .goodsLIst{
                margin-top: 30px;
            }
        }
        // 提交订单
        .submitOrder{
            margin-top: 50px;
            padding: 0 0 0 20px ;
            box-sizing: border-box;
            box-shadow: 0 -5px 5px rgba(223,223,223,0.81);
            background-color: #fff;
            .AllPrice{
                font-size: 18px;
                color: #333;
                line-height: 80px;
                b{
                    font-weight: bold;
                    color: #e51818;
                    font-size: 24px;
                }
            }
            .goods_buy_btn {
                height: 80px;
                width: 220px;
                border-radius: 4px;
                font-size: 20px;
                color: #fff;
                border: 1px solid #e51818;
                background-color: #e51818;
            }
        }
    }
</style>