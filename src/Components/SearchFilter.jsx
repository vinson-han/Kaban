const SearchFilter = ({ handleFilter, handlePriority }) => {
  return (
    <div>
      <div>
        <label htmlFor="filter">
          SearchFilter <input id="filter" onChange={handleFilter}></input>
        </label>
      </div>

      <div>
        <label htmlFor="priorty">
          important
          <input
            type="radio"
            name="priority"
            value="important"
            onChange={handlePriority}
          />
        </label>
        <label htmlFor="priorty">
          unimportant
          <input
            type="radio"
            name="priority"
            value="unimportant"
            onChange={handlePriority}
          />
        </label>
        <label htmlFor="priorty">
          all
          <input
            type="radio"
            name="priority"
            value="all"
            onChange={handlePriority}
          />
        </label>
      </div>
    </div>
  );
};

export default SearchFilter;
