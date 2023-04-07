import { useState } from "react";

const EditForm = ({ name, item, handleDelete, handleEdit }) => {
  const [edit, setEdit] = useState(false);

  const hideWhenVisible = { display: edit ? "none" : "" };
  const showWhenVisibile = { display: edit ? "" : "none" };

  const handleClick = () => {
    setEdit(!edit);
  };
  const handlePress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();

      const form = document.getElementById(`form ${item.id}`);
      const formData = new FormData(form);

      handleEdit(
        {
          id: +formData.get("id"),
          content: formData.get("edit"),
          priority: formData.get("myRadio"),
        },
        name
      );
      setEdit(!edit);
    }
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          onClick={handleClick}
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Edit
        </button>
      </div>
      <div style={showWhenVisibile} draggable="false">
        <form id={`form ${item.id}`} onKeyDown={handlePress}>
          <label htmlFor="edit">
            <input type="hidden" name="id" value={item.id} />
            <input
              id={item.id}
              name="edit"
              defaultValue={item.content}
              className="text-sm font-medium leading-6 text-gray-900"
              placeholder={item.content}
            />

            <div>
              <label form="radio">
                important
                <input
                  type="radio"
                  name="myRadio"
                  value="important"
                  defaultChecked={item.priority === "important" ? true : false}
                />
              </label>{" "}
              <label form="radio">
                unimportant
                <input
                  type="radio"
                  name="myRadio"
                  value="unimportant"
                  defaultChecked={
                    item.priority === "unimportant" ? true : false
                  }
                />
              </label>
            </div>
          </label>
        </form>
        <button
          onClick={handleClick}
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Hide
        </button>{" "}
        <button
          onClick={(e) => handleDelete(e, name, item.id)}
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditForm;
