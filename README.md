# ForumFy

A full-stack social media platform built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**, with real-time updates via **WebSockets**. ForumFy allows users to upload posts, comment, react, follow/unfollow others, and receive friend recommendations based on shared interests.

## 🚀 Features

- 📝 Full CRUD functionality for posts
- 💬 Nested commenting system with real-time updates
- ❤️ React to posts and comments
- 👥 Follow/unfollow users to build social connections
- 🧠 Friend recommendation system using interest-based filtering
- 🔐 User authentication and session management
- 🌐 RESTful API design tested with Postman

## 🛠️ Tech Stack

**Frontend:**
- React.js
- JavaScript
- HTML/CSS

**Backend:**
- Node.js
- Express.js
- MongoDB
- WebSockets (for real-time updates)
- Postman (for API testing)

## 📸 Screenshots

> *(Optional: Add screenshots or demo GIFs of your UI here)*

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Forumfy.git
cd Forumfy

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

Environment Variables
Create a .env file inside the /server directory and add the following:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Running the App
bash
Copy
Edit
# Start the backend server
cd server
npm start

# Start the frontend client
cd ../client
npm start
Frontend: http://localhost:3000

Backend/API: http://localhost:5000

📂 Project Structure
bash
Copy
Edit
Forumfy/
├── client/               # React frontend
│   └── ...
├── server/               # Express backend
│   └── ...
├── README.md
└── .env
