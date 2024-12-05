# **Booking Service API**

## Features
- **User Authentication**:
  - Register a new user.
  - Login.
  - JWT-based authentication.
- **Booking Management**:
  - Retrieve all bookings.
  - Retrieve booking by ID.
  - Create a new booking for the authenticated user.
  - Delete booking by ID for the authenticated user.
- **API documentation (swagger)**
- **Tests**

## Prerequisites

- **Node.js**: v18 or higher
- **MongoDB**: Running locally or accessible via a URI
- **npm**: Installed with Node.js

---

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/spasibo-ra/keym-test-task.git
   cd keym-test-task
2. **Install dependencies**:
    ```bash
    npm install
3. **Set up environment variables**: Create a ```.env.development``` and ```.env.test``` file in the root directory and add the following variables:
    ```bash
    NODE_ENV=development
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/keym-test-task
    ACCESS_TOKEN_SECRET=access-token-secret
    ```
    ```env
    NODE_ENV=test
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/t-keym-test-task
    ACCESS_TOKEN_SECRET=test-access-token-secret
4. **Run the project**:
    ```bash
    # For development (Nodemon)
    npm run start:dev
    # For production
    npm run start
5. **Run tests**:
    ```bash
    npm run test
6. **Access the API**: By default, the server runs at http://localhost:3000.
---
## API Documentation
This project includes Swagger documentation for all API endpoints.
### **How to Access the Swagger UI**
1. **Start the server**:
    ```bash
    npm run start
2. **Open your browser and navigate to**: http://localhost:3000/api-docs
---