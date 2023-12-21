# Silicate Project

A simple solution for managing school life easily.

## Features

-   [x] Create gradebooks
-   [x] Create personal notes
-   [ ] Have conversations with friends or teachers
-   [ ] Have your personal agenda
-   [ ] An online community-driven resource library

## Supported Languages

-   [x] French
-   [ ] English
-   [ ] German
-   [ ] Italian

## Development

### Getting Started

1. Clone the repository

```bash
git clone https://github.com/novaotp/silicate
```

2. Install the dependencies

```powershell
npm install
```

3. Run the project

```powershell
npm run dev
```

## API Calls

> If someday one wants to call an API, one can

### Routes

#### `/auth` (don't need a token)

-   `/auth/login` gives you a JWT if the user exists in the DB
-   `/auth/signup` create a new user in the DB and gives you a JWT
-   `/auth/verifytoken` verify the JWT and gives you the payload (including the user's id)

#### `/friends` (need a token)

-   `/friends/:friendId` with method `POST` creates a new friendship between two users
-   `/friends/:friendId` with method `DELETE` removes a friendship between two users

> The first user's id is stored as a JWT in the cookie `id`

## Authors

-   NovaOTP (Sajidur Rahman)
-   ENDERastronaute (Leny Bressoud)
