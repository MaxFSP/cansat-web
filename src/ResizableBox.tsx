import { ResizableBox as ReactResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

export default function ResizableBox({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  children,
  width = 800,
  height = 400,
  resizable = true,
  style = {},
  className = "",
}) {
  const phoneBreakpoint = 700;

  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const isPhoneSize = screenWidth <= phoneBreakpoint;

  if (isPhoneSize) {
    width = screenWidth - 130;
    height = 350;
  }

  return (
    <div style={{ marginLeft: 20 }}>
      <div
        style={{
          display: "inline-block",
          width: "auto",
          background: "white",
          padding: ".5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 30px 40px rgba(0,0,0,.1)",
          ...style,
        }}
      >
        {resizable ? (
          <ReactResizableBox width={width} height={height}>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
              className={className}
            >
              {children}
            </div>
          </ReactResizableBox>
        ) : (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            className={className}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
