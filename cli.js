#!/usr/bin/env node

import inquirer from 'inquirer';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 
const { Pool } = pkg;

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'your_database',
    port: Number(process.env.DB_PORT) || 5432,
};


const pool = new Pool(dbConfig);

const main = async () => {
    await pool.connect();
    console.log("Connected to the PostgreSQL database.");

    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit',
            ],
        });

        switch (action) {
            case 'View all departments':
                await viewDepartments();
                break;
            case 'View all roles':
                await viewRoles();
                break;
            case 'View all employees':
                await viewEmployees();
                break;
            case 'Add a department':
                await addDepartment();
                break;
            case 'Add a role':
                await addRole();
                break;
            case 'Add an employee':
                await addEmployee();
                break;
            case 'Update an employee role':
                await updateEmployeeRole();
                break;
            case 'Quit':
                console.log('Goodbye!');
                process.exit(0); 
        }
    }
};

// Function to view departments
const viewDepartments = async () => {
    const result = await pool.query('SELECT * FROM department');
    console.table(result.rows);
    return;
};

// Function to view roles
const viewRoles = async () => {
    const result = await pool.query('SELECT * FROM role');
    console.table(result.rows);
    return;
};

// Function to view employees
const viewEmployees = async () => {
    const result = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, e.manager_id
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
    `);
    console.table(result.rows);
    return;
};

// Function to add a department
const addDepartment = async () => {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the department name:',
    });

    const result = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING id', [name]);
    
    const newDepartmentId = result.rows[0].id;
    console.log(`Department "${name}" added successfully with ID: ${newDepartmentId}`);
    return;
};

// Function to add a role
const addRole = async () => {
    const departments = await pool.query('SELECT id, name FROM department');

    if (departments.rows.length === 0) {
        console.log("No departments found. Please add a department first.");
        return;
    }

    const { title, salary, department_id } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'input', name: 'salary', message: 'Enter role salary:' },
        { type: 'list', name: 'department_id', message: 'Select a department:',
            choices: departments.rows.map((dept) => ({
                name: `${dept.name} (ID: ${dept.id})`,
                value: dept.id
            })),
        }, 
    ]);
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
        [title, salary, department_id]);

    console.log(`Role "${title}" added successfully in department ID: ${department_id}`);
    return;
};

// Function to add an employee
const addEmployee = async () => {
    const roleChoices = (await pool.query('SELECT id, title FROM role')).rows.map((role) => ({
        name: `${role.title} (ID: ${role.id})`,
        value: role.id
    }));

    const managerChoices = (await pool.query('SELECT id, first_name, last_name FROM employee')).rows.map((emp) => ({
        name: `${emp.first_name} ${emp.last_name} (ID: ${emp.id})`,
        value: emp.id
    }));

    managerChoices.unshift({ name: 'None (NULL)', value: null });

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter first name:' },
        { type: 'input', name: 'last_name', message: 'Enter last name:' },
        { type: 'list', name: 'role_id', message: 'Select role:', choices: roleChoices },
        { type: 'list', name: 'manager_id', message: 'Select Manager (or NULL):', choices: managerChoices },
    ]);

    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
        [first_name, last_name, role_id, manager_id]);

    console.log(`Employee "${first_name} ${last_name}" added successfully!`);
    return;
};

// Function to update an employee role
const updateEmployeeRole = async () => {
    const employees = await pool.query('SELECT id, first_name, last_name FROM employee');
    const roles = await pool.query('SELECT id, title FROM role');

    const { employee_id, new_role_id } = await inquirer.prompt([
        { type: 'list', name: 'employee_id', message: 'Select employee to update:',
            choices: employees.rows.map(emp => ({
                name: `${emp.first_name} ${emp.last_name} (ID: ${emp.id})`,
                value: emp.id
            }))
        },
        { type: 'list', name: 'new_role_id', message: 'Select new role:',
            choices: roles.rows.map(role => ({
                name: `${role.title} (ID: ${role.id})`,
                value: role.id
            }))
        }
    ]);

    // Update role
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);

    console.log(`Employee ID "${employee_id}" updated successfully!`);
};

// Start the application
main().catch((err) => console.error(err));
