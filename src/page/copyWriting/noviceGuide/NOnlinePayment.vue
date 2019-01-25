<template>
    <div class="NCommon">
       <h2 class="title">在线支付</h2>
       <div class="NCommon_content">
            <h3>一、货到付款</h3>
            <p>货到付款是快递人员送货上门，客户收单验货后，直接将货款交给配送员的一种结算方式。（注：目前暂未开通POS机刷卡服务，货到后需要现金支付）</p>
            <h3>二、在线支付</h3>
            <div class="imgBox"><img src="../../../assets/images/common/image002.jpg" alt=""></div>
            <p>1、在线支付平台</p>
            <p>牛栏山提供支付宝、微信支付和银行卡支付3种在线支付平台支付，覆盖率达98％，支持贷记卡有：光大银行、交通银行、民生银行、中国工商银行、邮政储蓄、广发银行、招商银行、中国银行、中信银行、建设银行、平安银行等17家银行；支持的借记卡有：光大银行、华夏银行、工商银行、兴业银行、农业银行、浦发银行、中国银行、平安银行和建设银行等9个银行的网银在线支付。选择在线支付，即时到帐，准确快捷！</p>
            <p>2、到款时间</p>
            <p>网上支付均是支付成功即到账。若由于网络故障导致您已支付成功的订单未改变订单状态，请您联系我们的工作人员为您解决 。</p>
       </div>

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
    .NCommon{
        .title{
            font-size: 24px;
            line-height: 36px;
            color: #666;
            margin-bottom: 30px;
        }
        .NCommon_content{
            padding-left: 10px;
            padding-top: 30px;
            border-top: 1px solid #ddd;
            h3{
                font-size: 20px;
                color: #333;
                margin: 0 0 20px;
            }
            p{
                font-size: 16px;
                color: #666;
                line-height: 20px;
                text-indent: 2em;
                margin-bottom: 20px;
            }
            .imgBox{
                padding: 0 0 30px;
                @include common_center;
            }
        }
    }
</style>