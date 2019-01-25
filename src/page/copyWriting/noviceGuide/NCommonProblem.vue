<template>
    <div class="NCommon">
       <h2 class="title">注册新会员</h2>
       <div class="NCommon_content">
           <dl>
               <dt>掌柜当家为B2B2C平台，用户分为普通消费和和商家。</dt>
           </dl>
           <dl>
               <dt>普通消费者注册流程:</dt>
               <dd>在页面顶部点击“注册”，填写手机号码，获取验证码，填写相关信息，点击“注册”即新会员注册成功。</dd>
           </dl>
           <dl>
               <dt>商家消费者注册流程:</dt>
               <dd>需按照普通消费者注册流程注册为普通会员后，在“个人中心”点击“商家申请”填写相关资料，提交后掌柜当家将对相关资料进行审核，审核通过后既可以成为商家消费者。进入B2B页面，进行商品浏览和下单。</dd>
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
                font-size: 16px;
                color: #666;
                line-height: 34px;
            }
        }
    }
</style>