import React, { useEffect } from 'react';

import { useStore } from './hooks/use-store';
import { JimuEditorProps } from './shared/interfaces';
import Stage from './components/stage';
import Header from './components/header';

function App({ canvas, widgets }: JimuEditorProps) {
  const { scopeStore } = useStore();
  useEffect(() => {
    scopeStore.changeCanvas(canvas);
    scopeStore.changeWidgets(widgets);
  }, []);
  return (
    <>
      <Header></Header>
      <Stage></Stage>
    </>
  );
}

export default App;
