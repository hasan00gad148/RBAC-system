# Website Project

## Table of Contents
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Demo](#Demo)
- [Project structure](#Project-structure)
- [Install dependencies](#Install-dependencies)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)


## Introduction
This is a web application project built using a modern tech stack that ensures a seamless and responsive user experience. The project includes both a frontend and a backend, with a database for storing and managing data.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MySQL
- **ORM**: Sequelize

## Installation
To get a local copy up and running, follow these simple steps:

### Prerequisites
- Node.js (v14 or later)
- MySQL
- Git

### Clone the repository
```bash
git clone https://github.com/hasan00gad148/RBAC-system
cd "RBAC system"
```



## Demo 
Watch the [Demo Video](https://drive.google.com/file/d/1a2B3CdEfGHijk/view) to see the project in action.



## Project structure

```
├── backend
│   ├── utills
│   ├── controllers
│   ├── middlewares
│   ├── models
│   |── routes
│   ├── app.js
│   └── package.json
│
│──frontend
│    └──RPAC SYS Frontend
│        ├── src
│        │   ├── components
│        │   ├── pages
│        │   ├── store
│        │   ├── types
│        │   ├── App.tsx
│        │   ├── index.css
│        └── package.json

```



## Install dependencies

### backend dependencies
Navigate to the backend directory and install dependencies:
```bash
cd Backend
npm install
```
### frontend dependencies
Navigate to the frontend directory and install dependencies:
```bash
cd "/Frontend/RBAC SYS Frontend/"
npm install
```

## Configuration
### Database
Create a MySQL database and configure the database connection in the .env file located in the backend directory:

```sql
CREATE DATABASE yourdatabase;
```

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=3505
DB_DIALECT=mysql
```

### Environment Variables
Create a .env file in the backend directory and add the following environment variables:
```env
PORT=5000
JWT_SECRET=your_jwt_secret
```


************************************************



## Usage
### Running the application
navigate to Frontend
```bash
cd "/Frontend/RBAC SYS Frontend/"
npm run dev
```
navigate to Backend
```bash
cd backend
npm start
```
The frontend application will run on http://localhost:5173/ and the backend server will run on http://localhost:355.

## Features
- Responsive UI with Tailwind CSS
- RESTful API with Express
- Data persistence with MySQL using Sequelize ORM
- Authentication and authorization
- Contributing



















