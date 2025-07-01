# Dynamic + PHP + Next.js Demo

This project demonstrates how to integrate the Dynamic embedded wallet with a full-stack app using both a modern React (Next.js) frontend and a traditional PHP backend.

## 🚀 Live Demo

Check out the live demo: [https://dynamic-example-1j906rf4h-spark-eng.vercel.app](https://dynamic-example-1j906rf4h-spark-eng.vercel.app)

---

## 📦 What's Inside

### `nextjs-app/`

- A fully functional Dynamic-enabled frontend
- NFT minting, account abstraction, and JWT-based auth flows
- Dockerized for easy setup

### `php-api/`

- Verifies `DYNAMIC_JWT_TOKEN` cookie on backend
- Demonstrates mint gating using validated sessions
- Dockerized PHP + Apache service

---

## ⚙️ Environment Variables

### `nextjs-app/` (`nextjs-app/.env.local`)

```env
NEXT_PUBLIC_DYNAMIC_ENV_ID="your-dynamic-environment-id"
NEXT_PUBLIC_DYNAMIC_API_BASE_URL="https://app.example.com/api/v0"
```

### `php-api/` (`php-api/.env`)

```env
DYNAMIC_ENV_ID="your-dynamic-environment-id"
```

Make sure the Dynamic environment ID is identical in both files so the frontend and backend verify against the same workspace.

> You'll find your environment ID in the Dynamic dashboard under Developer > API.

---

## 🐳 Docker Setup (Monorepo)

Use Docker Compose to spin up both services:

```bash
docker-compose up
```

Services:

- Frontend (Next.js) → http://localhost:3000
- Backend (PHP) → http://localhost:8080

---

## 🧠 Notes

- Auth cookies must be enabled in the Dynamic dashboard
- Frontend requests to backend must use `credentials: 'include'`
- Cookie name is: `DYNAMIC_JWT_TOKEN`
- AA uses ZeroDev (legacy 4337 mode)

---

## 📚 Reference Docs

- [Dynamic Docs](https://docs.dynamic.xyz)
- [JWT Verification](https://docs.dynamic.xyz/authentication-methods/how-to-validate-users-on-the-backend)
- [ZeroDev Gas Sponsorship](https://docs.zerodev.app/sdk/core-api/sponsor-gas)
