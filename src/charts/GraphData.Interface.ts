export interface IGraphData {
  label: string;
  data: IData[];
}

export interface IData {
  primary: number | string | Date | null;
  secondary: number | null;
}
