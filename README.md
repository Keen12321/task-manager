# Task Manager App

This is a full-stack task manager application built using **React/Redux** for the frontend and **Laravel** for the backend. The app allows users to create, read, update, and delete projects and tasks, with additional features like sorting, filtering, and pagination. It also includes token-based authentication using **Laravel Passport**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **CRUD Operations**: Users can create, read, update, and delete projects and tasks.
- **Authentication**: Token-based authentication using Laravel Passport.
- **Sorting and Filtering**: Sort and filter tasks by project, due date, and status.
- **Pagination**: Tasks are paginated for improved data management.
- **Responsiveness**: The app is fully responsive across various device sizes (desktop, tablet, mobile).
- **Scalability**: Built with clean, reusable components for future improvements.

---

## Tech Stack

- **Frontend**: React, Redux, Vite, Tailwind CSS
- **Backend**: Laravel, Laravel Passport for authentication
- **Database**: SQLite (or configure PostgreSQL for production)
- **Deployment**: Heroku (for live app)

---

## Setup Instructions

### Frontend Setup
You’ll need to have **Node.js** and **npm** installed. If you haven’t done so already, you can download and install [Node.js](https://nodejs.org/).

Run the following commands to install the frontend dependencies:

```bash
    npm install
```

To run the frontend locally:

```bash
    npm run dev
```

This will start a Vite development server, usually accessible at http://localhost:5173.

### Backend Setup
Ensure you have Composer installed. If you don’t have Composer, install it from here (https://getcomposer.org/download).

Run the following command to install the Laravel dependencies:

```bash
    composer install
```

# Environment Configuration
Copy the .env.example file to .env

```bash
    cp .env.example .env
```

Update the .env file with your database configuration. For local development, you can use SQLite or PostgreSQL.

### Generate the Application Key
Run the following command to generate the application key:

```bash
    php artisan key:generate
```

### Run Database Migrations
If you’re using SQLite, make sure the database/database.sqlite file exists. You can create it manually or run the following command to create it and apply migrations:

```bash
    php artisan migrate
```

This will create the necessary tables for the app.

### Start the Backend Server
You can use the built-in PHP server to run the Laravel backend

```bash
    php artisan serve
```

This will start the server at http://127.0.0.1:8000.

## Usage
Once both the frontend and backend are running, open the frontend in your browser (http://127.0.0.1:8000). You should be able to create an account, log in, and manage tasks and projects.

## Contributing
Feel free to fork this repository and submit pull requests with any improvements or bug fixes. If you find any issues, please create a new issue in the GitHub repository.

## License
This project is licensed under the MIT License.




