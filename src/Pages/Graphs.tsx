import fetchLogs from "../Api/fetchLogs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LineChart from "../charts/LineChart";
import { IData, IGraphData } from "../charts/GraphData.Interface";
import GoogleMap from "../charts/Map";
import "./Graphs.css";
const Graphs = () => {
  const [intervalMs, _setIntervalMs] = useState(1000);
  const { data } = useQuery({
    queryKey: ["search"],
    queryFn: fetchLogs,
    refetchInterval: intervalMs,
  });
  if (!data) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }
  if (data.logs.length > 0) {
    const dataV = data.logs.map((log) => {
      const formattedDate = new Date(log.createdAt).toLocaleDateString(
        "en-US",
        {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        },
      );

      return {
        ...log,
        formattedDate,
      };
    });

    const weather_height_data: IData[] = dataV.map((item) => ({
      primary: item.height,
      secondary: item.weather,
    }));
    const weather_height: IGraphData[] = [
      {
        label: "Celcius",
        data: weather_height_data,
      },
    ];

    const pressure_height_data: IData[] = dataV.map((item) => ({
      primary: item.pressure,
      secondary: item.height,
    }));

    const pressure_height: IGraphData[] = [
      {
        label: "Presion",
        data: pressure_height_data,
      },
    ];

    const uv_time: IData[] = dataV.map((item) => ({
      primary: item.id,
      secondary: item.uv,
    }));

    const tvoc_time: IData[] = dataV.map((item) => ({
      primary: item.id,
      secondary: item.tvoc,
    }));

    const co2_time: IData[] = dataV.map((item) => ({
      primary: item.id,
      secondary: item.co2,
    }));

    const factors_time: IGraphData[] = [
      {
        label: "UV",
        data: uv_time,
      },
      {
        label: "TVOC",
        data: tvoc_time,
      },
      {
        label: "CO2",
        data: co2_time,
      },
    ];

    const lastLog = dataV[data.logs.length - 1];
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
  }
  return (
    <>
      <p>Loading</p>
    </>
  );
};

export default Graphs;
