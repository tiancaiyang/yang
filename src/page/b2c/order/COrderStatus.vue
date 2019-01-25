<template>
  <div class="accountDiv banxin">
    <!-- 订单提交成功----待发货状态 -->
    <div class="accountInfo">
      <div class="accountInfoTop">
        <h3>
          <img src="../../../assets/common/checked.png" alt="">
          订单提交成功,现在只差最后一步啦！
        </h3>
      </div>
      <div class="accountInfoBottom">
        <p class="prompt">温馨提醒:</p>
        <p class="promptInfo">如果卖家存在违背发货时间承诺的情况，或者您也不想再要货物，您可以联系卖家<b>申请退款/</b><b>退货退款</b></p>
        <a href="javascript:void(0);">提醒发货</a>
      </div>
    </div>
    <!-- 订单待付款状态 -->
    <div class="accountInfo">
      <div class="accountInfoTop">
        <h3>
          <img src="../../../assets/common/fail.png" alt="">
          当前订单状态：等待买家付款，请在1小时59分48秒内付款；若未及时付款，系统将会取消订单
        </h3>
      </div>
      <div class="accountInfoBottom">
        <p class="prompt">温馨提醒:</p>
        <p class="promptInfo">如果您不想购买，可以<b>取消订单</b></p>
        <a href="javascript:void(0);">立即付款</a>
      </div>
    </div>
    <!-- 订单待收货状态 -->
    <div class="accountInfo">
      <div class="accountInfoTop">
        <h3>
          <img src="../../../assets/common/checked.png" alt="">
          当前订单状态：卖家已发货，还剩7天2时自动确认收货
        </h3>
      </div>
      <div class="accountInfoBottom">
        <p class="prompt">温馨提醒:</p>
        <p class="promptInfo">交易已经成功，如果您未收到货物，或者收到货物无法正常使用，请及时联系卖家处理。</p>
        <a href="javascript:void(0);">确认收货</a>
      </div>
    </div>
    <!-- 订单完成状态 -->
    <div class="accountInfo" style="height:200px">
      <div class="accountInfoTop">
        <h3>
          <img src="../../../assets/common/checked.png" alt="">
          当前订单状态：交易成功
        </h3>
      </div>
      <div class="accountInfoBottom">
        <p class="prompt">温馨提醒:</p>
        <p class="promptInfo">交易已经成功，如果您未收到货物，或者收到货物无法正常使用，请及时联系卖家处理。</p>
      </div>
    </div>
    <!-- 物流信息 -->
    <div class="infoDiv">
      <h4>物流信息</h4>
      <div class="info">
        <p>发货时间: 2018-01-08 17:32:25</p>
        <p>物流公司: 韵达快递 <a class="logisticGW" href="javascript:void(0);">点击进入物流官网</a></p>
        <p>物流单号: 3101651310612</p>
        <p>物流跟踪:</p>
        <div class="logisticInfo">
          <div class="track-rcol">
            <div class="track-list">
              <ul>
                <li class="first">
                  <i class="node-icon"></i>
                  <span class="time">2016-03-10 18:07:15</span>
                  <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                </li>
                <li>
                  <i class="node-icon"></i>
                  <span class="time">2016-03-10 18:07:15</span>
                  <span class="txt">【京东到家】京东配送员【申国龙】已出发，联系电话【18410106883，感谢您的耐心等待，参加评价还能赢取京豆呦】</span>
                </li>
                <li>
                  <i class="node-icon"></i>
                  <span class="time">2016-03-10 18:07:15</span>
                  <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                </li>
                <li>
                  <i class="node-icon"></i>
                  <span class="time">2016-03-10 18:07:15</span>
                  <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                </li>
                <li>
                  <i class="node-icon"></i>
                  <span class="time">2016-03-10 18:07:15</span>
                  <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                </li>
                <li>
                  <i class="node-icon"></i>
                  <span class="time">2016-03-10 18:07:15</span>
                  <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="infoDiv">
      <h4>订单信息</h4>
      <div class="info">
        <p>收货地址: 王小花 188***3817 河南省郑州市金水区河南省郑州市金水区东风路世玺中心1410 </p>
        <p>订单编号: 20180908398494832200002925353</p>
        <p>支付方式: 支付宝</p>
        <p>支付金额: <b>￥567.00</b></p>
        <p>下单时间: 2018-9-16 10:48:09</p>
        <p>买家留言: 给我放点辣椒</p>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="goodsInfo">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="table_style" :cell-style="{'text-align':'center'}">
        <el-table-column label="商品信息" width="480">
          <template slot-scope="scope">
            <img src="../../../assets/common/tel.png" alt="">
            德国小甘菊润唇膏,支持7天无理由
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="150"></el-table-column>
        <el-table-column prop="num" label="数量" width="150"></el-table-column>
        <el-table-column prop="allPrice" label="金额（元）" width="150"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
    </div>
    <div class="infoBottom">
      <p class="fr">实付款: <b>￥140.00</b></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      table_style: {
        'background': '#fff4e8',
        'text-align': 'center'
      },
      tableData: [
        {price: '70.00', num: '2', allPrice: '140.00', status: '已确认收货'}
      ]
    }
  },
  mounted () {

  },
  methods: {
    // cellStyle({row, column, rowIndex, columnIndex}){
    //   if(columnIndex === 0 && rowIndex === 0){ // 指定列号
    //     return 'tex'
    //   } else {
    //     return ''
    //   }
    // },
  }
}
</script>

<style scoped lang="scss">
.accountDiv {
  .accountInfo {
    box-sizing: border-box;
    background-color: #fff4e8;
    height: 257px;
    border: 1px solid #ffc07b;
    padding: 30px 40px;
    a {
      color: #666;
      font-size: 12px;
    }
    .accountInfoTop {
      border-bottom: 1px solid #eee;
      h3 {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
        color: #333;
        margin-bottom: 20px;
      }
    }
    .accountInfoBottom {
      padding-top: 20px;
      p {
        font-size: 12px;
        margin-bottom: 20px;
      }
      .prompt {
        color: #e51818;
        font-size: 12px;
        font-weight: bold;
      }
      .promptInfo {
        color: #333;
        b {
          color: #2a51a0;
          font-weight: bold;
          font-size: 12px;
          vertical-align: top;
        }
      }
      a {
        font-size: 16px;
        font-weight: bold;
        color: #e51818;
        border: 2px solid #e51818;
        padding: 10px 20px;
        display: inline-block;
      }
    }
  }
  .infoDiv {
    padding: 20px 0;
    border: 1px solid #eee;
    border-top: 0;
    h4 {
      font-size: 16px;
      color: #999;
      padding: 0 0 20px 40px;
    }
    .info {
      padding: 40px 40px 0;
      font-size: 16px;
      color: 333;
      border-top: 1px solid #eee;
      p {
        margin-bottom: 20px;
        b {
          font-weight: bold;
          color: #e51818;
        }
        .logisticGW{
          color: #00f;
          vertical-align: top;
        }
      }
    }
  }
  .goodsInfo {
    margin-top: 30px;
  }
  .infoBottom{
    height: 115px;
    line-height: 115px;
    margin-top: 30px;
    padding-right: 40px;
    border: 1px solid #eee;
    background-color: #f7f7f7;
    p{
      color: #333;
      font-size: 12px;
      b{
        color: #e51818;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
  // 进度条
  .logisticInfo {
    .track-rcol {
      width: 100%;
    }
		.track-list{
      margin: 20px;

      padding-left: 5px;
      position: relative;
    }
		.track-list li{
      position: relative;
      padding: 9px 0 0 25px;
      line-height: 18px;
      border-left: 1px solid #d9d9d9;
      color: #999;
    }
		.track-list li.first{
      color: #e81515;
      padding-top: 0;
      border-left-color: #fff;
    }
		.track-list li .node-icon{
      position: absolute;
      left: -6px;
      top: 63%;
      width: 10px;
      height: 10px;
      background-color: #ddd;
      border-radius: 50%;
    }
		.track-list li.first .node-icon{
      background-color: #e81515;
      z-index: 2;
    }
		.track-list li .time{
      margin-right: 20px;
      position: relative;
      top: 4px;
      display: inline-block;
      vertical-align: middle;
    }
		.track-list li .txt{
      max-width: 100%;
      position: relative;
      top: 4px;
      display: inline-block;
      vertical-align: middle;
    }
		.track-list li.first .time{
      margin-right: 20px;
    }
		.track-list li.first .txt{
      max-width: 100%;
    }
  }
}
</style>
