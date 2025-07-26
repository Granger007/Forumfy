# ForumFy

A full-stack social media platform built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**, with real-time updates via **WebSockets**. ForumFy allows users to upload posts, comment, react, follow/unfollow others, and receive friend recommendations based on shared interests. It craftily eliminates the need for multiple social platforms by capturing the major fancies of Pinterest , Reddit , while retaining a minimalist UI and simplicity.

## 🚀 Features

-  Full CRUD functionality for posts
-  Nested commenting system with real-time updates
-  React to posts and comments
-  Follow/unfollow users to build social connections
-  Friend recommendation system using interest-based filtering
-  User authentication and session management
-  RESTful API design tested with Postman

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

<img width="936" height="527" alt="image" src="https://github.com/user-attachments/assets/4d1c33db-64a7-4bb8-9f49-0dd2d65b9ac9" />
<img width="935" height="529" alt="image" src="https://github.com/user-attachments/assets/c4180f56-d268-4c50-b849-73a80ac0a9f7" />
<img width="936" height="527" alt="image" src="https://github.com/user-attachments/assets/9cd6203c-8586-4846-94e2-01ace7cc94dc" />
<img width="936" height="528" alt="image" src="https://github.com/user-attachments/assets/edd099aa-8770-4637-bf82-1a1f0424ba93" />
<img width="936" height="522" alt="image" src="https://github.com/user-attachments/assets/e4cfd468-a23d-432d-883a-6563ebe0b601" />
<img width="933" height="525" alt="image" src="https://github.com/user-attachments/assets/767879da-a5d1-48cb-8cc5-5848a77032be" />
<img width="938" height="528" alt="image" src="https://github.com/user-attachments/assets/c746d77a-957a-4200-95fb-839df6157b0e" />








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
