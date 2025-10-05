declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

type DataAttributes = {
  [K in `data-${string}`]?: string;
};
