import { v4 as uuid } from 'uuid';

export function convertInventoryToProducts(inventory) {
  const workingProducts = [];
  inventory.forEach((item) => {
    if (!item.inStock) {
      return;
    }
    if (
      !workingProducts.find(
        (productItem) => productItem.baseName === item.baseName
      )
    ) {
      workingProducts.push({
        baseName: item.baseName,
        price: item.price,
        baseDescription: item.baseDescription,
        variants: [{ ...item }],
        id: uuid(),
      });
    } else {
      const index = workingProducts.findIndex(
        (productItem) => productItem.baseName === item.baseName
      );
      workingProducts[index].variants.push({ ...item });
    }
  });
  return [...workingProducts];
}
