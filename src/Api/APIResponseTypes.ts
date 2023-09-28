export interface ILog {
  id: number;
  weather: number;
  pressure: number;
  height: number;
  co2: number;
  tvoc: number;
  uv: number;
  gps: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface APILogResponse {
  logs: ILog[];
}
