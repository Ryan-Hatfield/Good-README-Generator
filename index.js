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
        message: "Provide instructions and examples for use. ",
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
        message: "Provide the guidelines for contributing to this application.",
        name: "contributing"
    },
    {
        type: "input",
        message: "Provide examples on how to run tests.",
        name: "tests"
    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "questions"
    },
    {
        type: "input",
        message: "If any, provide the GitHub username(s) for any additonal contributors(If there are mulitple contributors, seperate names with a comma and no space!).",
        name: "contributors"
    },
];

//---Function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data)
}
//---Getting information for the author and contributers username by GitHub API



//---Function to initialize program
function init() {
    inquirer.prompt(questions)
    .then(function(response){
//--Getting the username information from the GitHub API
        /*var contributorUsernames = questions.contributors;
        var contributorUsernamesArray = contributorUsernames.split(",");
        for (i=0; i<contributorUsernamesArray.length; i++){
            var contributorGitUsername = contributorUsernamesArray[i]
            var contributorRes = axios.get(`https://api.github.com/users/${contributorGitUsername}`);
            var contributorUrl = contributorRes.data.html_url;
            var resultContributor = (`${contributorsGitUsername}  GitHubLink: ${contributorUrl}`);
            };*/
        const gitUsername = response.username;
        const queryUrl = `https://api.github.com/users/${gitUsername}`;
        axios.get(queryUrl).then(function(res) {
            const gitData = res.data;
            const gitName = gitData.login;
            const gitUrl = gitData.html_url;
            const gitPortfolio = gitData.blog;
        
        
            
//--Layout of the README file   
const markDown = `# ${response.title}
![GitHub](https://img.shields.io/github/license/ryan-Hatfield/Good-README-Generator) 
## Description
${response.description}
## Table of Contents
\n* [Installation](#Installation)
\n* [Usage](#Usage)
\n* [License](#License)
\n* [Contributing](#Contributing)
\n* [Tests](#Tests)
\n* [Questions](#Questions)
\n* [Contributors](#Contributors)
\n* [Author](#Author)

## Installation
${response.installation}
## Usage
${response.usage}
## Contributing
${response.contributing}
## Tests
${response.tests}
## Questions
${gitName}
\`\`\`
If you have any questions you can email me at: ${response.questions} .
\`\`\`
## Contributors
${response.contributors}
## Author
\nUsername **${gitName}**
\nGitHub: ${gitUrl}
\nPortfolio: ${gitPortfolio}
\`\`\`
## License
This application is licensed under the ${response.licenseName}
\`\`\`
You can view this license under the ${response.licenseUrl} file.`

writeToFile("ReadMe.md", markDown)
          });
})

};

//---Function call to initialize program
init();
