<template>
    <div class="NCommon">
       <h2 class="title">订单操作</h2>
       <div class="NCommon_content">
           <h3>下单步骤:</h3>
           <p>1、浏览您要购买的商品，点击“加入购物车”，商品会自动添加到购物车里。</p>
           <p>2、如果您需要更改商品数量，需在商品数量框中输入购买数量。</p>
           <p>3、选好商品后去点击“立即购买”。</p>
           <p>4、详细填写收货人信息、支付方式、核对送货清单等信息。注：乡村互联中，除土特产外的其余商品不支持配送，需购买者到店消费。</p>
           <p>5、确认无误后点击“提交订单”，生成新订单并显示订单编号。</p>
           <p>6、查看订单详细信息，可进入我的订单中进行查看。</p>
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
                line-height: 30px;
                color: #181818;
                margin: 20px 0;
            }
        }
    }
</style>