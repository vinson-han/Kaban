// rename the file App.jsx
// delete the React import
import { createRoot } from "react-dom/client";
import { useState } from "react";
import ItemList from "./Components/ItemList";
import SearchFilter from "./Components/SearchFilter";
import KabanBoard from "./Components/KabanBoard";
// delete the Pet component

const App = () => {
  let [list, setList] = useState([
    { id: 0, content: "Things to Do", isDone: true, priority: "important" },
  ]);

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
      content: formData.get("task") ?? "",
      isDone: false,
      priority: formData.get("myRadio"),
    };
    setList([...list, object]);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  return (
    <div>
      <SearchFilter handleFilter={handleFilter} />
      <label htmlFor="priorty">
        important
        <input
          type="radio"
          name="priority"
          value="important"
          onChange={handlePriority}
        />
      </label>
      <label htmlFor="priorty">
        unimportant
        <input
          type="radio"
          name="priority"
          value="unimportant"
          onChange={handlePriority}
        />
      </label>
      <label htmlFor="priorty">
        all
        <input
          type="radio"
          name="priority"
          value="all"
          onChange={handlePriority}
        />
      </label>

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
      <div>
        <ItemList
          list={list}
          filter={filter}
          priority={priority}
          handleDelete={handleDelete}
          handleClick={handleClick}
          handleEdit={handleEdit}
        />
      </div>
      <KabanBoard />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
