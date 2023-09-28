import fetchLogs from "../Api/fetchLogs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LineChart from "../charts/LineChart";
import { IData, IGraphData } from "../charts/GraphData.Interface";
import GoogleMap from "../charts/Map";
import "./Graphs.css";
const Graphs = () => {
  const [intervalMs, setIntervalMs] = useState(10000);
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["search"],
    queryFn: fetchLogs,
    refetchInterval: intervalMs,
  });
  console.log(status, isFetching, error);
  if (status == "success") {
    setIntervalMs(10000);
  }

  if (!data) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }

  const weather_height_data: IData[] = data.logs.map((item) => ({
    primary: item.height,
    secondary: item.weather,
  }));

  const weather_height: IGraphData[] = [
    {
      label: "Series 1",
      data: weather_height_data,
    },
  ];

  const pressure_height_data: IData[] = data.logs.map((item) => ({
    primary: item.pressure,
    secondary: item.height,
  }));

  const pressure_height: IGraphData[] = [
    {
      label: "Series 1",
      data: pressure_height_data,
    },
  ];

  const uv_time: IData[] = data.logs.map((item) => ({
    primary: new Date(item.createdAt),
    secondary: item.uv,
  }));

  const tvoc_time: IData[] = data.logs.map((item) => ({
    primary: new Date(item.createdAt),
    secondary: item.tvoc,
  }));

  const co2_time: IData[] = data.logs.map((item) => ({
    primary: new Date(item.createdAt),
    secondary: item.co2,
  }));

  const factors_time: IGraphData[] = [
    {
      label: "Series 1",
      data: uv_time,
    },
    {
      label: "Series 2",
      data: tvoc_time,
    },
    {
      label: "Series 3",
      data: co2_time,
    },
  ];
  const lastLog = data.logs[data.logs.length - 1];
  const gpsCoordinate = lastLog.gps;

  return (
    <div className="tst">
      <h1 className="title">CANSAT 2023</h1>
      <div className="grid-container">
        <div className="grid-item">
          <h1 className="title"> Temp vs Alt </h1>
          <LineChart data={weather_height} />
        </div>
        <div className="grid-item">
          <h1 className="title"> Pres vs Alt </h1>

          <LineChart data={pressure_height} />
        </div>

        <div className="grid-item">
          <h1 className="title"> UV CO2 TVOC vs time </h1>
          <LineChart data={factors_time} />
        </div>

        <div className="grid-item">
          <h1 className="title"> Coordinates </h1>

          <GoogleMap gps={gpsCoordinate} />
        </div>
      </div>
    </div>
  );
};

export default Graphs;
