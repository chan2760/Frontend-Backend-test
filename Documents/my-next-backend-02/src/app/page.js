"use client";
import { useEffect, useState } from "react";

export default function ItemManager() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    itemName: "",
    itemCategory: "",
    itemPrice: "",
    status: "",
  });

  const fetchItems = async () => {
    const res = await fetch(`/api/item?page=${page}`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  const addItem = async () => {
    await fetch("/api/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      itemName: "",
      itemCategory: "",
      itemPrice: "",
      status: "",
    });

    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`/api/item/${id}`, {
      method: "DELETE",
    });

    fetchItems();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Item Manager</h1>

      <input placeholder="Name"
        value={form.itemName}
        onChange={(e) => setForm({ ...form, itemName: e.target.value })}
      />

      <input placeholder="Category"
        value={form.itemCategory}
        onChange={(e) => setForm({ ...form, itemCategory: e.target.value })}
      />

      <input placeholder="Price"
        value={form.itemPrice}
        onChange={(e) => setForm({ ...form, itemPrice: e.target.value })}
      />

      <input placeholder="Status"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      />

      <button onClick={addItem}>Add Item</button>

      <hr />

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.itemName}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
