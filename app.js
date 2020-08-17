const Manager = require("./lib/Manager.js")
const Engineer = require("./lib/Engineer.js")
const Employee = require("./lib/Employee.js") 
const Intern = require("./lib/Intern.js")
const { prompt } = require("inquirer")
const path = require("path")
const fs = require("fs")

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

const render = require("./lib/htmlRenderer")
const inquirer = require("inquirer")

let employees = []

const buildIntern = employee => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'school',
            message: 'What is your school?'
        }
    ])
        .then(({ school }) => {
            employees.push(new Intern(employee.name, employee.id, employee.email, school))
            subMenu()
        })
        .catch(err => console.log(err))
}

const buildManager = employee => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your office number?'
        }
    ])
        .then(({ officeNumber }) => {
            employees.push(new Manager(employee.name, employee.id, employee.email, officeNumber))
            subMenu()
        })
        .catch(err => console.log(err))
}


const buildEngineer = employee => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'github',
            message: 'What is your github?'
        }
    ])
        .then(({ github }) => {
            employees.push(new Engineer(employee.name, employee.id, employee.email, github))
            subMenu()
        })
        .catch(err => console.log(err))
}

const subMenu = () => {
    inquirer
    .prompt({
      type: 'list',
      name: 'action',
      choices: ['Make Another Employee', 'Be Done'],
      message: 'What would you like to do now?'
    })
      .then(({ action }) => {
        switch (action) {
          case 'Make Another Employee':
            buildEmployee()
            break
          case 'Be Done':
              console.log(employees)
              const html = []
            fs.writeFileSync(outputPath, render(employees), html)
            break
        }
      })
      .catch(err => console.log(err))
  }


const buildEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What is role?',
            choices: ['Manager','Engineer','Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your id?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?'
        }
    ])
        .then(employee => {
            switch (employee.role) {
                case 'Employee':
                    employees.push(new Employee(employee.name, employee.id, employee.email))
                    subMenu(employee)
                    break
                case 'Manager':
                    buildManager(employee)
                    break
                case 'Engineer':
                    buildEngineer(employee)
                    break
                case 'Intern':
                    buildIntern(employee)
                    break
            }

        })
        .catch(err => console.log(err))
}

buildEmployee()


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
