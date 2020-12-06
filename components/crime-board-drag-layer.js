import { useRef, useEffect } from "react";
import { useDragLayer } from "react-dnd";

import { ItemTypes } from "../lib/item-types";
import { NoteDragPreview } from "../components/note-drag-preview";
import { PinDragPreview } from "../components/pin-drag-preview";

function getLayerStyles() {
  return {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  };
}

function getItemStyles(initialOffset, currentOffset, count, prevLoc) {
  // if (count < 10) {
  //   return {
  //     display: "none",
  //   };
  // }
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export default function CrimeBoardDragLayer() {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => {
    return {
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    };
  });

  function renderItem(itemType) {
    switch (itemType) {
      case ItemTypes.NOTE:
        return <NoteDragPreview note={item.note} />;
      case ItemTypes.PIN:
        return (
          <PinDragPreview
            initialOffset={initialOffset}
            currentOffset={currentOffset}
          />
        );
      default:
        return null;
    }
  }

  const counterRef = useRef();
  const prevLocRef = useRef();
  useEffect(() => {
    counterRef.current += 1;
    prevLocRef.current = currentOffset;
  });
  const count = counterRef.current;
  const prevLoc = prevLocRef.current;

  if (!isDragging) {
    counterRef.current = 0;
    return null;
  } else {
    return (
      <div style={getLayerStyles()}>
        <div style={getItemStyles(initialOffset, currentOffset)}>
          {count < 10 ? null : renderItem(itemType)}
        </div>
      </div>
    );
  }
}
