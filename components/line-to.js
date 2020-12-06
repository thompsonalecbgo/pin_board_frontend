export function LineTo({ x, y, x1, y1 }) {
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
    console.log("go up right");
    transformOrigin = "0 0";
    rotateBy = Math.PI - angle;
  }

  const styles = {
    width: `${hypotenuse}px`,
    transformOrigin,
    transform: `rotate(${rotateBy}rad)`,
    WebkitTransform: `rotate(${rotateBy}rad)`,
  };
  return <span className="pin-line" style={styles}></span>;
}
