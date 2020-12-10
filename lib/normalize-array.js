export default function normalizeArray(array, indexKey) {
  const normalizedObject = {};
  for (let i = 0; i < array.length; i++) {
    if (!indexKey) {
      normalizedObject[i] = array[i];
    } else {
      const key = array[i][indexKey];
      normalizedObject[key] = array[i];
    }
  }
  return normalizedObject;
}
