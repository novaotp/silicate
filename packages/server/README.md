# Server

This sub-project contains the code for the server.

It includes :
* The API endpoints
* The documentation for the API
* A socket connection for real-time features

## Development

### Prerequisites

1. Install `pm2` globally to manage processes (requires root access so must be global).

```bash
npm install -g pm2@latest
```

### Getting Started

1. Install the dependencies.

```bash
npm install
```

2. Create the `.env` file from the `.env.example` file.

> You can generate the JWT secret via `npm run generate:jwt`.

3. Run the application.

> This command uses `pm2` to manage the processes.

```bash
npm run dev
```

> To stop the `pm2` process for the server, run `npm run dev:kill` or `pm2 kill --name app` from outside the directory.  

4. Monitor the server (optional but recommended) in a separate terminal.

```bash
npm run dev:monitor
```

## Project Structure

1. `api` contains the documentation for the server's API.
2. `prisma` contains the schemas and migrations for the prisma ORM.
3. `public` contains the public files or user-uploaded content inside `uploads`.
4. `src` contains the source code for the server.
