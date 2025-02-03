import ProductCard from './ProductCard';

function ProductList({ products, handleAddItemToCart }) {
  return (
    <ul className="productList">
      {products.map((product) => {
        return (
          <ProductCard
            product={product}
            key={product.id}
            handleAddItemToCart={handleAddItemToCart}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
