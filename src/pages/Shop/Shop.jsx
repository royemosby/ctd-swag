import ProductListFilter from '../../features/ProductListFilter/ProductListFilter';
import ProductList from '../../features/ProductList/ProductList';

function Shop({
  filteredProducts,
  handleAddItemToCart,
  setSortBy,
  setIsSortAscending,
  sortBy,
  isSortAscending,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <>
      <ProductListFilter
        setSortBy={setSortBy}
        setIsSortAscending={setIsSortAscending}
        sortBy={sortBy}
        isSortAscending={isSortAscending}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ProductList
        products={filteredProducts}
        handleAddItemToCart={handleAddItemToCart}
      />
    </>
  );
}

export default Shop;
