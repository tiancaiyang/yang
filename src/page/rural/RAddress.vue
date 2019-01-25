<template>
  <div class="address_box banxin">
    <div class="search">
      <span>直接搜索:</span>
      <input type="text" placeholder="请输入城市名称或拼音" v-model="btnValue">
      <input type="button" value="搜索" class="btnSearch" @click="btnSearch">
    </div>
    <div class="visit">
      <span>最近访问:</span>
      <ul>
        <li>
          <a @click="goHomeList(arr)">
            {{arr}}
          </a>
        </li>
      </ul>
    </div>
    <div class="select">
      <span>按拼音首字母选择:</span>
      <ul>

        <li v-for="(value,key) in addressList  " :key="key" :value="value " @click="returnTop(key)">
          <a>
            {{key}}
          </a>
        </li>


      </ul>
    </div>

    <div class="address" v-for="(value,key) in addressList" :key="key" :value="value">
      <div class="address_l">
        <span>{{key}}</span>
      </div>
      <div class="address_r">
        <ul :class="flag?'active':''" @mouseenter="getFlag" :id=key>
          <li v-for="item in value" :key="item.lonlat">
            <a @click="goHome(item)">
              {{item.township}}
            </a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
  import {
    ruralAllAddress,
    ruralSearchAddress
  } from '../../api/index.js'
  export default {
    data() {
      return {
        addressList: {}, //地址接口数据
        accessed_address: [], //最近访问的地址;列表
        flag: false, //给li设置背景色
        arr: '', //最近访问的地址
        btnValue: '', //搜索关键字

      }
    },
    created() {
      this.getruralAllAddress();
      this.arr = localStorage.getItem('accessed');

    },

    methods: {
      // 搜索地址
      btnSearch() {
        this.getruralSearchAddress();
      },

      // 接受接口数据
      getruralAllAddress() {

        ruralAllAddress().then(res => {
          if (res.code == 0) {
            this.addressList = res.data;
          }
        })

      },
      // 判断li的颜色变化
      getFlag() {
        this.flag = !this.flag;
      },
      // 防止url地址改变
      returnTop(id) {
        document.getElementById(id).scrollIntoView(true);
      },
      // 选择之后回到首页
      goHome(item) {
        this.$emit("address", item);
        let params = {
          lonlat: item.lonlat
        }
        this.$router.push({
          path: './RHomePage',
          query: params
        });
        this.accessed_address.push(item.township);
        localStorage.setItem("accessed", item.township);
      },
      // goHomeAdd(item) {
      //   this.$emit("address", item);
      // },
      // 返回主页
      goHomeList(arr) {
        this.$emit("addArr", arr);
        this.$router.push('./RHomePage');
        this.accessed_address.push(arr);
        localStorage.setItem("accessed", arr);
      },
      // 搜索地址
      getruralSearchAddress() {
        this.btnValue = this.btnValue.toString().trim();
        if (this.btnValue.trim() == '') {
          this.$message({
            message: '请输入地址',
            type: 'error'
          })
        } else {
          let params = {
            search: this.btnValue,
          }
          ruralSearchAddress(params).then(res => {
            if (res.data.length == 0) {
              this.$message({
                message: '没有该地址',
                type: 'error'
              })
            } else {
              this.goHome(res.data[0]);

            }

          })
        }
      }
    },
    filters: {
      searchAddress(search) {
        var arr = [];
        var arr1 = [];
        for (let i in this.addressList) {
          arr.push(this.addressList[i]);
        }
        // console.log(arr);
        arr.filter(item => {
          item.filter(item => {
            // console.log(item.township)
            return item.township;
          })
        })

      }
    },
  }

</script>
<style lang="scss" scoped>
  .address_box {
    margin-top: 30px;
    // height: 1349px;
    background-color: #ffffff;
    border: solid 1px #eaeaea;

    .search {
      width: 1156px;
      height: 88px;
      padding-top: 40px;
      margin: auto;
      // background-color: red;

      span {
        width: 78px;
        height: 18px;
        font-family: MicrosoftYaHei;
        font-size: 18px;
        color: #333333;
      }

      input {
        margin-left: 30px;
        width: 260px;
        height: 48px;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #eaeaea;
        font-size: 16px;
        color: #666666;
      }

      .btnSearch {
        margin-left: 20px;
        width: 80px;
        height: 48px;
        background-color: #23b57e;
        border-radius: 4px;
        font-size: 16px;
        color: #fefefe;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .visit {
      width: 1156px;
      height: 96px;
      margin: auto;
      line-height: 96px;
      // background-color: blue;
      border-top: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;

      span {
        width: 79px;
        height: 17px;
        margin-right: 39px;
        font-family: MicrosoftYaHei;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #333333;
      }

      ul {

        display: inline-block;

        li {
          display: inline-block;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 0px;
          color: #666666;
        }
      }
    }

    .select {
      display: flex;
      justify-content: flex-start;
      margin: auto;
      width: 1156px;
      height: 96px;
      line-height: 96px;
      // background-color: red;

      span {
        width: 150px;
        font-family: MicrosoftYaHei;
        font-size: 18px;
        margin-right: 34px;
        color: #333333;
      }

      ul {
        display: flex;
        width: 980px;

        li {
          display: flex;
          width: 35px;
          justify-content: space-around;
          a{
            &:hover{
              color: #23b57e;
              font-size: 25px;
            }
          }
        }
      }
    }

    .address {
      display: flex;
      justify-content: flex-start;
      width: 1156px;
      margin-bottom: 40px !important;
      height: 84px;
      margin: auto;


      &:hover {
        background-color: #eaeaea;
      }

      .address_l {
        width: 96px;
        height: 84px;

        span {
          display: inline-block;
          margin: 20px 0 0 12px;
          width: 44px;
          height: 44px;
          text-align: center;

          line-height: 44px;
          border-radius: 50%;
          font-size: 18px;
          color: #ffffff;
          background-image: linear-gradient(0deg,
            rgba(3, 0, 0, 0.63) 0%,
            rgba(255, 255, 255, 0.63) 100%),
            linear-gradient(#23b57e,
            #23b57e);
          background-blend-mode: soft-light,
            normal;
          box-shadow: 0px 4px 9px 0px rgba(35, 181, 126, 0.71)
        }
      }

      .address_r {
        width: 1060px;
        height: 84px;
        line-height: 84px;
        // background: blue;

        ul {
          display: flex;

          &>.active {
            background: red;
          }

          li {
            margin-right: 35px;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #666666;
            a{
              &:hover{
                color: #23b57e;
                font-size: 20px;
              }
            }

          }
        }
      }
    }
  }

</style>
