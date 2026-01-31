import { useEffect, useState } from "react";
import { getItems, createItem, deleteItem } from "./services/itemApi";

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getItems(page, 5).then(setItems);
  }, [page]);

  return (
    <div>
      <h1>Item Manager</h1>

      <button onClick={() => createItem({
        name: "Book",
        category: "Education",
        price: 20
      })}>
        Add Item
      </button>

      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.itemName}
            <button onClick={() => deleteItem(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  );
}

export default App;
