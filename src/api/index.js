//当前这个模块：API统一管理
import requests from "./request";
//开发服务器：http://39.98.123.211

//模拟数据返回（使用mockjs）
import mockRequest from "./mockRequest"

//分别暴露

//三级联动TypeNav的接口
//getBaseCategoryList get请求 无参数
export const reqCategoryList = ()=>{
    //发请求
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
//三级联动TypeNav的接口 方法2（如果第一个方法失效时 如：接口失效）
//通过Mockjs请求
export const reqMockCategoryList = ()=>{
    //发请求
    return mockRequest({
        url:'/typeNav',
        method:'get'
    })
}

//模拟首页轮播图数据返回
export const reqGetBannerList = ()=>{
    return mockRequest({
        url:'/banner',
        method:'get'
    })
}

//模拟首页floor组件的数据
export const reqFloorList = ()=>{
    return mockRequest({
        url:'/floor',
        method:'get'
    })
}