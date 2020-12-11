import { memo } from "react";

import LinkTo from "./link-to";
import { pinWidthHalf } from "../lib/item-sizes";

export const PinDragPreview = memo(({ initialOffset, currentOffset }) => {
  if (!initialOffset || !currentOffset) {
    return null;
  } else {
    const x = initialOffset.x;
    const y = initialOffset.y;
    const x1 = currentOffset.x;
    const y1 = currentOffset.y;
    return (
      <LinkTo
        x={x}
        y={y}
        x1={x1}
        y1={y1}
        offsetX={pinWidthHalf}
        offsetY={pinWidthHalf}
      />
    );
  }
});
