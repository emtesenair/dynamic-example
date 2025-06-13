# PHP API – Dynamic JWT Verification Demo

This lightweight PHP service demonstrates how to verify Dynamic's session cookie (`DYNAMIC_JWT_TOKEN`) and perform backend-gated logic using a verified user session.

It is intended to help PHP-based teams understand how to integrate Dynamic with existing backend systems.

---

## 📦 Features

- Verifies Dynamic JWT from browser cookies
- Provides an example `random.php` endpoint that returns a token ID only if the user is authenticated
- Uses JWKS from Dynamic’s public API to validate tokens

---

## 🧪 Endpoints

### `GET /verify.php`

- Verifies the JWT from the `DYNAMIC_JWT_TOKEN` cookie
- Returns the decoded payload if valid
- Returns `401 Unauthorized` if missing or invalid

### `GET /random.php`

- First verifies the JWT
- Returns a random token ID (`0–3`) if the user is authenticated

---

## ⚙️ Environment Variables

Create a `.env` file with:

```env
DYNAMIC_ENV_ID="your-dynamic-environment-id"
```

---

## 🚀 Running Locally (via Docker)

This API is part of the full demo and can be run with the UI using Docker Compose.

To run it standalone:

```bash
docker build -t php-api .
docker run -p 8080:80 php-api
```

Then visit: `http://localhost:8080/verify.php`

---

## 📁 File Structure

```
php-api/
├── public/
│   ├── random.php             # Gated minting logic
│   └── verify.php             # JWT verification endpoint
├── utils/
│   └── verify-jwt.php         # Shared JWT verification logic
├── vendor/                    # Composer dependencies
├── .dockerignore
├── .env
├── .example.env
├── composer.json
├── composer.lock
├── Dockerfile
├── README.md
```

---

## 📚 Requirements

- PHP 8.1+
- Composer
- `firebase/php-jwt` and `vlucas/phpdotenv` libraries (installed via Dockerfile)

---

## 🤝 Related Docs

- Dynamic JWT Verification: https://docs.dynamic.xyz/authentication-methods/how-to-validate-users-on-the-backend#option-3-do-it-yourself-verification
- JWKS Endpoint: `https://app.dynamic.xyz/api/v0/sdk/[ENV_ID]/.well-known/jwks`
