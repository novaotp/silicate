## More info

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
