import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { IGraphData } from "./GraphData.Interface";
import ResizableBox from "../ResizableBox";

interface Iprops {
  data: IGraphData[];
}

function LineChart({ data }: Iprops) {
  const primaryAxis = useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
    }),
    [],
  );

  const secondaryAxes = useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    [],
  );
  return (
    <>
      <br />
      <br />
      <ResizableBox
        style={{
          background: "rgba(0, 27, 45, 0.9)",
          padding: ".5rem",
          borderRadius: "5px",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,

              dark: true,
            }}
          />
        </div>
      </ResizableBox>
    </>
  );
}

export default LineChart;
