import React from 'react';
import { useDrag } from 'react-dnd';
import { uuidGen } from '@utils/uuid';
import { getNumber } from '@utils/helper';
import { useStore } from '@hooks/use-store';
import { CanvasWrapperUniqueId } from '@config';
import { IWidget } from '@shared/interfaces';
function withCardItem(
  Widget: IWidget,
  type: string,
  defaultAttrs = { style: { width: '100px' } }
) {
  function wrapper() {
    const { scopeStore, stageStore } = useStore();
    const [collectedProps, drag] = useDrag({
      item: { id: '', type },
      begin(monitor) {
        return {
          id: uuidGen(),
          type,
        };
      },
      end(item, monitor) {
        if (!monitor.didDrop()) {
          // 未拖拽至舞台中
          return false;
        } else {
          // 获取场景inner的Rect
          const SceneInnerRect = document
            .getElementById(CanvasWrapperUniqueId)
            .getBoundingClientRect();
          let attrs = { style: { width: '100px', height: '100px' }, id: '' };
          // 拖拽至舞台中
          // merge拖拽结果与默认配置融合后存入store

          // width, height, left, top属性%转px
          Object.keys(attrs.style)
            .filter(
              (key) => ['width', 'height', 'left', 'top'].indexOf(key) !== 1
            )
            .forEach((key) => {
              if (
                typeof attrs.style[key] === 'string' &&
                attrs.style[key].indexOf('%') !== -1
              ) {
                switch (key) {
                  case 'width':
                  case 'left':
                    attrs.style[key] =
                      (getNumber(SceneInnerRect.width) *
                        getNumber(attrs.style[key])) /
                        100 +
                      'px';
                    break;
                  case 'height':
                  case 'top':
                    attrs.style[key] =
                      (getNumber(SceneInnerRect.height) *
                        getNumber(attrs.style[key])) /
                        100 +
                      'px';
                    break;
                  default:
                    break;
                }
              }
            });

          // 此处坐标为鼠标落点相对于舞台的坐标
          attrs.style = Object.assign({}, attrs.style, {
            left:
              monitor.getDropResult().coordRelScene.x -
              getNumber(attrs.style.width) / 2 +
              'px',
            top:
              monitor.getDropResult().coordRelScene.y -
              getNumber(attrs.style.height) / 2 +
              'px',
          });
          const { id } = monitor.getItem();
          attrs.id = id;

          // 将部件添加至场景
          stageStore.addWidget({
            id,
            ...defaultAttrs,
            ...attrs,
            ...Widget.meta,
            widget: Widget,
          });
        }
      },
    });
    return (
      <div ref={drag}>
        <Widget.icon
          addSelf={(attrs) => {
            stageStore.addWidget({
              id: uuidGen(),
              ...defaultAttrs,
              ...attrs,
              ...Widget.meta,
              widget: Widget,
            });
          }}
        ></Widget.icon>
      </div>
    );
  }

  return wrapper;
}

export default withCardItem;
