# 🛍️ React E-Commerce App (Fake Store API)

This is a simple e-commerce frontend project built using **React.js** that connects with the [Fake Store API](https://fakestoreapi.com/). It includes authentication, product browsing, filtering, cart management, and responsive design.

---

## 🚀 Features

### ✅ 1. Login Page
- Form with **username** and **password**
- Authenticates using `POST /auth/login` endpoint from Fake Store API
- JWT token is stored in `localStorage`
- On successful login, user is redirected to the **Product Listing (Home)** page

---

### 🛒 2. Product Listing Page (Home)
- Fetches and displays all products using `GET /products`
- Category filter using `GET /products/category/:category`
- (Optional) **Search bar** for filtering by title or keywords
- **Responsive grid layout** (mobile-first approach)

---

### 📦 3. Product Detail Page
- Shows full product information:
  - Image
  - Title
  - Description
  - Price
- Includes an **"Add to Cart"** button to add products

---

### 🧺 4. Cart Page
- Displays added products
- Ability to:
  - Update product quantity
  - Remove items
- Shows **total price**
- **Checkout button**:
  - Clears the cart
  - Displays a popup message:  
    > "Order placed successfully!"
  - The message disappears after 4 seconds  
  - User stays on the **Cart** page after order placement

---

### 🧭 5. Header / Navigation
- Links:
  - **Home**
  - **Cart**
  - **Logout**
- Shows **cart item count** in the header
- **Logout**:
  - Clears JWT token from localStorage
  - Redirects to Login page

---

## 📦 Tech Stack

- **React.js**
- **React Router DOM** (for navigation)
- **Fake Store API**
- **LocalStorage** (JWT + Cart state)
- **Tailwind CSS** / **CSS Modules** (for styling)
- **Responsive Design** (Mobile-first)

---

## 🛠️ Getting Started

```bash
git clone https://github.com/your-username/react-ecommerce-app.git
cd react-ecommerce-app
npm install
npm start
