# 🛡️ Node.js JWT Authentication API

This is a secure authentication and authorization system built with **Node.js**, **Express**, **MongoDB**, and **JWT tokens**. It supports user registration, login, protected routes, token refresh, and logout using **access** and **refresh** tokens.

---

## 🔐 Authentication Flow

This app uses **JWT authentication** with both access and refresh tokens.

### ➕ Registration
- `POST /api/auth/register`
- Creates a new user.
- Returns `accessToken` and `refreshToken`.

### 🔑 Login
- `POST /api/auth/login`
- Validates credentials.
- Returns new `accessToken` and `refreshToken`.

### 🔒 Protected Route
- `GET /api/user/profile`
- Requires `Authorization: Bearer <accessToken>`.
- Returns authenticated user info.

### 🚪 Logout
- `POST /api/auth/logout`
- (Without blacklist) The client should delete the refresh token locally.
- In real production, you'd store a blacklist or use rotating tokens.

---

## 🌐 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jwt-auth-db
JWT_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
```

## 📦 Installation & Running

```bash
# Clone the repository
git clone https://github.com/AliAlYaman/Backend.git

# Navigate to Authentication directory
cd Authentication

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```


## 🧠 Future Improvements

- Add refresh token blacklist
- Email verification
- Password reset
- Rate limiting & brute-force protection
- OAuth support