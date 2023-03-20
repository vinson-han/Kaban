import { useState, useEffect } from "react";
import EditForm from "./EditForm";
const KabanList = ({ name, list, handleDrop, handleDelete, handleEdit }) => {
  const [strike, setStrike] = useState(false);

  const handleClick = () => {
    setStrike(!strike);
  };

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
              onClick={() => handleClick()}
              className="box"
              key={e.id}
              id={e.id}
              status={name}
              draggable
              onDragStart={(e) => handleDragStart(e)}
              onDrop={(e) => handleDrop(e)}
            >
              {e.content}
              <EditForm
                item={e}
                name={name}
                // handleEdit={(i) => handleEdit(name)}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

const Board = ({ list, filter, priority }) => {
  useEffect(() => {
    // } else if (priority === "unimportant")
    //   itemList = itemList.filter((e) => e.priority === "unimportant");

    list.content && setInitial([...initial, list]);
  }, [list]);

  const [initial, setInitial] = useState([]);
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

    if (firstStatus !== secondStatus && secondStatus) {
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
    } else if (firstItem === secondItem && secondStatus) {
      switch (firstStatus) {
        case "initial":
          setInitial(swap(initial, data.id, e.target.id));
          break;
        case "pending":
          setPending(swap(pending, data.id, e.target.id));
          break;
        case "completed":
          setCompleted(swap(completed, data.id, e.target.id));
          break;
        default:
          break;
      }
    }
  };

  const handleDelete = (e, name, id) => {
    e.stopPropagation();
    switch (name) {
      case "initial":
        setInitial(initial.filter((e) => e.id !== +id));
        break;
      case "pending":
        setPending(pending.filter((e) => e.id !== +id));
        break;
      case "completed":
        setCompleted(completed.filter((e) => e.id !== +id));
        break;
      default:
        break;
    }
  };
  const handleEdit = (object, name) => {
    let contentToChange;

    switch (name) {
      case "initial":
        contentToChange = initial.find((e) => e.id === object.id);
        break;
      case "pending":
        contentToChange = pending.find((e) => e.id === object.id);
        break;
      case "completed":
        contentToChange = completed.find((e) => e.id === object.id);
        break;
      default:
        break;
    }
    let changedContent = {
      ...contentToChange,
      content: object.content,
      priority: object.priority,
    };

    switch (name) {
      case "initial":
        setInitial(
          initial.map((e) => (e.id !== object.id ? e : changedContent))
        );
        break;
      case "pending":
        setPending(
          pending.map((e) => (e.id !== object.id ? e : changedContent))
        );
        break;
      case "completed":
        setCompleted(
          completed.map((e) => (e.id !== object.id ? e : changedContent))
        );
        break;
      default:
        break;
    }
  };

  const filterList = (list, filter, priority) => {
    // Seperated filter for readablity
    let x =
      filter.length > 0
        ? list.filter((e) => e.content.toLowerCase().includes(filter))
        : list;

    if (priority === "important") {
      x = x.filter((e) => e.priority === "important");
    } else if (priority === "unimportant")
      x = x.filter((e) => e.priority === "unimportant");

    return x;
  };

  return (
    <div className="grid">
      <KabanList
        list={filterList(initial, filter, priority)}
        handleDrop={handleDrop}
        name="initial"
        handleDelete={handleDelete}
      />
      <KabanList
        name="pending"
        list={filterList(pending, filter, priority)}
        handleDrop={handleDrop}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <KabanList
        list={filterList(completed, filter, priority)}
        handleDrop={handleDrop}
        name="completed"
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Board;

function handleDragStart(e) {
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
