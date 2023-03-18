import "../Assets/style.css";

import EditForm from "../Components/EditForm";
import { useState, useEffect } from "react";

//Drag HTML api not supported with Mobile

const Item = ({ item, handleSwap, handleDelete, handleEdit }) => {
  const [edit, setEdit] = useState(false);
  const [strike, setStrike] = useState(false);

  const hideWhenVisible = { display: edit ? "none" : "" };
  const showWhenVisibile = { display: edit ? "" : "none" };

  const handleClick = () => {
    setStrike(!strike);
  };

  const editClick = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };
  const handleStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        id: e.target.id,
        innerHTML: e.target.innerHTML,
      })
    );
  };
  const handleDropOver = (e) => {
    e.preventDefault();
    // e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "move";
  };
  const handleDrop = (e) => {
    e.stopPropagation();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    // Swap Orgin Item with DropZone Item
    let originItem = document.getElementById(data.id);

    handleSwap(
      originItem.parentElement.id,
      e.target.parentElement.parentElement.id,
      originItem.id,
      e.target.id
    );
  };
  return (
    <>
      <div
        className="box"
        style={hideWhenVisible}
        id={item.id}
        draggable={true}
        onDragStart={(e) => handleStart(e)}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDropOver(e)}
      >
        <li onClick={handleClick}>
          {strike ? <del>{item.content}</del> : item.content}
          <button onClick={editClick} value={item.id}>
            Edit
          </button>
        </li>
      </div>
      <div style={showWhenVisibile} className="box">
        <EditForm
          item={item}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          editClick={editClick}
        />
      </div>
    </>
  );
};

const Container = ({ children, id }) => {
  return (
    <div id={id} className="container" style={{ border: "solid 1px red" }}>
      {children}
    </div>
  );
};

const KabanBoard = ({
  list,
  pendingList,
  completeList,
  filter,
  priority,
  handleSwap,
  handleDelete,
  handleEdit,
}) => {
  let itemList = [...list];

  if (priority === "important") {
    itemList = itemList.filter((e) => e.priority === "important");
  } else if (priority === "unimportant")
    itemList = itemList.filter((e) => e.priority === "unimportant");

  return (
    <>
      <Container id="initial">
        {itemList.map((e) =>
          e.content.toLowerCase().includes(filter) ? (
            <Item
              key={e.id}
              item={e}
              handleSwap={handleSwap}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ) : (
            ""
          )
        )}
      </Container>

      <Container id="pending">
        {pendingList.map((e) =>
          e.content.toLowerCase().includes(filter) ? (
            <Item
              key={e.id}
              item={e}
              handleSwap={handleSwap}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ) : (
            ""
          )
        )}
      </Container>
    </>
  );
};

export default KabanBoard;
