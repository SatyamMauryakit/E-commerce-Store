"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)

        if (!response.ok) {
          throw new Error("Product not found")
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setAddedToCart(true)

      // Reset the "Added to cart" message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false)
      }, 3000)
    }
  }

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setQuantity(value < 1 ? 1 : value)
  }

  if (loading) {
    return <div className="loading">Loading product details...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  if (!product) {
    return <div className="not-found">Product not found</div>
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>

      <div className="product-detail">
        <div className="product-image">
          <img src={product.image || "/placeholder.svg"} alt={product.title} />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-category">
            Category: <span>{product.category}</span>
          </div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <div className="product-rating">
            <span className="stars">
              {"★".repeat(Math.round(product.rating.rate))}
              {"☆".repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className="count">({product.rating.count} reviews)</span>
          </div>

          <div className="product-description">
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" min="1" value={quantity} onChange={handleQuantityChange} />
            </div>

            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>

            {addedToCart && <div className="added-message">Added to cart!</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
