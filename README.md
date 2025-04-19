
# TaskManager

**TaskManager** is a full-stack task management application that provides a GraphQL API to create, edit, delete, and filter tasks based on completion status or priority. It is built using modern technologies like React, TypeScript, Apollo, GraphQL, TypeORM, and PostgreSQL.

## 🚀 Features

- Create a new task
- Edit existing tasks
- Delete tasks
- Get tasks filtered by completion status (completed / not completed)
- **Unique Feature**: Filter tasks by priority (High / Medium / Low)

## 🛠 Tech Stack

- **Frontend:** React + TypeScript with Apollo Client
- **Backend:** Apollo Server + GraphQL
- **Database:** PostgreSQL with TypeORM

## 📦 Setup Instructions

### Clone the Repository
```bash
git clone <your-repo-url>
cd TaskManager
```

### Frontend Setup
```bash
cd client
npm install
```

### Backend Setup
```bash
cd ../server
npm install
```

### Create Environment File
Create a `.env` file inside the `server` directory and add the following:

```
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tiyas@2004
DB_DATABASE=taskmanagement
```

> Ensure PostgreSQL is installed and a database named `taskmanagement` is created.

### Run the Application
```bash
cd ..
./start.sh
```

