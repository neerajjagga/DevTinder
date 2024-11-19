# DevTinder - A Tinder for Developers

DevTinder is a platform designed for developers and other professionals to connect with like-minded individuals, share experiences, and grow their networks. It offers a set of APIs to facilitate user signups, profiles, and connection requests, making it easier for professionals to discover and interact with one another.

Features
Authentication: Secure login and registration system for users.
Profile Management: Users can view, edit, and update their profiles, including changing their passwords.
Connection Requests: Users can send, accept, or reject connection requests.
User Feed: A feature to display profiles of other users and send connection requests.

## API Documentation
### Authentication Routes (authRouter)

POST /signup: Register a new user.

POST /login: Login for an existing user.

POST /logout: Logout the current session.

### Profile Routes (profileRouter)

GET /profile/view: View the user profile.

PATCH /profile/edit: Edit the user profile (e.g., update bio, skills, etc.).

PATCH /profile/password: Change the password for the current user.

### Connection Request Routes (connectionReqRouter)
POST /request/send/interested/:userId: Send an "Interested" connection request to a user.

POST /request/send/ignored/:userId: Send an "Ignored" connection request to a user.

POST /request/review/accepted/:requestId: Accept a pending connection request.

POST /request/review/rejected/:requestId: Reject a pending connection request. 

### User Routes (userRouter)
POST /user/connections: Fetch the list of connections for the current user.

POST /user/request/received: Fetch the list of connection requests received.

POST /user/feed: Get the feed of profiles from other users to discover and connect with them.

Technologies Used
Node.js: JavaScript runtime for building the backend.
Express.js: Web framework to handle API routing.
MongoDB & Mongoose: For database management and schema modeling.
JWT Authentication: For secure user authentication and session management.

## Setup Instructions :- 

### git clone https://github.com/your-username/devtinder.git

### Install dependencies:


## Create a .env file in the root directory.

Set up the following environment variables:
makefile

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET= "DevTinder@83"

## Run the application:

The API will be running on http://localhost:3000 by default.