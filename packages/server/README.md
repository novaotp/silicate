# Server

This sub-project contains the code for the api of Silicate.

## Development

### Getting Started

1. Install the dependencies.

```bash
npm install
```

2. Create the `.env` file from the `.env.example` file. Define a port for the backend that you will use in the frontend. Set the frontend port corresponding to the actual port.

3. Create the database using the same name as `DB_NAME` in PostgreSQL and run the sql script inside `src/database`.

4. Run the application.

```bash
npm run dev
```
