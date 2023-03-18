// rename the file App.jsx

import { createRoot } from "react-dom/client";
import { useState } from "react";
import ItemList from "./Components/ItemList";
import SearchFilter from "./Components/SearchFilter";
import KabanBoard from "./Components/KabanBoard";
import Board from "./Components/Board";
// delete the Pet component

const App = () => {
  const [list, setList] = useState([
    {
      id: 0,
      list: "initial",
      content: "initial",
      isDone: true,
      priority: "important",
    },
  ]);
  const [pendingList, setPendingList] = useState([
    {
      id: 2,
      list: "pending",
      content: "pending",
      isDone: true,
      priority: "important",
    },
  ]);
  const [completeList, setCompleteList] = useState([]);

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
    setList([...list, object]);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleSwap = (x, y, intialPosition, secondPosition) => {
    let tempList = structuredClone(list);

    let temp = list.find((e) => e.id === +intialPosition);
    let temp2 = list.find((e) => e.id === +secondPosition);

    let iPosition = list.indexOf(temp);
    let sPosition = list.indexOf(temp2);

    if (x === y) {
      tempList[iPosition] = temp2;
      tempList[sPosition] = temp;
      if (x === "initial") {
        setList(tempList);
      } else if (x === "pending") {
        setPendingList(tempList);
      } else if (x === "completed") {
        setCompleteList(tempList);
      }
    }
  };

  return (
    <div>
      <SearchFilter
        handleFilter={handleFilter}
        handlePriority={handlePriority}
      />

      <h1>Adopt Me!</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task">
            <input id="task" name="task" placeholder="Write your to do." />
          </label>
          <button> Submit</button>
          <p>
            <label form="radio">
              important
              <input
                type="radio"
                name="myRadio"
                value="important"
                defaultChecked={true}
              />
            </label>
            <label form="radio">
              unimportant
              <input type="radio" name="myRadio" value="unimportant" />
            </label>
          </p>
        </div>
      </form>
      <div></div>
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
      <Board />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
