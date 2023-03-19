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
            <li
              className="box"
              key={e.id}
              id={e.id}
              status={name}
              draggable
              onDragStart={(e) => handleDragStart(e)}
              onDrop={(e) => handleDrop(e)}
            >
              {e.status} {e.content}
            </li>
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
  const [completed, setCompleted] = useState([
    {
      id: 4,
      status: "completed",
      content: "Third Block # 1",
      isDone: true,
      priority: "important",
    },
  ]);

  const handleDrop = (e) => {
    e.stopPropagation();

    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    let firstStatus = data.status;
    let secondStatus = e.target.getAttribute("status");
    let firstItem;
    let secondItem;

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
    } else if (firstItem === secondItem && secondItem !== null) {
      switch (firstStatus) {
        case "initial":
          setInitial(swap(initial, data.id, e.target.id));
          break;
        case "pending":
          setPending(swap(pending, data.id, e.target.id));
          break;
        case "completed":
          setPending(swap(completed, data.id, e.target.id));
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

function swap(list, firstId, secondId) {
  let tempList = structuredClone(list);
  let temp = tempList.find((i) => i.id === +firstId);
  let temp2 = tempList.find((i) => i.id === +secondId);
  let iPosition = tempList.indexOf(temp);
  let sPosition = tempList.indexOf(temp2);

  tempList[iPosition] = temp2;
  tempList[sPosition] = temp;

  return tempList;
}
