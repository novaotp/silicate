# Silicate Project

A simple solution for school life management  

### Features

- Creating gradebooks
- Having conversations with friends or teachers
- Creating notes

### Languages

- French
- English
- German
- Italian


## Getting Started

Run the configure.ps1 or configure.sh script to configure the dependencies

Open two terminals simultaneously  

On the first type :  
`cd frontend && npm run dev`  

And on the second type :  
`cd backend/api && npm start`  

> Note : you can also run the run files (.ps1 or .sh) within your two terminals

## API Calls

> If someday one wants to call an API, one can

### Routes

#### `/auth` (don't need a token)

- `/auth/login` gives you a JWT if the user exists in the DB
- `/auth/signup` create a new user in the DB and gives you a JWT
- `/auth/verifytoken` verify the JWT and gives you the payload

#### `/friends` (need a token)

- `/friends/add` create a new friendship between two users
- `/friends/remove` remove a friendship between two users

## Autors

#### Backend Developers

- ENDERastronaute

#### Frontend Developers

- NovaOTP
