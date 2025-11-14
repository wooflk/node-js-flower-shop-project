import React, { useState } from "react";

const API_ROOT = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_ROOT}/api/admin/add-flower`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", textAlign: "center" }}>
      <h2>🪻 Админ-панель: Добавление букета</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Название букета"
          onChange={handleChange}
          value={form.name}
        />
        <input
          name="price"
          placeholder="Цена"
          type="number"
          onChange={handleChange}
          value={form.price}
        />
        <input
          name="image"
          placeholder="Ссылка на изображение"
          onChange={handleChange}
          value={form.image}
        />
        <textarea
          name="description"
          placeholder="Описание"
          onChange={handleChange}
          value={form.description}
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}