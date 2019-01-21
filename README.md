[![Build Status](https://travis-ci.org/ipheghe/SMS-API.svg?branch=develop)](https://travis-ci.org/ipheghe/SMS-API) [![Coverage Status](https://coveralls.io/repos/github/ipheghe/SMS-API/badge.svg)](https://coveralls.io/github/ipheghe/SMS-API)
# SMS-API
SMS management API is a RESTful messaging platform that allows registered contacts to send and receive messages.

## Table of Contents
- [Application Features](#application-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [API Documentation](#api-documentation)
- [Running the tests](#running-the-tests)
- [Contributing to the Project](#contributing-to-the-Project)
- [FAQ](#faq)

# Application Features
* Unauthenticated users can create contact on the application
* Authenticated users can update contact details
* Authenticated users can delete contact
* Unauthenticated users can view all contacts
* Authenticated users can view a single contact
* Authenticated users can send SMS
* Authenticated users can delete sent SMS
* Authenticated users can view all SMS
* Authenticated users can view all SMS he/she received
* Authenticated users can view all SMS he/she sent

# Technology Stack
* NodeJS
* Express
* Sequelize ORM
* Postgresql Relational Database

## Getting Started
Get the app running locally in the following way:
```
# Clone the Repo
git clone https://github.com/ipheghe/SMS-API.git

# Install all dependencies
yarn install

# Run Database migrations
sequelize db:migrate

# Run the application locally
> yarn run start:dev

# Open running application
> http:localhost:8000/
```
The server will now be running at `http://localhost:8000`
  
## API Documentation
Access Application API documentation through this link [Here](https://ovie-sms-api-staging.herokuapp.com/api-docs)

## Running the tests
The application uses the following libraries for testing:
-   Mochai/Chai and Supertest for backend testing
Instructions to test the application:
-   Run server-side test with `yarn test`

## Contributing to the Project
Contributions are welcome and appreciated. To contribute

-  Fork this repository [here](https://github.com/ipheghe/SMS-API)
-  Open a terminal and execute the following command to make a local copy
`$ git clone https://github.com/ipheghe/SMS-API.git`
-  Run this code to navigate into the folder `cd SMS-API`
-  Make your contributions to your local copy of the project
-  Run `git add` and `git commit` to commit your contributions to the project
-  Run `git push` to push your changes to your copy of the repository
-  If you feel you've made a contribution that will improve the project, raise a pull Request against the development branch.
- Be descriptive enough about your contributions so other contributors will understand what you've done
-  I look forward to your pull requests!

## FAQ
#### Is this an Open-Source Application?

    Yes it is, and contributing to the development of this
    application is by raising PRs
    

#### Who can contribute?

    Anyone!. This application is open to all those who want to
    contribute to open-source development and are willing to follow
    set standards for contributing.
    
#### What language was used to develop this application?

    This project was built with Javascript language
    
#### Can I clone this application for personal use?

    Yes!. This application is licensed under MIT, and is open for
    whatever you may choose to use it for.

## Credits

  Ovie Ipheghe, Andela Fellowship

## License
  This project is available for use and modification under the MIT License. See the LICENSE file for more details.

  


