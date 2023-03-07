import "../Assets/style.css";

import { useState, useEffect } from "react";

//Drag HTML api not supported with Mobile

const Item = ({ item, handleDelete, handleEdit }) => {
  const handleStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        id: e.target.id,
        innerHTML: e.target.innerHTML,
      })
    );
    console.log(e);
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
    originItem.id = e.target.id;
    originItem.innerHTML = e.target.innerHTML;

    document.getElementById(`edit${originItem.id}`);

    e.target.id = data.id;
    e.target.innerHTML = data.innerHTML;

    document.getElementById(`edit${e.target.id}`);
  };
  return (
    <div
      id={item.id}
      draggable={true}
      onDragStart={(e) => handleStart(e)}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDropOver(e)}
    >
      {item.content}
      <button id={"edit" + item.id} value={item.id} onClick={handleEdit}>
        Edit
      </button>
      <button id={"delete" + item.id} value={item.id} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

const Box = ({ children }) => {
  return <div className="box">{children}</div>;
};

const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

const KabanBoard = ({ list, handleDelete, handleEdit }) => {
  return (
    <Container>
      {list.map((e) =>
        e ? (
          <Box key={e.id} id={e.id}>
            <Item
              item={e}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Box>
        ) : (
          ""
        )
      )}
    </Container>
  );
};

export default KabanBoard;
