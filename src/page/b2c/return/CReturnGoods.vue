<template>
	<div>
		<ul class="top_tabs banxin">
			<li :class="num==1?'li_active':''"><span>1</span>买家申请退货退款</li>
			<li :class="num==2?'li_active':''"><span>2</span>卖家处理退货申请</li>
			<li :class="num==3?'li_active':''"><span>3</span>买家退货给卖家</li>
			<li :class="num==4?'li_active':''"><span>4</span>卖家确认收货，退款完成</li>
		</ul>
		<div class="tabs_content banxin clearfix">
			<div class="boxLeft fl">
				<div v-show="num == '1'" class="contentBox">
					<div class="leftLIst">
						<span class="leftTS"><b>*</b> 退款商品:</span>
						<img :src="productData.thumb" alt="">
						<span class="goodsName">{{ productData.title }}</span>
					</div>
					<div class="leftLIst">
						<span class="leftTS"><b>*</b> 退款类型:</span>
						<el-select v-model="value" size="small">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="leftLIst">
						<span class="leftTS"><b>*</b> 退款原因:</span>
						<el-select v-model="value2" filterable size="small" placeholder="请选择">
							<el-option v-for="item in optionstow" :key="item.value" :label="item.label" :value="item.label">
							</el-option>
						</el-select>
					</div>
					<div class="leftLIst return">
						<span class="leftTS"><b>*</b> 退款金额:</span>
						<el-input size="small" v-model="inputPrice" @change="decidePrice"></el-input>
						<p class="returnPrice">最多退金额￥{{ input1 }}，不包含邮费</p>
					</div>
					<div class="leftLIst">
						<span class="leftTS"><b>*</b> 退款说明:</span>
						<el-input type="textarea" maxlength="200" resize="none" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" v-model="textarea1">
						</el-input>
					</div>
					<div class="leftLIst">
						<p class="submit" @click="goApplicationRefund">提交</p>
					</div>
				</div>
				<div v-show="num == '2'" class="second">
                    <div class="accountInfo" v-if="refundStatus == 0">
						<div class="accountInfoTop">
							<h3>
								<img src="../../../assets/common/checked.png" alt="">
								{{ refundData.title }}<span></span>
							</h3>
							<p>{{ refundData.remark }}</p>
						</div>
						<div class="accountInfoBottom">
							<a class="telSeller" @click="contactSeller(refundData.brand_member_id)">联系卖家</a>
							<p class="other">您还可以：<a class="disPetition" @click="RefundDetailclose">撤销申请</a></p>
						</div>
					</div>
                    <div class="accountInfo" v-if="refundStatus == 2">
						<div class="accountInfoTop">
							<h3>
								<img src="../../../assets/common/checked.png" alt="">
								{{ refundData.title }}
							</h3>
							<p>{{ refundData.remark }}</p>
						</div>
						<div class="accountInfoBottom">
							<a class="telSeller"  @click="contactSeller(refundData.brand_member_id)">联系卖家</a>
							<p class="other">您还可以：<a class="disPetition" @click="RefundDetailclose">撤销申请</a></p>
						</div>
					</div>
					<div class="accountInfo" v-if="refundStatus == 3">
						<div class="accountInfoTop">
							<h3>
								<img src="../../../assets/common/checked.png" alt="">
								卖家已同意申请，等待买家退货 <span></span>
							</h3>
							<p>卖家已同意退货退款，请您及时退回需要更换的商品</p>
                            <p>{{brandMemberAddress.remind}}</p>
						</div>
						<div class="accountInfoBottom">
							<p class="prompt"> <span class="el-icon-location-outline"></span> 收货地址 :{{ brandMemberAddress.name }} {{ brandMemberAddress.mobile }}  {{ brandMemberAddress.refund_address }}</p>
							<p class="promptInfo">*如您逾期未填写退货物流信息，申请将会自动关闭。</p>
							<p class="promptInfo">* 如未经卖家同意。，请不要使用到付或平邮。</p>
							<a class="telSeller"  @click="contactSeller(refundData.brand_member_id)">联系卖家</a>
							<a class="fillReturn" href="javascript:void(0);" @click="logisticsNum">填写退货物流</a>
							<p class="other">您还可以：<a class="disPetition" @click="RefundDetailclose">撤销申请</a></p>
						</div>
					</div>
				</div>
				<div v-show="num == '3'" class="thrid">
					<div class="accountInfo">
						<div class="accountInfoTop">
							<h3>
								<img src="../../../assets/common/checked.png" alt="">
								请退货并填写物流信息
							</h3>
							<div class="step">
								<p class="stepOne">1、请退货</p>
								<p class="address"> <span class="el-icon-location-outline"></span> 收货地址 : {{ brandMemberAddress.name }} {{ brandMemberAddress.mobile }}  {{ brandMemberAddress.refund_address }}</p>
								<p class="addressTS">（如未经卖家同意，请不要使用到付或平邮。）</p>
							</div>
						</div>
						<div class="fillInfo step">
							<p class="stepOne">2.请填写物流退货信息 <span>（如诺逾期未填写，退货申请将关闭）</span></p>
							<div class="leftLIst logisticsNum return">
								<span class="leftTS"><b>*</b> 运单编号:</span>
								<el-input size="small" v-model="input3">
								</el-input>
							</div>
							<div class="leftLIst">
								<p class="submit" @click="submitRefundexpress">提交</p>
							</div>
						</div>
					</div>
				</div>
				<div v-show="num == '4'" class="four">
					<div class="accountInfo"  v-if="refundStatus == 1">
						<div class="accountInfoTop">
							<h3>
								<img src="../../../assets/common/checked.png" alt="">
								{{ refundData.title }}
							</h3>
                            <p>退款时间：<span>￥{{ refundData.confirm_time}}</span></p>
							<p>退回总金额：<span>￥{{ refundData.refund_amount}}</span></p>
							<a @click="contactSeller(refundData.brand_member_id)">联系卖家</a>
						</div>
					</div>
                    <div class="accountInfo"  v-if="refundStatus == 4">
						<div class="accountInfoTop">
							<h3>
								<img src="../../../assets/common/checked.png" alt="">
								{{ refundData.title }}<span>（还剩{{ refundData.res_day }}天{{ refundData.res_hour }}时{{ refundData.res_min }}分）</span>
							</h3>
                            <p>{{ refundData.remark }}</p>
                            <div class="accountInfoBottom">
                                <a class="fillReturn" @click="contactSeller(refundData.brand_member_id)">联系卖家</a>
                            </div>
						</div>
					</div>
                    <div class="accountInfo"  v-if="refundStatus == 6">
						<div class="accountInfoTop">
							<h3>
								<img src="../../../assets/common/checked.png" alt="">
								{{ refundData.title }}<span>（还剩{{ refundData.res_day }}天{{ refundData.res_hour }}时{{ refundData.res_min }}分）</span>
							</h3>
                            <p>{{ refundData.remark }}</p>
                            <div class="accountInfoBottom">
                                <a class="fillReturn" @click="contactSeller(refundData.brand_member_id)">联系卖家</a>
                            </div>
						</div>
					</div>
				</div>
			</div>
			<div class="boxRight fr">
				<h3>订单详情</h3>
				<div class="goodsInfo">
					<img :src="productData.thumb" alt="">
					<p class="fr">{{ productData.title }}{{ productData.product_attr }}</p>
				</div>
				<div class="goodsTel">
					<p>联系电话：<span>{{ ordertInfoData.mobile }}</span></p>
					<p>订单编号：<span class="orderNum">{{ ordertInfoData.order_no }}</span></p>
					<p>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：<span>￥{{ productData.price }}*{{ productData.num }}（数量）</span></p>
					<p>商品总价：<span class="allPrice">￥{{ input1 }}</span></p>
					<p>成交时间：<span>{{ ordertInfoData.create_time}}</span></p>
					<p>支付方式：<span>{{ ordertInfoData.pay_type | payType }}</span></p>
				</div>
				<div v-if="num == 2 || num == 3 || num == 4" class="goodsTel">
					<p>退款编号：<span class="orderNum">{{ refundData.refund_no }}</span></p>
					<p>退款金额：<span class="allPrice">￥{{ refundData.refund_amount }}</span></p>
					<p>退款原因：<span>{{ refundData.refund_reason}}</span></p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
    b2cOrderInfo,
    b2bOrderReturnRefunt ,
    refunHandlePrice ,
    refundOrderDetail,
    orderInfoCellPhone,
    refundDetailclose,
    refundAddress,
    refundexpress,
    ruralgetXcOrderDetail
} from '../../../api/index.js'
export default {
  inject :['reload'],
  data () {
    return {
      orderNo: this.$route.query.orderNo,
      detailId: this.$route.query.detailId,
      orderType: this.$route.query.orderType,
      ordertInfoData:[],//订单详情数据
      productData:[],//退款商品
      num: 1,
      value: '1', // 退款类型
      options: [
			{value: '1', label: '退货退款'},
      ],
      value2: '', // 退款原因
      optionstow: [
		{value: '1', label: '与卖家协商一致'},
		{value: '2', label: '不想要了'},
		{value: '3', label: '未按约定时间发货'},
		{value: '4', label: '收到商品与描述不符'},
		{value: '5', label: '其他'},
      ],
      inputPrice: 0, // 填写退款金额
      input1: 0, // 获取退款金额
      textarea1: '', // 退款说明
      input3: '', // 填写物流单号
      refundStatus:'',//退款退货订单状态
      refundData:[],//退款订单详情
      brandMemberAddress:[],//退货地址
    }
  },
  created(){
    this.getOrderInfo()
    this.getRefunHandlePrice()
    this.getOrderRefundDetail()
  },
  methods: {
    changeTabs () {
      if (this.num < 4) {
        this.num = Number(this.num) + 1
      } else {
        // this.$router.push({
        // name: 'Login'
        // })
      }
      this.getOrderRefundDetail()
    },
    // 获取订单商品信息
    getOrderInfo(){
        let params = {
            order_no: this.orderNo
        }
        if(this.orderType == 2){
            b2cOrderInfo(params).then(res=>{
                if(res.code == 0){
                    this.ordertInfoData = res.data
                    this.ordertInfoData.product.forEach(item=>{
                        if(item.detail_id == this.detailId){
                            this.productData = item
                        }
                    })
                }
            })
        }else if(this.orderType == 3){
            ruralgetXcOrderDetail(params).then(res=>{
                if(res.code == 0){
                    this.ordertInfoData = res.data
                    this.activityType = res.data.activity_type
                    this.ordertInfoData.product.forEach(item=>{
                        if(item.detail_id == this.detailId){
                            this.productData = item
                        }
                    })
                }
            })
        }
    },
    // 获取退款价格
    getRefunHandlePrice(){
        let params = {
            order_no: this.orderNo,
            detail_id: this.detailId,
            order_type: this.orderType
        }
        refunHandlePrice(params).then(res=>{
            if(res.code == 0){
                this.input1 = res.data.refund_price
                this.inputPrice = this.input1
            }
        })
    },
    //判断退款价格
    decidePrice(){
      if(this.inputPrice > this.input1 ){
          this.$alert('退款金额大于最大退款金额, 请修改', '提示', {
              confirmButtonText: '确定',
              callback: action => { 
              }
          });
      }    
    },
    // 去申请退款退货
    goApplicationRefund(){
        var reg = /^\s*$/g;
        if(this.value == "" || reg.test(this.value) ){
            this.$message.error('请选择退款类型');
        }else if(this.value2 == "" || reg.test(this.value2) ){
            this.$message.error('请选择退款原因');
        }else if(this.input1 == "" || reg.test(this.input1) ){
            this.$message.error('请输入退款金额');
        }else if(this.inputPrice > this.input1){
            this.decidePrice()
        }else{
            let params = {
                order_no: this.orderNo,
                refund_reason: this.value2,
                type: this.orderType,
                refund_type:this.value,
                comment: this.textarea1,
                amount: this.input1,
                detail_id: this.detailId,
                activity_type: this.ordertInfoData.activity_type
            }
            b2bOrderReturnRefunt(params).then(res=>{
                console.log(res)
                if(res.code == 0){
                    this.getOrderRefundDetail()
                }
            })
        }
        
    },
    // 获取退款订单详情
    getOrderRefundDetail(){
        let params = {
            order_no: this.orderNo,
            type: this.orderType,
            detail_id: this.detailId
        }
        refundOrderDetail(params).then(res=>{
            if(res.code == 0){
                if(this.refundStatus == 7){
                    this.num = 3
                }else{
                    this.refundStatus = res.data.refund_status
                    this.refundData = res.data
                    if(this.refundStatus == 0 || this.refundStatus == 2 || this.refundStatus == 3 || this.refundStatus == 5){
                        this.num = 2
                    }else if(this.refundStatus == 1 || this.refundStatus == 4  || this.refundStatus == 6 ){
                        this.num = 4
                    }
                }
                this.getrefundAddress()
            }
        })
    },
    //联系卖家
    contactSeller(brandMemberId){
      let params = {
        brand_member_id: brandMemberId,
        type: this.orderType
      }
      orderInfoCellPhone(params).then(res=>{
        if(res.code == 0){
          this.$message({
            showClose: true,
            message: res.data.brand_store_name+':'+ res.data.mobile,
            type: 'success'
          });
        }
      })  
    },
    // 撤销申请
    RefundDetailclose(){
        this.$confirm('您确定要撤销退货退款吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let params = {
                order_no: this.orderNo,
                type: this.orderType,
                detail_id: this.detailId
            }
            refundDetailclose(params).then(res=>{
                console.log(res)
                if(res.code == 0){
                    this.$message({
                        type: 'success',
                        message: '撤销成功!'
                    });
                    // 去订单列表页面
                    this.$router.push({name:'OrderAll'})
                }
            })
        }).catch(() => {
              
        });   
    },
    // 获取退货地址
    getrefundAddress(brandMemberId){
        let params = {
            brand_member_id : this.refundData.brand_member_id
        }
        refundAddress(params).then(res=>{
            if(res.code == 0){
                this.brandMemberAddress = res.data
            }
        })
    },
    // 填写物流单号
    logisticsNum(){
        // 状态值为7时进入填写物流页面（个人意愿设置）
        this.refundStatus = 7
        this.getOrderRefundDetail()
    },
    // 提交物流单号
    submitRefundexpress(){
        var reg = /^\s*$/g;
        if(this.input3 == "" || reg.test(this.input3) ){
            this.$message.error('请填写物流单号');
        }else {
            let params = {
                order_no: this.orderNo,
                express: this.input3,
                detail_id: this.detailId
            }
            refundexpress(params).then(res=>{
                console.log(res)
                if(res.code == 0){
                    // 再次刷新页面
                    this.reload()
                    this.getOrderRefundDetail()
                }else{
                    this.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        
                        }
                    });
                }
            })
        }  
    }
  }
}
</script>
<style scoped lang="scss">
    .top_tabs {
        display: flex;
        justify-content: space-around;
        border-bottom: 2px solid #aaa;
        li {
            font-size: 18px;
            color: #999;
            display: flex;
            align-items: center;
            padding: 0 30px 10px;
            margin-bottom: -2px;

            span {
              display: inline-block;
              width: 18px;
              height: 18px;
              border: 2px solid #d6d6d6;
              text-align: center;
              line-height: 18px;
              font-size: 14px;
              color: #ccc;
              border-radius: 50%;
              margin-right: 8px;
              margin-bottom: -2px;
            }
          }

          // 选中时 li 的样式
          .li_active {
            color: #e51818;
            border-bottom: 2px solid #e51818;
            padding-bottom: 10px;

            span {
              background-color: #e51818;
              border-color: #e51818;
              color: #fff;
            }
          }
    }
    .tabs_content {
        margin-top: 20px;
        background-color: #fff;
        border: 1px solid #d6d6d6;
        .boxLeft{
            width: 900px;
            padding: 40px 80px;
            box-sizing: border-box;
            border-right: 1px solid #d6d6d6;
        }
        .boxRight{
            width: 296px;
            height: 100%;
            padding: 30px;
            box-sizing: border-box;
            h3{
                color: #333;
                font-size: 18px;
            }
            .goodsInfo{
                margin-top: 35px;
                padding-bottom: 35px;
                img{
                    max-width: 50px;
                    vertical-align: top;
                }
                p{
                    color: #666;
                    font-size: 14px;
                    width: 70%;
                }
            }
            .goodsTel{
                font-size: 14px;
                color: #999;
                padding-top: 20px;
                border-top: 1px solid #d6d6d6;
                p{
                    margin-bottom: 15px;
                }
                span{
                    color: #666;
                }
                .orderNum{
                    color: #1c9eff;
                }
                .allPrice{
                    color: #e51818;
                }
            }
        }
        // 第一版样式
        .leftLIst{
            margin-bottom: 40px;
            .leftTS{
                color: #333;
                margin-right: 30px;
                font-size: 16px;
                b{
                    color: #e51818;
                }
            }
            img{
                max-width: 89px;
                border: 1px solid #d6d6d6;
            }
            .goodsName{
                font-size: 16px;
                color: #666;
            }
            .el-input {
                width: 240px;
            }
            .returnPrice{
                color: #999;
                font-size: 14px;
                padding-left: 115px;
                margin-top: 10px;
            }
            .el-textarea{
                width: 480px;
                height: 135px;
                vertical-align: top;
            }
            .submit{
                width: 300px;
                height: 60px;
                line-height: 60px;
                font-size: 18px;
                background-color: #e51818;
                color: #fff;
                text-align: center;
                margin-left: 115px;
            }
        }
        // 第二版样式
        .second{
            background-color: #fff;
            margin-bottom: 190px;
        }
        .accountInfo{
            box-sizing: border-box;
            .accountInfoTop{
                border-bottom: 1px solid #e8e8e8;
                h3{
                    font-size: 18px;
                    color: #333;
                    font-weight: bold;
                    margin-bottom: 10px;
                    span{
                        color: #36c;
                    }
                    img{
                        vertical-align: middle;
                    }
                }
                p{
                    font-size: 16px;
                    color: #333;
                    margin: 20px 0;
                }
            }
            .accountInfoBottom {
                padding-top: 20px;
                .prompt {
                    color: #666;
                    font-size: 16px;
                    margin-bottom: 40px;
                }
                .promptInfo {
                    color: #999;
                    font-size: 16px;
                    margin-bottom: 15px;
                }
                .telSeller{
                    display: inline-block;
                    margin-top: 20px;
                    padding: 20px 25px;
                    font-size: 18px;
                    color: #333;
                    text-align: center;
                    background-color: #d6d6d6;
                }
                .fillReturn{
                    margin-top: 20px;
                    margin-left: 20px;
                    font-size: 18px;
                    color: #fff;
                    background-color: #e51818;
                    padding: 20px 13px;
                    display: inline-block;
                }
                .other{
                    color: #666;
                    font-size: 14px;
                    margin-top: 20px;
                    .disPetition{
                        display: inline-block;
                        color: #5d80d3;
                    }
                }
            }
        }
        // 第三版样式
        .thrid{
           .step{
               .stepOne{
                   font-size: 12px;
                   color: #333;
                   span{
                       color: #666;
                   }
                }
                .address{
                    color: #666;
                    font-size: 16px;
                }
                .addressTS{
                    color: #999;
                    .telLogistic{
                        color: #36c;
                    }
                }
            }
            .fillInfo{
                margin-top: 20px;
                .thirdleftLIst{
                    padding-top: 30px;
                }
                .logisticsNum{
                    margin-top: 20px;
                }
            }
        }
        // 第四版样式
        .four{
            margin-bottom: 400px;
           .accountInfoTop{
               border-bottom: 0;
                p{
                   font-size: 16px;
                   color: #333;
                }
                a{
                    font-size: 18px;
                    color: #fff;
                    background-color: #e51818;
                    padding: 20px 22px;
                    display: inline-block;
                }
           }
        }
    }
</style>
