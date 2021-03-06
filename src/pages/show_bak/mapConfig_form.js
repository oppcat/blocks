import store from './store'
export default {
    ruleForm: {
        vuex: { //vuex.store
            state: {
                
            },
            getters: {},
            mutations: {

            },
            actions: {
                
            }
        },
        extend: {},
        data: {
            props: {
                
            }
        }
    },
    sources: {
    	vuex: { //vuex.store
            state: {
                allCheckData: 'allCheckData'
            },
            getters: {},
            mutations: {

            },
            actions: {
                
            }
        },
        extend: {},
        data: {
            props: {
                getAllCheckData() {
                	let res = {    
					    "errno": 0,
					    "errmsg": "",
					    "data": {
					        0:"全部",
					        1:"百度竞品",
					        2:"注册未转化",
					        3:"领取红包未注册用户",
					        4:"线下BD提供手机号",
					        5:"激活未注册"
					    }
					};
					let result = [];
					if(res.errno === 0) {
						for(var item in res.data) {
							result.push({
	                            value: item,
	                            label: res.data[item],
	                            checked: false
                        	});
						}
					}
					store.commit('getDataSourceList', result)
                }
            }
        }
    },
    department: {
    	vuex: { //vuex.store
            state: {
                allData: 'allData'
            },
            getters: {},
            mutations: {

            },
            actions: {
                
            }
        },
        extend: {},
        data: {
            props: {
                getAllData() {
                	let res = {
					    "errno": 0,
					    "errmsg": "",
					    "data": {
					        "3": "运营中心",
					        "4": "产品中心",
					        "5": "研发中心",
					        "6": "客服中心",
					        "8": "市场中心",
					        "9": "人力资源中心",
					        "10": "城市预算",
					        "11": "KA餐饮",
					        "12": "KA药品",
					        "13": "KA商超",
					        "14": "KA生鲜",
					        "15": "生态链",
					        "16": "新业务创新中心",
					        "17": "app渠道投放",
					        "18": "品牌运营",
					        "19": "质享生活",
					        "20": "销售运营中心全国活动运营部",
					        "21": "城市KA"
					    },
					    "req_params": {
					        "userinfo": "null"
					    }
					}
					let result = [];
					if(res.errno === 0) {
						for(var item in res.data) {
							result.push({
	                            value: item,
	                            label: res.data[item]
                        	});
						}
					}
					store.commit('getDepartmentInfo', result)
                }
            }
        }
    }

}
