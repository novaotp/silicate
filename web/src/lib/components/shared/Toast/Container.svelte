<script lang="ts">
    import Toast from './Toast.svelte';
    import { dismissToast, toasts } from '$lib/stores/toast';
</script>

{#if $toasts}
    <section class="fixed bottom-5 right-5 w-[calc(100%-40px)] md:max-w-[300px] flex flex-col justify-center gap-2 z-[1000]">
        {#each $toasts as toast (toast.id)}
            <Toast type={toast.type} on:dismiss={() => dismissToast(toast.id)}>
                {toast.message}
            </Toast>
        {/each}
    </section>
{/if}
