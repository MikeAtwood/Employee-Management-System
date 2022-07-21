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
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});
//-------- Start Prompt --------//
const startPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choices",
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
            if (choices === "Add Role") {
                addRole();
            }
            if (choices === "View All Departments") {
                viewDepartments();
            }
            if (choices === "Add Department") {
                addDepartment();

            };
        });
};

//-------- View All Employees -------//
function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

//-------- Add Employee -------//
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })

  })
}


//-------- Update Employee -------//
function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function (err, res) {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                name: "lastName",
                type: "list",
                choices: function () {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name? ",
            },
            {
                name: "role",
                type: "list",
                message: "What is the Employees new title? ",
                choices: selectRole()
            },
        ]).then(function (val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?",
                {
                    last_name: val.lastName

                },
                {
                    role_id: roleId

                },
                function (err) {
                    if (err) throw err
                    console.table(val)
                    startPrompt()
                })

        });
    });

}

//-------- Add Role -------//
function addRole() {
    connection.query("SELECT role.title AS titlem role.salary AS salary FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: 'Title',
                type: 'input',
                message: 'What is the title of this role?'
            },
            {
                name: 'Salary',
                type: 'input',
                message: 'What is the salary of this role?'
            }
        ]).then(function (res) {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                function (err) {
                    if (err) throw err;
                    console.table(res);
                    startPrompt();
                }
            )
        });
    });
}


//-------- View All Departments -------//
function viewDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
  }


//-------- Add Department -------//

function addDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What Department would you like to add?'
        }
    ]).then(function (res) {
        var query = connection.query(
            'INSERT INTO department SET ?',
            {
                name: res.name
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                startPrompt();
            }
        )
    })
}