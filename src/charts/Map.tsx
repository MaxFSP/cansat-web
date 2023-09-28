import React, { useEffect } from "react";

interface Iprop {
  gps: string;
}

function GoogleMap({ gps }: Iprop) {
  useEffect(() => {
    const getNewLocation = () => {
      const ifameData = document.getElementById("iframeId");
      const [lat, lon] = gps.replace("(", "").replace(")", "").split(",");

      ifameData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
    };
    const timer = setTimeout(() => {
      getNewLocation();
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      <iframe id="iframeId" height="500px" width="100%"></iframe>
    </div>
  );
}
export default GoogleMap;
