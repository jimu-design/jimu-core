import React from 'react';
import { useStore } from '../../hooks/use-store';
import { observer } from 'mobx-react';

import styles from './index.less';

function Header() {
  const { scopeStore } = useStore();
  return <div className={styles.header}>Header</div>;
}

export default observer(Header);
