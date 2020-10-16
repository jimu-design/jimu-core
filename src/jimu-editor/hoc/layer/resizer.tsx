import React, { useCallback, useState, useEffect, CSSProperties } from 'react';
import { useSetState } from 'react-use';
import { getNumber, getDeg } from '@utils/helper';
import { CanvasUniqueId } from '@config';
import styles from './index.less';
type IState = {
  mouseInitPos: {
    x: number;
    y: number;
  };
  type: string;
  initTarget: CSSProperties;
};
function Resizer(props) {
  const [state, setState] = useSetState<IState>({
    mouseInitPos: {
      x: NaN,
      y: NaN,
    },
    type: '',
    initTarget: {},
  });
  const calc = useCallback(
    (type, e) => {
      if (type === 'lt') {
        const offsetX = e.clientX - state.mouseInitPos.x;
        const offsetY = e.clientY - state.mouseInitPos.y;
        const width = getNumber(state.initTarget.width) + -offsetX;
        const height = getNumber(state.initTarget.height) + -offsetY;
        const left = getNumber(state.initTarget.left) + offsetX;
        const top = getNumber(state.initTarget.top) + offsetY;
        const deg = getNumber(state.initTarget.transform);
        return {
          width,
          height,
          left,
          top,
          deg,
        };
      } else if (type === 'ro') {
        const { left = '0px', top = '0px', width, height } = state.initTarget;
        const sceneInnerRect = document
          .getElementById(CanvasUniqueId)
          .getBoundingClientRect();
        const deg = getDeg(
          sceneInnerRect.left + getNumber(left) + getNumber(width) / 2,
          sceneInnerRect.top + getNumber(top) + getNumber(height) / 2,
          e.clientX,
          e.clientY
        );
        return {
          left: getNumber(left),
          top: getNumber(top),
          width: getNumber(width),
          height: getNumber(height),
          deg,
        };
      } else if (type === 'ct') {
        const { left, top, width, height, transform } = state.initTarget;
        const offsetY = e.clientY - state.mouseInitPos.y;
        return {
          width: getNumber(width),
          height: getNumber(height) + -offsetY,
          left: getNumber(left),
          top: getNumber(top) + offsetY,
          deg: getNumber(transform),
        };
      } else if (type === 'cb') {
        const { left, top, width, height, transform } = state.initTarget;
        const offsetY = e.clientY - state.mouseInitPos.y;
        return {
          width: getNumber(width),
          height: getNumber(height) + offsetY,
          left: getNumber(left),
          top: getNumber(top),
          deg: getNumber(transform),
        };
      } else if (type === 'lm') {
        const { left, top, width, height, transform } = state.initTarget;
        const offsetX = e.clientX - state.mouseInitPos.x;
        return {
          width: getNumber(width) + -offsetX,
          height: getNumber(height),
          left: getNumber(left) + offsetX,
          top: getNumber(top),
          deg: getNumber(transform),
        };
      } else if (type === 'rm') {
        const { left, top, width, height, transform } = state.initTarget;
        const offsetX = e.clientX - state.mouseInitPos.x;
        return {
          width: getNumber(width) + offsetX,
          height: getNumber(height),
          left: getNumber(left),
          top: getNumber(top),
          deg: getNumber(transform),
        };
      } else if (type === 'rt') {
        const offsetX = e.clientX - state.mouseInitPos.x;
        const offsetY = e.clientY - state.mouseInitPos.y;
        const width = getNumber(state.initTarget.width) + offsetX;
        const height = getNumber(state.initTarget.height) + -offsetY;
        const left = getNumber(state.initTarget.left);
        const top = getNumber(state.initTarget.top) + offsetY;
        const deg = getNumber(state.initTarget.transform);
        return {
          width,
          height,
          left,
          top,
          deg,
        };
      } else if (type === 'rb') {
        const offsetX = e.clientX - state.mouseInitPos.x;
        const offsetY = e.clientY - state.mouseInitPos.y;
        const width = getNumber(state.initTarget.width) + offsetX;
        const height = getNumber(state.initTarget.height) + offsetY;
        const left = getNumber(state.initTarget.left);
        const top = getNumber(state.initTarget.top);
        const deg = getNumber(state.initTarget.transform);
        return {
          width,
          height,
          left,
          top,
          deg,
        };
      } else if (type === 'lb') {
        const offsetX = e.clientX - state.mouseInitPos.x;
        const offsetY = e.clientY - state.mouseInitPos.y;
        const width = getNumber(state.initTarget.width) + -offsetX;
        const height = getNumber(state.initTarget.height) + offsetY;
        const left = getNumber(state.initTarget.left) + offsetX;
        const top = getNumber(state.initTarget.top);
        const deg = getNumber(state.initTarget.transform);
        return {
          width,
          height,
          left,
          top,
          deg,
        };
      }
    },
    [state]
  );
  const handleMouseDown = (type, e) => {
    e.persist();
    e.stopPropagation();
    setState({
      mouseInitPos: {
        x: e.clientX,
        y: e.clientY,
      },
      type,
      initTarget: { ...props.targetStyle },
    });
  };
  const __handleMouseMove__ = useCallback(
    (e) => {
      e.persist();
      e.stopPropagation();
      const result = calc(state.type, e);
      props.onReszie(result);
    },
    [state]
  );
  const __handleMouseUp__ = useCallback(
    (e) => {
      e.stopPropagation();
      const result = calc(state.type, e);
      props.onReszieComplete(result);
      setState({
        initTarget: result,
        type: '',
      });
    },
    [state]
  );
  useEffect(() => {
    if (state.type) {
      window.__widgetResizerMouseMove__ = __handleMouseMove__;
      window.__widgetResizerMouseMUp__ = __handleMouseUp__;
    } else {
      window.__widgetResizerMouseMove__ = null;
      window.__widgetResizerMouseMUp__ = null;
    }
  }, [__handleMouseMove__, __handleMouseUp__, state]);
  let { options } = props;
  options || (options = {});
  const { lt, rt, ct, ro, rm, rb, lb, cb, lm } = options;
  return (
    <React.Fragment>
      <div className={styles['resizerTop']}>
        <div className={styles['lt']} {...generateProps(lt)} />
        <div className={styles['rt']} {...generateProps(rt)} />
        <div className={styles['ct']} {...generateProps(ct)} />
        <div className={styles['ro']} {...generateProps(ro)} />
        <div
          className={styles['lt-handler']}
          {...generateProps(lt)}
          onMouseDown={(e) =>
            controlBehavior(e, lt) && handleMouseDown('lt', e)
          }
        />
        <div
          className={styles['rt-handler']}
          {...generateProps(rt)}
          onMouseDown={(e) =>
            controlBehavior(e, rt) && handleMouseDown('rt', e)
          }
        />
        <div
          className={styles['ct-handler']}
          {...generateProps(ct)}
          onMouseDown={(e) =>
            controlBehavior(e, ct) && handleMouseDown('ct', e)
          }
        />
        <div
          className={styles['ro-handler']}
          {...generateProps(ro)}
          onMouseDown={(e) =>
            controlBehavior(e, ro) && handleMouseDown('ro', e)
          }
        />
      </div>
      <div className={styles['resizerRight']}>
        <div className={styles['rm']} {...generateProps(rm)} />
        <div
          className={styles['rm-handler']}
          {...generateProps(rm)}
          onMouseDown={(e) =>
            controlBehavior(e, rm) && handleMouseDown('rm', e)
          }
        />
      </div>
      <div className={styles['resizerBottom']}>
        <div className={styles['rb']} {...generateProps(rb)} />
        <div className={styles['lb']} {...generateProps(lb)} />
        <div className={styles['cb']} {...generateProps(cb)} />
        <div
          className={styles['rb-handler']}
          {...generateProps(rb)}
          onMouseDown={(e) =>
            controlBehavior(e, rb) && handleMouseDown('rb', e)
          }
        />
        <div
          className={styles['lb-handler']}
          {...generateProps(lb)}
          onMouseDown={(e) =>
            controlBehavior(e, lb) && handleMouseDown('lb', e)
          }
        />
        <div
          className={styles['cb-handler']}
          {...generateProps(cb)}
          onMouseDown={(e) =>
            controlBehavior(e, cb) && handleMouseDown('cb', e)
          }
        />
      </div>
      <div className={styles['resizerLeft']}>
        <div className={styles['lm']} {...generateProps(lm)} />

        <div
          className={styles['lm-handler']}
          {...generateProps(lm)}
          onMouseDown={(e) =>
            controlBehavior(e, lm) && handleMouseDown('lm', e)
          }
        />
      </div>
    </React.Fragment>
  );
}

export default Resizer;
// visible disabled hidden
function generateProps(type = 'visible') {
  if (type === 'hidden') {
    return {
      style: {
        display: 'none',
      },
    };
  } else if (type === 'disabled') {
    return {
      style: {
        borderColor: '#999',
        cursor: 'not-allowed',
      },
    };
  } else {
    return {};
  }
}

// visible disabled hidden
function controlBehavior(e, type = 'visible') {
  if (type === 'disabled' || type === 'hidden') {
    return e.stopPropagation();
  } else {
    return true;
  }
}
