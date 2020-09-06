[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

# Sample CRUD Application with Node and React.

 Sample Comprehensive React CRUD Application with Axios and Web API as Client and Node.js Rest with Express, Sequelize, MySQL and Server Side Token Based Authentication and Authorization.  

## Getting Started
These instructions will provide you with a copy of the project that will be launched on your local computer for development and testing.

## Prerequisites
What things you need to install the software.

- Git.
- NPM.
- XAMPP (or another local server).
- IDE (or code editor)


## Install
Clone the git repository on your computer
```
$ git clone https://github.com/alavir-ua/tutorials-app.git
```
You can also download the entire repository as a zip file and unpack in on your computer if you do not have git

After cloning the application, you need to install it's dependencies.
```
$ npm install && cd client && npm install
```

## Set environment keys
When you finish the installation, rename the .env.example file in the root directory of your project to .env and fill it with the variables of your local development environment.

## MySQL database recovery 
You have two options for restoring your local MySQL database:
1. Using the tutorialsapp.sql file in the root directory of your project.
2. Run the command in the terminal:
```
$ npm run seeder
```

## Run the application
```
$ npm run start
```
After that, open the browser at http://localhost:3000/ to view the result.

The authentication and authorization system can be tested with the following access data:
```
 Admin  111111
 Author 222222
 User   333333
```
## Links
[Live Demo](https://tutorials-app.herokuapp.com/)
