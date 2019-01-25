// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.min.css'
import App from './App'
import router from './router'
import HeaderTop from './components/headerTop'
import Header from './components/Header'
import Footer from './components/Footer'
import FooterBottom from './components/footerBottom'
import pageBase from './components/pagebase.vue'
import filters from './filter/filter' // 全局过滤器文件


import './assets/myfonts/iconfont.css'
import './assets/myfonts/iconfont.js'
import './styles/index.scss'
import './styles/common_mixin.scss' // 公共 sass 混合器

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './vuex'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.component('header-top', HeaderTop)
Vue.component('Header', Header)
Vue.component('Footer', Footer)
Vue.component('footer-bottom', FooterBottom)
Vue.component('page-base', pageBase)

// 使用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 滚动条置顶
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
//使用定位
var map = new AMap.Map('container', {
  resizeEnable: true
});
AMap.plugin('AMap.Geolocation', function() {
  var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：5s
  });
  map.addControl(geolocation);
  geolocation.getCurrentPosition(function(status,result){
      if(status=='complete'){
        localStorage.setItem('getcity',result.position.lng + ',' + result.position.lat )
      }else{
        localStorage.setItem('getcity','' )
      }
  });
});
// 登录拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    let token = localStorage.getItem('token')
    if(token){  // 通过vuex state获取当前的token是否存在
      next();
    }else{
      next({
        path: '/two/Login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
