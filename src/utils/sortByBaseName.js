export function sortByBaseName({ productItems, isSortAscending }) {
  return productItems.toSorted((a, b) => {
    const baseNameA = a.baseName.toLowerCase();
    const baseNameB = b.baseName.toLowerCase();
    if (baseNameA > baseNameB) {
      if (isSortAscending) {
        return 1;
      } else {
        return -1;
      }
    }
    if (baseNameA < baseNameB) {
      if (isSortAscending) {
        return -1;
      } else {
        return 1;
      }
    }
    return 0;
  });
}
