import Mock from 'mockjs';

import banner from './banner.json';
import floor from './floor.json';
import typeNav from './typeNav.json';

//模拟首页三级联动导航数据
Mock.mock("/mock/typeNav",{code:200,data:typeNav})

//模拟首页大轮播图的数据
Mock.mock("/mock/banner",{code:200,data:banner});

//模拟首页推荐行的数据
Mock.mock("/mock/floor",{code:200,data:floor});