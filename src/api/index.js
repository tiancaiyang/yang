import axios from 'axios'
import router from '../router'
const baseURL = 'http://test.silutianyu.com/'
// const baseURL = 'http://www.slty.com/'
// const baseURL = 'https://api.silutianyu.com'
axios.defaults.baseURL = baseURL
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config);
  let token = localStorage.getItem('token')
  let Lonlat = localStorage.getItem('getcity')
  if (token) {
    config.headers['User-Token'] = token;
    config.headers['Lonlat'] = Lonlat;
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// token失效时的拦截器
axios.interceptors.response.use(
  response => {
    // 如果token失效了
    if (response.data.code == 3) { // eslint-disable-line
      localStorage.clear()
      router.currentRoute.path != '/two/Login' && router.replace({
        path: '/two/Login',
        query: {
          redirect: router.currentRoute.path
        }
      })
    }else if(response.data.code == 2){

    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          localStorage.clear()
          // store.commit(types.LOGOUT)
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path != '/two/Login' && router.replace({
            path: '/two/Login',
            query: {
              redirect: router.currentRoute.path
            }
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)

// 登录验证
export const checkUser = params => {
  return axios.post('api/pc/login', params).then(res => res.data)
}
//注册
export const register = params => {
  return axios.post('api/pc/register', params).then(res => res.data)
}
// 手机验证码
export const RegisterCode = params => {
  return axios.post('api/pc/code', params).then(res => res.data)
}
// 忘记密码
export const ForgetPassWord = params => {
  return axios.post('api/pc/repassword', params).then(res => res.data)
}

//头部
// 头部热词搜索
export const headerHotWords = params => {
  return axios.post('api/pc/hotWords', params).then(res => res.data)
}

// b2c
// b2c首页
export const b2cHome = params => {
  return axios.post('api/pc/personal', params).then(res => res.data)
}
//b2c根据分类选品牌 cat
export const b2cpersonalBrandCat = params => {
  return axios.post('api/pc/personalBrandCat', params).then(res => res.data)
}
//b2c根据分类或品牌筛选数据
export const b2cBrandCatProduct = params => {
  return axios.post('api/pc/personalBrandCatProductList', params).then(res => res.data)
}
//b2c商品详情
export const b2cGoodsInfo = params => {
  return axios.post('api/pc/personalProductView', params).then(res => res.data)
}
//b2c商品详情--评价列表
export const b2cGoodsInfoAssess = params => {
  return axios.post('api/pc/listForProduct', params).then(res => res.data)
}
//b2c商品详情--立即购买--优惠券列表
export const b2cgetCouponListByGoodsId = params => {
  return axios.post('api/pc/getCouponListByGoodsId', params).then(res => res.data)
}
//b2c商品详情--立即购买--提交订单
export const b2cpersonalSubmitOrder = params => {
  return axios.post('api/pc/personalSubmitOrder', params).then(res => res.data)
}
//b2c获取订单详情
export const b2cOrderInfo = params => {
  return axios.post('api/pc/getPersonalDetail', params).then(res => res.data)
}
//b2c获取订单详情--多个订单号
export const b2cGetPersonalOrder = params => {
  return axios.post('api/pc/getPersonalOrder', params).then(res => res.data)
}
//b2c商品详情--添加购物车
export const b2cAddCCart = params => {
  return axios.post('api/pc/addCCart', params).then(res => res.data)
}
// b2c获取购物车
export const b2cGetCCart = params => {
  return axios.post('api/pc/getCCart', params).then(res => res.data)
}
// b2c删除购物车
export const b2cdelCart = params => {
  return axios.post('api/pc/delCCart', params).then(res => res.data)
}
// b2c编辑购物车
export const b2ceditCart = params => {
  return axios.post('api/pc/editCCart', params).then(res => res.data)
}
// b2c购物车--结算去确认订单
export const b2cpersonalCartConfirmOrder = params => {
  return axios.post('api/pc/personalCartConfirmOrder', params).then(res => res.data)
}
// b2c购物车--提交订单
export const b2cpersonalCartSubmitOrder = params => {
  return axios.post('api/pc/personalCartSubmitOrder', params).then(res => res.data)
}
// b2c订单--获取订单列表
export const b2cgetPersonalList = params => {
  return axios.post('api/pc/getPersonalList', params).then(res => res.data)
}
// b2c秒杀列表
export const b2cpersonalSeckill = params => {
  return axios.post('api/pc/personalSeckill', params).then(res => res.data)
}
//b2c特价列表
export const b2cSaleCProductList = params => {
  return axios.post('api/pc/saleCProductList', params).then(res => res.data)
}
//搜索--b2c搜索商品列表
export const b2cPersonalSearch = params => {
  return axios.post('api/pc/personalSearch', params).then(res => res.data)
}
//搜索--b2c搜索店铺列表
export const b2cStoreList = params => {
  return axios.post('api/pc/getStoreList', params).then(res => res.data)
}


// 公共部分
//商品详情页里面的 是否收藏
export const changeCollectBtn = params => {
  return axios.post('api/pc/productCollect', params).then(res => res.data)
}
//收藏--添加收藏和取消收藏
export const publicCollect = params => {
  return axios.post('api/pc/collect', params).then(res => res.data)
}
//店铺详情
export const StoreDetail = params => {
  return axios.post('api/pc/getStoreDetail', params).then(res => res.data)
}
//店铺商品列表
export const getStoreGoods = params => {
  return axios.post('api/pc/getStoreGoods', params).then(res => res.data)
}
// 选择支付方式---支付方式列表
export const confirmOrderPayType = params => {
  return axios.post('api/pc/confirmOrderPayType', params).then(res => res.data)
}
// 迷你购物车
export const getMiNiCart = params => {
  return axios.post('api/pc/getMiNiCart', params).then(res => res.data)
}
// 支付宝支付
export const aliPay = params => {
  return axios.post('api/pc/aliPayPage', params).then(res => res.data)
}
// 微信支付
export const wechatPay = params => {
  return axios.post('api/pc/wxNpay', params).then(res => res.data)
}
// 银行卡支付
export const bankCardPay = params => {
  return axios.post('api/PayPingAnKj/UnionAPI_Submit.php', params).then(res => res.data)
}
// 银行卡支付 - 发送验证码
export const bankSendCode = params => {
  return axios.post('api/PayPingAnKj/UnionAPI_SSMS.php', params).then(res => res.data)
}
//获取收货地址列表 ( 除 b 端 )
export const b2cAddressList = params => {
  return axios.post('api/pc/addressList', params).then(res => res.data)
}
//新增收货地址列表 ( 除 b 端 )
export const b2cAddressListNew = params => {
  return axios.post('api/pc/addressAdd', params).then(res => res.data)
}
//修改收货地址列表 ( 除 b 端 )
export const b2cEditAddressList = params => {
  return axios.post('api/pc/addressEdit', params).then(res => res.data)
}
//删除收货地址列表 ( 除 b 端 )
export const b2cDeleteAddressList = params => {
  return axios.post('api/pc/addressDelete', params).then(res => res.data)
}
//秒杀时间档次
export const Getseckill = params => {
  return axios.post('api/pc/getscene', params).then(res => res.data)
}
//订单列表--数量角标
export const Getordernum = params => {
  return axios.post('api/pc/getordernum', params).then(res => res.data)
}
//订单列表
export const GetPersonalOrderList = params => {
  return axios.post('api/pc/getPersonalList', params).then(res => res.data)
}
//订单列表--提醒发货次数
export const reminderShipment = params => {
  return axios.post('api/pc/warn', params).then(res => res.data)
}
//订单列表--确认收货
export const confirmReceipt = params => {
  return axios.post('api/pc/confirm', params).then(res => res.data)
}
//订单列表--取消订单
export const orderInfoCancel = params => {
  return axios.post('api/pc/cancel', params).then(res => res.data)
}
//订单列表--删除订单
export const orderInfodeleteOne = params => {
  return axios.post('api/pc/deleteOne', params).then(res => res.data)
}
//订单列表--联系卖家
export const orderInfoCellPhone = params => {
  return axios.post('api/pc/connect_seller', params).then(res => res.data)
}
//订单详情--物流详情
export const getLogisticsDetails = params => {
  return axios.post('api/pc/getPersonalDetailList', params).then(res => res.data)
}
//订单列表--b2b订单详情 -- b2c在上方
export const b2bOrderInfo = params => {
  return axios.post('api/pc/getDetail', params).then(res => res.data)
}
//订单列表--获取退款商品列表
export const b2bOrderReturnList = params => {
  return axios.post('api/pc/listForOrder', params).then(res => res.data)
}
//订单列表--申请退款接口
export const b2bOrderReturnRefunt = params => {
  return axios.post('api/pc/applyRefund', params).then(res => res.data)
}
//订单列表--退货价格处理
export const refunHandlePrice = params => {
  return axios.post('api/pc/refunHandlePrice', params).then(res => res.data)
}
//订单列表--退货订单详情
export const refundOrderDetail = params => {
  return axios.post('api/pc/refundDetail', params).then(res => res.data)
}
//订单列表--撤销退款退货申请
export const refundDetailclose = params => {
  return axios.post('api/pc/refundDetailclose', params).then(res => res.data)
}
//订单列表--获取退货地址
export const refundAddress = params => {
  return axios.post('api/pc/getRefundAddress', params).then(res => res.data)
}
//订单列表--提交物流单号
export const refundexpress = params => {
  return axios.post('api/pc/refundexpress', params).then(res => res.data)
}
//优惠券--根据优惠券id获取商品列表
export const getProductListByCouponId = params => {
  return axios.post('api/pc/getProductListByCouponId', params).then(res => res.data)
}


// b2b
// b2b首页
export const b2bHome = params => {
  return axios.post('api/pc/business', params).then(res => res.data)
}
// b2b 组合活动分类
export const b2bGroupBrand = params => {
  return axios.post('api/pc/getCat', params).then(res => res.data)
}
// b2b 组合活动商品列表
export const b2bGroupGoodsList = params => {
  return axios.post('api/pc/combinationActivity', params).then(res => res.data)
}
// //b2b根据分类选品牌 cat
export const b2bpersonalBrandCat = params => {
  return axios.post('api/pc/businessBrandCat', params).then(res => res.data)
}
//b2b根据分类或品牌筛选数据
export const b2bBrandCatProduct = params => {
  return axios.post('api/pc/businessBrandCatProductList', params).then(res => res.data)
}
// b2b 商品详情
export const b2bGoodsProduct = params => {
  return axios.post('api/pc/businessProductView', params).then(res => res.data)
}
// b2b 添加购物车
export const b2bAppendShopCar = params => {
  return axios.post('api/pc/addCart', params).then(res => res.data)
}
// b2b 评价列表
export const b2bAssessList = params => {
  return axios.post('api/pc/listBForProduct', params).then(res => res.data)
}
// b2b 确认订单,获取订单号
export const b2bBuyNow = params => {
  return axios.post('api/pc/businessSubmitOrder', params).then(res => res.data)
}
// b2b 确认订单页面的默认地址
export const b2bDefaultAddress = params => {
  return axios.post('api/pc/confirmOrderAddress', params).then(res => res.data)
}
// b2b 根据订单号查询商品详情
export const b2bGetGoodsDefault = params => {
  return axios.post('api/pc/getDetail', params).then(res => res.data)
}
// b2b 根据 ( 多个 ) 订单号查询多个商品详情
export const b2bGetMoreGoodsDefault = params => {
  return axios.post('api/pc/getBusinessOrder', params).then(res => res.data)
}
// b2b 获取购物车
export const b2bgetCart = params => {
  return axios.post('api/pc/getCart', params).then(res => res.data)
}
// b2b 编辑购物车数量
export const b2beditCart = params => {
  return axios.post('api/pc/editCart', params).then(res => res.data)
}
// b2b 删除购物车
export const b2bdelCart = params => {
  return axios.post('api/pc/delCart', params).then(res => res.data)
}
// b2b 购物车结算在确认订单页面获取数据
export const b2bBusinessCartConfirmOrder = params => {
  return axios.post('api/pc/businessCartConfirmOrder', params).then(res => res.data)
}
// b2b 购物车提交订单
export const b2bBusinessCartSubmitOrder = params => {
  return axios.post('api/pc/businessCartSubmitOrder', params).then(res => res.data)
}
// b2b 货到付款
export const b2bUpdateOrderStatus = params => {
  return axios.post('api/pc/updateOrderStatus', params).then(res => res.data)
}
// b2b 秒杀商品列表
export const b2bGetSeckillProductList = params => {
  return axios.post('api/pc/productSeckill', params).then(res => res.data)
}
// b2b 特价商品列表
export const b2bGetSaleProductList = params => {
  return axios.post('api/pc/saleProductList', params).then(res => res.data)
}
// b2b 组合活动--分类
export const b2bGetCombinationGroup = params => {
  return axios.post('api/pc/getCat', params).then(res => res.data)
}
// b2b 组合活动--活动列表
export const b2bGetCombinationList = params => {
  return axios.post('api/pc/combinationActivity', params).then(res => res.data)
}
// b2b 组合活动--活动详情
export const b2bGetCombinationDetail = params => {
  return axios.post('api/pc/getGroup', params).then(res => res.data)
}
// b2b 组合活动--提交订单
export const b2bGetCombinationSubmit = params => {
  return axios.post('api/pc/businessGroupSubmitOrder', params).then(res => res.data)
}
//搜索--b2b搜索商品列表
export const b2cbusinessSearch = params => {
  return axios.post('api/pc/businessSearch', params).then(res => res.data)
}


//个人中心
// 我的个人中心
export const userIndividualCenter = params => {
  return axios.post('api/pc/individualCenter', params).then(res => res.data)
}
// 用户信息单独接口
export const getUserInfo = params => {
  return axios.post('api/pc/getUserInfo', params).then(res => res.data)
}
// 更改用户名
export const getUserName = params => {
  return axios.post('api/pc/changeUserName', params).then(res => res.data)
}
// 评价列表
export const evaluationList = params => {
  return axios.post('api/pc/getAssessList', params).then(res => res.data)
}
// 评价列表--图片上传
export const evaluatuploadImage = params => {
  return axios.post('api/pc/uploadImage', params).then(res => res.data)
}
// 评价列表--b2c上传评价
export const personalAssessAdd = params => {
  return axios.post('api/pc/personalAssessAdd', params).then(res => res.data)
}
// 评价列表--b2b上传评价
export const businessAssessAdd = params => {
  return axios.post('api/pc/businessAssessAdd', params).then(res => res.data)
}
// 评价列表--评价详情
export const getAssessDetail = params => {
  return axios.post('api/pc/getAssessDetail', params).then(res => res.data)
}
// 个人中心--收藏列表
export const GetCollectionList = params => {
  return axios.post('api/pc/getcollectlist', params).then(res => res.data)
}
// 浏览记录
export const Getbrowserecords = params => {
  return axios.post('api/pc/getbrowserecords', params).then(res => res.data)
}
// 浏览记录--删除
export const Delbrowserecords = params => {
  return axios.post('api/pc/delbrowserecords', params).then(res => res.data)
}
// 消息中心
export const GetMessageList = params => {
  return axios.post('api/pc/getMessageList', params).then(res => res.data)
}
// 消息中心--单个删除
export const DeleteMessage = params => {
  return axios.post('api/pc/deleteMessage', params).then(res => res.data)
}
// 意见反馈
export const FeedBack = params => {
  return axios.post('api/pc/feedBack', params).then(res => res.data)
}
// 关于我们
export const AboutUs = params => {
  return axios.post('api/pc/aboutUs', params).then(res => res.data)
}
// 更改用户头像
export const HeadImage = params => {
  return axios.post('api/pc/headImage', params).then(res => res.data)
}
// 商家申请--初次提交申请
export const memberStoreAdd = params => {
  return axios.post('api/pc/memberStoreAdd', params).then(res => res.data)
}
// 商家申请--申请状态
export const memberStoreStatus = params => {
  return axios.post('api/pc/memberStoreStatus', params).then(res => res.data)
}
// 个人中心--优惠券列表
export const getCouponList = params => {
  return axios.post('api/pc/getCouponList', params).then(res => res.data)
}
// 个人中心--银行卡列表
export const bankCardList = params => {
  return axios.post('api/PayPingAnKj/UnionAPI_CardQuery.php', params).then(res => res.data)
}
// 个人中心--解绑银行卡
export const untyingBankCard = params => {
  return axios.post('api/PayPingAnKj/UnionAPI_OPNCL.php', params).then(res => res.data)
}


// 海外购
// 海外购首页
export const OverseasintlIndex = params => {
  return axios.post('api/pc/intlIndex', params).then(res => res.data)
}
// 境外游切换国家
export const OverseasswitchCountry = params => {
  return axios.post('api/pc/switchCountry', params).then(res => res.data)
}
// 出境游首页
export const OverseastourismCountry = () => {
  return axios.post('api/pc/tourismCountry').then(res => res.data)
}
// 国家馆列表
export const OverseaspavilionsList = params => {
  return axios.post('api/pc/pavilionsList', params).then(res => res.data)
}
// 境外游
export const OverseasintlTour = params => {
  return axios.post('api/pc/intlTour', params).then(res => res.data)
}
// 国家馆分类
export const OverseaspavilionsCat = params => {
  return axios.post('api/pc/pavilionsCat', params).then(res => res.data)
}
// 国家馆分类商品列表
export const OverseaspavilionsProductList = params => {
  return axios.post('api/pc/pavilionsProductList', params).then(res => res.data)
}
// 境外游分类
export const OverseastourCat = params => {
  return axios.post('api/pc/tourCat', params).then(res => res.data)
}
//搜索境外游商品
export const OverseastourSearch = params => {
  return axios.post('api/pc/tourSearch', params).then(res => res.data)
}
//搜索普通商品
export const OverseasnormalSearch = params => {
  return axios.post('api/pc/normalSearch', params).then(res => res.data)
}
//境外游提交订单
export const OverseasintlTourSubmitOrder = params => {
  return axios.post('api/pc/intlTourSubmitOrder', params).then(res => res.data)
}
// 普通商品提交订单
export const OverseasintlintlNormalSubmitOrder = params => {
  return axios.post('api/pc/intlintlNormalSubmitOrder', params).then(res => res.data)
}

//乡村互联
//乡村互联店铺详情
export const ruralXcStore = params => {
  return axios.post('api/pc/xcStore', params).then(res => res.data)
}
//乡村互联搜索目的地
export const ruralSearchAddress = params => {
  return axios.post('api/pc/searchAddress', params).then(res => res.data)
}
//乡村互联目的地(所有的)
export const ruralAllAddress = () => {
  return axios.post('api/pc/allAddress').then(res => res.data)
}
//乡村互联首页
export const ruralXcIndex = params => {
  return axios.post('api/pc/xcIndex', params).then(res => res.data)
}
// 乡村互联分类商品
export const ruralcatProductList = params => {
  return axios.post('api/pc/catProductList', params).then(res => res.data)
}
//乡村互联商品详情
export const ruralXcproductView = params => {
  return axios.post('api/pc/XcproductView', params).then(res => res.data)
}
//乡村互联民宿搜索
export const ruralsearchProductList = params => {
  return axios.post('api/pc/searchProductList', params).then(res => res.data)
}
//乡村互联首页搜索
export const ruralsearchStoreProductList = params => {
  return axios.post('api/pc/searchStoreProductList', params).then(res => res.data)
}
//土特产商品列表
export const rurallocalProduct = params => {
  return axios.post('api/pc/localProduct', params).then(res => res.data)
}
// 土特产商品详情
export const rurallocalProductView = params => {
  return axios.post('api/pc/localProductView', params).then(res => res.data)
}
//地址确认/获取地址
export const ruraladdress = params => {
  return axios.post('api/pc/address', params).then(res => res.data)
}
//添加地址
export const ruralxcAddressAdd = params => {
  return axios.post('api/pc/xcAddressAdd', params).then(res => res.data)
}
//获取天气信息
export const ruralgetWeather = params => {
  return axios.post('api/pc/getWeather', params).then(res => res.data)
}
//获取文章详情
export const ruralarticleDetail = params => {
  return axios.post('api/pc/articleDetail', params).then(res => res.data)
}
//首页列表
export const rurallistForIndex = params => {
  return axios.post('api/pc/listForIndex', params).then(res => res.data)
}
//乡村互联特价列表
export const ruraldiscountProductList = params => {
  return axios.post('xchl/discountProductList', params).then(res => res.data)
}
//搜索记录单个删除
export const ruralsearchDelete = params => {
  return axios.post('xchl/searchDelete', params).then(res => res.data)
}
//历史搜索热门推荐
export const ruralsearchRec = params => {
  return axios.post('xchl/searchRec', params).then(res => res.data)
}
//土特产特价列表
export const rurallocalDiscount = params => {
  return axios.post('xchl/localDiscount', params).then(res => res.data)
}
// 搜索记录全部删除
export const ruralsearchClear = params => {
  return axios.post('xchl/searchClear', params).then(res => res.data)
}
//乡村互联取消订单
export const ruralcancel = params => {
  return axios.post('api/pc/cancel', params).then(res => res.data)
}
//乡村互联待使用订单（个人中心里）
export const ruralgetxcorder = params => {
  return axios.post('api/pc/getxcorder', params).then(res => res.data)
}
//乡村互联订单详情
export const ruralgetXcOrderDetail = params => {
  return axios.post('api/pc/getXcOrderDetail', params).then(res => res.data)
}
//乡村互联验码使用订单
export const ruraluseorder = params => {
  return axios.post('xcorder/useorder', params).then(res => res.data)
}
//提交订单乡村乐
export const ruralxcSubmitOrder = params => {
  return axios.post('api/pc/xcSubmitOrder', params).then(res => res.data)
}
//提交订单土特产
export const rurallocalSubmit = params => {
  return axios.post('api/pc/localSubmit', params).then(res => res.data)
}
