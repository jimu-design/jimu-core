import React, { useRef, useCallback, useEffect } from 'react';
import { getNumber } from '@utils/helper';
import { useStore } from '@hooks/use-store';
import { CanvasUniqueId, draggingInScene } from '@config';
import { IWidget, IWrappedWidget } from '@shared/interfaces';
import { toJS } from 'mobx';
import Resizer from './resizer';
import { observer } from 'mobx-react';
import styles from './index.less';
import { pick, unset, clone } from 'lodash-es';
import { useSetState } from 'react-use';
function withLayer(wrappedWidget: IWrappedWidget) {
  function Wrapper() {
    const { scopeStore, stageStore } = useStore();
    const wrapperRef = useRef<HTMLDivElement>();
    const mover = {
      left: true,
      top: true,
    };
    const [state, setState] = useSetState({
      mouseStartPos: {
        x: NaN,
        y: NaN,
      },
      targetStartPos: {
        x: NaN,
        y: NaN,
      },
      targetPos: {
        left: NaN,
        top: NaN,
      },
      _target: {
        width: NaN,
        height: NaN,
        transform: '',
        opacity: NaN,
        zIndex: NaN,
      },
      // 这里借用React做Dom渲染
      isDraggingInScene: false,
      indicator: {},
      // hover效果
      hover: false,
    });
    const handleClick = (e) => {
      stageStore.chooseWidget(wrappedWidget.id);
    };
    const handleReszie = ({ width, height, left, top, deg }) => {
      wrapperRef.current.style.left = left + 'px';
      wrapperRef.current.style.top = top + 'px';
      wrapperRef.current.style.width = width + 'px';
      wrapperRef.current.style.height = height + 'px';
      wrapperRef.current.style.transform = `rotate(${deg}deg)`;
    };
    const hanldeReszieComplete = ({ width, height, left, top, deg }) => {
      const dpr = 1;
      stageStore.changeTargetProps({
        'style.width': width * dpr + 'px',
        'style.height': height * dpr + 'px',
        'style.left': left * dpr + 'px',
        'style.top': top * dpr + 'px',
        'style.transform': `rotate(${deg}deg)`,
      });
    };
    const handleMouseDown = (e) => {
      handleClick(e);
      e.stopPropagation();
      // 初始化拖拽信息
      const widgetDom = wrapperRef.current;
      setState({
        mouseStartPos: {
          x: e.clientX,
          y: e.clientY,
        },
        targetStartPos: {
          x: getNumber(widgetDom.style.left),
          y: getNumber(widgetDom.style.top),
        },
      });
      // 修改组件拖动状态为true（优化后）
      if (!state.isDraggingInScene) {
        setState({
          isDraggingInScene: true,
        });
      }
    };
    const __handleMouseMove__ = useCallback(
      (x, y) => {
        // !更新该组件位置（调用频次很高，注意性能）
        // console.time('计算拖动所需时间')
        const widgetDom = wrapperRef.current;
        const left = state.targetStartPos.x + (x - state.mouseStartPos.x);
        const top = state.targetStartPos.y + (y - state.mouseStartPos.y);

        // 水平偏差量
        const HDeviation = draggingInScene.HorizontalDeviation;
        // 场景当前宽
        const sceneWidth = getNumber(
          window.getComputedStyle(document.getElementById(CanvasUniqueId)).width
        );
        // widget属性
        const widgetWidth = getNumber(widgetDom.style.width);
        const widgetLeft = left;
        // 距离舞台中心线偏移距离
        const offsetDis = sceneWidth / 2 - (widgetWidth / 2 + widgetLeft);
        // 是否几乎居中
        const isAlmostHorizontalCenter = Math.abs(offsetDis) < HDeviation;
        // 是否几乎居左
        const isAlmostHorizontalLeft = Math.abs(widgetLeft) < HDeviation;
        // 是否几乎居右
        const isAlmostHorizontalRight =
          Math.abs(sceneWidth - widgetWidth - widgetLeft) < HDeviation;
        // 居中此div实际需要的left值
        const centerLeft = (sceneWidth - widgetWidth) / 2;
        // 居左此div实际需要的left值
        const startLeft = 0;
        // 居右此div实际需要的left值
        const endLeft = centerLeft * 2;
        // 修改实际dom left值
        if (mover.left) {
          widgetDom.style.left =
            (isAlmostHorizontalCenter
              ? centerLeft
              : isAlmostHorizontalLeft
              ? startLeft
              : isAlmostHorizontalRight
              ? endLeft
              : widgetLeft) + 'px';
        }

        // 垂直偏差量
        const VDeviation = draggingInScene.VerticalDeviation;
        // 场景当前高
        const sceneHeight = getNumber(
          window.getComputedStyle(document.getElementById(CanvasUniqueId))
            .height
        );
        // widget属性
        const widgetHeight = getNumber(widgetDom.style.height);
        const widgetTop = top;
        // 距离舞台中心偏移距离
        const offsetDisY = sceneHeight / 2 - (widgetHeight / 2 + widgetTop);
        // 是否几乎居中
        const isAlmostVerticalCenter = Math.abs(offsetDisY) < VDeviation;
        // 是否几乎居顶
        const isAlmostVerticalTop = Math.abs(widgetTop) < VDeviation;
        // 是否几乎居底
        const isAlmostVerticalBottom =
          Math.abs(sceneHeight - widgetHeight - widgetTop) < VDeviation;
        // 居中此div实际需要的top值
        const centerTop = (sceneHeight - widgetHeight) / 2;
        // 居顶此div实际需要的top值
        const startTop = 0;
        // 居底此div实际需要的top值
        const endTop = centerTop * 2;

        // 修改实际dom top值
        if (mover.top) {
          widgetDom.style.top =
            (isAlmostVerticalCenter
              ? centerTop
              : isAlmostVerticalTop
              ? startTop
              : isAlmostVerticalBottom
              ? endTop
              : widgetTop) + 'px';
        }

        /*
         * TODO：重写吸附策略
         */
      },
      [state]
    );
    const __handleMouseUp__ = (e) => {
      const dpr = 1;
      const widgetDom = wrapperRef.current;
      const left = dpr * getNumber(widgetDom.style.left) + 'px';
      const top = dpr * getNumber(widgetDom.style.top) + 'px';
      let updated = {};
      if (mover.top) updated['style.top'] = top;
      if (mover.left) updated['style.left'] = left;
      // 更新store
      stageStore.changeTargetProps(updated);
      // 修改组件拖动状态为false
      setState({
        isDraggingInScene: false,
      });
    };

    useEffect(() => {
      if (state.isDraggingInScene) {
        // 使能mousemove与mouseup
        window.__widgetMouseMove__ = __handleMouseMove__;
        window.__widgetMouseUp__ = __handleMouseUp__;
      } else {
        // 删除mousemove与mouseup，释放内存
        window.__widgetMouseMove__ = null;
        window.__widgetMouseUp__ = null;
      }
    }, [__handleMouseMove__, __handleMouseUp__, state]);

    const clonedWrappedWidget = clone(toJS(wrappedWidget));
    const { style } = clonedWrappedWidget;

    /*
     * todo
     * 1. 过滤样式暴露给组件定制
     * 2. 支持流式布局
     */
    const wrapperStyle = pick(style, [
      'left',
      'right',
      'top',
      'width',
      'height',
      'transform',
      'zIndex',
      'display',
      'bottom',
    ]);

    // 给定width,height,position使得Inner好布局
    clonedWrappedWidget.style.width = '100%';
    clonedWrappedWidget.style.height = '100%';
    clonedWrappedWidget.style.position = 'relative';
    // 卸载掉实际widget组件不能也不应修改的属性
    unset(clonedWrappedWidget.style, 'left');
    unset(clonedWrappedWidget.style, 'top');
    unset(clonedWrappedWidget.style, 'transform');
    unset(clonedWrappedWidget.style, 'zIndex');
    unset(clonedWrappedWidget.style, 'right');
    unset(clonedWrappedWidget.style, 'bottom');

    return (
      <div
        className={styles.widget_layer_wrapper}
        style={wrapperStyle}
        id={wrappedWidget.id}
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onClick={(e) => e.stopPropagation()}
      >
        {stageStore.targetWidgetId === wrappedWidget.id ? (
          <Resizer
            onReszie={handleReszie}
            onReszieComplete={hanldeReszieComplete}
            targetStyle={wrapperStyle}
          ></Resizer>
        ) : (
          ''
        )}
        <wrappedWidget.widget.layer
          setFocus={handleClick}
          {...clonedWrappedWidget}
        ></wrappedWidget.widget.layer>
      </div>
    );
  }
  return observer(Wrapper);
}

export default withLayer;
