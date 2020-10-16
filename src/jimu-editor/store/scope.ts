// 编辑器扩展和外部参数
// 物料市场配置
import { observable, action, computed } from 'mobx';
import { ComponentType, Component } from 'react';
import { IControls, IWidget } from '../shared/interfaces';
export class ScopeStore {
  @observable
  controls = [];
  @observable
  canvas: ComponentType = null;
  @observable
  widgets: IWidget[] = [];
  @observable
  props = { test: 2 };
  @action
  changeControls(controls: IControls[]) {
    this.controls = controls;
  }
  @action
  changeCanvas(canvas: ComponentType) {
    this.canvas = canvas;
  }
  @action
  changeWidgets(widgets: IWidget[]) {
    this.widgets = widgets;
  }
}
