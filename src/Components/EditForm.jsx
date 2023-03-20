import { useState } from "react";
import Button from "./Button";

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
      const form = document.getElementById("edit");
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
        <button onClick={handleClick}>Edit</button>
      </div>
      <div style={showWhenVisibile}>
        <form id="edit" onKeyDown={handlePress}>
          <label htmlFor="edit">
            <input type="hidden" name="id" value={item.id} />
            <input
              id={item.id}
              name="edit"
              defaultValue={item.content}
              autoFocus
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
              </label>
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
        <button onClick={handleClick}>Hide</button>
        <button onClick={(e) => handleDelete(e, name, item.id)}>Delete</button>
      </div>
    </div>
  );
};

export default EditForm;
