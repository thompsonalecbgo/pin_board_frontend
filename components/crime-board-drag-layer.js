import { useDragLayer } from "react-dnd";

import { ItemTypes } from "../lib/item-types";
import { NoteDragPreview } from "../components/note-drag-preview";
import { PinDragPreview } from "../components/pin-drag-preview";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 1000,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(initialOffset, currentOffset) {
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
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));
  function renderItem() {
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
  if (!isDragging) {
    return null;
  } else {
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(initialOffset, currentOffset)}>
          {renderItem()}
        </div>
      </div>
    );
  }
}
