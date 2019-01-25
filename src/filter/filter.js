
// 浮点数过滤器
const strip = (num, precision = 12) => {
    return +parseFloat(num.toPrecision(precision))
}
// 处理浮点数的另外一种方法
const numFilter = value => {
    // 截取当前数据到小数点后两位
    let realVal = Number(value).toFixed(2)
    // num.toFixed(2)  获取的是字符串
    return Number(realVal)
}

// 订单状态
const orderStatus = value =>{
    let res = ''
    if(value == 0){
        res = '已取消'
    }else if(value == 1){
        res = '已完成'
    }else if(value == 2){
        res = '待付款'
    }else if(value == 3){
        res = '待发货'
    }else if(value == 4){
        res = '待收货'
    }else if(value == 5){
        res = '待评价'
    }else if(value == 6){
        res = '退款/退货'
    }else if(value == 7){
        res = '待消费'
    }
    return res;
}
//付款方式
const payType = value=>{
    let res = ''
    if( value == 0){
        res = '在线支付'
    }else if(value == 1){
        res = '支付宝支付'
    }else if(value == 2){
        res = '微信支付'
    }else if(value == 3){
        res = '货到付款'
    }else if(value == 4){
        res = '银行卡支付'
    }
    return res;
}
//退款状态
const refundStatus = value=>{
    let res = ''
    if( value == 0){
        res = '未处理'
    }else if(value == 1){
        res = '已退款'
    }else if(value == 2){
        res = '申请被拒绝'
    }else if(value == 3){
        res = '申请通过'
    }else if(value == 4){
        res = '已提交物流信息'
    }else if(value == 5){
        res = '已撤销申请'
    }else if(value == 6){
        res = '退款中'
    }
    return res;
}
//退款状态
const refundType = value=>{
    let res = ''
    if( value == 1){
        res = '退货退款'
    }else if(value == 2){
        res = '仅退款'
    }
    return res;
}
// 乡村互联订单类型
const classId = value=>{
    let res = ''
    if( value == 1){
        res = '特产'
    }else if(value == 2){
        res = '美食'
    }else if(value == 3){
        res = '住宿'
    }else if(value == 4){
        res = '游玩'
    }
    return res;
}
// 毫秒值日期过滤
const dateFormat = value=>{
    let newDate = new Date()
    let y = newDate.getFullYear()
    let m = newDate.getMonth() + 1
    let d = newDate.getDate()
    newDate = y+'年'+m+'月'+d+'日'
    return newDate
}

export default {
    strip,
    numFilter,
    orderStatus,
    payType,
    refundStatus,
    refundType,
    dateFormat,
    classId,
}
