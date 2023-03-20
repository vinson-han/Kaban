// rename the file App.jsx

import { createRoot } from "react-dom/client";
import { useState } from "react";
import ItemList from "./Components/ItemList";
import SearchFilter from "./Components/SearchFilter";
import KabanBoard from "./Components/KabanBoard";
import Board from "./Components/Board";
import CreateItem from "./Components/CreateItem";

const App = () => {
  let [list, setList] = useState({});
  let [filter, setFilter] = useState("");
  let [priority, setPriority] = useState("all");

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let object = {
      id: Math.floor(Math.random() * 100000),
      list: "initial",
      content: formData.get("task") ?? "",
      isDone: false,
      priority: formData.get("myRadio"),
    };

    object.content.length && setList(object);
    event.target.reset();
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  return (
    <div>
      <SearchFilter
        handleFilter={handleFilter}
        handlePriority={handlePriority}
      />

      <h1>KABAN BOARD!</h1>

      <CreateItem handleSubmit={handleSubmit} />
      <Board list={list} filter={filter} priority={priority} />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
