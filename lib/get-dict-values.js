export default function getDictValues(dict) {
  const values = Object.keys(dict).map(function (key) {
    return dict[key];
  });
  return values;
}
