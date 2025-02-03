export function sortByPrice({ productItems, isSortAscending }) {
  return productItems.toSorted((a, b) => {
    if (isSortAscending) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
}
