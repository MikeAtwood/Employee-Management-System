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
            message: "What would you like to do",
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

//-------- Show All Departments -------//
