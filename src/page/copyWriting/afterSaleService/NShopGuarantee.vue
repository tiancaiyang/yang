<template>
    <div class="NCommon">
       <h2 class="title">退换货原则</h2>
       <div class="NCommon_content">
           <dl>
               <dt>如何申请退货/换货？</dt>
               <dd>登录掌柜当家，在我的订单点击退款或换货，填写退换货信息。在退换货前请联系卖家进行相关事宜的协商。退换货提交成功后，请耐性等待，由专业的售后工作人员受理您的申请。</dd>
           </dl>
           <dl>
               <dt>购买商品出现质量问题如何处理？</dt>
               <dd>商品有质量问题的，请您及时联系掌柜当家客服进行处理。</dd>
           </dl>
           <dl>
               <dt>如何查看售后服务的审核结果？</dt>
               <dd>请您登陆掌柜当家在我们订单，退换货服务里查看结果，或者拨打客服电话进行查询。</dd>
           </dl>
           <dl>
               <dt>商品使用有质量问题，该如何处理？</dt>
               <dd>为了更好的解决您的问题，建议您优先查看“商品使用说明”；若使用无误且属于商品原因，建议您及时联系卖家或者拨打客服电话，会有专业人员为您处理。</dd>
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
            }
        }
    }
</style>