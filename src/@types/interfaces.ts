export interface LooseObject {
  [key: string]: unknown
}
export interface errorObject {
  extensions: object;
  message   : string;
}
export interface SetJwtStateProps {
  setJwtState: React.Dispatch<React.SetStateAction<string|null>>;
}