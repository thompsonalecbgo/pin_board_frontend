import { useCallback } from "react";
import update from "immutability-helper";

import { useLinks } from "../lib/links-provider";
import { findLink } from "../lib/links";
import { deleteLink } from "../lib/links";
import getDictValues from "../lib/get-dict-values";

export default function LinkTo({
  x,
  y,
  x1,
  y1,
  offsetX,
  offsetY,
  note1,
  note2,
}) {
  const [links, setLinks] = useLinks();

  const height = Math.abs(y1 - y);
  const width = Math.abs(x1 - x);
  const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
  const angle = Math.asin(height / hypotenuse);

  let transformOrigin;
  let rotateBy;

  if (y1 > y && x1 < x) {
    transformOrigin = "0 0";
    rotateBy = -angle;
  } else if (y1 > y && x1 > x) {
    transformOrigin = "0 0";
    rotateBy = angle - Math.PI;
  } else if (y1 < y && x1 < x) {
    transformOrigin = "0 0";
    rotateBy = angle;
  } else if (y1 < y && x1 > x) {
    transformOrigin = "0 0";
    rotateBy = Math.PI - angle;
  }

  const styles = {
    width: `${hypotenuse}px`,
    transformOrigin,
    transform: `rotate(${rotateBy}rad)`,
    WebkitTransform: `rotate(${rotateBy}rad)`,
    position: "absolute",
    top: `${offsetY}px`,
    left: `${offsetX}px`,
  };

  const handleDoubleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const linksAsDict = getDictValues(links);
      const linksFound = findLink(linksAsDict, note1, note2);
      if (linksFound.length > 0) {
        setLinks(
          update(links, {
            $unset: [linksFound[0].id],
            ["dateUpdated"]: {
              $set: new Date().toString(),
            },
          })
        );
        deleteLink({ id: linksFound[0].id });
      }
    },
    [links, note1, note2]
  );

  return (
    <span
      className="pin-line"
      style={styles}
      onDoubleClick={handleDoubleClick}
    ></span>
  );
}
