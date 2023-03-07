import Button from "./Button";

const EditForm = ({ item, editClick, handleDelete, handleEdit }) => {
  const handlePress = (e) => {
    if (e.keyCode === 13) {
      const form = document.getElementById("edit");
      const formData = new FormData(form);
      handleEdit({
        id: +formData.get("id"),
        content: formData.get("edit"),
        priority: formData.get("myRadio"),
      });
    }
  };

  return (
    <form id="edit" onKeyDown={handlePress}>
      <label htmlFor="edit">
        <input type="hidden" name="id" value={item.id} />
        <input id={item.id} name="edit" defaultValue={item.content} autoFocus />
        <button onClick={editClick}>hide</button>{" "}
        <button onClick={handleDelete} value={item.id}>
          Delete
        </button>
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
              defaultChecked={item.priority === "unimportant" ? true : false}
            />
          </label>
        </div>
      </label>
    </form>
  );
};

export default EditForm;
