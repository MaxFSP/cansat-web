import { ResizableBox as ReactResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

export default function ResizableBox({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  children,
  width = 700,
  height = 400,
  resizable = true,
  style = {},
  className = "",
}) {
  // Define a breakpoint for when the screen width is considered a phone size
  const phoneBreakpoint = 768; // You can adjust this value as needed

  // Calculate the width and height based on screen width
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const isPhoneSize = screenWidth <= phoneBreakpoint;

  // Adjust the width and height for phone screens
  if (isPhoneSize) {
    width = screenWidth - 40; // Adjust the width as needed
    height = 300; // Adjust the height as needed
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
