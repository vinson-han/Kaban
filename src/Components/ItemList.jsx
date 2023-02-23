const Item = ({ item, handleDelete, handleClick }) => {
  let x = item.content;

  return (
    <li onClick={() => handleClick(item.id)}>
      {item.isDone ? <del>{item.content}</del> : item.content}{" "}
      <button onClick={handleDelete} value={item.id}>
        Delete
      </button>
    </li>
  );
};

const ItemList = ({ list, filter, priority, handleDelete, handleClick }) => {
  let itemList = list;

  if (priority === "important") {
    itemList = itemList.filter((e) => e.priority === "important");
  } else if (priority === "unimportant")
    itemList = itemList.filter((e) => e.priority === "unimportant");

  itemList = itemList.map((e) =>
    e.content.toLowerCase().includes(filter) ? (
      <Item
        key={e.id}
        item={e}
        handleDelete={handleDelete}
        handleClick={handleClick}
      />
    ) : (
      ""
    )
  );
  return (
    <div>
      <ul>{itemList}</ul>
    </div>
  );
};

export default ItemList;
