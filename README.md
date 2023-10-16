# Silicate Project

A simple solution for managing school life easily.

## Features

- [x] Create gradebooks
- [x] Create personal notes
- [ ] Have conversations with friends or teachers
- [ ] Have your personal agenda
- [ ] An online community-driven resource library

## Supported Languages

- [x] French
- [ ] English
- [ ] German
- [ ] Italian

## Development

### Getting Started

Run the configure.ps1 or configure.sh script to configure the dependencies.

```powershell
PS C:\path\to\directory> .\configure.ps1
```

OR

```bash
username@pc:~$ ./configure.sh
```

### Run the projects

Open two terminals simultaneously

```bash
cd frontend && npm run dev    # Frontend
cd backend/api && npm start   # Backend
```

> Note : you can also run the scripts/run files (.ps1 or .sh) within your two terminals

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

## Authors

- NovaOTP (Sajidur Rahman)
- ENDERastronaute (Leny Bressoud)
