import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'
import { apiPost } from '../api'
import '../styles/Cart.css'

export default function Cart() {
  const { items, clearCart, setItems } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  const handleOrder = async () => {
    if (!user) return alert('войдите чтобы оформить заказ')
    const res = await apiPost('/api/order', { login: user.login })
    if (res.error) return alert(res.error)
    alert('Заказ оформлен!')
    clearCart()
  }

  const handleRemove = async (productId) => {
    setItems(items.filter(item => item.id !== productId))
  }

  return (
    <div className="container cart-page">
      <h2>корзина</h2>
      {items.length === 0 ? (
        <p>ваша корзина пуста</p>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.image} alt={item.name} className="cart-card-img"/>
              <div className="cart-card-info">
                <p className="cart-card-name">{item.name}</p>
                <p className="cart-card-price">{item.price} ₽</p>
                <button className="cart-card-remove" onClick={() => handleRemove(item.id)}>удалить</button>
              </div>
            </div>
          ))}
          <button className="cart-order-btn" onClick={handleOrder}>оформить заказ</button>
        </div>
      )}
    </div>
  )
}