import { CSSProperties, ComponentType } from 'react';

// 积木编辑器props
export interface JimuEditorProps {
  canvas?: ComponentType<ICanvasProps>;
  controls?: IControls[];
  widgets?: IWidget[];
}
interface ICanvasProps {
  stageStore: object;
}
// 控件类型
export interface IControls {
  entity?: ComponentType;
  options: IControlsOptions;
}
export interface IControlsOptions {
  type: IControlsTypes;
  hide?: boolean;
}
export enum IControlsTypes {
  Extended = 'EXTENDED',
  LeftHost = 'LEFTHOST',
  RightHost = 'RIGHTHOST',
}

// 组件物料类型
export interface IWrappedWidget extends IWidgetAttrs {
  widget: IWidget;
}
export interface IWidget {
  editor: ComponentType<WidgetEditorProps>;
  layer: ComponentType<WidgetLayerProps>;
  icon: ComponentType<WidgetIconProps>;
  meta: IMeta;
}
export interface IWidgetAttrs {
  id: string;
  name?: string;
  style: CSSProperties;
  actionAttrs?: {
    actionHide: IAction;
    actionShow: IAction;
    [propName: string]: IAction;
  };
  actions?: IAction[];
  eventAttrs?: {
    [propName: string]: IEvent;
  };
  events?: IEvent[];
}
export interface IMeta {
  script: string;
  deps: string[];
  data: {
    [propName: string]: WidgetData;
  };
  version: string;
}
export interface WidgetData {
  type: WidgetDataTypes;
  value: string;
}
export enum WidgetDataTypes {
  Text = 'TEXT',
  Image = 'IMAGE',
  Video = 'VIDEO',
}
export interface IAction {
  action?: string;
  des: string;
  sub?: string;
}
export interface IEvent {
  event?: string;
  des: string;
  pub?: string;
}
export interface ChangedObj {
  [key: string]: any;
}
export interface WidgetEditorProps {
  target: IWrappedWidget;
  changeTargetProps: (obj: ChangedObj) => void;
}
interface WidgetIconProps {
  addSelf: (attrs: IWidgetAttrs) => void;
}
interface WidgetLayerProps {
  setFocus: (e: Event) => void;
}

// 产出JSON格式
export interface IPage {
  id: string;
  name: string;
  attr: IPageAttr;
  widgetList: IWrappedWidget[];
}
export interface IPageAttr {
  style: CSSProperties;
  name: string;
  id: string;
  layout: IPageLayoutTypes;
}
export enum IPageLayoutTypes {
  Absolute = 'ABSOLUTE',
}
