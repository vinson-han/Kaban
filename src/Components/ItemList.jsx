const ItemList = ({ list, handleDelete }) => {
  return (
    <div>
      <ul>
        {list.map((e) => (
          <li key={e.id}>
            {e.content}{" "}
            <button onClick={handleDelete} value={e.id}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
