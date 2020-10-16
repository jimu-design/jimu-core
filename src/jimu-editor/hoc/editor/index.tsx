import React, { ComponentType } from 'react';
import { useStore } from '@hooks/use-store';
import { WidgetEditorProps } from '@shared/interfaces';
// 物料编辑包装器
function EditorWrapper(
  WrappedComponennt: ComponentType<WidgetEditorProps>
): ComponentType {
  const Editor = function Editor() {
    const { stageStore } = useStore();
    const { targetWidget, changeTargetProps } = stageStore;
    return (
      <WrappedComponennt
        target={targetWidget}
        changeTargetProps={changeTargetProps}
      ></WrappedComponennt>
    );
  };
  return Editor;
}

export { EditorWrapper };
