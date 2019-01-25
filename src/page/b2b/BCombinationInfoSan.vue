<template>
  <div class="combinationInfo">
    <header-top></header-top>
    <Header></Header>
    <div class="combination_Div">
      <div class="combination_box">
        <div class="combination_title">
          <div class="banxin">
            <h2>{{groupData.group_name}}</h2>
            <div class="combination_title_info">
              <span
                v-for="item in groupData.title_arr"
                :key="item.index"
              >{{item}}</span>
            </div>
          </div>
        </div>
        <div class="combination_content banxin">
          <!-- 任选商品 -->
          <div
            class="optional"
            v-for="(item,index) in groupData.goods"
            :key="index"
          >
            <div class="content_title">
              <h3>本组商品</h3>
              <span v-if="item.group_status == 1">( * 本组商品需选择 {{ item.type_num }} 种商品 )</span>
              <span v-if="item.group_status == 2">( * 本组商品需选择 {{ item.type_num }} 种商品且数量为 {{ item.group_limit_num }} 件 )</span>
              <span v-if="item.group_status == 3">( * 本组商品需选择商品数量为 {{ item.group_limit_num }} 件 )</span>
              <span v-if="item.group_status == 4">( * 本组商品可以自由选择 )</span>
            </div>
            <div class="goodsLIst">
              <ul>
                <li
                  v-for="(items,indexs) in item.goods"
                  :key="indexs"
                >
                  <div class="goodsImg">
                    <img :src="items.thumb">
                  </div>
                  <div class="goodsInfo">
                    <h3>{{items.title}}
                      <span
                        class="goodsLimit fr"
                        v-if="Number(items.max) > 0 && Number(items.min) == 0"
                      >限购{{items.max}}件</span>
                      <span
                        class="goodsLimit fr"
                        v-if="Number(items.min) > 0 && Number(items.max) == 0"
                      >{{items.min}}件起购</span>
                      <span
                        class="goodsLimit fr"
                        v-if="Number(items.min) > 0 && Number(items.max) > 0"
                      >{{items.min}}件起购</span>
                    </h3>
                    <p class="goodsSpec">规格：{{items.product_attr}}</p>
                    <div class="fr goodsNumbox">
                      <p class="goodsPrice">￥{{items.price}} /箱</p>
                      <span
                        style="color: red"
                        v-show="parseInt(items.stock-items.count) == 0"
                      >库存不足</span>
                      <el-input-number
                        class="numbox_butteon"
                        v-model="items.count"
                        :min="0"
                        :max="maxNum(index, item.group_limit_num, item.type_num, items.count, Number(items.stock), Number(items.max), Number(ratio))"
                        :step="stepNum(Number(items.min),Number(items.count),Number(minStep))"
                        @change="totalLimit()"
                      ></el-input-number>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 件数和组数 -->
        <div class="groupNumber banxin">
          <span class="AllNumber">件数: {{totalNum}} 件</span>
          <div class="fr goodsNumbox">
            <span>组数:</span>&nbsp;&nbsp;
            <el-input-number
              class="numbox_butteon"
              v-model="group_num"
              :min="0"
              :step="1"
              :max="0"
              @change="totalLimit()"
            ></el-input-number>
          </div>
        </div>
        <!-- 赠品 -->
        <div class="gift_Div banxin">
          <div class="content_title">
            <h3>赠品</h3>
            <span>可选赠品 {{ okGiftNum }} 组</span>
          </div>
          <div class="goodsLIst">
            <ul>
              <li
                v-for="item in groupData.gift"
                :key="item.index"
              >
                <div class="goodsImg">
                  <img :src="item.thumb">
                </div>
                <div class="goodsInfo">
                  <p class="goodsInfo_title">{{item.title}}</p>
                  <p class="goodsPrice">市场价：¥ {{item.price}}</p>
                  <div class="goodsNumbox">
                    <el-input-number
                      class="numbox_butteon"
                      v-model="item.count"
                      :min="0"
                      :max="giftAdd > 0 ? okGiftNum : 0"
                      :step="1"
                    ></el-input-number>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 备注 -->
        <div class="remarks banxin">
          <div class="content_title">
            <h3>备注</h3>
          </div>
          <div class="goodsLIst">
            <el-input
              placeholder="请在此输入备注内容"
              v-model="userMsg"
              clearable
            ></el-input>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submitOrder banxin clearfix">
          <span class="AllPrice">总计: <b>￥{{totalMoney | numFilter}}</b></span>
          <el-button
            class="goods_buy_btn fr"
            @click="submint"
          >提交订单</el-button>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import {
  b2bGetCombinationDetail,
  b2bGetCombinationSubmit,
  b2bDefaultAddress
} from "../../api/index.js";
export default {
  data() {
    return {
      groupId: this.$route.query.group_id, // 组合活动的 groupId
      groupData: [], // 组合活动详情数据
      groupGoods: [],
      userMsg: "", // 用户留言
      ratio: 0, // 限制购买数量
      minStep: 1, // 商品选择的步数的控制
      group_num: 0, // 组数
      totalNum: 0,
      totalMoney: 0, // 总钱数
      limitGiftNum: 0, // 每满足条件送的赠品的数量
      okGiftNum: 0, // 可选赠品数量
      giftAdd: 0, // 赠品最大限制
      address_id: "",
      brand_member_id: "",
      brand_member_pos_id: "",
      group_id: ""
    };
  },
  created() {
    this.getCombinationData();
    this.getAddressData();
  },
  updated() {
    this.giftNumLimit();
  },
  methods: {
    groupMax() {
      let step = 0;
      // if(this.totalNum)
    },
    // 组合活动三 详情数据
    getCombinationData() {
      let params = {
        group_id: this.groupId
      };
      b2bGetCombinationDetail(params).then(res => {
        if (res.code == 0) {
          this.groupData = res.data;
          this.groupGoods = res.data.goods;
          this.ratio = res.data.ratio;
          this.address_id = res.data.address_id;
          this.brand_member_id = res.data.brand_member_id;
          this.brand_member_pos_id = res.data.brand_member_pos_id;
          this.group_id = res.data.group_id;
          this.limitGiftNum = res.data.gift_num;
          this.$store.commit("combinationSanGroupData", this.groupData);
          console.log(this.groupData);
        }
      });
    },

    // 数量限制
    maxNum(index, limit, type, count, stock, max, ratio) {
      function limitsZero(limit1, limit2) {
        if (limit2 == 0) {
          return 0;
        } else if (limit2 > 0) {
          if (limit1 == 0) {
            return 0;
          } else if (limit1 > 0) {
            if (limit1 > limit2) {
              return limit2;
            } else {
              return limit1;
            }
          }
        }
      }
      if (Number(limit) == 0) {
        if (stock > 0) {
          if (max > 0) {
            if (stock > max) {
              limit = max;
            } else if (max > stock) {
              limit = stock;
            }
          } else {
            limit = stock;
          }
        }
      }
      if (Number(type) == 0) {
        type = Infinity;
      }
      let _this = this.$store.getters.comSanGoodTotal; // 组合三计算的出的所有数据
      let everyCountArr = _this.everyCountArr[index]; // 每组已选商品的总数
      let allTotalNum = _this.count; // 全部已选商品的总数
      let itemTypeNum = _this.itemTypeNum[index]; // 每组已选商品种类的数值
      let limit1 = Number(limit) - Number(everyCountArr) + Number(count);
      let limit2 = Number(ratio) - Number(allTotalNum) + Number(count);
      let types = Number(type) - Number(itemTypeNum);
      let temp = 0;
      if (types == 0) {
        if (stock == 0) {
          temp = 0;
        } else {
          // temp = limitsZero(limit1, limit2);
          if(stock > max) {
            temp = max
          } else if (max > stock) {
            temp = limitsZero(limit1, limit2);
          }
        }
      } else if (types > 0) {
        if (stock == 0) {
          temp = 0;
        } else {
          // temp = limitsZero(limit1, limit2);
          if(stock > max) {
            temp = max
          } else if (max > stock) {
            temp = limitsZero(limit1, limit2);
          }
        }
      }
      return Number(temp);
    },

    // 商品选择的计数器 的步数限制
    stepNum(min, count, step) {
      if (min > 0) {
        step = 5;
        if (count > 0) {
          step = 1;
        }
      }
      return Number(step);
    },

    // 总件数  和 组数之间的关联, 还有总价, 需要送的赠品数量
    totalLimit() {
      let count = this.$store.getters.comSanGoodTotal.count;
      let money = parseFloat(
        this.$store.getters.comSanGoodTotal.totalMoney
      ).toFixed(2);
      let totalGift = this.$store.getters.getGiftNumSan.totalNumSan;
      let ratio = this.ratio;

      if (count == ratio) {
        if (this.group_num == 0) {
          this.group_num = 1 + this.group_num;
        }
        this.totalNum = count * this.group_num;
        this.totalMoney = money * this.group_num;
        this.okGiftNum = Number(this.limitGiftNum) * this.group_num;
      } else if (count < ratio) {
        this.group_num = 0;
        this.totalNum = count;
        this.totalMoney = money;
        this.okGiftNum = 0;
      }
    },

    // 赠品的最大数量限制
    giftNumLimit() {
      let giftNum = 0;
      this.groupData.gift.forEach(item => {
        giftNum += item.count
      });
      this.giftAdd = this.okGiftNum - giftNum;
      // console.log({add: giftNum , ok: this.okGiftNum});
    },

    // 得到地址数据
    getAddressData() {
      let params = {
        base_type: 1
      }
      b2bDefaultAddress(params).then(res => {
        console.log(123)
        if(res.code == 0) {
          this.AddressData = res.data
        }
      })
    },

    // 提交订单
    submint() {
      let goodArr = [],
        giftArr = [],
        that = this,
        groupLmintNumArr = [], // 每组商品数量限制的数组
        limitNumFlag = [], // 判断每组数量是否满足限制
        LmintTypeArr = [], // 每组商品 种类限制的数组
        limitTypeFlag = [], // 判断每组 商品种类是否满足限制
        minLimitArr = [], // 判断每个商品是否满足起购条件
        itemCountArr = [], // 每个商品所选数量的 数组
        minLimitFlag = [], // 判断是否满足起购
        giftNum = 0; // 已选赠品的总数
      let count = this.$store.getters.comSanGoodTotal.count,
        itemNum = this.$store.getters.comSanGoodTotal.itemNum,
        itemTypeNum = this.$store.getters.comSanGoodTotal.itemTypeNum,
        countArr = this.$store.getters.comSanGoodTotal.countArr; // 每组商品选择的总数量的数组

      // 所选商品的商品id 和 购买数量的字符串拼接
      this.groupGoods.forEach((item, index) => {
        groupLmintNumArr.push(item.group_limit_num);
        LmintTypeArr.push(item.type_num);
        item.goods.forEach(items => {
          // 判断是否满足起购条件
          minLimitArr.push(items.min);
          itemCountArr.push(items.count);
          if (items.count > 0) {
            if (that.group_num > 0) {
              goodArr.push(
                items.product_id + ";" + items.count * that.group_num
              );
            }
          }
        });
        return goodArr;
      });

      // 所选赠品的 赠品id 和 数量的字符串拼接
      this.groupData.gift.forEach(item => {
        giftNum += item.count;
        if (item.count > 0) {
          giftArr.push(item.gift_id + ";" + item.count);
        }
        // return giftArr
      });

      // 判断商品数量限制
      for (let i = 0; i < groupLmintNumArr.length; i++) {
        for (let j = 0; j < countArr.length; j++) {
          if (groupLmintNumArr[i] > countArr[i]) {
            limitNumFlag.push("true");
            break;
          }
        }
      }

      // 判断商品种类限制
      for (let i = 0; i < LmintTypeArr.length; i++) {
        for (let j = 0; j < itemTypeNum.length; j++) {
          if (LmintTypeArr[i] > itemTypeNum[i]) {
            limitTypeFlag.push("true");
            break;
          }
        }
      }

      // 判断是否满足起购条件
      for (let i = 0; i < minLimitArr.length; i++) {
        for (let j = 0; j < itemCountArr.length; j++) {
          if (minLimitArr[i] > itemCountArr[i]) {
            minLimitFlag.push("true");
            break;
          }
        }
      }

      // 提交订单
      if (count < this.ratio) {
        this.$message.error("您没有满足商品数量");
      } else if (minLimitFlag.length > 0) {
        this.$message.error("您没有满足某个商品起购数量的限制");
      } else if (limitNumFlag.length > 0) {
        this.$message.error("您没有满足某组商品数量的限制");
      } else if (limitTypeFlag.length > 0) {
        this.$message.error("您没有满足某组商品种类的限制");
      } else if (this.okGiftNum > giftNum) {
        this.$message.error("请选够您应该得到的赠品");
      } else {
        let params = {
          product_id_num: goodArr.toString(), // (商品id;购买数量,商品id;购买数量)
          gift_id_num: giftArr.toString(), // (赠品id;购买数量,赠品id;购买数量)
          price_total: this.totalMoney, // 总价
          address_id: this.address_id, // 地址 id
          brand_member_id: this.brand_member_id,
          brand_member_pos_id: this.brand_member_pos_id,
          comment: this.userMsg,
          group_id: this.group_id,
          group_num: this.group_num
        };
        console.log(params)
        b2bGetCombinationSubmit(params).then(res => {
          console.log(res)
          if(res.code == 0) {
            let params = {
              order_no: res.data.order_no,
              price_total: res.data.price_total,
              address_area: this.AddressData.area,
              address: this.AddressData.address,
              user_name: this.AddressData.name,
              user_tel: this.AddressData.mobile,
              form:1,
            }
            this.$router.push({name: 'BOrderPaytypeConfirm', query: params})
          }else{
            this.$alert( res.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                
              }
            });
          }
        })
      }
    }
  }
};
</script>

<style scoped lang="scss">
.combinationInfo {
  background-color: #f5f5f5;
}
.combination_box {
  .combination_title {
    height: 228px;
    background-color: #e4393c;
    padding-top: 40px;
    box-sizing: border-box;
    h2 {
      font-size: 32px;
      color: #fff;
    }
    .combination_title_info {
      padding-top: 30px;
      span {
        font-size: 18px;
        display: inline-block;
        min-width: 20%;
        color: #fff;
        margin-right: 50px;
        padding-bottom: 10px;
        &::before {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          vertical-align: middle;
          border-radius: 2px;
          margin-right: 5px;
          background-color: #f7c883;
        }
      }
    }
  }
  .content_title {
    display: flex;
    align-items: center;
    > span {
      padding-left: 20px;
    }
    h3 {
      color: #333;
      font-size: 22px;
      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 23px;
        vertical-align: top;
        border-radius: 2px;
        margin-right: 12px;
        background-color: #e22a34;
      }
    }
  }
  .combination_content {
    background-color: #fff;
    margin-top: -65px;
    padding: 0 30px 30px 30px;
    border-radius: 10px 10px 0 0;
    box-sizing: border-box;
    .content_title {
      display: flex;
      align-items: center;
      padding-top: 40px;
      h3 {
        padding-right: 20px;
      }
      span {
        color: #e51818;
        font-size: 16px;
      }
    }
    .goodsLIst {
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 560px;
          height: 168px;
          border: 1px solid #ececec;
          margin: 20px 0 0;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          .goodsImg {
            width: 166px;
            height: 166px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 100%;
            }
          }
          .goodsInfo {
            width: 394px;
            padding: 20px;
            box-sizing: border-box;
            h3 {
              color: #333;
              font-size: 20px;
              .goodsLimit {
                font-size: 14px;
                color: #f96745;
                padding: 3px 10px;
                background-color: rgba(252, 116, 84, 0.1);
                border: 1px solid #f96745;
                border-radius: 4px;
              }
            }
            .goodsSpec {
              color: #999;
              font-size: 16px;
              margin-top: 13px;
            }
            .goodsNumbox {
              width: 100%;
              margin-top: 38px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .goodsPrice {
                font-size: 16px;
                color: #e51818;
              }
              .numbox_butteon {
                & /deep/ .el-input__inner {
                  height: 40px;
                  border-radius: 18px;
                }
                & /deep/ .el-input-number__decrease {
                  border-radius: 18px 0 0 18px;
                }
                & /deep/ .el-input-number__increase {
                  border-radius: 0 18px 18px 0;
                }
              }
              .el-input-number {
                width: 128px;
                height: 36px;
              }
            }
          }
        }
      }
    }
    // 必选商品
    .require {
      margin-top: 40px;
      .requireTips {
        color: #e74848;
        font-size: 16px;
      }
    }
  }
  // 件数和组数
  .groupNumber {
    height: 112px;
    line-height: 112px;
    padding: 0 20px;
    box-shadow: 0 -5px 5px rgba(219, 216, 216, 0.57);
    background-color: #fff;
    box-sizing: border-box;
    .AllNumber {
      color: #333;
      font-size: 24px;
      font-weight: bold;
    }
    .goodsNumbox {
      span {
        font-size: 18px;
        color: #333;
      }
      .numbox_butteon {
        & /deep/ .el-input__inner {
          height: 54px;
          border-radius: 26px;
        }
        & /deep/ .el-input-number__decrease {
          width: 60px;
          color: #fff;
          background-color: #e4393c;
          border-radius: 26px 0 0 26px;
        }
        & /deep/ .el-input-number__increase {
          width: 60px;
          color: #fff;
          background-color: #e4393c;
          border-radius: 0 26px 26px 0;
        }
      }
      .el-input-number {
        width: 181px;
        height: 52px;
        line-height: 52px;
      }
    }
  }
  // 赠品
  .gift_Div {
    margin-top: 30px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    .goodsLIst {
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 366px;
          height: 168px;
          border: 1px solid #ececec;
          margin: 20px 0 0;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          .goodsImg {
            width: 166px;
            height: 166px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 100%;
            }
          }
          .goodsInfo {
            width: 199px;
            padding: 20px;
            box-sizing: border-box;
            .goodsInfo_title {
              color: #333;
              font-size: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .goodsPrice {
              color: #f72333;
              font-size: 16px;
              margin-top: 15px;
            }
            .goodsNumbox {
              margin-top: 40px;
              .numbox_butteon {
                & /deep/ .el-input__inner {
                  height: 40px;
                  border-radius: 18px;
                }
                & /deep/ .el-input-number__decrease {
                  border-radius: 18px 0 0 18px;
                }
                & /deep/ .el-input-number__increase {
                  border-radius: 0 18px 18px 0;
                }
              }
              .el-input-number {
                width: 128px;
                height: 36px;
              }
            }
          }
        }
      }
    }
  }
  // 备注
  .remarks {
    margin-top: 30px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    .goodsLIst {
      margin-top: 30px;
    }
  }
  // 提交订单
  .submitOrder {
    margin-top: 50px;
    padding: 0 0 0 20px;
    box-sizing: border-box;
    box-shadow: 0 -5px 5px rgba(223, 223, 223, 0.81);
    background-color: #fff;
    .AllPrice {
      font-size: 18px;
      color: #333;
      line-height: 80px;
      b {
        font-weight: bold;
        color: #e51818;
        font-size: 24px;
      }
    }
    .goods_buy_btn {
      height: 80px;
      width: 220px;
      border-radius: 4px;
      font-size: 20px;
      color: #fff;
      border: 1px solid #e51818;
      background-color: #e51818;
    }
  }
}
</style>