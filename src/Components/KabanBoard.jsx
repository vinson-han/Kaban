import "../Assets/style.css";

import { useState, useEffect } from "react";

const KabanBoard = () => {
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
    e.dataTransfer.setData("text/plain", e.target.id);
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
    <div className="container">
      <div
        id="A"
        className="box"
        draggable={true}
        onDragStart={(e) => handleStart(e)}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => hanldeDropOver(e)}
      >
        A
      </div>
      <div
        id="Basd"
        className="box"
        draggable={true}
        onDragStart={(e) => handleStart(e)}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => hanldeDropOver(e)}
      >
        Vinson
      </div>
    </div>
  );
};

export default KabanBoard;
