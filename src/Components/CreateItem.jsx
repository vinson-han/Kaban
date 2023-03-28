const CreateItem = ({ handleSubmit }) => {
  return (
    <form className="mx-auto mt-20 max-w-md gap-x-4 " onSubmit={handleSubmit}>
      <div className="mb-2 flex flex-col justify-center gap-2">
        <h2 className="text-4xl font-bold text-gray-200"> Add Item</h2>
        <div className="text-2xl">
          <label className="mr-4 " form="radio">
            important{" "}
            <input
              type="radio"
              name="myRadio"
              value="important"
              defaultChecked={true}
            />
          </label>
          <label form="radio">
            unimportant{" "}
            <input type="radio" name="myRadio" value="unimportant" />
          </label>
        </div>
        <label htmlFor="task">
          <input
            id="task"
            name="task"
            placeholder="Write your to do."
            required
            className="mt-2 mr-2 min-w-0 rounded-md border-0 px-20 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className="flex-row rounded-md bg-indigo-500 py-2.5 px-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {" "}
            Submit
          </button>
        </label>
      </div>
    </form>
  );
};

export default CreateItem;
