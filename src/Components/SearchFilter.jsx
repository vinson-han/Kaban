const SearchFilter = ({ handleFilter }) => {
  return (
    <div>
      <label htmlFor="filter">
        SearchFilter <input id="filter" onChange={handleFilter}></input>
      </label>
    </div>
  );
};

export default SearchFilter;
