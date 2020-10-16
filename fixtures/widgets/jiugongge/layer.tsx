import React, { Component } from 'react';
import cn from 'classnames';
// import toast from '../../libs/toast'
import { createBgStyles } from './utils';
import styles from './index.less';
class App extends Component<{ config: any }> {
  state = {
    start: false,
    delay: 200,
    slowDown: 10,
    checkedIndex: 1,
  };
  start() {
    const { delay, slowDown, checkedIndex } = this.state;
    setTimeout(() => {
      if (delay > 300 && checkedIndex === 5) {
        console.log('jump');
      }
      if (checkedIndex > 7) {
        this.setState({ checkedIndex: 1 });
      } else {
        this.setState({ checkedIndex: checkedIndex + 1 });
      }
      if (slowDown < 0) {
        this.setState({ delay: delay + 30 });
      } else {
        this.setState({ delay: delay < 80 ? 80 : delay - 20 });
      }
      console.log(delay, slowDown);
      if (delay <= 80) this.setState({ slowDown: slowDown - 1 });
      this.start();
    }, delay);
  }
  render() {
    const { config } = this.props;
    const { start, checkedIndex } = this.state;
    const bgStyle = createBgStyles(config);
    return (
      <div>
        <div className={styles.lottery} style={bgStyle.bg}>
          <div className={styles.box} style={bgStyle.box}>
            {new Array(9).fill(1).map((v, index) => (
              <div
                className={cn({
                  [styles.item]: true,
                  [styles.checked]: !start || checkedIndex === index + 1,
                })}
                key={index}
                style={bgStyle[`item0${index + 1}`]}
              />
            ))}
          </div>
          <div
            className={styles.start_button}
            style={bgStyle.btn}
            onClick={() => {
              this.setState({ start: true });
              this.start();
            }}
          />
        </div>
      </div>
    );
  }
}
export default App;
