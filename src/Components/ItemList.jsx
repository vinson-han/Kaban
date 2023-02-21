const Item = ({ item, handleDelete, handleClick }) => {
  let x = item.content;

  return (
    <li onClick={() => handleClick(item.id)}>
      {item.isDone ? <del>{item.content} </del> : item.content}

      <button onClick={handleDelete} value={item.id}>
        Delete
      </button>
    </li>
  );
};

const ItemList = ({ list, handleDelete, handleClick }) => {
  return (
    <div>
      <ul>
        {list.map((e) => (
          <Item
            key={e.id}
            item={e}
            handleDelete={handleDelete}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
