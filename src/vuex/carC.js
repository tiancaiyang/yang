//b2c购物车
var carc = [];
const carC = {
    state :{
        carc: carc
    },
    mutations:{
        // 商品添加到购物车
        addB2cCar(state, goodsInfo){
            var flag = true
            if (flag) {
                state.carc = goodsInfo;
            }
        },
    },
    getters:{
        // 计算商品总价
        priceAllC(state){
            var that = this;
            var o = {
                count: 0,
                amount: 0
            };
            for( var i = 0, len = state.carc.length; i < len; i++ ) {
                var list = state.carc[i]['goods'];
                list.forEach(function(item, index, arr) {
                    if ( list[index]['checked'] ) {
                        o.count += item.num;
                        o.amount += parseFloat(item.price) * parseFloat(item.num);
                    }
                });
            }
            return o;
        }
    }
}
export default carC