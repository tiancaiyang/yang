import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/Login' // 登录页面
import Register from '../page/Register' // 注册页面
import ForgetPassWord from '../page/ForgetPassWord' // 忘记密码
import test from '../page/test' // 忘记密码

// B2C
import CHomePage from '../page/b2c/CHomePage' // b2c 首页
import CBodyCommon from '../page/b2c/CBodyCommon' // b2c 商品公共页面组件
import CProductDetail from '../page/b2c/CProductDetail' // b2c 商品详情页面
import COrderStatus from '../page/b2c/order/COrderStatus.vue' // b2c 订单状态页面
import COrderConfirm from '../page/b2c/order/COrderConfirm.vue' // b2c 确认订单
import CReturnGoods from '../page/b2c/return/CReturnGoods.vue' // C端退款退货申请+处理页面
import CReturnOnly from '../page/b2c/return/CReturnOnly.vue' // C端仅退款
import CBrandList from '../page/b2c/brandCat/CBrandList.vue' // 根据品牌选分类--商品列表
import CCatList from '../page/b2c/brandCat/CCatList.vue' // 根据分类选品牌--商品列表
import CChoicePay from '../page/b2c/CChoicePay.vue' // 选择支付方式
import CGoodSale from '../page/b2c/CActivity/GoodSale.vue' // 好货特卖
import CSeckillTime from '../page/b2c/CActivity/SeckillTime.vue' // 好货特卖


// B2B
import BHomePage from '../page/b2b/BHomePage' // b2b 首页
import BReturnGoods from '../page/b2b/Return/BReturnGoods.vue' // b2b 退款申请+处理页面
import BGoodsList from '../page/b2b/BGoodsList.vue' // b2b 根据分类选品牌--商品列表
import BProductDetail from '../page/b2b/BProductDetail' // b2b 商品详情页面
import BOrderConfirm from '../page/b2b/BOrderConfirm' // b2b 确认订单页面
import BOrderPaytypeConfirm from '../page/b2b/BOrderPaytypeConfirm' // b2b 选择支付方式提交订单
import BCodCallBackPage from '../page/b2b/BCodCallBackPage' // b2b 货到付款后的回调页面
import BLimitTimeSell from '../page/b2b/BLimitTimeSell' // b2b 秒杀商品列表
import BGoodSale from '../page/b2b/BGoodSale' // b2b 特价商品
import BCombination from '../page/b2b/BCombination' // b2b 组合活动列表
import BCombinationInfo from '../page/b2b/BCombinationInfo' // b2b 组合活动(一, 二)商品详情
import BCombinationInfoSan from '../page/b2b/BCombinationInfoSan' // b2b 组合活动(三)商品详情

// 海外购
import OHomePage from '../page/overseas/OHomePage.vue'// 海外购首页
import ONationalPavilion from '../page/overseas/ONationalPavilion.vue'// 丝路国际
import OTourism from '../page/overseas/OTourism.vue'// 境外旅游
import OSilkRoadInternational from '../page/overseas/OSilkRoadInternational.vue'// 丝路国际旅游
import OGroupTour from '../page/overseas/OGroupTour.vue'// 跟团游
import OPlaceOrder from '../page/overseas/OPlaceOrder.vue'// 提交订单

// B端 C端 通用
import AGoodsList from '../page/common/AGoodsList.vue' // 根据分类选品牌--商品列表
import AGoodsBrandList from '../page/common/AGoodsBrandList.vue' // 根据品牌选分类--商品列表
import AGoodsListSearch from '../page/common/AGoodsListSearch.vue' // 通过关键字搜索 出来的商品列表
import AChoicePay from '../page/common/AChoicePay.vue' // 选择支付方式
import AEvaluateGoods from '../page/user/evaluate/AEvaluateGoods.vue' // 商品评价
import AEvaluateSuccess from '../page/user/evaluate/AEvaluateSuccess.vue' // 商品评价成功
import AShopCar from '../page/common/AShopCar' // 购物车
import ACouponList from '../page/common/ACouponList.vue' // 优惠券商品列表
import AGoodSale from '../page/common/Activity/AGoodSale.vue' // 好货特卖
import ASeckillTime from '../page/common/Activity/ASeckillTime.vue' // 限时秒杀
import ACombination from '../page/common/Activity/ACombination.vue' //组合活动
import ACombinationInfo from '../page/common/Activity/ACombinationInfo.vue' //组合活动详情
import AShopList from '../page/common/AShop/AShopList.vue' //搜索出来的店铺列表
import AShopInfo from '../page/common/AShop/AShopInfo.vue' //店铺
import paySuccess from '../page/common/ApayResult/paySuccess.vue' //支付成功
import payFailure from '../page/common/ApayResult/payFailure.vue' //支付失败

// 乡村互联
import RuralCommon from '../page/rural/RuralCommon.vue' // 首页 跟 商品列表页的 公共父组件
import RHomePage from '../page/rural/RHomePage.vue' // 乡村互联首页
// import RGoodsList from '../page/rural/RGoodsList.vue' // 乡村互联 商品列表页
import RAddress from '../page/rural/RAddress.vue' //乡村互联 选择地址页
import RDetailsCommon from '../page/rural/RDetailsCommon.vue' // 乡村互联 详情类页面的公共父组件
import RDetailsStore from '../page/rural/RDetailsStore.vue' // 乡村互联 商家详情页面
import RDetailsList from '../page/rural/RDetailsList.vue'  //乡村互联  商家列表页
import RDetailsStorePage from '../page/rural/RDetailsStorePage.vue'//乡村互联  商家店铺商品具体情况
import ROrderSubmit from '../page/rural/ROrderSubmit.vue'//乡村互联  提交订单页
import RGoodsDetails from '../page/rural/RGoodsDetails.vue' //乡村互联  土特产详情页
import RGoodListd from '../page/rural/RGoodListd.vue' //乡村互联土特产页
import RLocalProduct from '../page/rural/RLocalProduct.vue' //分页功能
import search from '../page/rural/search.vue' //所有搜索列表页


// 个人中心R
import UserCenter from '../page/user/UserCenter' // 个人中心
import OrderPerson from '../page/user/order/OrderPerson' // 我的订单
import OrderAll from '../page/user/order/OrderAll.vue' // 全部订单
import OrderWaitingPay from '../page/user/order/OrderWaitingPay.vue' // 待付款
import OrderDeliverGoods from '../page/user/order/OrderDeliverGoods.vue' // 待发货
import OrderWaitingReceive from '../page/user/order/OrderWaitingReceive.vue' // 待收货
import OrderConsumption from '../page/user/order/OrderConsumption.vue' // 待消费
import OrderReturnGoods from '../page/user/order/OrderReturnGoods.vue' // 退货退款
// import OrderInfo from '../page/b2c/order/COrderStatus.vue' //订单详情
import ROrderDetails from '../page/user/orderInfo/ROrderDetails.vue' //乡村互联  订单详情页
import OrderInfoPerson from '../page/user/orderInfo/orderInfoPerson.vue'//订单详情父组件
import orderInfoWaitingPay from '../page/user/orderInfo/orderInfoWaitingPay.vue'//订单详情待付款
import orderInfoWaitingReceive from '../page/user/orderInfo/orderInfoWaitingReceive.vue'//订单详情待发货
import orderInfoDeliverGoods from '../page/user/orderInfo/orderInfoDeliverGoods.vue'//订单详情待收货
import orderInfoReturnGoods from '../page/user/orderInfo/orderInfoReturnGoods.vue'//订单详情售后退款
import orderInfoOver from '../page/user/orderInfo/orderInfoOver.vue'//订单详情已完成
import orderInfoDel from '../page/user/orderInfo/orderInfoDel.vue'//订单详情已取消
import orderReturnGoodsList from '../page/user/orderInfo/orderReturnGoodsList.vue'//订单退款商品列表

import MyCenter from '../page/user/MyCenter' // 我的个人中心
import UserEvaluate from '../page/user/evaluate/UserEvaluate.vue' // 评价晒单
import EvaluateWaitting from '../page/user/evaluate/evaluateWaitting.vue'//待评价
import EvaluateAlready from '../page/user/evaluate/evaluateAlready.vue'//已评价
import EvaluateInfo from '../page/user/evaluate/AEvaluateInfo.vue' // 商品评价详情
import UserCoupon from '../page/user/UserCoupon' // 优惠券
import UserBankcard from '../page/user/UserBankcard' // 银行卡
import AddBankcard from '../page/user/AddBankcard' // 添加银行卡
import UserShopPoint from '../page/user/UserShopPoint' // 积分明细
import MyCollection from '../page/user/MyCollection' // 我的收藏
import BrowseHistory from '../page/user/BrowseHistory' // 浏览记录
import NewsNotification from '../page/user/NewsNotification' // 消息通知
import PersonalInformation from '../page/user/PersonalInformation' // 个人信息
import UserAddress from '../page/user/UserAddress' // 收货地址
import ApplyBusiness from '../page/user/ApplyBusiness' // 商家申请
import UserFeedback from '../page/user/UserFeedback' // 意见反馈
import AboutUs from '../page/user/AboutUs' // 关于我们

// 底部文案
import CopyCommon from '../page/copyWriting/copyCommon.vue' //底部文案公共部分
import NCommonProblem from '../page/copyWriting/noviceGuide/NCommonProblem.vue' //新手指南--售后常见问题
import NShopProcess from '../page/copyWriting/noviceGuide/NShopProcess.vue' //新手指南--购物流程
import NOrderOperation from '../page/copyWriting/noviceGuide/NOrderOperation.vue' //新手指南--订单操作
import NOnlinePayment from '../page/copyWriting/noviceGuide/NOnlinePayment.vue' //新手指南--在线支付

import NCashOnDelivery from '../page/copyWriting/distributionMode/NCashOnDelivery.vue' //配送方式--货到付款
import NDistributionPayment from '../page/copyWriting/distributionMode/NDistributionPayment.vue' //配送方式--配送支付查询
import NPaymentMethod from '../page/copyWriting/distributionMode/NPaymentMethod.vue' //配送方式--支付方式
import NSignInspection from '../page/copyWriting/distributionMode/NSignInspection.vue' //配送方式--签收验货

import NSCommonProblem from '../page/copyWriting/shopDirectory/NCommonProblem.vue' //购物指南--常见问题
import NLogisticsDistribution from '../page/copyWriting/shopDirectory/NLogisticsDistribution.vue' //购物指南--物流配送
import NRegisteredMember from '../page/copyWriting/shopDirectory/NRegisteredMember.vue' //购物指南--注册新会员
import NIntegralRule from '../page/copyWriting/shopDirectory/NIntegralRule.vue' //购物指南--积分规则

import NReturnPrinciple from '../page/copyWriting/afterSaleService/NReturnPrinciple.vue' //售后服务--退换货原则
import NShopGuarantee from '../page/copyWriting/afterSaleService/NShopGuarantee.vue' //售后服务--购物保障
import NRefundInstruction from '../page/copyWriting/afterSaleService/NRefundInstruction.vue' //售后服务--退款说明
import NCustomerTelephone from '../page/copyWriting/afterSaleService/NCustomerTelephone.vue' //售后服务--客服电话

import NAboutUs from '../page/copyWriting/contactUs/NAboutUs.vue' //联系我们--关于我们
import NOnlinePromotion from '../page/copyWriting/contactUs/NOnlinePromotion.vue' //联系我们--在线招商
import NFeedback from '../page/copyWriting/contactUs/NFeedback.vue' //联系我们--意见反馈
import NBrandEntry from '../page/copyWriting/contactUs/NBrandEntry.vue' //联系我们--品牌入驻
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/two/Login', name: 'Login', component: Login}, // 登录页面
    {path: '/two/Register', name: 'Register', component: Register}, // 注册页面
    {path: '/two/ForgetPassWord', name: 'ForgetPassWord', component: ForgetPassWord}, // 忘记密码
    {path: '/test', name: 'test', component: test}, // 测试页面

    // B2C
    {path: '/', name: 'CHomePage', component: CHomePage}, // b2c 首页
    {path: '/san/b2c/COrderConfirm',name:'COrderConfirm', component: COrderConfirm}, // b2c 确认订单页面
    {path: '/CCatList/:type/:cid', name: 'CCatList', component: CCatList}, // 根据分类选品牌--商品列表
    {path: '/CBrandList/:type/:cid/:name', name: 'CBrandList', component: CBrandList}, // 根据品牌选分类--商品列表
    {path: '/CGoodSale', name: 'CGoodSale', component: CGoodSale}, // 好货特卖
    {path: '/CSeckillTime', name: 'CSeckillTime', component: CSeckillTime}, // 限时秒杀

    {path: '/one/b2c/CBodyCommon', // b2c 公共组件页面
      name: 'CBodyCommon',
      component: CBodyCommon,
      children: [
        {path: 'CProductDetail/:type/:productId/:activityId', name: 'CProductDetail', component: CProductDetail}, // b2c 商品详情页面
        {path: 'COrderStatus', name: 'COrderStatus', component: COrderStatus}, // b2c 订单状态页面
        {path: 'CChoicePay', name: 'CChoicePay', component: CChoicePay}, // b2c 支付选择
        {path: 'CReturnGoods', name: 'CReturnGoods', component: CReturnGoods}, // 退货退款页面
        {path: 'CReturnOnly', name: 'CReturnOnly', component: CReturnOnly} // 仅退款页面
      ]
    },

    // B2B
    {path: '/one/b2b/BHomePage', name: 'BHomePage', component: BHomePage}, // b2b 首页
    {path: '/BReturnGoods', name: 'BReturnGoods', component: BReturnGoods}, // b2b 退款申请
    {path: '/b2b/BGoodsList', name: 'BGoodsList', component: BGoodsList}, // 根据分类选品牌--商品列表
    {path: '/b2b/BProductDetail', name: 'BProductDetail', component: BProductDetail}, // b2b 商品详情页面
    {path: '/b2b/BOrderConfirm', name: 'BOrderConfirm',meta:{ requireAuth: true }, component: BOrderConfirm}, // b2b 确认订单页面
    {path: '/b2b/BOrderPaytypeConfirm', name: 'BOrderPaytypeConfirm', component: BOrderPaytypeConfirm}, // b2b 选择支付方式提交订单
    {path: '/b2b/BCodCallBackPage', name: 'BCodCallBackPage', component: BCodCallBackPage}, // b2b 货到付款的回调页面
    {path: '/b2b/BLimitTimeSell', name: 'BLimitTimeSell', component: BLimitTimeSell}, // b2b 秒杀列表
    {path: '/b2b/BGoodSale', name: 'BGoodSale', component: BGoodSale}, // b2b 特价商品
    {path: '/b2b/BCombination', name: 'BCombination', component: BCombination}, // b2b 组合活动页面
    {path: '/b2b/BCombinationInfo', name: 'BCombinationInfo', component: BCombinationInfo}, // b2b 组合活动(一, 二)商品详情
    {path: '/b2b/BCombinationInfoSan', name: 'BCombinationInfoSan', component: BCombinationInfoSan}, // b2b 组合活动(三)商品详情


    //海外购
    {path: '/OHomePage', name: 'OHomePage', component: OHomePage}, // 海外购首页
    {path: '/ONationalPavilion', name: 'ONationalPavilion', component: ONationalPavilion}, // 丝路国际
    {path: '/OTourism', name: 'OTourism', component: OTourism}, // 境外旅游
    {path: '/OSilkRoadInternational', name: 'OSilkRoadInternational', component: OSilkRoadInternational}, // 丝路国际旅游
    {path: '/OGroupTour', name: 'OGroupTour', component: OGroupTour}, // 跟团游
    {path: '/OPlaceOrder', name: 'OPlaceOrder', component: OPlaceOrder}, // 提交订单

    // B端 C端 通用
    {path: '/common/AGoodsList/:type/:cid', name: 'AGoodsList', component: AGoodsList}, // 根据分类选品牌--商品列表
    {path: '/common/AGoodsBrandList/:type/:cid/:name', name: 'AGoodsBrandList', component: AGoodsBrandList}, // 根据品牌选分类--商品列表
    {path: '/common/AGoodsListSearch', name: 'AGoodsListSearch', component: AGoodsListSearch}, // 通过搜索关键字搜索 商品列表
    {path: '/common/AChoicePay', name: 'AChoicePay', component: AChoicePay}, // 选择支付方式
    {path: '/common/AEvaluateGoods', name: 'AEvaluateGoods', component: AEvaluateGoods}, // 商品评价
    {path: '/common/AEvaluateSuccess', name: 'AEvaluateSuccess', component: AEvaluateSuccess}, // 商品评价成功
    {path: '/common/EvaluateInfo', name: 'EvaluateInfo', component: EvaluateInfo}, // 商品评价详情
    {path: '/common/AShopCar', name: 'AShopCar', component: AShopCar}, // 购物车
    {path: '/common/AGoodSale', name: 'AGoodSale', component: AGoodSale}, // 好货特卖
    {path: '/common/ASeckillTime', name: 'ASeckillTime', component: ASeckillTime}, // 限时秒杀
    {path: '/common/ACombination', name: 'ACombination', component: ACombination}, // 组合活动
    {path: '/common/ACombination/ACombinationInfo', name: 'ACombinationInfo', component: ACombinationInfo}, // 组合活动
    {path: '/common/AShopList', name: 'AShopList', component: AShopList}, // 搜索出来的店铺列表
    {path: '/common/AShopList/AShopInfo/:brandId/:type', name: 'AShopInfo', component: AShopInfo}, // 搜索出来的店铺详情
    {path: '/common/ACouponList', name: 'ACouponList', component: ACouponList}, // 优惠券商品列表
    {path: '/common/paySuccess', name: 'paySuccess', component: paySuccess}, // 支付成功
    {path: '/common/payFailure', name: 'payFailure', component: payFailure}, // 支付失败

    // 乡村互联
    {path: '/rural',  component: RuralCommon, children: [ // 乡村互联 各个板块页面的公共父组件
      {path: '', redirect: 'RHomePage',meta:{ requireAuth: true }},//重定向直接进入RHomePage
      {path: 'RHomePage',meta:{ requireAuth: true }, component: RHomePage}, // 乡村互联首页
      {path: 'search' , name: 'search',meta:{ requireAuth: true }, component: search}, // 乡村互联 搜索列表页
      {path:'RGoodsDetails',name:'RGoodsDetails',meta:{ requireAuth: true },component:RGoodsDetails},
      {path:'RAddress',name:'RAddress',meta:{ requireAuth: true }, component:RAddress},//乡村互联  选择地址页
      {path:'RDetailsList',name:'RDetailsList',meta:{ requireAuth: true },component:RDetailsList},//商家列表页
       {path: 'RDetailsStore', name: 'RDetailsStore',meta:{ requireAuth: true }, component: RDetailsStore}, // 商家详情页面
       {path:'RDetailsStorePage',name:'RDetailsStorePage',meta:{ requireAuth: true },component:RDetailsStorePage},//商品详情页面
       {path:'RGoodListd' ,name:'RGoodListd',meta:{ requireAuth: true },component:RGoodListd},//土特产列表
       {path:'RLocalProduct',name:'RLocalProduct',meta:{ requireAuth: true },component:RLocalProduct},//分页
    ]},
    {path:'/rural/ROrderSubmit',name:'ROrderSubmit',meta:{ requireAuth: true },component:ROrderSubmit},//提交订单页面
    {path:'/rural/ROrderDetails',name:'ROrderDetails',meta:{ requireAuth: true },component:ROrderDetails}, //订单详情页


    // 个人中心
    { path: '/one/user',
      // name: 'UserCenter',
      component: UserCenter,
      children: [
        {path: '', redirect: 'MyCenter'}, // 个人中心默认显示页-我的个人中心
        {path: 'MyCenter', name: 'MyCenter',meta: { requireAuth: true }, component: MyCenter}, // 我的个人中心

        // 我的订单
        { path: 'OrderPerson',
          name: 'OrderPerson',
          component: OrderPerson,
          children: [
            {path: 'OrderAll', name: 'OrderAll',meta: { requireAuth: true }, component: OrderAll}, // 全部订单页面
            {path: 'OrderWaitingPay', name: 'OrderWaitingPay', component: OrderWaitingPay}, // 待付款
            {path: 'OrderDeliverGoods', name: 'OrderDeliverGoods', component: OrderDeliverGoods}, // 待发货
            {path: 'OrderWaitingReceive', name: 'OrderWaitingReceive', component: OrderWaitingReceive}, // 待收货
            {path: 'OrderConsumption', name: 'OrderConsumption', component: OrderConsumption}, // 待消费
            {path: 'OrderReturnGoods', name: 'OrderReturnGoods', component: OrderReturnGoods}, // 退货退款
          ]
        },
        {path: 'UserEvaluate', component: UserEvaluate,
          children: [
            {path: '', redirect: 'EvaluateWaitting'},
            {path: 'evaluateWaitting', name: 'EvaluateWaitting',meta:{ requireAuth: true }, component: EvaluateWaitting}, // 待评价
            {path: 'evaluateAlready', name: 'EvaluateAlready', component: EvaluateAlready}, // 已评价
          ]
        }, // 评价晒单
        {path: 'UserCoupon', name: 'UserCoupon',meta:{ requireAuth: true }, component: UserCoupon}, // 优惠券
        {path: 'UserBankcard', name: 'UserBankcard',meta:{ requireAuth: true }, component: UserBankcard}, // 银行卡
        {path: 'UserShopPoint', name: 'UserShopPoint',meta:{ requireAuth: true }, component: UserShopPoint}, // 积分明细
        {path: 'MyCollection', name: 'MyCollection',meta:{ requireAuth: true }, component: MyCollection}, // 我的收藏
        {path: 'BrowseHistory', name: 'BrowseHistory',meta:{ requireAuth: true }, component: BrowseHistory}, // 浏览记录
        {path: 'NewsNotification', name: 'NewsNotification', component: NewsNotification}, // 消息通知
        {path: 'PersonalInformation', name: 'PersonalInformation',meta:{ requireAuth: true }, component: PersonalInformation}, // 个人信息
        {path: 'UserAddress', name: 'UserAddress',meta:{ requireAuth: true }, component: UserAddress}, // 收货地址
        {path: 'ApplyBusiness', name: 'ApplyBusiness', component: ApplyBusiness}, // 商家申请
        {path: 'UserFeedback', name: 'UserFeedback',meta:{ requireAuth: true }, component: UserFeedback}, // 意见反馈
        {path: 'AboutUs', name: 'AboutUs', component: AboutUs} // 关于我们
      ],
    },
    //个人中心--订单详情
    {
      path: '/OrderInfoPerson',
      name: 'OrderInfoPerson',
      component: OrderInfoPerson,
      children:[
        {path: 'orderInfoWaitingPay', name: 'orderInfoWaitingPay', component: orderInfoWaitingPay}, // 订单详情待付款
        {path: 'orderInfoWaitingReceive', name: 'orderInfoWaitingReceive', component: orderInfoWaitingReceive}, // 订单详情待发货
        {path: 'orderInfoDeliverGoods', name: 'orderInfoDeliverGoods', component: orderInfoDeliverGoods}, // 订单详情待收货
        {path: 'orderInfoReturnGoods', name: 'orderInfoReturnGoods', component: orderInfoReturnGoods}, // 订单详情退款售后
        {path: 'orderInfoOver', name: 'orderInfoOver', component: orderInfoOver}, // 订单详情已完成
        {path: 'orderInfoDel', name: 'orderInfoDel', component: orderInfoDel}, // 订单详情已取消
        {path: 'orderReturnGoodsList', name: 'orderReturnGoodsList', component: orderReturnGoodsList}, // 订单退款商品列表
      ]
    },
    {path: '/one/user/AddBankcard', name: 'AddBankcard', component: AddBankcard}, // 添加银行卡

    //底部文案
    { path:'/copyCommon',
      name:'CopyCommon',
      component:CopyCommon,
      children:[
        {path: 'NCommonProblem',name:'NCommonProblem', component: NCommonProblem}, //新手指南--售后常见问题
        {path: 'NShopProcess',name:'NShopProcess', component: NShopProcess}, //新手指南--购物流程
        {path: 'NOrderOperation',name:'NOrderOperation', component: NOrderOperation}, //新手指南--订单操作
        {path: 'NOnlinePayment',name:'NOnlinePayment', component: NOnlinePayment}, //新手指南--在线支付
        {path: 'NCashOnDelivery',name:'NCashOnDelivery', component: NCashOnDelivery}, //配送方式--货到付款
        {path: 'NDistributionPayment',name:'NDistributionPayment', component: NDistributionPayment}, //配送方式--配送支付查询
        {path: 'NPaymentMethod',name:'NPaymentMethod', component: NPaymentMethod}, //配送方式--支付方式
        {path: 'NSignInspection',name:'NSignInspection', component: NSignInspection}, //配送方式--签收验货
        {path: 'NSCommonProblem',name:'NSCommonProblem', component: NSCommonProblem}, //购物指南--常见问题
        {path: 'NLogisticsDistribution',name:'NLogisticsDistribution', component: NLogisticsDistribution}, //购物指南--物流配送
        {path: 'NRegisteredMember',name:'NRegisteredMember', component: NRegisteredMember}, //购物指南--注册新会员
        {path: 'NIntegralRule',name:'NIntegralRule', component: NIntegralRule}, //购物指南--积分规则
        {path: 'NReturnPrinciple',name:'NReturnPrinciple', component: NReturnPrinciple}, //售后服务--退换货原则
        {path: 'NShopGuarantee',name:'NShopGuarantee', component: NShopGuarantee}, //售后服务--购物保障
        {path: 'NRefundInstruction',name:'NRefundInstruction', component: NRefundInstruction}, //售后服务--退款说明
        {path: 'NCustomerTelephone',name:'NCustomerTelephone', component: NCustomerTelephone}, //售后服务--客服电话
        {path: 'NAboutUs',name:'NAboutUs', component: NAboutUs}, //联系我们--关于我们
        {path: 'NOnlinePromotion',name:'NOnlinePromotion', component: NOnlinePromotion}, //联系我们--在线招商
        {path: 'NFeedback',name:'NFeedback', component: NFeedback}, //联系我们--意见反馈
        {path: 'NBrandEntry',name:'NBrandEntry', component: NBrandEntry}, //联系我们--品牌入驻
      ]
    }

  ]
})
