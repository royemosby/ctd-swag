function ProductSortForm({
  setSortBy,
  setIsSortAscending,
  sortBy,
  isSortAscending,
}) {
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    const sortDirection = e.target.value;
    if (sortDirection === 'false') {
      setIsSortAscending(false);
    } else {
      setIsSortAscending(true);
    }
  };

  return (
    <form className="filterForm">
      <div className="filterOption">
        <label htmlFor="sortBy">Sort by: </label>
        <select
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="baseName">Product Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="filterOption">
        <label htmlFor="sortDirection">Direction: </label>
        <select
          name="sortDirection"
          id="sortDirection"
          value={isSortAscending}
          onChange={handleSortDirectionChange}
        >
          <option value={true}>Ascending</option>
          <option value={false}>Descending</option>
        </select>
      </div>
    </form>
  );
}

export default ProductSortForm;