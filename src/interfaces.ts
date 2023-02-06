export interface LooseObject {
  [key: string]: unknown
}

export type ContextType = {
  value: unknown;
  updateContext?: (newValue: string) => void;
};