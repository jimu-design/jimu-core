// 物料图标注入点
// 注入点容器可替换
import React from 'react';
import { useStore } from '@hooks/use-store';
import { observer } from 'mobx-react';

import withCardItem from '@hoc/card';
import { uuidGen } from '@utils/uuid';
import styles from './index.less';

function IconHost() {
  const { scopeStore, stageStore } = useStore();
  const { widgets } = scopeStore;

  return (
    <div className={styles.icon_host}>
      {widgets.map((widget, i) => {
        const WrappedCard = withCardItem(widget, 'demo');
        return <WrappedCard key={i}></WrappedCard>;
      })}
    </div>
  );
}

export default observer(IconHost);
