import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { apiGet } from '../api'
import '../styles/Profile.css'

export default function Profile() {
  const { user, login, register } = useContext(AuthContext)
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', password: '' })
  const [orders, setOrders] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (mode === 'login') await login(form.username, form.password)
    else await register(form.username, form.password)
  }

  useEffect(() => {
    async function loadOrders() {
      if (!user) return
      const data = await apiGet(`/api/user/${user.login}`)
      if (!data.orders) return
      const detailedOrders = await Promise.all(
        data.orders.map(async (order) => {
          const items = await Promise.all(
            order.items.map(async (id) => {
              const product = await apiGet(`/api/products/${id}`)
              return product
            })
          )
          return { ...order, items }
        })
      )
      setOrders(detailedOrders)
    }
    loadOrders()
  }, [user])

  if (!user)
    return (
      <div className="container profile">
        <h2>{mode === 'login' ? 'войти' : 'регистрация'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            placeholder="логин"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="пароль"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">{mode === 'login' ? 'войти' : 'создать аккаунт'}</button>
        </form>
        <button
          className="toggle-btn"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'регистрация' : 'назад к входу'}
        </button>
      </div>
    )

  return (
    <div className="container profile">
      <h2>привет, {user.login}!</h2>
      <h3>история заказов</h3>
      {orders.length === 0 ? (
        <p>вы пока ничего не заказывали.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <p className="order-date">дата: {order.date}</p>
              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}