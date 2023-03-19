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

  const handleDelete = (event) => {
    event.stopPropagation();

    setList(list.filter((e) => e.id !== +event.target.value));
  };

  const handleClick = (id) => {
    const itemToChange = list.find((e) => e.id === id);

    const changedItem = { ...itemToChange, isDone: !itemToChange.isDone };
    setList(list.map((e) => (e.id !== id ? e : changedItem)));
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleEdit = (object) => {
    let contentToChange = list.find((e) => e.id === object.id);
    let changedContent = {
      ...contentToChange,
      content: object.content,
      priority: object.priority,
    };
    setList(list.map((e) => (e.id !== object.id ? e : changedContent)));
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
      {/* <SearchFilter
        handleFilter={handleFilter}
        handlePriority={handlePriority}
      /> */}

      <h1>Adopt Me!</h1>

      {/* <div className="grid">
        <KabanBoard
          list={list}
          pendingList={pendingList}
          completeList={completeList}
          filter={filter}
          priority={priority}
          handleClick={handleClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSwap={handleSwap}
        />
      </div> */}
      <CreateItem handleSubmit={handleSubmit} />
      <Board list={list} />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
