import "../Assets/style.css";

import { useState, useEffect } from "react";


const



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

  const DragAndDrop = props => {
    const handleDragEnter = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDragLeave = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDragOver = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDrop = e => {
      e.preventDefault();
      e.stopPropagation();
    };

  return (
    <div className="container">
      <div className=".box"
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}>
      </div>
    </div>
      
  );
};

export default KabanBoard;
