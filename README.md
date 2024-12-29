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
