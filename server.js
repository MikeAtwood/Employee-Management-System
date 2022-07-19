const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//-------- Connection to Database --------//
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Deadpool1',
    database: 'employee'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected as ID' + connection.threadId);
    startPrompt();
});

//-------- Start Prompt --------//
const startPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "Add Role",
                "View All Departments",
                "Add Department"
            ]
        }
    ])
    .then((answers) => {
    const { choices } = answers;
        if (choices === "View All Employees") {
            viewEmployees();
        }
        if (choices === "Add Employee") {
            addEmployee();
        }
        if (choices === "Update Employee") {
            updateEmployee();
        }
        if (choice === "Add Role") {
            addRole();
        }
        if (choice === "View All Departments") {
            viewDepartments();
        }
        if (choice === "Add Department") {
            addDepartment();
        
        };
    });
};

//-------- View All Employees -------//
viewEmployees = () => {
    console.log("View All Employees...");
    const sql = `SELECT employee.id,
                    employee.first_name,
                    employee.last_name,
                    role.title,
                    role.salary,
                    department.name AS department,
                    manager.first_name, manager.last_name AS manager
                    FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startPrompt();
    });
};


//-------- Add Employee -------//



//-------- Update Employee -------//


//-------- Add Role -------//



//-------- View All Departments -------//
viewDepartments = () => {}




//-------- Add Department -------//