<template>
  <div class="body_common">
    <header-top></header-top>
    <Header></Header>
    <div class="body_box">
      <div class="top_nav banxin">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="top_nav_box">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="body_box_content banxin clearfix">
        <div class="payInfo">
            <div class="payInfoTop">
                <h3>
                    <img src="../../assets/common/checked.png" alt="">
                    订单提交成功,现在只差最后一步啦！
                </h3>
                <p>请尽快完成订单,我们将会为您保留支付页面方便支付</p>
            </div>
            <div class="payInfoBottom">
                <a href="javascript:void(0);" class="fr">我的订单>></a>
                <p>德经典小甘菊护手霜唇膏洋甘小菊雏菊小柑橘滋润修护保湿套装 修护润唇膏4.8g  </p>
                <p>收货信息：河南省 郑州市  金水区 东风路 ,清远市,连山壮族瑶族自治县,省份城市县区清城区 佛冈县 阳山县 连山壮族瑶族自治县 连南瑶族自治县 清新县 英德市 连州市 ,阿顺帆，手机：143****6876</p>
            </div>
        </div>
        <div class="changePay">
            <h3>支付金额: <b>￥140.00</b></h3>
            <ul class="changePay-UL">
                <li>
                    <el-radio v-model="radio" label="1" class="payRadio"><img src="../../assets/common/allipay.png" alt=""></el-radio>
                    <span class="payName">支付宝支付</span>
                    <a class="del fr">删除</a>
                </li>
                <li>
                    <el-radio v-model="radio" label="2" class="payRadio"><img src="../../assets/common/wechat.png" alt=""></el-radio>
                    <span class="payName">微信支付</span>
                    <a class="del fr">删除</a>
                </li>
                <li>
                    <el-radio v-model="radio" label="3" class="payRadio"><img src="../../assets/common/jiansheBrank.png" alt=""></el-radio>
                    <span class="payName">货到付款</span>
                    <a class="del fr">删除</a>
                </li>
                <li>
                    <el-radio v-model="radio" label="4" class="payRadio"><img src="../../assets/common/jiansheBrank.png" alt=""></el-radio>
                    <span class="payName">中国光大银行</span>
                    <a class="del fr">删除</a>
                </li>
                <li>
                    <el-radio v-model="radio" label="5" class="payRadio"><img src="../../assets/common/jiansheBrank.png" alt=""></el-radio>
                    <span class="payName">中国建设银行</span>
                    <a class="del fr">删除</a>
                </li>
            </ul>
            <div class="otherPay">
                <a href="javascript:void(0);" class="active">收起全部绑定银行卡^</a>
                <a href="javascript:void(0);">+添加快捷/网银付款</a>
            </div>
            <div class="submitOrder clearfix">
                <a href="javascript:void(0);" class="fr">提交订单</a>
            </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: '1'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.body_common {
  .body_box {
    background-color: #f5f5f5;
    padding-bottom: 80px;
    .top_nav {
      height: 40px;
      .top_nav_box {
        line-height: 40px;
      }
    }
    .body_box_content {
    //   background-color: #fff;
      min-height: 1052px;
    }
  }
}
.payInfo{
    box-sizing: border-box;
    background-color: #fff;
    height: 220px;
    border: 1px solid #c4c4c4;
    padding: 30px 40px;
    a{
        color: #666;
        font-size: 12px;
    }
    .payInfoTop{
        border-bottom: 1px solid #eee;
        h3{
            font-size: 18px;
            color: #333;
            font-weight: bold;
            margin-bottom: 10px;
        }
        p{
            font-size: 14px;
            color: #333;
            margin-bottom: 20px;
        }
    }
    .payInfoBottom{
        padding-top: 20px;
        p{
            color: #333;
            font-size: 12px;
            line-height: 24px;
        }
    }
}
.changePay{
    margin-top: 30px;
    border: 1px solid #c4c4c4;
    padding: 30px 40px;
    background-color: #fff;
    h3{
        color: #333;
        font-size: 18px;
        b{
            color: #e51818;
            font-size: 24px;
            font-weight: bold;
        }
    }
    .changePay-UL{
        margin-top: 30px;
        margin-bottom: 30px;
        border-top: 1px solid #c4c4c4;
        box-sizing: border-box;
        li{
            padding: 20px 30px;
            border: 2px solid #fff;
            .payRadio{
                color: #e51818;
                img{
                    width: 36px;
                    height: 36px;
                    margin: 0 30px 0 50px;
                }
            }
            .payName{
                color: #333;
                font-size: 18px;
            }
            .del{
                line-height: 2;
                display: none;
            }

        }
        li:hover{
            border: 2px solid #f6b37f;
            .del{
                display: block;
            }
        }
    }
    .otherPay{
        a{
            color: #333;
            font-size: 14px;
            border: 1px solid #333;
            padding: 2px;
        }
        .active{
            color: #cf0a00;
            border-color: #cf0a00;
        }
    }
    .submitOrder{
        margin: 80px 0;
        a{
            font-size: 18px;
            font-weight: bold;
            color: #fff;
            padding: 20px 50px;
            background-color: #e51818;
        }
    }
}
</style>
