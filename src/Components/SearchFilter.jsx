const SearchFilter = ({ handleFilter, handlePriority }) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <label htmlFor="filter">
          <h3 className="mb-2 font-bold tracking-tight text-white sm:text-5xl">
            Search Filter
          </h3>
          <input
            id="filter"
            onChange={handleFilter}
            className=" min-w-0 rounded-md border-0 px-20 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
        </label>
      </div>

      <div className="mr-2 mb-4 flex flex-row flex-wrap justify-center gap-6 text-xl ">
        <label htmlFor="priorty">
          important{" "}
          <input
            type="radio"
            name="priority"
            value="important"
            onChange={handlePriority}
          />
        </label>
        <label htmlFor="priorty">
          unimportant{" "}
          <input
            type="radio"
            name="priority"
            value="unimportant"
            onChange={handlePriority}
          />
        </label>
        <label htmlFor="priorty">
          all{" "}
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
