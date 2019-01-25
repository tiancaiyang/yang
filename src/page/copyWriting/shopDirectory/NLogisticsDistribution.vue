<template>
    <div class="NCommon">
       <h2 class="title">支付方式</h2>
       <div class="NCommon_content">
            <h3>掌柜当家支持支付宝支付、微信支付、银行卡支付等。支持贷记卡有：光大银行、交通银行、民生银行、中国工商银行、邮政储蓄、广发银行、招商银行、中国银行、中信银行、建设银行、平安银行等17家银行；支持的借记卡有：光大银行、华夏银行、工商银行、兴业银行、农业银行、浦发银行、中国银行、平安银行和建设银行等9个银行的网银在线支付。
            </h3>
            <h3>订单已经提交成功，如何付款？</h3>
            <p>付款方式分为以下几种：（注：您在订单提交后24小时内完成支付，否则订单会自动取消）</p>
            <p>1）货到付款：选择货到付款，在订单送达时您可选择现金、POS机刷卡、支付宝或者微信转账等方式向第三方隶属业务配送人员或者快递配送员支付货款。（注：货到付款只支持商家消费者进行消费）</p>
            <p>2）在线支付：选择在线支付，请您进入“我的订单”，点击“立即付款”，按提示进行操作；目前在线支付支持支付宝支付、微信支付、银行卡支付等方式进行支付，可根据您的使用喜好进行选择。</p>
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
            padding-top: 20px;
            border-top: 1px solid #ddd;
            h3{
                font-size: 18px;
                line-height: 30px;
                color: #333;
                margin: 0 0 20px;
            }
            p{
                font-size: 16px;
                color: #181818;
                line-height: 30px;
                padding: 0 0 20px;
            }
        }
    }
</style>