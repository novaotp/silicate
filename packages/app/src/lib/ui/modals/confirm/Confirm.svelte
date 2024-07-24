<script lang="ts">
    import { cn } from '$utils/cn';
    import Card from '../../layout/card/Card.svelte';
</script>

<!--
@component
A card that presents two actions to the user, waiting for an input.

On button click, executes the chosen button's actions.

Usage :

    ```svelte
    <Confirm.Root>
        <Confirm.Title>Delete my account</Confirm.Title>
        <Confirm.Description>
            This action is irreversible. Are you sure you want to continue ?
        </Confirm.Description>
        <Confirm.Actions>
            <Confirm.No>
                <Button.Danger variant="secondary">Cancel</Button.Danger>
            </Confirm.No>
            <Confirm.Yes>
                <Button.Danger variant="primary">Continue</Button.Danger>
            </Confirm.Yes>
        </Confirm.Actions>
    </Confirm.Root>
    ```
-->

<Card class={cn('flex flex-col gap-5 max-w-lg sm:max-w-[480px] p-6 rounded-none sm:rounded-lg', $$restProps['class'])}>
    <slot />
</Card>
