import {
  IPage,
  IWidget,
  IWrappedWidget,
  IPageLayoutTypes,
  ChangedObj,
} from '../shared/interfaces';
import { uuidGen } from './uuid';
import { set } from 'lodash-es';
// 获取字符串中连续的数字串
export const getNumber = function getNumber(str: string | number): number {
  if (typeof str === 'string') {
    const arr = str.match(/[-|0-9][0-9]*/);
    return arr && arr[0] ? parseInt(arr[0], 10) : 0;
  } else {
    return str;
  }
};
export const getDeg = function getDeg(
  centerX: number,
  centerY: number,
  mouseX: number,
  mouseY: number,
  offsetDeg = 0
) {
  var x = Math.abs(centerX - mouseX);
  var y = Math.abs(centerY - mouseY);
  var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var cos = y / z;
  var radina = Math.acos(cos); // 用反三角函数求弧度
  var deg = Math.floor(180 / (Math.PI / radina)); // 将弧度转换成角度

  if (mouseX > centerX && mouseY > centerY) {
    // 第四象限
    deg = 180 - deg;
  }

  if (mouseX === centerX && mouseY > centerY) {
    // y轴负方向
    deg = 180;
  }

  if (mouseX > centerX && mouseY === centerY) {
    // x轴正方向
    deg = 90;
  }

  if (mouseX < centerX && mouseY > centerY) {
    // 第三象限
    deg = 180 + deg;
  }

  if (mouseX < centerX && mouseY === centerY) {
    // x轴负方向
    deg = 270;
  }

  if (mouseX < centerX && mouseY < centerY) {
    // 第二象限
    deg = 360 - deg;
  }
  return deg + offsetDeg;
};
export const mutateValueByPath = (target: any, obj: ChangedObj) => {
  Object.keys(obj).forEach((key) => {
    set(target, key, obj[key]);
  });
};
// 初始化page数据
export const pageGen = (name?: string): IPage => {
  return {
    id: uuidGen(),
    name: name,
    attr: {
      style: { width: '100px' },
      id: '',
      name: '',
      layout: IPageLayoutTypes.Absolute,
    },
    widgetList: [],
  };
};
