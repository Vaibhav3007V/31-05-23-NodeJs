# 31-05-23-NodeJs
This has Tambola random number generation API and login and register user API's along with JWT Token security.

## Features
1. User can sign up
2. User can sign in

## API endpoints

1. `POST /api/auth/signup`: Creates a new user
2. `POST /api/auth/signin`: Logs in a user
3. `Post /api/auth/tambolaCreate`: Creates 6 tickets along with the token provided in the authorization header.
4. `Post /api/auth/tambolaFetch` : Shows 6 tickets attached with the token provided in the authorization header.
## Body Payload Specification
Signup expects

js
{
    firstname: string,
    lastname: string,
    email: string,
    password: string
}


Signin expects

js
{
    email: string,
    password: string
}

TambolaCreate expects

Authorization Header
{
Bearer : Token key
}

TambolaFetch expects

Authorization Header
{
Bearer : Token key
}

## Tools
* NodeJS/Express: Server
* MySQL: Storage
* JWT: Token based authentication
* bcryptjs: Password security
* winston/morgan: Logs
* Joi: Validations
