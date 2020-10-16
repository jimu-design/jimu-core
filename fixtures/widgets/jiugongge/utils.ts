/**
 * 产生背景图样式
 * @param {Object} config 背景图配置项
 */
export function createBgStyles(config): { [key: string]: any } {
  const styles = {};
  for (let i in config) {
    if (config[i].type === 'image') {
      styles[i] = { backgroundImage: `url(${config[i].value})` };
    }
  }
  return styles;
}
