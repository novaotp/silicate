# Single Memo

## Why not +page.svelte

Contains the feature for the single memo page.

This is done (instead of having a proper +page.svelte) because I'd like to have a transition when selecting a memo.

However, the view transitions API isn't supported everywhere, so I can't
use that.

## Why separate mobile and desktop

The outside of the editor is very different, that's why they are separated.
However, the internal editor is the same, so there is a common component.
