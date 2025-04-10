"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import "./Login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login, isAuthenticated } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(username, password)
      if (!result.success) {
        setError(result.error || "Invalid username or password")
      }
    } catch (err) {
        console.error("Login error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="login-help">
            <p>For testing, use:</p>
            <p>
              Username: <code>mor_2314</code>
            </p>
            <p>
              Password: <code>83r5^_</code>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
