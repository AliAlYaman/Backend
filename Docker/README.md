# 🚀 Simple Express App with Docker

This is a minimal Node.js + Express application running inside a Docker container. It serves as a beginner-friendly example for containerizing backend applications.

---

## 🧰 Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- [Node.js](https://nodejs.org/) (only needed if running locally without Docker)
- Express installed (handled automatically via `npm install` or Docker)

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AliAlYaman/Backend.git
cd Docker
docker build -t express-docker-app .
docker run -p 3000:3000 express-docker-app
```

### 🧪 Run Without Docker (Optional)
If you want to run the app locally without Docker:

```bash
npm install
npm start
```


### 🐳Dockerfile

- FROM node:22              # Uses official Node.js 18 base image
- WORKDIR /app              # Sets working directory inside the container
- COPY package*.json ./     # Copies package files to install dependencies
- RUN npm install           # Installs Express inside the container
- COPY . .                  # Copies the rest of your code
- EXPOSE 3000               # Tells Docker the app will use port 3000
- CMD ["npm", "start"]      # Command to run the app inside the container


### 📦 How It Works Internally
Docker starts a Linux container using the Node.js base image.

It installs your app’s dependencies (via npm install).

It copies your app code into the container.

It exposes port 3000 (where Express listens).

When the container runs, it executes npm start, which runs index.js.

You now have a completely isolated, portable web app that runs the same anywhere — no more “it works on my machine” issues.
