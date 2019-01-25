<template>
    <div class="ONationalPavillion">
        <header-top></header-top>
        <div class="national_header">
            <div class="banxin">
                <div class="national_header_left fl">
                    <h2 class="national_header_left_title">丝路国际</h2>
                </div>
                <div class="national_header_right fr">
                    <el-input class="header_search" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input1"></el-input>
                </div>
            </div>
        </div>
        <div class="national_div banxin">
            <div class="national_top">
                <ul class="national_top_Ul">
                    <li :class="index == 1 ? 'active':''" @click="topToggle(1)">个护美妆</li>
                    <li :class="index == 2 ? 'active':''" @click="topToggle(2)">日用百货</li>
                    <li :class="index == 3 ? 'active':''" @click="topToggle(3)">母婴用品</li>
                    <li :class="index == 4 ? 'active':''" @click="topToggle(4)">户外运动</li>
                    <li :class="index == 5 ? 'active':''" @click="topToggle(5)">服饰鞋包</li>
                </ul>
            </div>
            <div class="national_List">
                <ul>
                    <li>
                        <div class="goodsImg"><img src="../../assets/images/b2b/banner.jpg" alt=""></div>
                        <div class="goodsInfo">
                            <p class="goodsPrice">￥<span>567.0</span></p>
                            <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱二锅头和之牛青釉瓷</p>
                            <p class="goodsEvaluate">已有 <span>109873</span>人评论</p>
                            <a class="addShopCar" href="javascript:void(0);"><img src="../../assets/images/common/add_shopcar.png" alt=""></a>
                        </div>
                    </li>
                    <li>
                        <div class="goodsImg"><img src="../../assets/images/b2b/banner.jpg" alt=""></div>
                        <div class="goodsInfo">
                            <p class="goodsPrice">￥<span>567.0</span></p>
                            <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱二锅头和之牛青釉瓷</p>
                            <p class="goodsEvaluate">已有 <span>109873</span>人评论</p>
                            <a class="addShopCar" href="javascript:void(0);"><img src="../../assets/images/common/add_shopcar.png" alt=""></a>
                        </div>
                    </li>
                    <li>
                        <div class="goodsImg"><img src="../../assets/images/b2b/banner.jpg" alt=""></div>
                        <div class="goodsInfo">
                            <p class="goodsPrice">￥<span>567.0</span></p>
                            <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱二锅头和之牛青釉瓷</p>
                            <p class="goodsEvaluate">已有 <span>109873</span>人评论</p>
                            <a class="addShopCar" href="javascript:void(0);"><img src="../../assets/images/common/add_shopcar.png" alt=""></a>
                        </div>
                    </li>
                    <li>
                        <div class="goodsImg"><img src="../../assets/images/b2b/banner.jpg" alt=""></div>
                        <div class="goodsInfo">
                            <p class="goodsPrice">￥<span>567.0</span></p>
                            <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱二锅头和之牛青釉瓷</p>
                            <p class="goodsEvaluate">已有 <span>109873</span>人评论</p>
                            <a class="addShopCar" href="javascript:void(0);"><img src="../../assets/images/common/add_shopcar.png" alt=""></a>
                        </div>
                    </li>
                    <li>
                        <div class="goodsImg"><img src="../../assets/images/b2b/banner.jpg" alt=""></div>
                        <div class="goodsInfo">
                            <p class="goodsPrice">￥<span>567.0</span></p>
                            <p class="goodsName">北京牛栏山二锅头和之牛青釉瓷52度浓香型500ml*6瓶 白酒整箱二锅头和之牛青釉瓷</p>
                            <p class="goodsEvaluate">已有 <span>109873</span>人评论</p>
                            <a class="addShopCar" href="javascript:void(0);"><img src="../../assets/images/common/add_shopcar.png" alt=""></a>
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
               input1:'', 
               index: 1,
            }
        },
        methods:{
            topToggle(num){
                this.index = num
            }
        }
    }
</script>

<style scoped lang="scss">
    .ONationalPavillion{
        background-color: #f5f5f5;
    }
    .national_header{
       height: 150px;
       background-color: #ce8754;
        .national_header_left{
           padding-top: 45px;
           width: 50%;
           .national_header_left_title{
               font-size: 36px;
               color: #fff;
           }
        }
        .national_header_right{
            padding-top: 42px;
            height: 46px;
            width: 550px;
            .header_search{
                & /deep/.el-input__inner{
                    border-radius: 23px;
                }
            }
        }
    }
    .national_div{
        margin-top: -43px;
        .national_top{
            .national_top_Ul{
                padding: 0 86px;
                display: flex;
                justify-content: space-around;
                li{
                    width: 203px;
                    height: 43px;
                    line-height: 43px;
                    text-align: center;
                    color: #fff;
                    font-size: 18px;
                    cursor: pointer;
                }
                .active{
                    background-color: #b7672e;
                }
            }
        }
        .national_List{
            background-color: #fff;
            ul{
                padding-top: 20px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                li{
                    width: 230px;
                    height: 420px;
                    border: 1px solid #ddd;
                    position: relative;
                    margin-bottom: 10px;
                    .goodsImg{
                        padding: 10px;
                        width: 210px;
                        height: 210px;
                        background-color: #ccc;
                        display: flex;
                        justify-content: center;
                        align-items: center;
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
                            line-height: 18px;
                            @include p-common;
                        }
                        .goodsEvaluate{
                            font-size: 14px;
                            color: #999;
                            padding-top: 15px;
                            span{
                                color: #005aa0;
                                font-weight: bold;
                            }
                        }
                        .addShopCar{
                            position: absolute;
                            bottom: 18px;
                            right: 18px;
                        }
                    }
                }
            }
        }
    }
</style>