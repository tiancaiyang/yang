<template>
    <div class="NCommon">
       <h2 class="title">验货签收</h2>
       <div class="NCommon_content">
            <dl>
               <dt>1、验货</dt>
               <dd>在您收到货物后，请仔细核对商品订单编号、收货人姓名等信息，及货物外包装是否有明显挤压变形、破损或受潮状况；如果是货到付款，请核对配送人员收取的费用是否与订单上标明的费用一致。如若发现异常，请向配送人员说明情况并及时联系网站客服0371-67618866。付款之后，请在配送人员在场的情况下拆开货物包装，参照订单信息核对商品型号、数量、外观等，若发现商品缺少，或者商品颜色、型号不对，外观损坏，请向配送人员说明情况并联系网站客服进行反馈和登记，我们会根据实际情况为您做相应处理。
               </dd>
           </dl>
            <dl>
               <dt>2、签收</dt>
               <dd>当货物配送到您订单地址时，业务员或配送员会在第一时间与您电话联系，如已经在线支付全款，则在收货时即可直接验货签收；如下单时选择货到付款方式支付，请提前备好货款，如为现金结算，为了保障您的权益，请当面点清货款。
               </dd>
           </dl>
            <dl>
               <dt>3、自动收货</dt>
               <dd>如商品已正常配送到您的手中，请点击确认收货。平台设置了自动收货功能，自“卖家已发货”状态起的15天后，系统会自动确认收货。如若您在此期间没有收到货物，请及时联系平台客服进行相关问题处理。
               </dd>
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
                color: #333;
                margin: 10px 0;
            }
            dd{
                font-size: 18px;
                color: #181818;
                line-height: 34px;
            }
        }
    }
</style>