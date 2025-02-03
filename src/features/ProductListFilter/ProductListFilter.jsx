function ProductListFilter({
  setSortBy,
  setIsSortAscending,
  sortBy,
  isSortAscending,
  searchTerm,
  setSearchTerm,
}) {
  const handleSortDirectionChange = (e) => {
    const sortDirection = e.target.value;
    if (sortDirection === 'false') {
      setIsSortAscending(false);
    } else {
      setIsSortAscending(true);
    }
  };

  function handleClearTerm(event) {
    event.preventDefault();
    setSearchTerm('');
  }

  return (
    <form className="viewForm">
      <div className="sortOption">
        <label htmlFor="sortBy">Sort by: </label>
        <select
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="baseName">Product Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="sortOption">
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
      <div className="filterQuery">
        <label htmlFor="searchTerm">Filter by:</label>
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="clearSearchTerm" onClick={handleClearTerm}>
          clear
        </button>
      </div>
    </form>
  );
}

export default ProductListFilter;
