import { reqMockCategoryList, reqFloorList, reqGetBannerList } from '@/api';


const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    //dispatch方法1 获取TypeNav组件数据
    async categoryList({ commit }) {
        let result = await reqMockCategoryList(); //返回的是axios的promise
        if (result.code == 200) {
            console.log(result.data)
            commit("CATEGORYLIST", result.data.data)
        }
    },
    //dispatch方法2 获取ListContainer组件中轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if(result.code == 200){
            commit("GETBANNERLIST",result.data)
        }
    },
    //dispatch方法3 获取ListContainer组件中轮播图的数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if(result.code == 200){
            commit("GETFLOORLIST",result.data)
        }
    },
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList
    }
};
const state = {
    //state中数据默认初始值要根据服务器返回值类型来写
    categoryList: [],
    bannerList: [],
    floorList: []
};
const getters = {};

export default {
    actions,

    mutations,

    state,

    getters,


};