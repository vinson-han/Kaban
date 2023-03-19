const CreateItem = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="task">
          <input
            id="task"
            name="task"
            placeholder="Write your to do."
            required
          />
        </label>
        <button> Submit</button>
        <p>
          <label form="radio">
            important
            <input
              type="radio"
              name="myRadio"
              value="important"
              defaultChecked={true}
            />
          </label>
          <label form="radio">
            unimportant
            <input type="radio" name="myRadio" value="unimportant" />
          </label>
        </p>
      </div>
    </form>
  );
};

export default CreateItem;
