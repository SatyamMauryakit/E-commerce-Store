"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import "./Header.css"

const Header = () => {
  const { isAuthenticated, logout } = useAuth()
  const { cartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
        E-commerce Store
        </Link>

        {isAuthenticated && (
          <>
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
            
            <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link cart-link" onClick={() => setMobileMenuOpen(false)}>
                    Cart
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }} className="logout-btn">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}

export default Header