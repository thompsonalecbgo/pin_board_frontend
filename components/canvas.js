import React, { useEffect } from "react";

export function Canvas({ frX, frY, toX, toY }) {
  const canvasRef = React.useRef(null);
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(toX, toY);
    context.strokeStyle = "white";
    context.lineWidth = "1rem";
    context.stroke();
  }, [canvasRef]);
  return (
    <div style={{ position: "absolute", top: "0", left: "0" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
