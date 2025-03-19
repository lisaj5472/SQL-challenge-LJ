# Employee Management CLI

## Description

This command-line interface (CLI) application manages employees, departments, and roles within a company database. It provides an interactive menu to view, add, and update employee records efficiently.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- View all departments, roles, and employees.
- Add new departments, roles, and employees.
- Update an employee's role.
- Connects to a PostgreSQL database for data management.

## Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the repository.**
2. **Navigate to the project directory.**
3. **Install dependencies:**
   npm install
4. **Login to postgreSQL.**


## Database Setup
1. Import the schema:
   \i ./src/db/schema.sql
2. Seed the database with initial data:
   \i ./src/db/seeds.sql
3. Configure environment variables in a `.env` file:
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=employees_db
   DB_PASSWORD=your_password
   DB_PORT=5432

## Usage
Run the application using:
    npm start
Follow the on-screen prompts to interact with the database.
For a video demonstration of the application, visit:  https://drive.google.com/file/d/1-5iy4k8lY0a6JyE28rC_VMdG1KRE2woY/view?usp=sharing

## Dependencies
- [inquirer](https://www.npmjs.com/package/inquirer): For interactive CLI prompts.
- [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv): For managing environment variables.

## Contributing
This project was developed as part of an educational program, and contributions are not expected. However, if you have suggestions or improvements, please feel free to fork the repository and submit a pull request.​

## License
This project is licensed under the MIT License.

## Acknowledgements
University of Denver Coding Boot Camp educational team for providing foundational code and design elements as part of the course curriculum.​
GitHub Pages for hosting the project.

