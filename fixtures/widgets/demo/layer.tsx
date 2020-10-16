import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function Layer({ setFocus, style }) {
  return (
    <div
      className={styles.layer}
      onClick={() => {
        setFocus();
      }}
      style={style}
    >
      demo layer
    </div>
  );
}

export default Layer;
