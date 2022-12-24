type VFile = import("vfile").VFile & {
  warn: (message: string, position: any, origin: string) => void;
};

declare module "retext-overuse" {
  type Plugin = import("unified").Plugin;

  const defaultValue: Plugin;

  export default defaultValue;
}

declare module "retext-assuming" {
  type Plugin = import("unified").Plugin;

  const defaultValue: Plugin;

  export default defaultValue;
}
