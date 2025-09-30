# Task Management System

A full-stack application for managing tasks with user authentication and role-based access control.

## Features

- User authentication (login/register)
- Role-based access (admin/user)
- Task management (CRUD operations)
- Responsive UI with Tailwind CSS
- JWT-based authentication
- Secure API endpoints

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB
- JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd PrimetradeAssignment
```

2. **Install Dependencies**

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

3. **Environment Setup**

Create `.env` file in backend directory:
```env
PORT=3033
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
```

4. **Start the Application**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Tasks
- `GET /api/v1/tasks` - Get tasks (filtered by user role)
- `POST /api/v1/tasks` - Create new task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task (admin only)

## User Roles

### Admin
- Can view all tasks
- Can create tasks
- Can update any task
- Can delete any task

### User
- Can view own tasks
- Can create tasks
- Can update own tasks


## Project Structure

```
PrimetradeAssignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── utils/
    ├── index.html
    └── package.json
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.