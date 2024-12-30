# User API Documentation

## Sign Up Endpoint

### POST /user/signup

Register a new user in the system.

### Request Body

| Field      | Type     | Required | Description                    |
|------------|----------|----------|--------------------------------|
| name       | string   | Yes      | User's full name              |
| email      | string   | Yes      | User's email address          |
| password   | string   | Yes      | User's password (min 8 chars) |
| phone      | string   | Yes      | User's phone number           |

### Response Status Codes

| Status Code | Description                                          |
|-------------|------------------------------------------------------|
| 201         | User successfully created                             |
| 400         | Bad Request - Invalid input parameters                |
| 409         | Conflict - Email already exists                       |
| 500         | Internal Server Error                                 |

### Example

#### Request
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "strongPassword123",
  "phone": "+1234567890"
}
```

#### Success Response (201)
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "userId": "12345",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### Error Response (400)
```json
{
  "status": "error",
  "message": "Invalid input parameters",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Login Endpoint

### POST /user/login

Authenticate a user and receive an access token.

### Request Body

| Field    | Type   | Required | Description             |
|----------|--------|----------|-------------------------|
| email    | string | Yes      | User's email address   |
| password | string | Yes      | User's password        |

### Response Status Codes

| Status Code | Description                           |
|------------|---------------------------------------|
| 200        | Login successful                      |
| 400        | Bad Request - Invalid input           |
| 401        | Unauthorized - Invalid credentials     |
| 500        | Internal Server Error                 |

### Example

#### Request
```json
{
  "email": "john.doe@example.com",
  "password": "strongPassword123"
}
```

#### Success Response (200)
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "userId": "12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Error Response (401)
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

## Profile Endpoint

### GET /user/profile

Get the authenticated user's profile information.

### Headers
| Field         | Type   | Required | Description          |
|---------------|--------|----------|----------------------|
| Authorization | string | Yes      | JWT token in cookie  |

### Response Status Codes
| Status Code | Description                           |
|------------|---------------------------------------|
| 200        | Success                               |
| 401        | Unauthorized - Invalid/missing token   |
| 500        | Internal Server Error                 |

### Example

#### Success Response (200)
```json
{
  "status": "success",
  "data": {
    "userId": "12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## Logout Endpoint

### GET /user/logout

Logout the currently authenticated user and invalidate their token.

### Headers
| Field         | Type   | Required | Description          |
|---------------|--------|----------|----------------------|
| Authorization | string | Yes      | JWT token in cookie  |

### Response Status Codes
| Status Code | Description                           |
|------------|---------------------------------------|
| 200        | Logout successful                     |
| 401        | Unauthorized - Invalid/missing token   |
| 500        | Internal Server Error                 |

### Example

#### Success Response (200)
```json
{
  "status": "success",
  "message": "Logout successful"
}
```
