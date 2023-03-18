import { useState } from "react";

const KabanList = ({ list, handleDrop, name }) => {
  return (
    <div
      className="kaban_list"
      status={name}
      draggable={false}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDropOver(e)}
    >
      <ul>
        {list &&
          list.map((e) => (
            <div
              className="box"
              key={e.id}
              id={e.id ?? index}
              status={name}
              draggable
              onDragStart={(e) => handleDragStart(e)}
              onDrop={(e) => handleDrop(e)}
            >
              {e.status} {e.content}
            </div>
          ))}
      </ul>
    </div>
  );
};

const Board = () => {
  const [initial, setInitial] = useState([
    {
      id: 0,
      status: "initial",
      content: "First Block # 1",
      isDone: true,
      priority: "important",
    },
    {
      id: 2,
      status: "initial",
      content: "First Block # 2",
      isDone: true,
      priority: "important",
    },
  ]);
  const [pending, setPending] = useState([
    {
      id: 3,
      status: "pending",
      content: "Second Block # 1",
      isDone: true,
      priority: "important",
    },
  ]);
  const [completed, setCompleted] = useState([]);

  const handleDrop = (e) => {
    e.stopPropagation();

    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    let firstItem;
    let firstStatus = data.status;
    let secondItem;
    let secondStatus = e.target.getAttribute("status");

    console.log(firstStatus === null, secondStatus === null);
    if (firstStatus !== secondStatus && secondStatus !== null) {
      switch (firstStatus) {
        case "initial":
          firstItem = initial.find((e) => e.id === +data.id);
          setInitial(initial.filter((e) => e !== firstItem));
          break;
        case "pending":
          firstItem = pending.find((e) => e.id === +data.id);
          setPending(pending.filter((e) => e !== firstItem));
          break;
        case "completed":
          firstItem = completed.find((e) => e.id === +data.id);
          setCompleted(completed.filter((e) => e !== firstItem));
          break;
        default:
          break;
      }
      switch (secondStatus) {
        case "initial":
          setInitial([...initial, firstItem]);
          break;
        case "pending":
          setPending([...pending, firstItem]);
          break;
        case "completed":
          setCompleted([...completed, firstItem]);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="grid">
      <KabanList list={initial} handleDrop={handleDrop} name="initial" />
      <KabanList list={pending} handleDrop={handleDrop} name="pending" />
      <KabanList list={completed} handleDrop={handleDrop} name="completed" />
    </div>
  );
};

export default Board;

function handleDragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData(
    "text/plain",
    JSON.stringify({
      id: e.target.id,
      status: e.target.getAttribute("status"),
    })
  );
}

function handleDropOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}
