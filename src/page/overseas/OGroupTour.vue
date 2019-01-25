<template>
    <div>
        <header-top></header-top>
        <!-- 顶部标题 -->
        <div class="national_header">
            <div class="national_header_search banxin">
                <el-input class="header_search" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input1"></el-input>
            </div>
        </div>
        <div class="groupTour_div">
            <div class="groupTour_div_top">
                <img src="../../assets/images/overseas/groupTourTitle1.png" alt="">
            </div>
            <div class="groupTour_div_content banxin">
                <div class="groupTour_div_content_Nav">
                    <a href="javascript:void(0);" class="active">欧洲</a>
                    <a href="javascript:void(0);">欧洲</a>
                    <a href="javascript:void(0);">欧洲</a>
                    <a href="javascript:void(0);">欧洲</a>
                    <a href="javascript:void(0);">欧洲</a>
                    <a href="javascript:void(0);">欧洲</a>
                    <a href="javascript:void(0);">欧洲</a>
                </div>
                <div class="groupTour_content">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <li class="swiper-slide">
                                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                                <div class="hotSale_content_info">
                                    <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p> 
                                    <p class="price">￥7890.00 <span>起</span></p>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                                <div class="hotSale_content_info">
                                    <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p> 
                                    <p class="price">￥7890.00 <span>起</span></p>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                                <div class="hotSale_content_info">
                                    <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p> 
                                    <p class="price">￥7890.00 <span>起</span></p>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                                <div class="hotSale_content_info">
                                    <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p> 
                                    <p class="price">￥7890.00 <span>起</span></p>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                                <div class="hotSale_content_info">
                                    <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p> 
                                    <p class="price">￥7890.00 <span>起</span></p>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                                <div class="hotSale_content_info">
                                    <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p> 
                                    <p class="price">￥7890.00 <span>起</span></p>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                                <div class="hotSale_content_info">
                                    <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p> 
                                    <p class="price">￥7890.00 <span>起</span></p>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="hotSale_content_img"><img src="../../assets/images/overseas/silkroadRecomInfo.png" alt=""></div>
                                <div class="hotSale_content_info">
                                    <p class="title">全国出发泰国旅游泰国芭提雅5天4夜跟团游全国出发泰国旅游泰国芭提雅5天4夜跟团游</p> 
                                    <p class="price">￥7890.00 <span>起</span></p>
                                </div>
                            </li>
                        </div>
                    </div>
                    <div class="swiper-button-prev swiper-button-white"></div><!--左箭头-->
                    <div class="swiper-button-next swiper-button-white"></div><!--右箭头--> 
                </div>
            </div>
            <!-- 出游天数 -->
            <div class="homePage_Div banxin">
                <div class="homePage_Div_img">
                    <img src="../../assets/images/overseas/silkroadRecomment.png" alt="">
                </div>
                <div class="national_div banxin clearfix">
                    <!-- <div class="national_top">
                        <ul class="national_top_Ul">
                            <li @click="topToggle(1)"><a :class="index == 1 ? 'active':''"  href="javascript:void(0);">3-5天</a> </li>
                            <li @click="topToggle(2)"><a :class="index == 2 ? 'active':''"  href="javascript:void(0);">6-9天</a></li>
                            <li @click="topToggle(3)"><a :class="index == 3 ? 'active':''"  href="javascript:void(0);">10天以上</a></li>
                        </ul>
                    </div> -->
                    <div class="national_List fl">
                        <ul class="tourism_ul">
                            <li class="tourism_li">
                                <div class="goods_details_box">
                                    <div class="img_box">
                                        <img src="../../assets/rural/goods.png">
                                    </div>
                                    <div class="box_right">
                                        <div class="box_right_info">
                                            <h2>【双12】 全国出发-泰国纯玩6天5晚跟团游 热卖爆款 升级五星酒店全国出发-泰国纯玩</h2>
                                            <div class="food_details">
                                                <ul>
                                                    <li>亲子+蜜月</li>
                                                    <li>亲子+蜜月</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p class="goods_price">¥ 19.9 <span>起</span></p>
                                    </div>
                                </div>
                                <div class="box_btn">
                                    <el-button class="reserve_btn">查看详情</el-button>
                                    <p>月销1289笔</p>
                                    <p>评价1456条</p>
                                </div>
                            </li>
                            <li class="tourism_li">
                                <div class="goods_details_box">
                                    <div class="img_box">
                                        <img src="../../assets/rural/goods.png">
                                    </div>
                                    <div class="box_right">
                                        <div class="box_right_info">
                                            <h2>【双12】 全国出发-泰国纯玩6天5晚跟团游 热卖爆款 升级五星酒店全国出发-泰国纯玩</h2>
                                            <div class="food_details">
                                                <ul>
                                                    <li>亲子+蜜月</li>
                                                    <li>亲子+蜜月</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p class="goods_price">¥ 19.9 <span>起</span></p>
                                    </div>
                                </div>
                                <div class="box_btn">
                                    <el-button class="reserve_btn">查看详情</el-button>
                                    <p>月销1289笔</p>
                                    <p>评价1456条</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="national_right fr">
                        <h3>猜你喜欢</h3>
                        <div>
                            <ul>
                                <li>
                                    <div class="img_box">
                                        <img src="../../assets/rural/goods.png">
                                    </div>
                                    <div class="box_right">
                                        <div class="box_right_info">
                                            <h2>塞班岛军舰套餐  海上拖伞珊瑚岛群浮潜  塞班岛 塞班岛地接  塞班</h2>
                                        </div>
                                        <p class="goods_price">¥ 19.9 <span>起</span></p>
                                    </div>
                                </li>
                                <li>
                                    <div class="img_box">
                                        <img src="../../assets/rural/goods.png">
                                    </div>
                                    <div class="box_right">
                                        <div class="box_right_info">
                                            <h2>塞班岛军舰套餐  海上拖伞珊瑚岛群浮潜  塞班岛 塞班岛地接  塞班</h2>
                                        </div>
                                        <p class="goods_price">¥ 19.9 <span>起</span></p>
                                    </div>
                                </li>
                                <li>
                                    <div class="img_box">
                                        <img src="../../assets/rural/goods.png">
                                    </div>
                                    <div class="box_right">
                                        <div class="box_right_info">
                                            <h2>塞班岛军舰套餐  海上拖伞珊瑚岛群浮潜  塞班岛 塞班岛地接  塞班</h2>
                                        </div>
                                        <p class="goods_price">¥ 19.9 <span>起</span></p>
                                    </div>
                                </li>
                            </ul>
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
    import Swiper from "swiper";
    export default {
        data() {
            return {
                input1:'',
                index:1,
            }
        },
        mounted(){
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 4,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        },
        methods:{
            topToggle(num){
                this.index = num
            }
        }
    }
</script>

<style scoped lang="scss">
    .national_header{
        height: 200px;
        background: url(../../assets/images/overseas/groupHeaderTop.png) top center;
        .national_header_search{
            padding-top: 80px;
            height: 46px;
            width: 550px;
            .header_search{
                & /deep/.el-input__inner{
                    border-radius: 23px;
                }
            }
        }
    }
    .groupTour_div{
        // margin-top: -180px;
        .groupTour_div_top{
            padding-top: 50px;
            text-align: center;
        }
        .groupTour_div_content{
            padding-top: 30px;
            .groupTour_div_content_Nav{
                display: flex;
                justify-content: space-between;
                a{
                    padding: 15px 50px;
                    color: #333;
                    font-size: 20px;
                    border-radius: 26px;
                    border: 1px solid #ccc;
                }
                .active{
                    color: #fff;
                    background-color: #1dafff;
                }
            }
            .groupTour_content{
                margin-top: 30px;
                height: 480px;
                position: relative;
                .swiper-container{
                    height: 390px;
                    li{
                        width: 290px;
                        height: 390px;
                        display: flex;
                        justify-content: space-around;
                        flex-direction: column;
                        .hotSale_content_img{
                            height: 290px;
                            @include common_center;
                            img{
                                max-width: 100%;
                                max-height: 100%;
                                border-radius: 16px;
                            }
                        }
                        .hotSale_content_info{
                            width: 190px;
                            .title{
                                font-size: 16px;
                                color:#151515;
                                line-height: 18px;
                                @include p-common;
                            }
                            .price{
                                color: #f00;
                                font-size: 20px;
                                padding-top: 10px;
                                span{
                                    font-size: 14px;
                                    color: #666;
                                }
                            }
                        }
                    }
                }
                .swiper-button-prev,.swiper-button-next{
                    top:auto;
                    bottom: 30px;
                    width: 38px;
                    height: 38px;
                    margin-top: 0;
                    border-radius: 50%;
                    background-color: #18a6ff;
                    background-size: 23px 19px;
                }
                .swiper-button-prev{
                    left: 47%;
                    transform: translateX(-50%);
                }
                .swiper-button-next{
                    right: 44%;
                    transform: translateX(-50%);
                }
            }
        }
        // 出游天数板块
        .homePage_Div{
            margin-top: 30px;
            padding-bottom: 20px;
            background-color: #fff;
            .homePage_Div_img{
                height: 180px;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .national_div{
                .national_top{
                    .national_top_Ul{
                        display: flex;
                        justify-content: center;
                        li{
                            width: 203px;
                            height: 43px;
                            line-height: 43px;
                            text-align: center;
                            color: #333;
                            font-size: 28px;
                            cursor: pointer;
                            box-sizing: border-box;
                            a{
                                display: inline-block;
                                line-height: 33px;
                                box-sizing: border-box;
                            }
                            .active{
                                color: #000;
                                font-weight: bold;
                                border-bottom: 5px solid #1dafff;
                            }
                        }
                        
                    }
                }
                .national_List{
                    width: 900px;
                    padding-top: 40px;
                    background-color: #fff;
                    .tourism_ul{
                        width: 900px;
                        .tourism_li {
                            height: 250px;
                            border-bottom: 1px solid #eaeaea;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            position: relative;
                            .goods_details_box {
                                display: flex;
                                padding: 15PX;
                                .img_box {
                                    width: 220px;
                                    height: 210px;
                                    @include common_center;
                                    background-color: #ccc;
                                    img {
                                        max-width: 100%;
                                        max-height: 100%;
                                    }
                                }
                                .box_right {
                                    margin-left: 20px;
                                    width: 430px;
                                    display: flex;
                                    justify-content: space-between;
                                    flex-direction: column;
                                    .box_right_info{
                                        h2 {
                                            font-size: 20px;
                                            color: #333;
                                            line-height: 29px;
                                            @include p-common;
                                        }
                                        .food_details {
                                            margin-top: 20px;
                                            display: flex;
                                            align-items: center;
                                            ul {
                                                display: flex;
                                                align-items: center;
                                                li {
                                                color: #666;
                                                font-size: 16px;
                                                border: 1px solid #666;
                                                border-radius: 16px;
                                                padding: 10px 15px;
                                                margin-right: 10px;
                                                }
                                            }
                                        }
                                    }
                                    .goods_price {
                                        margin-top: 20px;
                                        font-size: 24px;
                                        color: #f00;
                                        span{
                                            color: #666;
                                            font-size: 20px;
                                        }
                                    }
                                }
                            }
                            .box_btn{
                                height: 100px;
                                position: absolute;
                                right: 15px;
                                top: 60px;
                                .reserve_btn {
                                    width: 100%;
                                    height: 40px;
                                    background-color: #2585cb;
                                    color: #fff;
                                    font-size: 16px;
                                    border-radius: 24px;
                                }
                                p{
                                    color: #999;
                                    font-size: 14px;
                                    margin-top: 13px;
                                }
                            }
                            &:last-child{
                                border-bottom: 0;
                            }
                        }
                    }
                }
                .national_right{
                    width: 290px;
                    height: 380px;
                    margin-top: 40px;
                    padding: 18px 15px;
                    box-sizing: border-box;
                    background-color: #f2f2f2;
                    h3{
                        color: #333;
                        font-size: 14px;
                    }
                    ul{
                        li{
                            // height: 120px;
                            padding: 15px 0;
                            display: flex;
                            border-bottom: 1px solid #ebebeb;
                            .img_box {
                                width: 80px;
                                height: 80px;
                                @include common_center;
                                background-color: #ccc;
                                img {
                                    max-width: 100%;
                                    max-height: 100%;
                                }
                            }
                            .box_right {
                                margin-left: 10px;
                                width: 180px;
                                display: flex;
                                justify-content: space-between;
                                flex-direction: column;
                                .box_right_info{
                                    h2 {
                                        font-size: 14px;
                                        color: #666;
                                        line-height: 18px;
                                        @include p-common;
                                    }
                                }
                                .goods_price {
                                    font-size: 16px;
                                    color: #f00;
                                    span{
                                        color: #666;
                                        font-size: 16px;
                                    }
                                }
                            }        
                        }
                    }
                }
            }
        }    
    }
</style>