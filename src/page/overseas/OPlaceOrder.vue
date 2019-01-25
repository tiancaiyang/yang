<template>
    <div class="OPlaceOrder">
        <header-top></header-top>
        <div class="oPlaceOrder_header">
            <div class="banxin">
                <!-- 头部面包屑 -->
                <div class="user_center_navbtn fl">
                    <a>首页</a>
                    <span class="el-icon-arrow-right"></span>
                    <a>组合活动</a>
                    <span class="el-icon-arrow-right"></span>
                    <a>组合活动详情</a>
                </div>
                <!-- 步骤条 -->
                <ul class="top_tabs fr">
                    <li :class="num==1?'li_active':''"><span>1</span>确认订单</li>
                    <li :class="num==2?'li_active':''" class="iconfont  icon-jiantou"><span>2</span>选择付款方式</li>
                    <li :class="num==3?'li_active':''" class="iconfont  icon-jiantou"><span>3</span>确认出行信息</li>
                </ul>
            </div>
        </div>
        <div>
            <div class="tabs_content">
                <div v-show="num == '1'">
                    <button @click="changeTabs">提交</button>
                </div>
                <div v-show="num == '2'">
                    <button @click="changeTabs">提交</button>
                </div>
                <div v-show="num == '3'">
                    <button @click="changeTabs">提交</button>
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
                num:1,
            }
        },
        methods:{
            changeTabs () {
                if (this.num < 3) {
                    this.num = Number(this.num) + 1
                } else {

                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .OPlaceOrder{
        background-color: #f5f5f5;
    }
    .oPlaceOrder_header{
        height: 80px;
        line-height: 80px;
        background-color: #fff;
        .user_center_navbtn{
            a{
                font-size: 14px;
                color:#999;
            }
        }
        .top_tabs {
            width: 470px;
            display: flex;
            justify-content: space-around;
            li {
                font-size: 14px;
                color: #999;
                display: flex;
                align-items: center;
                padding: 0;
                margin-bottom: -2px;

                span {
                    display: inline-block;
                    width: 22px;
                    height: 20px;
                    border: 2px solid #d6d6d6;
                    text-align: center;
                    line-height: 20px;
                    font-size: 14px;
                    color: #ccc;
                    border-radius: 50%;
                    margin-right: 8px;
                    margin-bottom: -2px;
                }
            }

            // 选中时 li 的样式
            .li_active {
                color: #0199ff;

                span {
                    background-color: #0199ff;
                    border-color: #0199ff;
                    color: #fff;
                }
            }
        }
    }
</style>