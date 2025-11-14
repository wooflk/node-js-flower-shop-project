import { createContext, useState } from "react";
import { apiPost } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(username, password) {
    const data = await apiPost("/api/login", { login: username, password });
    if (data.error) {
      alert(data.error);
    } else {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }

  async function register(username, password) {
    const data = await apiPost("/api/register", { login: username, password });
    if (data.error) {
      alert(data.error);
    } else {
      alert("Регистрация успешна!");
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}