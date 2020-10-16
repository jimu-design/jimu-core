import React, { ComponentType } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../hooks/use-store';
import styles from './index.less';
import CanvasHost from '../canvas-host';
import EditorHost from '../editor-host';
import ExtendedConcrols from '../extended-controls';
import CardHost from '../card-host';

function Stage() {
  const { scopeStore, stageStore } = useStore();
  const { canvas } = scopeStore;

  function handleMouseMove(e) {
    // e.preventDefault();
    typeof window.__widgetMouseMove__ === 'function' &&
      window.__widgetMouseMove__(e.clientX, e.clientY);
    typeof window.__widgetResizerMouseMove__ === 'function' &&
      window.__widgetResizerMouseMove__(e);
  }
  function handleMouseUp(e) {
    if (typeof window.__widgetMouseUp__ === 'function') {
      window.__widgetMouseUp__(e.clientX, e.clientY);
    } else if (typeof window.__widgetResizerMouseMUp__ === 'function') {
      window.__widgetResizerMouseMUp__(e);
    } else {
    }
  }
  return (
    <div
      className={styles.stage}
      onMouseMoveCapture={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <CardHost></CardHost>
      <CanvasHost></CanvasHost>
      <ExtendedConcrols></ExtendedConcrols>
      <EditorHost></EditorHost>
    </div>
  );
}

export default observer(Stage);
