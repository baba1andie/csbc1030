# Express Authentication & Authorization App

This is an Express.js application that implements authentication and authorization functionalities using JSON Web Tokens (JWT) for user authentication and protected routes.

## Features

- User login endpoint to generate JWT tokens
- Fetch user by ID only if authenticated
- Add a new user only if requested by a specific user ID

## Setup

### Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/AdityaKuchhal/csbc1030/tree/assignment6>
   cd Assignment 6
   ```

## Install dependencies:

    ```bash
    npm install
    ```

### Usage

    ```
    Start the server:
    bash
    npm start
    ```

Use Postman or any HTTP client to test the following endpoints:

### User Login:

- POST /auth/login: Authenticate and receive a JWT token.
- Send a JSON body with username and password.
- Get User by ID: GET /users/:id: Get user details if authenticated with the matching user ID.
- Add User: POST /users: Add a new user (Accessible only for user ID 1).

### Testing Endpoints with Postman

Open Postman:

Launch the Postman application.
Test User Authentication:

Create a new request in Postman.
Set the request method to POST.
Set the request URL to http://localhost:3000/auth/login.
In the request body, provide valid username and password as JSON.
Upon sending the request, verify if you receive a JWT token in the response.
