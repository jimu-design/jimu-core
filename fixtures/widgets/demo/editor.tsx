import React, { Component, ComponentType } from 'react';
import { WidgetEditorProps } from '@shared/interfaces';
const Editor: ComponentType<WidgetEditorProps> = function Editor({
  target,
  changeTargetProps,
}: WidgetEditorProps) {
  return (
    <div>
      <p> demo editor</p>
      <p>num: {target.id}</p>
      <button
        onClick={() => {
          changeTargetProps({
            'style.backgroundColor':
              target.style.backgroundColor === 'red' ? 'blue' : 'red',
          });
        }}
      >
        change color
      </button>
    </div>
  );
};

export default Editor;
