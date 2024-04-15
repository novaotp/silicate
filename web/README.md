# Web

This sub-project contains the code for the frontend of Silicate.

## Development

### Getting Started

1. Install the dependencies.

    ```bash
    npm install
    ```

2. Create the `.env` file from the `.env.example` file. Use the port that you set in the backend.

3. Run the application.

    ````bash
    npm run dev
    ```

### More info

In the `svelty-picker` library, the component (default export) has a value that you can bind to. However, when the value is cleared, the internal value is actually `null`.

Although the type definition doesn't provide support for `null` but rather `undefined`, the component works correctly (note: when cleared, `undefined` defaults to the current date at midnight).

To fix the issue, head over to the type definition and add a null type to the value.

It should now be :

```ts
export default class SveltyPicker extends SvelteComponentTyped<{
    ...
    value?: string | string[] | null;
    ...
}> {}
```
