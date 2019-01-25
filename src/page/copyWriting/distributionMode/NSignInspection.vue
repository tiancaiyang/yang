<template>
    <div class="NCommon">
       <h2 class="title">签收验货</h2>
       <div class="NCommon_content">
           <dl>
               <dt>1. 验货</dt>
               <dd>在您收到货物，拆商品包装前请核对货物订单编号、收货人姓名等信息，及货物外包装是否有明显挤压变形、破损或受潮状况；如果是货到付款，配送人员收取的费用与订单上标明的费用是否一致。如您在检查后发现有异常，请您一定要向配送人员说明情况并由联系网站客服0371-67618866。</dd>
               <dd>在您付款之后，请保证在配送人员在场的情况下拆开货物包装，参照发票核对商品型号、数量、外观等，若核对后发现缺少商品附件，或者商品颜色、型号不对，外观损坏，请您一定要向配送人员说明情况并由联系网站客服0371-67618866进行反馈和登记，我们会根据实际情况为您做相应处理。</dd>
           </dl>
           <dl>
               <dt>2.签收</dt>
               <dd>当货物配送到您订单地址时，业务员会在第一时间与您电话联系，如您已经在线支付全款，则您在收货时即可直接验货签收；如您下单时选择货到付款方式支付，请提前备好零钱或者银行卡，为了保障您的权益，请当面点清货款。</dd>
           </dl>
           <dl>
               <dt>3.自动收货</dt>
               <dd>若您购买的是实物类商品：</dd>
               <dd>如果物流方式为快递、EMS、不需要物流，自“卖家已发货”状态起的10天后，系统会自动确认收货。</dd>
               <dd>如果物流方式为平邮，自“卖家已发货”状态起的30天后，系统会自动确认。</dd>
           </dl>
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
            border-top: 1px solid #ddd;
            dl{
                padding: 20px 0;
            }
            dt{
                font-size: 18px;
                color: #181818;
                margin: 10px 0;
            }
            dd{
                font-size: 18px;
                color: #666;
                line-height: 34px;
                margin-bottom: 10px;
            }
        }
    }
</style>