let comGroupData = [], // 存储 组合一二 传来的数据
	combinationGoods = [], // 组合一二 的商品数据
	combinationGifts = [], // 组合一二的赠品 的数据
	comSanData = [], // 组合三传来的数据
	comSanGoods = [], // 组合三的商品数据
	combinationSanGifts = [];
// comSanEveryGoods = []

const combination = {
	state: {
		comGroupData: comGroupData,
		combinationGoods: combinationGoods,
		combinationGifts: combinationGifts,
		comSanData: comSanData,
		comSanGoods: comSanGoods
		// comSanEveryGoods: comSanEveryGoods
	},
	mutations: {
		// 接收商品数据列表(组合一二)
		combinationGroupData(state, data) {
			state.comGroupData = data;
			state.combinationGoods = data.goods;
			state.combinationGifts = data.gift;
		},
		// 组合三数据
		combinationSanGroupData(state, data) {
			state.comSanData = data;
			state.combinationSanGifts = data.gift;
			state.comSanGoods = data.goods;
		}
	},
	getters: {
		// 赠品的数量 (组合一二)
		getGiftNum(state) {
			let o = {
				totalNum: 0 // 选择赠品的总数
			};
			state.combinationGifts.forEach((item) => {
				o.totalNum += parseInt(item.count);
			});
			return o;
		},

		// 赠品数量 (组合活动三)
		getGiftNumSan(state) {
			let o = {
				totalNumSan: 0 // 选择赠品的总数(组合活动三)
			};
			state.combinationSanGifts.forEach((item) => {
				o.totalNumSan += parseInt(item.count);
			});
			return o;
		},

		// 所选商品总数 和 总价 (组合一二)
		totalGoodsNum(state) {
			let o = {
				count: 0, // 所选商品的总数
				numRatio: state.comGroupData.ratio, // 商品总数跟 赠品数量的比率
				sendGiftNum: state.comGroupData.gift_num, // 每满足条件送的赠品的数量
				totalMoney: 0, // 所选商品的总价
				okNum: 0 // 可选赠品数量
			};
			state.combinationGoods.forEach((item) => {
				o.count += parseInt(item.count);
				o.totalMoney += parseFloat(item.price) * item.count;
				o.okNum = parseInt(Math.trunc(o.count / parseInt(o.numRatio)) * parseInt(o.sendGiftNum));
			});
			return o;
		},

		// 组合三
		comSanGoodTotal(state) {
			let o = {
				count: 0, // 所选商品 的总数
				countArr: [], // 每组总数的数组
				everyCount: 0, // 每组的total
				everyCountArr: [], // 每组 total 集合
				groupNum: state.comSanGoods.length, // 组数
				totalMoney: 0, // 所选商品的总价
				itemNum: [],
				itemTypeNum: [],
				groupLimitNum: [],
				limitType: []
			};
			state.comSanGoods.forEach((item) => {
				item.goods.forEach((items) => {
					o.count += parseInt(items.count);
				});
			});

			state.comSanGoods.forEach((item) => {
				let temp = [];
				let tempTypeNum = 0;
				let count = 0;
				item.goods.forEach((items) => {
					// if(Number(item.type_num) != 0) {
					// 	o.limitType.push(item.type_num)
					// }
					// if(Number(item.group_limit_num) != 0) {
					// 	o.groupLimitNum.push(item.group_limit_num)
					// }
					o.totalMoney += parseFloat(items.price) * Number(items.count);
					let _count = Number(items.count);
					temp.push(_count);
					if (_count > 0) {
						tempTypeNum += 1;
					}
					count = count + _count;
				});
				o.itemNum.push(temp);
				o.itemTypeNum.push(tempTypeNum);
				o.countArr.push(count);
			});

			o.everyCountArr = o.countArr;
			return o;
		}
	}
};

export default combination;
