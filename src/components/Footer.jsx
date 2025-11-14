import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} цветошки вуф. все права защищены</p>
      <p>сделано с любовью</p>
    </footer>
  );
}