import React from 'react';
import { render } from 'react-dom';
import JimuEditor from '../src/jimu-editor/index';
import { observer } from 'mobx-react';
import * as Demo from './widgets/demo';

import ExtendCanvas from './extendCanvas';

render(
  <JimuEditor controls={[]} canvas={observer(ExtendCanvas)} widgets={[Demo]} />,
  document.getElementById('app')
);
