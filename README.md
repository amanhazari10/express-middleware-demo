# Middleware Implementation for Logging and Bearer Token Authentication

## Objective

Learn how to build and integrate middleware functions in an Express.js application to handle request logging and protect routes using a Bearer token. This project helps you understand middleware flow, request validation, and how to enforce secure access to specific endpoints in a Node.js backend.

## Task Description

This repository contains an Express.js server with two custom middleware functions:

1. **Logging Middleware**: Logs the HTTP method, request URL, and timestamp for every incoming request.
2. **Bearer Token Authentication Middleware**: Checks for an Authorization header that includes a Bearer token. Only requests that include the token `mysecrettoken` are allowed to access protected routes.

The server includes:
- A **public route** (`/public`) accessible without authentication
- A **protected route** (`/protected`) that requires the correct Bearer token (`mysecrettoken`)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/amanhazari10/express-middleware-demo.git
cd express-middleware-demo
```

2. Install dependencies:

```bash
npm install
```

### Project Structure

```
express-middleware-demo/
├── server.js           # Main Express server with middleware
├── package.json        # Project dependencies
└── README.md          # This file
```

## Usage

### Starting the Server

Run the server with:

```bash
node server.js
```

The server will start on `http://localhost:3000`

### API Endpoints

#### 1. Public Route (No Authentication Required)

**GET /public**

Access this route without any authentication:

```bash
curl http://localhost:3000/public
```

**Response:**
```json
{"message": "This is a public route, accessible to everyone"}
```

#### 2. Protected Route (Requires Bearer Token)

**GET /protected**

This route requires a valid Bearer token in the Authorization header.

**Success - With valid token:**

```bash
curl -H "Authorization: Bearer mysecrettoken" http://localhost:3000/protected
```

**Response:**
```json
{"message": "You have accessed the protected route successfully!"}
```

**Failure - Without token:**

```bash
curl http://localhost:3000/protected
```

**Response:**
```json
{"error": "Authorization header is missing"}
```

**Failure - With invalid token:**

```bash
curl -H "Authorization: Bearer invalidtoken" http://localhost:3000/protected
```

**Response:**
```json
{"error": "Invalid or expired token"}
```

## Middleware Explanation

### 1. Logging Middleware

The logging middleware logs every incoming request with:
- HTTP method (GET, POST, etc.)
- Request URL path
- Timestamp in ISO format

**Example Console Output:**
```
[2025-10-31T19:47:00.000Z] GET /public
[2025-10-31T19:47:05.000Z] GET /protected
```

### 2. Bearer Token Authentication Middleware

The authentication middleware:
1. Checks if an Authorization header exists
2. Validates that it follows the format: `Bearer <token>`
3. Compares the token against the expected token (`mysecrettoken`)
4. Returns appropriate error messages for missing or invalid tokens

## Testing with Postman

### Test 1: Public Route

1. Create a GET request to `http://localhost:3000/public`
2. Send the request (no headers needed)
3. You should receive a 200 OK response

### Test 2: Protected Route - Success

1. Create a GET request to `http://localhost:3000/protected`
2. Go to Headers tab and add:
   - Key: `Authorization`
   - Value: `Bearer mysecrettoken`
3. Send the request
4. You should receive a 200 OK response

### Test 3: Protected Route - Failure (No Token)

1. Create a GET request to `http://localhost:3000/protected`
2. Do NOT add any headers
3. Send the request
4. You should receive a 401 Unauthorized response

### Test 4: Protected Route - Failure (Invalid Token)

1. Create a GET request to `http://localhost:3000/protected`
2. Go to Headers tab and add:
   - Key: `Authorization`
   - Value: `Bearer wrongtoken`
3. Send the request
4. You should receive a 401 Unauthorized response

## Code Overview

The server implements the following middleware flow:

```
Incoming Request
      |
      v
  Logging Middleware (logs all requests)
      |
      v
   Route Handler
      |
      +-- /public (no auth required)
      |
      +-- /protected (auth middleware checks token)
      |
      v
   Response
```

## Key Concepts

- **Middleware**: Functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.
- **Bearer Token**: A security token passed in the Authorization header to authenticate API requests.
- **Global Middleware**: Applied to all routes using `app.use()`
- **Route-Specific Middleware**: Applied only to specific routes by passing middleware as a parameter

## Learning Outcomes

After completing this project, you will understand:

1. How to create and use custom middleware in Express.js
2. How to implement request logging across an application
3. How to validate Authorization headers and Bearer tokens
4. How to apply middleware globally vs. to specific routes
5. How to handle authentication errors gracefully
6. How to test APIs using curl and Postman

## License

MIT

## Author

amanhazari10
