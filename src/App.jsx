import { Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AdminPage from './pages/AdminPage'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

