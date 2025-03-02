Session-Based Authentication with Redis Store

This is a session-based authentication system built with Express.js, using Redis as a session store. The system provides user authentication, session management, and protected routes with Redis-backed session storage.

🚀 Features

Session-based authentication using express-session.

Redis store for session persistence.

User login and logout functionality.

Protected routes that require authentication.

Middleware for session validation and authorization.

📌 Technologies Used

Node.js (Runtime)

Express.js (Backend Framework)

TypeScript (Strong Typing)

Redis (Session Store)

Mongoose & MongoDB (User Data Storage)

bcryptjs (Password Hashing)

📂 Project Structure

/my-express-app
│── src/
│   ├── controllers/
│   │   ├── user_controller.ts  # User authentication logic
│   │   ├── dashboard.ts  # Protected route logic
│   ├── middlewares/
│   │   ├── authorize.ts  # Middleware for session validation
│   ├── models/
│   │   ├── user.ts  # Mongoose User model
│   ├── routes/
│   │   ├── user.ts  # User authentication routes
│   │   ├── dashboard.ts  # Protected dashboard routes
│   ├── config/
│   │   ├── redis.ts  # Redis client setup
│   ├── index.ts  # Main Express app setup
│   ├── server.ts  # Starts the server
│── package.json  # Dependencies & scripts
│── README.md  # Documentation

🛠 Installation

1️⃣ Clone the Repository

git clone https://github.com/your-username/session-auth-redis.git
cd session-auth-redis

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file and configure the following:

PORT=4000
SESSION_SECRET=your_secret_key
REDIS_HOST=localhost
REDIS_PORT=6379
MONGO_URI=mongodb://localhost:27017/session-auth

4️⃣ Start Redis Server (If Not Running)

redis-server

5️⃣ Run the App

npm run dev  # For development (nodemon)
npm start    # For production

🔑 Authentication Endpoints

1️⃣ Register User

POST /api/register

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

2️⃣ Login User

POST /api/login

Request Body:

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:

{
  "message": "Login successful!"
}

Session is created and stored in Redis.

3️⃣ Logout User

POST /api/logout

Response:

{
  "message": "Logout successful!"
}

Session is destroyed from Redis.

4️⃣ Protected Dashboard Route

GET /api/dashboard

Requires authentication.

If the session is valid, the user gets access.

If the session is invalid or expired, returns 401 Unauthorized.

🔒 Authorization Middleware (authorize.ts)

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: No active session" });
    }

    const user = await User.findOne({ _id: req.session.user.id });
    if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    
    req.user = user;
    next();
};

🛠 Debugging Sessions in Redis

Check stored sessions:

redis-cli keys "sess:*"

To view a session:

redis-cli GET "sess:your_session_id"

To delete all sessions:

redis-cli FLUSHALL

📜 License

This project is open-source and available under the MIT License.

Now you're ready to build secure session-based authentication with Redis! 🚀🔥

🛠 Installation

1️⃣ Clone the Repository
git clone https://github.com/your-username/session-auth-redis.git
cd session-auth-redis
2️⃣ Install Dependencies
npm install
3️⃣ Set Up Environment Variables

Create a .env file and configure the following:
PORT=4000
SESSION_SECRET=your_secret_key
REDIS_HOST=localhost
REDIS_PORT=6379
MONGO_URI=mongodb://localhost:27017/session-auth
4️⃣ Start Redis Server (If Not Running)
redis-server
5️⃣ Run the App
npm run dev  # For development (nodemon)
npm start    # For production
🔑 Authentication Endpoints

1️⃣ Register User
POST /api/register
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
2️⃣ Login User
POST /api/login
Request Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}
Response:
{
  "message": "Login successful!"
}
Session is created and stored in Redis.
3️⃣ Logout User
POST /api/logout
Response:
Session is destroyed from Redis.

4️⃣ Protected Dashboard Route
GET /api/dashboard
Requires authentication.

If the session is valid, the user gets access.

If the session is invalid or expired, returns 401 Unauthorized.
🔒 Authorization Middleware (authorize.ts)
export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: No active session" });
    }

    const user = await User.findOne({ _id: req.session.user.id });
    if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    
    req.user = user;
    next();
};
