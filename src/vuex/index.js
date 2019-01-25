import Vue from 'vue'
// 注册 vuex
import Vuex from 'vuex'

import carC from './carC.js'
import carB from './carB.js'
import combination from './combination'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    carC, //b2c购物车
    carB,//b2b购物车
    combination, // 组合活动
  },

})