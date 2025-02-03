export function filterByQuery({ productItems, searchTerm }) {
  const term = searchTerm.toLowerCase();
  if (term === '') {
    return productItems;
  }
  return productItems.filter((item) => {
    if (item.baseName.toLowerCase().includes(term)) {
      return item;
    } else if (item.baseDescription.toLowerCase().includes(term)) {
      return item;
    } else if (item.variantDescription.toLowerCase().includes(term)) {
      return item;
    }
  });
}
