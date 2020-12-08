export const findLink = (arr, note1, note2) => {
  return arr.filter((el) => {
    return (
      (el.note1 == note1.id && el.note2 == note2.id) ||
      (el.note2 == note1.id && el.note1 == note2.id)
    );
  });
};

export const findOtherLinks = (arr, note1, note2) => {
  return arr.filter((el) => {
    return !(
      (el.note1 == note1.id && el.note2 == note2.id) ||
      (el.note2 == note1.id && el.note1 == note2.id)
    );
  });
};
