# Employee Management CLI

## Description
This is a command-line interface (CLI) application for managing employees, departments, and roles in a company database. The application allows users to view, add, and update employee records using an interactive menu.

## Features
- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update an employee's role
- Connects to a PostgreSQL database

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/)

## Installation
1. Clone the repository:
   git clone <repository_url>
2. Navigate to the project directory:
   cd employee-management-cli
3. Install dependencies:
   npm install
4. Login to postgreSQL
    psql -U postgres

## Database Setup
2. Import the schema:
   \i ./src/db/schema.sql
3. Seed the database with initial data:
   \i ./src/db/seeds.sql
4. Configure environment variables in a `.env` file:
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=employees_db
   DB_PASSWORD=your_password
   DB_PORT=5432

## Usage
Run the application using:
    npm start
Follow the on-screen prompts to interact with the database.
Here is a video demonstration of the application: https://drive.google.com/file/d/1-5iy4k8lY0a6JyE28rC_VMdG1KRE2woY/view?usp=sharing

## Dependencies
- [inquirer](https://www.npmjs.com/package/inquirer)
- [pg](https://www.npmjs.com/package/pg)
- [dotenv](https://www.npmjs.com/package/dotenv)

## License
This project is licensed under the MIT License.

## Acknowledgements
University of Denver Coding Boot Camp educational team for providing foundational code and design elements as part of the course curriculum.​
GitHub Pages for hosting the project.

