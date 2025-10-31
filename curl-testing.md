# cURL Testing Guide

This guide provides comprehensive examples for testing the Express.js middleware server using cURL commands.

## Prerequisites

- Server running on http://localhost:3000 (start with `node server.js`)
- cURL installed on your system
- (Optional) Postman for visual API testing

## Test Cases

### 1. Health Check - GET /health

Test if the server is running:

```bash
curl http://localhost:3000/health
```

**Expected Response (200 OK):**
```json
{
  "status": "Server is running",
  "timestamp": "2025-10-31T19:47:00.000Z"
}
```

**Expected Console Output:**
```
[2025-10-31T19:47:00.000Z] GET /health
```

---

### 2. Public Route - GET /public

Access the public route without any authentication:

```bash
curl http://localhost:3000/public
```

**Expected Response (200 OK):**
```json
{
  "message": "This is a public route, accessible to everyone"
}
```

**Expected Console Output:**
```
[2025-10-31T19:47:05.000Z] GET /public
```

---

### 3. Protected Route - Success Case

#### 3.1 Access protected route with valid Bearer token

```bash
curl -H "Authorization: Bearer mysecrettoken" http://localhost:3000/protected
```

**Expected Response (200 OK):**
```json
{
  "message": "You have accessed the protected route successfully!"
}
```

**Expected Console Output:**
```
[2025-10-31T19:47:10.000Z] GET /protected
```

#### 3.2 Using -v flag for verbose output

```bash
curl -v -H "Authorization: Bearer mysecrettoken" http://localhost:3000/protected
```

This will show:
- Request headers
- Response status (200 OK)
- Response headers
- Response body

---

### 4. Protected Route - Failure Cases

#### 4.1 Access protected route without Authorization header

```bash
curl http://localhost:3000/protected
```

**Expected Response (401 Unauthorized):**
```json
{
  "error": "Authorization header is missing"
}
```

**Expected Console Output:**
```
[2025-10-31T19:47:15.000Z] GET /protected
```

**With verbose output:**
```bash
curl -v http://localhost:3000/protected
```

---

#### 4.2 Access protected route with invalid/wrong Bearer token

```bash
curl -H "Authorization: Bearer wrongtoken" http://localhost:3000/protected
```

**Expected Response (401 Unauthorized):**
```json
{
  "error": "Invalid or expired token"
}
```

**Expected Console Output:**
```
[2025-10-31T19:47:20.000Z] GET /protected
```

---

#### 4.3 Access protected route with malformed Authorization header

```bash
curl -H "Authorization: InvalidFormat" http://localhost:3000/protected
```

**Expected Response (401 Unauthorized):**
```json
{
  "error": "Bearer token is missing"
}
```

---

#### 4.4 Access protected route with Bearer prefix but no token

```bash
curl -H "Authorization: Bearer " http://localhost:3000/protected
```

**Expected Response (401 Unauthorized):**
```json
{
  "error": "Invalid or expired token"
}
```

---

### 5. Non-existent Route

```bash
curl http://localhost:3000/nonexistent
```

**Expected Response (404 Not Found):**
```json
{
  "error": "Route not found",
  "path": "/nonexistent",
  "method": "GET"
}
```

---

## Advanced Testing

### Save Response to File

```bash
curl -H "Authorization: Bearer mysecrettoken" http://localhost:3000/protected > response.json
```

### Get Response Headers Only

```bash
curl -i http://localhost:3000/public
```

### Follow Redirects (if applicable)

```bash
curl -L http://localhost:3000/public
```

### Set Custom Headers and Display Full Response

```bash
curl -v -H "Authorization: Bearer mysecrettoken" \
     -H "X-Custom-Header: value" \
     http://localhost:3000/protected
```

### Measure Response Time

```bash
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/public
```

### Test Multiple Routes in Sequence

```bash
echo "Testing public route:"
curl http://localhost:3000/public
echo "\n\nTesting protected route with valid token:"
curl -H "Authorization: Bearer mysecrettoken" http://localhost:3000/protected
echo "\n\nTesting protected route without token:"
curl http://localhost:3000/protected
```

---

## Testing with Pretty JSON Output

If you have `jq` installed, you can format the JSON output:

```bash
curl http://localhost:3000/public | jq .
```

```bash
curl -H "Authorization: Bearer mysecrettoken" http://localhost:3000/protected | jq .
```

---

## Key Observations

1. **Logging Middleware**: Every request logs the HTTP method, path, and timestamp to the console
2. **Public Route**: Always returns 200 OK without checking authentication
3. **Protected Route**: 
   - Returns 200 OK with valid token `mysecrettoken`
   - Returns 401 Unauthorized with missing or invalid token
4. **Middleware Flow**: The logging middleware runs for all requests, even failed authentication attempts

---

## Troubleshooting

### Server not responding

```bash
curl: (7) Failed to connect to localhost port 3000: Connection refused
```

**Solution**: Make sure the server is running with `node server.js`

### Command not found: curl

**Windows users**: Use `curl.exe` or install Git Bash which includes curl

**Mac users**: curl is pre-installed

**Linux users**: Install with `sudo apt-get install curl`

---

## Next Steps

After testing with cURL, try:
1. Using Postman to visualize requests and responses
2. Modifying the token in `server.js` and testing with different values
3. Adding more routes and middleware functions
4. Implementing additional authentication methods (JWT, API keys, etc.)
