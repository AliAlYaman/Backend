# ♟️ Chess Express Backend

This is a real-time multiplayer chess backend server built with **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. It supports live gameplay between two players, authentication, and full persistence of game state and player actions.

---

## 🚀 Features

### ♟️ Real-Time Chess with WebSockets
- Multiplayer chess game logic powered by [`chess.js`](https://www.npmjs.com/package/chess.js).
- Real-time synchronization using **Socket.IO**.
- Players are dynamically assigned as white or black based on room state.
- Full move history, current turn, and board state (FEN) stored in MongoDB.
- Games are persisted even if players disconnect or refresh.

### 🧠 Authentication System
- JWT-based auth system with access and refresh token support.
- Secure route access using middleware.
- Token blacklisting on logout (via MongoDB).

### 📡 Room Management (MongoDB)
- Room data is stored in MongoDB (`Room` model):
  - `roomId`, `whitePlayer`, `blackPlayer`
  - Current FEN, turn, and full move history.
- Users can **create** or **join** rooms by ID.
- Leaving the room resets the game and notifies the opponent.

### 🧪 Testing Support
- `jest` configured for unit and integration testing.
- Sample test for authentication flow located at: `tests/auth/auth.test.js`.

### 📁 Project Structure

├── src/
│ ├── controllers/ # Route logic (e.g. auth-controller.js)
│ ├── database/ # MongoDB connection
│ ├── middlewares/ # JWT auth middleware
│ ├── migrations/ # Seeders / migration utilities
│ ├── models/ # Mongoose models (room, game, user, token)
│ ├── routes/ # Express routes
│ ├── services/ # Custom services (in-progress)
│ ├── sockets/ # WebSocket logic (chess.js)
│ ├── utils/ # Helper utilities (e.g., token.js)
│ ├── app.js # Main Express app instance
│ └── server.js # Entry point + Socket.IO setup
├── tests/ # Unit/integration tests
├── .env # Environment config
├── package.json # Project config
└── README.md # You are here 👋