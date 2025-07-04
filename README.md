# 🚀 React + Vite Project

This is a minimal setup for a React project using Vite, with support for HMR (Hot Module Replacement) and ESLint rules for better development practices.

## Ecommerce Website

![Project Screenshot](screenshots/E-Commerce.png)


## 📌 Project Description

This eCommerce site provides end-to-end functionality for online retail. It allows users to browse products, add them to a cart, register or log in, and securely place orders. Admin users have access to a feature-rich dashboard to manage products, users, and orders efficiently.

This project demonstrates full-stack development skills, integrating frontend and backend functionality, REST APIs, MongoDB database operations, and secure authentication using JWT.

✨ Key Features

🛍️ User Features:

📦 Browse and search product listings with categories

🛒 Add items to cart and adjust quantity

🔐 User registration, login, and profile update

📄 View past orders and order details

💳 Secure checkout and payment workflow (optionally via Stripe or dummy checkout)

🧑‍💼 Admin Features:

📁 Full CRUD operations for products

👥 Manage users (view, update, delete)

📦 View and update order status

📊 Admin dashboard with product, user, and order metrics

🔧 Tech Stack:

Frontend: React, Context Api, React Router

Backend: Node.js, Express.js, MongoDB

Authentication: JWT, bcrypt

Database: MongoDB with Mongoose

Deployment: Render, Vercel

## 🔗 Live Demo

👉 [Click here to view the project](https://ecommerce-frontend-ten-sooty.vercel.app/)

---

## 🔧 ESLint Configuration Notes

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for more information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
