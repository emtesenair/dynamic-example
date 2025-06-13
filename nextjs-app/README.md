# Dynamic + Next.js Demo App

This is a demo app built with Next.js to showcase key features of the [Dynamic](https://dynamic.xyz) embedded wallet SDK and how to integrate it in real-world use cases.

It was created to address real concerns from an enterprise evaluating Dynamic, including:

- NFT minting from the browser
- Account abstraction with gas sponsorship
- Cookie-based authentication
- Server-side token validation
- Dockerized local development

---

## 🧪 What This App Demonstrates

### ✅ Embedded Wallet + NFT Minting

- Users can connect a Dynamic wallet and mint an NFT
- Minting is based on a backend-gated request (`/api/random-token`)
- Example PHP implementation also included in `php-api`

### ✅ Cookie-Based Auth

- Authentication is handled via secure HttpOnly cookies
- Dynamic’s `DYNAMIC_JWT_TOKEN` cookie is validated server-side

### ✅ Account Abstraction with ZeroDev

- Uses ZeroDev as the bundler and sponsor
- Gasless transaction UX
- Includes helper `getKernelClient()` for working with smart wallets

### ✅ Backend JWT Validation Example

- `/api/token-verify` uses Dynamic’s JWKS to validate the cookie JWT
- Example PHP implementation also included in `php-api`

---

## 🧱 Local Development Setup

### Prerequisites

- Node.js 18+
- PNPM (`npm i -g pnpm`)
- Docker (for full stack demo)

### Install dependencies

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in `nextjs-app/` with:

```env
NEXT_PUBLIC_DYNAMIC_ENV_ID=""
NEXT_PUBLIC_DYNAMIC_API_BASE_URL=""
```

> You'll find your environment ID in the Dynamic dashboard under Developer > API.

### Run locally

```bash
pnpm dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Compose Setup (Full Demo)

This repo includes a `docker-compose.yml` file that spins up:

- This app on `localhost:3000`
- A PHP backend (`php-api`) on `localhost:8080`

To run both:

```bash
docker-compose up
```

---

## 📁 Notable Files

```
nextjs-app/
├── app/
│   ├── page.tsx                     # Main page with Dynamic wallet connection and NFT mint UI
│   └── examples/
│       └── page.tsx                 # Example of how to verify DYNAMIC_JWT_TOKEN using Dynamic's JWKS
│   └── api/
│       ├── token-verify/
│       │   └── route.ts             # Verifies DYNAMIC_JWT_TOKEN using Dynamic's JWKS
│       └── random-token/
│           └── route.ts             # Returns a random NFT ID, gated by verified JWT
├── lib/
│   ├── dynamic-auth.ts              # JWT validation helper (Node)
│   └── get-kernel-client.ts         # Utility to get ZeroDev smart wallet client
```

---

## Account Abstraction & Gas Fees

This project uses Smart Wallets with Account Abstraction to enable a gasless experience for users. Instead of users signing and paying for each transaction with ETH, a sponsored relayer (e.g. via [ZeroDev](https://docs.zerodev.app/)) handles the transaction fees behind the scenes.

[Dynamic](https://docs.dynamic.xyz/) manages the creation and connection of these smart wallets. When a user performs an action like minting an NFT, the transaction is packaged and submitted on their behalf — with the sponsor covering the gas cost.

This simplifies the onboarding experience for non-crypto-native users and enables a seamless UX without requiring them to hold or understand ETH. You can learn more from [Dynamic's Smart Wallet documentation](https://docs.dynamic.xyz/smart-wallets/overview) and [ZeroDev's gas sponsorship guide](https://docs.zerodev.app/sdk/core-api/sponsor-gas).

---

## 🍪 Cookie-Based Authentication

Dynamic supports secure session management using HttpOnly cookies. In this project, once a user authenticates, their JWT is stored in a cookie named `DYNAMIC_JWT_TOKEN`.

The backend (Node or PHP) can validate this token using Dynamic’s public JWKS endpoint. This ensures the session is authenticated server-side and no tokens are exposed to frontend JavaScript.

To use cookies locally, cookie-based auth must be enabled in the [Dynamic dashboard](https://app.dynamic.xyz/dashboard/security), and domains must be configured if you're not running in sandbox mode.

---

## 🧠 Gotchas & Notes

- Be sure to enable cookie-based auth in the Dynamic dashboard under **Account Security**
- To fetch from browser to backend with cookies, use `credentials: 'include'` in `fetch`
- Cookie name is `DYNAMIC_JWT_TOKEN` (not documented)
- AA uses Legacy 4337 mode via ZeroDev (no session keys or MPC)

---

## 🤝 Related Docs

- [Dynamic: JWT Auth Tokens](https://docs.dynamic.xyz/authentication-methods/auth-tokens)
- [Dynamic: Cookie Auth](https://docs.dynamic.xyz/authentication-methods/cookie-authentication)
- [Dynamic: Smart Wallets w/ ZeroDev](https://docs.dynamic.xyz/smart-wallets/smart-wallet-providers/zerodev#zerodev)
- [ZeroDev Gas Sponsorship](https://docs.zerodev.app/sdk/core-api/sponsor-gas)
