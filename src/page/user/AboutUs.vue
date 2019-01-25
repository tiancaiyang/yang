<template>
<div class="about_us">
  <h2>关于我们</h2>
  <div v-html="content"></div>
</div>
</template>

<script>
import { AboutUs } from '../../api/index.js'
export default {
  data () {
    return {
      content:''
    }
  },
  created(){
    this.getaboutus()
  },
  methods: {
    getaboutus(){
      AboutUs().then(res=>{
        if(res.code == 0){
          this.content = res.data.content
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.about_us {
  min-height: 1052px;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
  h2 {
    font-size: 24px;
    color: #666;
    line-height: 36px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }
}
</style>
