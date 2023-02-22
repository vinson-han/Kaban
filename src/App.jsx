// rename the file App.jsx
// delete the React import
import { createRoot } from "react-dom/client";
import { useState } from "react";
import ItemList from "./Components/ItemList";
// delete the Pet component

const App = () => {
  let [list, setList] = useState([
    { id: 0, content: "Things to Do", isDone: true },
  ]);
  let [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setList(list.filter((e) => e.id !== +event.target.value));
  };

  const handleClick = (id) => {
    const itemToChange = list.find((e) => e.id === id);

    const changedItem = { ...itemToChange, isDone: !itemToChange.isDone };
    setList(list.map((e) => (e.id !== id ? e : changedItem)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let object = {
      id: Math.floor(Math.random() * 100000),
      content: input,
      isDone: false,
    };
    setList([...list, object]);
    setInput("");
  };

  return (
    <div>
      <h1>Adopt Me!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task">
            <input
              id="task"
              name="task"
              value={input}
              placeholder="Write your to do."
              onChange={handleInputChange}
            />
          </label>
          <button> Submit</button>
        </div>
      </form>
      <div>
        <ItemList
          list={list}
          handleDelete={handleDelete}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
