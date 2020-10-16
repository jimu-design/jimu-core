import React from 'react';
import { useDrop } from 'react-dnd';

import { useStore } from '@hooks/use-store';
import DefaultCanvas from './default-canvas';

import { CanvasWrapperUniqueId } from '@config';
import styles from './index.less';
function CanvasHost() {
  const { scopeStore, stageStore } = useStore();
  const { canvas } = scopeStore;
  const handleClick = () => {
    stageStore.chooseWidget('');
  };
  const [collectedProps, drop] = useDrop({
    accept: ['demo'],
    drop(item, monitor) {
      const DropContainerRect = document
        .getElementById(CanvasWrapperUniqueId)
        .getBoundingClientRect();
      // 拖拽end时pointer坐标
      const pointerCoords = monitor.getClientOffset();
      const coordRelScene = {
        x: pointerCoords.x - DropContainerRect.x,
        y: pointerCoords.y - DropContainerRect.y,
      };
      return {
        coordRelScene,
      };
    },
  });
  const CumCanvas = canvas ? canvas : DefaultCanvas;
  return (
    <div
      className={styles.canvas_wrapper}
      ref={drop}
      id={CanvasWrapperUniqueId}
      onClick={handleClick}
    >
      <CumCanvas stageStore={stageStore}></CumCanvas>
    </div>
  );
}

export default CanvasHost;
