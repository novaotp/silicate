# Server

This sub-project contains the code for the server.

## Development

## Prerequisites

1. Install `pm2` globally

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

3. Create the database using the same name as `DB_NAME` in PostgreSQL and run the sql script inside `src/database`.

4. Run the application.

> This command uses `pm2` to manage the processes.  
> To stop the `pm2` process for the server, run `npm run dev:kill`.
> To monitor the server, run `npm run dev:monitor` in a separate terminal.

```bash
npm run dev
```
