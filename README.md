# DevTinder - A Tinder for Developers

DevTinder is a platform designed for developers and professionals to connect with like-minded individuals, share experiences, and grow their networks. It provides a set of APIs for user signups, profile management, and connection requests to help professionals interact with each other.

---

## Features

- **Authentication**: Secure login and registration system for users.
- **Profile Management**: View, edit, and update profiles, including changing passwords.
- **Connection Requests**: Send, accept, or reject connection requests from other users.
- **User Feed**: Browse profiles of other users and send connection requests.

---

## API Endpoints

### 1. Authentication Routes (`authRouter`)

- **POST /signup**: Register a new user.
- **POST /login**: Login for an existing user.
- **POST /logout**: Logout the current session.

### 2. Profile Routes (`profileRouter`)

- **GET /profile/view**: View the current user’s profile.
- **PATCH /profile/edit**: Edit the current user’s profile (e.g., update bio, skills, etc but not emailId and password).
- **PATCH /update/password**: Change the password for the current user.

### 3. Connection Request Routes (`connectionReqRouter`)

- **POST /request/send/interested/:userId**: Send an "Interested" connection request to a user.
- **POST /request/send/ignored/:userId**: Send an "Ignored" connection request to a user.
- **POST /request/review/accepted/:requestId**: Accept a pending connection request.
- **POST /request/review/rejected/:requestId**: Reject a pending connection request.

### 4. User Routes (`userRouter`)

- **POST /user/connections**: Fetch the list of connections for the current user.
- **POST /user/request/received**: Fetch the list of connection requests received.
- **POST /user/feed**: Get the feed of profiles from other users to discover and connect with them.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework to handle API routing.
- **MongoDB & Mongoose**: For database management and schema modeling.
- **JWT Authentication**: For secure user authentication and session management.

---

## Dependencies

Here’s a list of the key dependencies used in this project:

- **`bcrypt`**
- **`body-parser`**
- **`dotenv`**
- **`express`**
- **`jsonwebtoken`**
- **`mongoose`** 
- **`mongodb`**
- **`cookie-parser`**
- **`validator`** 

For a full list, refer to the `package.json` file.

## Configure Environment Variables

Create a `.env` file in the root directory. This file will store sensitive information such as your database connection string, JWT secret key, and other environment-specific configurations.

Add the following variables to your `.env` file:
- PORT=3000 
- MONGO_URI=your_mongodb_uri 
- JWT_SECRET=your_jwt_secret 

## Setup Instructions
Follow these steps to get the DevTinder API up and running on your local machine:

### Clone the Repository

```bash
https://github.com/neerajjagga/DevTinder.git
