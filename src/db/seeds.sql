INSERT INTO department (name) VALUES 
    ('Engineering'),
    ('Marketing'),
    ('Sales'),
    ('Human Resources');

-- Insert Roles
INSERT INTO role (title, salary, department_id) VALUES 
    ('Software Engineer', 90000, 1),
    ('Marketing Manager', 80000, 2),
    ('Sales Associate', 70000, 3),
    ('HR Specialist', 75000, 4),
    ('Product Manager', 95000, 1),
    ('Customer Support Rep', 60000, 3);

-- Insert Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
    ('Alice', 'Johnson', 1, NULL),
    ('Bob', 'Smith', 2, NULL),
    ('Charlie', 'Brown', 3, NULL),
    ('Dana', 'White', 4, NULL),
    ('Eve', 'Miller', 5, 1),
    ('Frank', 'Thomas', 6, 3);
