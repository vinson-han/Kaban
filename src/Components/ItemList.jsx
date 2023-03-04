import { useState } from "react";
import "../Assets/style.css";
const Item = ({ item, handleDelete, handleClick, handleEdit }) => {
  const [edit, setEdit] = useState(false);
  const editClick = (e) => {
    e.stopPropagation();
    setEdit(!edit);
  };

  const handlePress = (e) => {
    if (e.keyCode === 13) {
      const form = document.getElementById("edit");
      const formData = new FormData(form);
      console.log(formData);
      setEdit(!edit);
      handleEdit({
        id: +formData.get("id"),
        content: formData.get("edit"),
        priority: formData.get("myRadio"),
      });
    }
  };

  // let checked = item.priority === "important" ? true : false;

  return !edit ? (
    <li onClick={() => handleClick(item.id)}>
      {item.isDone ? <del>{item.content}</del> : item.content}{" "}
      <button onClick={editClick}>Edit</button>{" "}
      <button onClick={handleDelete} value={item.id}>
        Delete
      </button>
    </li>
  ) : (
    <li>
      <form id="edit" onKeyDown={handlePress}>
        <label htmlFor="edit">
          <input type="hidden" name="id" value={item.id} />
          <input
            id={item.id}
            name="edit"
            defaultValue={item.content}
            autoFocus
          />
          <button onClick={editClick}>hide</button>{" "}
          <button onClick={handleDelete} value={item.id}>
            Delete
          </button>
          <p>
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
          </p>
        </label>
      </form>
    </li>
  );
};

const ItemList = ({
  list,
  filter,
  priority,
  handleDelete,
  handleClick,
  handleEdit,
}) => {
  let itemList = list;

  if (priority === "important") {
    itemList = itemList.filter((e) => e.priority === "important");
  } else if (priority === "unimportant")
    itemList = itemList.filter((e) => e.priority === "unimportant");

  itemList = itemList.map((e) =>
    e.content.toLowerCase().includes(filter) ? (
      <Item
        className="box"
        key={e.id}
        item={e}
        handleDelete={handleDelete}
        handleClick={handleClick}
        handleEdit={handleEdit}
      />
    ) : (
      ""
    )
  );
  return (
    <div>
      <ul>{itemList}</ul>
    </div>
  );
};

export default ItemList;
