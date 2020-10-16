import React from 'react';
// https://github.com/mobxjs/mobx-react-lite/#observer-batching
import 'mobx-react-lite/batchingForReactDom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { JimuEditorProps } from './shared/interfaces';
import withCardItem from '@hoc/card';
import App from './app';
import { StoreProvider } from './store';
function JimuEditor(props: JimuEditorProps) {
  return (
    <StoreProvider>
      <DndProvider backend={HTML5Backend}>
        <App {...props}></App>
      </DndProvider>
    </StoreProvider>
  );
}

export { JimuEditorProps, WidgetDataTypes } from './shared/interfaces';

export default JimuEditor;
export { withCardItem };
