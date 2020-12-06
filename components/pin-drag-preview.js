import { useEffect, useState, memo } from "react";

import { LinkTo } from "./link-to";

export const PinDragPreview = memo(({ initialOffset, currentOffset }) => {
  if (!initialOffset || !currentOffset) {
    return null;
  } else {
    const x = initialOffset.x;
    const y = initialOffset.y;
    const x1 = currentOffset.x;
    const y1 = currentOffset.y;

    const styles = {
      // position: "absolute",
      // top: "3.5px",
      // left: "3.5px",
    };
    
    return (
      <span style={styles}>
        <LinkTo x={x} y={y} x1={x1} y1={y1} />
      </span>
    );
  }
});
