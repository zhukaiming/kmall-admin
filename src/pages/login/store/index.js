
//把需要导出的方法先引进来,再一起导出去

import * as actionCreators from './actionCreators.js';

import reducer from './reducer.js';
//组件的出口
export { actionCreators,reducer }