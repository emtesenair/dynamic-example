# Dynamic + PHP + Next.js Demo

This project demonstrates how to integrate the Dynamic embedded wallet with a full-stack app using both a modern React (Next.js) frontend and a traditional PHP backend.

---

## 📦 What’s Inside

### `nextjs-app/`

- A fully functional Dynamic-enabled frontend
- NFT minting, account abstraction, and JWT-based auth flows
- Dockerized for easy setup

### `php-api/`

- Verifies `DYNAMIC_JWT_TOKEN` cookie on backend
- Demonstrates mint gating using validated sessions
- Dockerized PHP + Apache service

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
