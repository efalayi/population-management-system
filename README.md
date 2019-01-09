[![Coverage Status](https://coveralls.io/repos/github/efalayi/population-management-system/badge.svg?branch=develop)](https://coveralls.io/github/efalayi/population-management-system?branch=develop)

# population-management-system
This is a population management system application with client and server side implementations

##### Features
- A user can create locations
- A user can create sub locations within a particular location

***
#### Technology
This application was developed purely with JavaScript using React Architecture,
NodeJs, and Express.

###### Dependencies
- [Babel](https://babeljs.io/)
- [React](https://facebook.github.io/react/)
- [React-dom](https://www.npmjs.com/package/react-dom)
- [Express](https://expressjs.com/)

***
#### Getting Started
- Clone the project from repository [https://github.com/efalayi/population-management-system](https://github.com/efalayi/population-management-system)
- In your terminal, change directory to the cloned folder and run `yarn install`. This installs all the app's dependencies.
- Create a `.env` file using the sample specified in [.env.sample](.env.sample)
- To start the app in production mode, set your `NODE_ENV` to `production` and run `yarn start`
- To start the app in development mode, set your `NODE_ENV` to `development` and run `yarn run start:dev`
- Point your browser to `localhost`, using the port defined in your `.env file`.
- Alternatively, you can access the app on [https://population-tracker-app.herokuapp.com/](https://population-tracker-app.herokuapp.com/)

#### Testing
Server modules were tested using Mocha

###### NPM Scripts
To make development easier, some NPM scripts were written:
- `yarn run test` runs test for server modules using Mocha
- `yarn run start:dev` runs app on local machine

***
##### License
[MIT](LICENSE.txt) © 2018 | [Esther Falayi](github.com/andela-efalayi/) | 
Andela, Nigeria