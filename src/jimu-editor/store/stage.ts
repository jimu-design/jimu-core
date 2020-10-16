// 舞台数据
import { observable, action, computed } from 'mobx';
import {
  IPage,
  IWidget,
  IWrappedWidget,
  IPageLayoutTypes,
  ChangedObj,
} from '../shared/interfaces';
import { CSSProperties } from 'react';
import { set, cloneDeep } from 'lodash-es';

import { pageGen, getNumber, mutateValueByPath } from '@utils/helper';
import { uuidGen } from '@utils/uuid';

export class StageStore {
  @observable
  data: IPage[] = [pageGen()];

  // 当前编辑的页面
  @observable
  targetPageId: string = '';
  // 当前编辑的组件
  @observable
  targetWidgetId: string = '';
  @computed
  get targetPage() {
    return (
      this.data.find((page: IPage) => page.id === this.targetPageId) ||
      this.data[0]
    );
  }
  @computed
  get targetWidget() {
    return this.targetPage.widgetList.find(
      (widget: IWrappedWidget) => widget.id === this.targetWidgetId
    );
  }
  // 添加页面
  addPage() {
    let newPage = pageGen();
    this.data.push(newPage);
    this.choosePage(newPage.id);
  }
  // 修改页面属性
  @action
  changePageProps = (obj: ChangedObj) => {
    mutateValueByPath(this.targetPage.attr, obj);
  };
  // 修改当前组件属性
  @action
  changeTargetProps = (obj: ChangedObj) => {
    mutateValueByPath(this.targetWidget, obj);
  };
  // 根据id修改组件属性
  changePagePropsById(pageId: string, obj: ChangedObj) {}
  // 根据id修改组件属性
  changeWidgetPropsById(widgetId: string, obj: ChangedObj, pageId?: string) {
    let targetPage = pageId
      ? this.data.find((page) => page.id == pageId)
      : this.targetPage;
    let targetWidget = targetPage.widgetList.find(
      (widget) => widget.id === widgetId
    );
    mutateValueByPath(targetWidget, obj);
  }
  // 复制组件
  @action
  copyWidget(targetId: string): void {
    let newWidget = cloneDeep(this.targetWidget);

    // 重新更改id
    newWidget.id = uuidGen();
    // 重命名
    newWidget.name += '-copy';
    // 重新设置位置
    newWidget.style.top = getNumber(newWidget.style.top) + 20 + 'px';
    newWidget.style.left = getNumber(newWidget.style.left) + 20 + 'px';
    this.addWidget(newWidget);
  }
  // 添加组件
  @action
  addWidget(wrappedWidget: IWrappedWidget): void {
    this.targetPage.widgetList.push(wrappedWidget);
  }
  // 删除当前选中组件
  @action
  removeCurrWidget() {
    const index = this.targetPage.widgetList.findIndex(
      (widget) => widget.id === this.targetWidgetId
    );
    if (index !== -1) {
      this.targetWidgetId = '';
      this.targetPage.widgetList.splice(index, 1);
    }
  }
  // 根据targetId删除组件
  @action
  removeItemById = (widgetId: string) => {
    const index = this.targetPage.widgetList.findIndex(
      (widget) => widget.id === widgetId
    );
    if (index !== -1) {
      this.targetWidgetId = '';
      this.targetPage.widgetList.splice(index, 1);
    }
  };

  // 选中页面
  @action
  choosePage = (id: string) => {
    this.targetPageId = id;
  };
  // 选中组件
  @action
  chooseWidget(id: string): void {
    this.targetWidgetId = id;
  }

  @action
  reset() {
    this.data = [pageGen()];
    this.targetWidgetId = '';
  }
}
