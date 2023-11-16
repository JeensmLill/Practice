export interface Prop_RightCode {
  type?: number;
  value?: string;
}
export interface RightCodeType {
  (prop: Prop_RightCode): React.ReactNode;
}