import { createContext, useState, useEffect, useContext } from 'react'
import { apiGet, apiPost } from '../api'
import { AuthContext } from './AuthContext'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [items, setItems] = useState([])

  useEffect(() => {
    async function loadCart() {
      if (!user) {
        setItems([])
        return
      }
      const data = await apiGet(`/api/user/${user.login}`)
      if (data.cart) {
        const products = await Promise.all(
          JSON.parse(data.cart).map(async (id) => await apiGet(`/api/products/${id}`))
        )
        setItems(products)
      }
    }
    loadCart()
  }, [user])

  const addToCart = async (product) => {
    if (!user) return alert('войдите чтобы добавить в корзину')
    await apiPost('/api/cart/add', { login: user.login, product_id: product.id })
    setItems((prev) => [...prev, product])
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}