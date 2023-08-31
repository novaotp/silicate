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

Open two terminals simultaneously  

On the first type  
`cd frontend && npm run dev`  

And on the second type  
`cd backend/api && npm start`  

> Note : you can also run the .ps1 files within your two terminals

## API Calls

> If someday one wants to call an API, one can

### Routes

- `/auth/login` gives you a JWT if the user exists in the DB
- `/auth/signup` create a new user in the DB and gives you a JWT
- `/auth/verifytoken` verify the JWT and gives you the payload
- `/auth/friends` don't act like you have any, ***but you can still call someone like your teacher :skull:***

## Autors

#### Backend Developers

- ENDERastronaute

#### Frontend Developers

- NovaOTP