import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { apiGet } from '../api'
import { CartContext } from '../contexts/CartContext'
import '../styles/ProductPage.css'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    apiGet('/api/products/' + id).then(setProduct)
  }, [id])

  if (!product) return <p>загрузка...</p>

  return (
    <div className="container product-page">
      <button onClick={() => history.back()} className="back-btn">← Назад</button>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p><b>{product.price} тг</b></p>
      <div className="product-actions">
        <button onClick={() => addToCart(product)}>Добавить в корзину</button>
      </div>
    </div>
  )
}