// rename the file App.jsx
// delete the React import
import { createRoot } from "react-dom/client";
import { useState } from "react";
import ItemList from "./Components/ItemList";
// delete the Pet component

const App = () => {
  let [list, setList] = useState([{ id: 0, content: "Things to Do" }]);
  let [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleDelete = (event) => {
    setList(list.filter((e) => e.id !== +event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let object = {
      id: Math.floor(Math.random() * 100000),
      content: input,
    };
    setList([...list, object]);
    console.log(list);
    setInput("");
  };
  console.log(list);
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
        <ItemList list={list} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
