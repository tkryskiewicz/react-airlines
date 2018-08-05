export { ServiceBase } from "./ServiceBase";
export { withForm } from "./withForm";

export const propOf = <T>(prop: keyof T & string): string => prop;
