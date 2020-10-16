//for typescript-plugin-css-modules
// https://github.com/mrmckeb/typescript-plugin-css-modules#custom-definitions
declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}

interface Window {
  __widgetResizerMouseMUp__: function;
  __widgetResizerMouseMove__: function;
  __widgetMouseUp__: function;
  __widgetMouseMove__: function;
}
