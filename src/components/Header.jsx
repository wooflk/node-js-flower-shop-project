import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import "../App.css";

export default function Header() {
  const { items } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <h1>цветочки вуф</h1>
      <nav>
        <Link to="/">главная</Link>
        <Link to="/cart">корзина ({items.length})</Link>
        {user ? (
          <>
            <Link to="/profile">профиль</Link>
            <button onClick={logout} className="logout-btn">
              выйти
            </button>
          </>
        ) : (
          <Link to="/profile">войти</Link>
        )}
        <Link to="/admin">админ</Link>
      </nav>
    </header>
  );
}