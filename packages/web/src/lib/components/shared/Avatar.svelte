<script lang="ts">
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import type { User } from '$libs/models/User';

    export let initialsClass: string = "";

    const user = getContext<Writable<User>>('user');
    const bgColor = getRandomColor();

    let initials: string;
    $: initials = getInitials($user);

    const getInitials = (user: User) => {
        const fullName = `${user.firstName} ${$user.lastName}`;

        return fullName
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase();
    };

    function getRandomColor() {
        const letters = '0123456789ABCDEF';

        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
    }
</script>

<div
    class="relative flex text-xl justify-center items-center rounded-full overflow-hidden
           shadow-[inset_0_0_4px_4px_rgba(0,0,0,0.1)] {$$restProps["class"] || ''}"
    style="background-color: {$user.avatar ? "white" : bgColor};"
>
    {#if $user.avatar}
        <img src={$user.avatar} alt="Avatar de {$user.firstName} {$user.lastName}" class="relative w-full h-full object-cover" />
    {:else}
        <span class="text-white font-semibold uppercase {initialsClass}">{initials}</span>
    {/if}
</div>
