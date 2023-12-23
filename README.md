# Final Project - ExpressJS Application

## Description

This application is a scalable ExpressJS application connected to a MySQL database, allowing users to post and comment on posts. It's designed with REST API principles and includes both unauthenticated and authenticated endpoints.

## Features

- **User Authentication**: Secure login and token generation using JWT.
- **CRUD Operations**: Users can create, read, update, and delete posts and comments.
- **Data Storage**: MySQL database for persistent data storage.
- **Testing**: Includes unit and end-to-end tests for two routes.

## Setup and Installation

### Prerequisites

- Node.js and npm (Node Package Manager)
- MySQL database

## Installation Steps

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies:

```
npm install
```

4. Create a .env file in the root directory and set your database credentials and JWT secret:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. To start the application, run:

```
npm start

```

2. The server will start on the specified port, defaulting to 5001 if not set in the .env.

## Testing

To run the tests, execute:

```
npm test
```

# API Endpoints

## Unauthenticated Routes

- `GET /users`: Fetch all users.
- `POST /login`: Authenticate a user and return a JWT.

## Authenticated Routes

- `GET /posts`: Fetch all posts by a sender.
- `GET /posts/:id`: Fetch a single post made by a sender.
- `POST /posts`: Create a new post.
- `PATCH /posts/:id`: Update a post.
- `DELETE /posts/:id`: Delete a post.
- `GET /posts/:id/comments`: Fetch all comments about a post.
- `POST /posts/:id/comments`: Add a new comment to a post.
- `PATCH /posts/:id/comments`: Update a comment.
- `DELETE /posts/:id/comments`: Delete a comment.

# Structure

- **Controllers**: Contains logic for handling requests (authentication, posts, comments).
- **Models**: Sequelize models representing the structure for users, posts, and comments.
- **Routes**: Define API routes mapping to controller logic.
- **Services**: Business logic for authentication, posts, and comments handling.
- **Utils**: Utility functions like error handling.

For further details on each component, refer to the respective files in the project directory.

# License

This project is licensed under the ISC License.

## MySQL tables

```
mysql> SHOW TABLES;
+-----------------+
| Tables_in_users |
+-----------------+
| comments |
| posts |
| users |
+-----------------+
3 rows in set (0.00 sec)
```
