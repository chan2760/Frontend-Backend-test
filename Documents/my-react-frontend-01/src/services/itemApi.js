const API = "http://localhost:3000/api/item";

export const getItems = (page, limit) =>
  fetch(`${API}?page=${page}&limit=${limit}`).then(res => res.json());

export const createItem = (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const updateItem = (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const deleteItem = (id) =>
  fetch(`${API}/${id}`, { method: "DELETE" });
