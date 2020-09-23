const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const path = require('path');
const { title } = require("process");
//const util = require("util");

//const writeFileAsync = util.promisify(fs.writeFile);

//---Array of questions for user
const questions = [
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title"
    },
    {
        type: "input",
        message: "Provide a detail description your project.",
        name: "description"
    },
    {
        type: "input",
        message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
        name: "installation"
    },
    {
        type: "input",
        message: "Provide instructions and examples for use. Include screenshots as needed.",
        name: "usage"
    },
    {
        type: "input",
        message: "Provide the name of license being used. ",
        name: "licenseName"
    },
    {
        type: "input",
        message: "Provide the url of the license being used. ",
        name: "licenseUrl"
    },
    {
        type: "input",
        message: "If any, provide the GitHub username(s) for any additonal contributors(If there are mulitple contributors, seperate names with a comma and no space!).",
        name: "contributors"
    },
    {
        type: "input",
        message: "Provide examples on how to run tests.",
        name: "tests"
    },
    {
        type: "input",
        message: "Provide any questions you want to add.",
        name: "questions"
    },
];

//---Function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data)
}

//---Function to initialize program
function init() {
    inquirer.prompt(questions)
    .then(function(response){
        let markDown = `# ${response.title} 
        ## Description
        ${response.description}
        \n* [Installation](#Installation)
        \n* [Instructions](#Instructions)
        \n* [Usage](#Usage)
        \n* [Contributors](#Contributors)
        \n* [Tests](#Tests)
        \n* [Questions](#Questions)
        \n* [License](#License)`
        writeToFile("ReadMe.md", markDown)
    })

}

//---Function call to initialize program
init();
