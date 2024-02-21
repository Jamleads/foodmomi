export const duplicateCheck = (slice, product) => {
  return slice.some((item) =>
    Object.keys(item).every((key) => item[key] === product[key])
  );
};
