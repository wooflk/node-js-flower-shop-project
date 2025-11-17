import React, { useEffect, useState, useContext } from "react";
import { apiGet } from "../api";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("");
  const [tab, setTab] = useState("all");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await apiGet("/api/products");
        setProducts(data);
      } catch (err) {
        console.error("Ошибка загрузки продуктов:", err);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (!user) return;

    async function loadFavorites() {
      try {
        const favs = await apiGet(`/api/favorites/${user.login}`);
        setFavorites(favs);
      } catch (err) {
        console.error("Ошибка загрузки рекомендаций:", err);
      }
    }

    loadFavorites();
  }, [user]);

  const displayed = tab === "all" ? products : favorites;

  const filtered = displayed.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="hero">
        <h1>цветочный магазин “Вуф”</h1>
        <p>тута самые свежие цветошки</p>
      </div>
      <div className="tabs">
        <button
          className={tab === "all" ? "active" : ""}
          onClick={() => setTab("all")}
        >
          Все товары
        </button>
        <button
          className={tab === "favorites" ? "active" : ""}
          onClick={() => setTab("favorites")}
          disabled={!user}
        >
          Рекомендации
        </button>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="поиск по названию..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard key={p.id} product={p} user={user} />
          ))
        ) : (
          <p className="empty">ничего не найдено</p>
        )}
      </div>
    </div>
  );
}