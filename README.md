# Express Project Setup

This guide helps you set up the environment variables for your Express project before starting the application.

## Prerequisites

Ensure you have the following:

- **Node.js** installed (check by running `node -v`).
- **npm** or **yarn** installed.

## Step-by-Step Setup

### 1. **Create the `.env` file**

At the root of your project, create a `.env` file if it doesn't already exist. This file will store your environment variables.

You can create the file using:

```bash
touch .env

SECRET_KEY=your-secret-key-here
MYSQL_USERNAME=your-mysql-username-here
MYSQL_PASSWORD=your-mysql-password-here
MYSQL_HOST=your-mysql-host-here
MYSQL_DB=your_db_name
PORT=3000