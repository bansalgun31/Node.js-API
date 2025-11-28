# Node.js Employee Management API

A REST API built with Node.js and Express for managing employee records with authentication. This project demonstrates CRUD operations, JWT authentication, role-based access control, and file upload capabilities.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)

## Features

✅ **User Authentication**
- User signup and login
- JWT token-based authentication
- Password encryption with bcrypt
- 24-hour token expiration

✅ **Employee Management**
- Create new employee records
- Retrieve all employees
- Get specific employee details
- Update employee information
- Delete employee records
- File upload support for employee images

✅ **Security**
- JWT token verification on protected routes
- Password hashing with bcrypt
- Middleware-based validation
- CORS support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.1.0)
- **Database**: MongoDB with Mongoose (v8.18.1)
- **Authentication**: JSON Web Tokens (JWT v9.0.2)
- **Password Hashing**: bcrypt (v6.0.0)
- **Validation**: Joi (v18.0.1)
- **File Upload**: Multer (v2.0.2)
- **Environment**: dotenv (v17.2.2)
- **Utilities**: CORS, body-parser, method-override

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Node.js-API-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   MONGODB_URI=mongodb://localhost:27017/employee_db
   ```

4. **Start the server**
   ```bash
   node app.js
   ```

   The server will run on the configured PORT and display "server is running" in the console.

## Configuration

### Database Configuration
Edit `config/db.js` to configure MongoDB connection settings.

### Environment Variables
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT token signing
- `MONGODB_URI`: MongoDB connection string

## API Endpoints

### Health Check
```
GET /ping
Response: "hiii"
```

### Authentication Routes (`/auth`)

**User Signup**
```
POST /auth/signup
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201 Created):
{
  "message": "Signup Successfully",
  "success": true
}

Response (409 Conflict):
{
  "message": "user already exist, you can login",
  "success": false
}
```

**User Login**
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201 Created):
{
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "john@example.com",
  "name": "John Doe",
  "message": "login Successfully",
  "success": true
}

Response (403 Forbidden):
{
  "message": "user does not exist, you can signup",
  "success": false
}
```

### Employee Routes (`/list`)
*All employee routes require JWT authentication. Include the token in the Authorization header:*
```
Authorization: Bearer <jwtToken>
```

**Get All Employees**
```
GET /list/employee
Headers: Authorization: Bearer <token>

Response (200 OK):
[
  {
    "_id": "...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "department": "HR",
    "Image": "1758369557603_e1.avif"
  },
  ...
]
```

**Add New Employee**
```
POST /list/employee/new
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data

Request Body:
- name: string
- email: string
- department: string
- Image: file (image file)

Response (201 Created):
{
  "message": "Employee added successfully",
  "success": true,
  "employee": { ... }
}
```

**Get Employee by ID**
```
GET /list/employee/:id
Headers: Authorization: Bearer <token>

Response (200 OK):
{
  "_id": "...",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "department": "HR",
  "Image": "1758369557603_e1.avif"
}
```

**Update Employee**
```
PUT /list/employee/:id
Headers: Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "department": "Finance"
}

Response (200 OK):
{
  "message": "Employee updated successfully",
  "success": true,
  "employee": { ... }
}
```

**Delete Employee**
```
DELETE /list/employee/:id
Headers: Authorization: Bearer <token>

Response (200 OK):
{
  "message": "Employee deleted successfully",
  "success": true
}
```

## Project Structure

```
Node.js-API-main/
├── app.js                          # Main application file
├── package.json                    # Project dependencies
├── .env                           # Environment variables
├── config/
│   └── db.js                      # MongoDB connection configuration
├── controllers/
│   ├── auth.controller.js         # Authentication logic (signup, login)
│   └── employee.controller.js     # Employee CRUD operations
├── models/
│   ├── user.js                    # User schema
│   └── employee.js                # Employee schema
├── Routes/
│   ├── auth.routes.js             # Auth endpoints
│   └── employee.routes.js         # Employee endpoints
├── middlewares/
│   ├── auth.middleware.js         # Auth validation (signup, login)
│   └── employee.middleware.js     # Employee data validation
├── data/
│   └── employee.data.js           # Employee data utilities
├── uploads/                       # Directory for uploaded files
└── README.md                      # This file
```

## Usage Examples

### Example 1: Complete User Flow

1. **Sign up a new user**
   ```bash
   curl -X POST http://localhost:5000/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "password": "Password123"
     }'
   ```

2. **Login to get JWT token**
   ```bash
   curl -X POST http://localhost:5000/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "Password123"
     }'
   ```
   Save the returned `jwtToken`.

3. **Access protected routes**
   ```bash
   curl -X GET http://localhost:5000/list/employee \
     -H "Authorization: Bearer <jwtToken>"
   ```

### Example 2: Add Employee with Image

```bash
curl -X POST http://localhost:5000/list/employee/new \
  -H "Authorization: Bearer <jwtToken>" \
  -F "name=Jane Smith" \
  -F "email=jane@example.com" \
  -F "department=HR" \
  -F "Image=@path/to/image.jpg"
```

## Security Notes

- Always keep your JWT_SECRET secure and unique
- Use HTTPS in production environments
- Validate and sanitize all user inputs
- Implement rate limiting for production
- Never commit `.env` files to version control
- Use strong, unique passwords

## Error Handling

The API returns appropriate HTTP status codes:
- `200 OK` - Successful request
- `201 Created` - Resource successfully created
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Invalid credentials or insufficient permissions
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

## Future Enhancements

- Add request logging and monitoring
- Implement role-based access control (RBAC)
- Add API documentation with Swagger/OpenAPI
- Implement refresh token mechanism
- Add comprehensive error handling
- Add unit and integration tests
- Implement rate limiting and throttling

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

**Built with ❤️ using Node.js and Express**
