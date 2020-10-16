// 物料编辑器注入点
import React from 'react';
import { useStore } from '@hooks/use-store';
import { observer } from 'mobx-react';
import { EditorWrapper } from '@hoc/editor';

import styles from './index.less';
function EditorHost() {
  const { scopeStore, stageStore } = useStore();
  const { widgets } = scopeStore;
  const { targetWidget } = stageStore;
  const Com = targetWidget ? EditorWrapper(targetWidget.widget.editor) : '';
  return <div className={styles.editor_host}>{Com ? <Com></Com> : ''}</div>;
}

export default observer(EditorHost);
