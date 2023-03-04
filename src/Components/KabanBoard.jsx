import "../Assets/style.css";

import { useState, useEffect } from "react";

//Drag HTML api not supported with Mobile

const Box = ({ item }) => {
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

  const hanldeDropOver = (e) => {
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

    e.target.id = data.id;
    e.target.innerHTML = data.innerHTML;
  };

  return (
    <div
      id={item.id}
      className="box"
      draggable={true}
      onDragStart={(e) => handleStart(e)}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => hanldeDropOver(e)}
    >
      {item.content}
    </div>
  );
};

const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

const KabanBoard = ({ list }) => {
  const templist = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  return (
    <Container>
      {list.map((e) => (e ? <Box key={e.id} id={e.id} item={e} /> : ""))}
    </Container>
  );
};

export default KabanBoard;
