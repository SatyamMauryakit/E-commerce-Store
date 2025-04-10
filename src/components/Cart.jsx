"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./Cart.css"

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleCheckout = () => {
    clearCart()
    setShowConfirmation(true)

    // Hide confirmation message after 4 seconds
    setTimeout(() => {
      setShowConfirmation(false)
    }, 4000)
  }

  if (cartItems.length === 0 && !showConfirmation) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {showConfirmation && (
        <div className="order-confirmation">
          <div className="confirmation-message">Order placed successfully!</div>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} />
                </div>

                <div className="item-details">
                  <Link to={`/product/${item.id}`} className="item-title">
                    {item.title}
                  </Link>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                </div>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">
                      +
                    </button>
                  </div>

                  <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>

                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <div className="cart-actions">
              <Link to="/" className="continue-shopping">
                Continue Shopping
              </Link>
              <button onClick={handleCheckout} className="checkout-btn">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
