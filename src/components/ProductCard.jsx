import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { apiPost } from "../api";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const handleOpen = async () => {
    if (user) {
      try {
        await apiPost("/api/favorites/add", {
          login: user.login,
          product_id: product.id,
        });
      } catch (err) {
        console.error("Ошибка добавления в рекомендации:", err);
      }
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} onClick={handleOpen} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price} тг</p>
        <button
          className="add-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          добавить в корзину
        </button>
      </div>
    </div>
  );
}