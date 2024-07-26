<script lang="ts">
	import type { User } from '$common/models/user';

    export let user: User;
    /** The size of the initials in pixels. */
    export let textSize: number = 16;

    $: bgColor = stringToColor(user.email);
    $: initials = getInitials(user);

    const getInitials = (user: User) => {
        const fullName = `${user.firstName} ${user.lastName}`;

        return fullName
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase();
    };

    // A deterministic approach to the background color
    function stringToColor(str: string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            // Shifts the hash value to the left by 5 bits
            // Equivalent to multiplying by 32 (2^5) 
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';
        for (let i = 0; i < 3; i++) {
            // hash >> (i * 8) : Shifts the hash value to the right by i bits
            // & OxFF : bitwise operation to get last 8 bits -> 0 to 255 value
            // This ensures that each rgb part stays between 0 and 255
            // Then convert to hex
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).slice(-2);
        }

        return color;
    }
</script>

<div
    class="relative flex text-xl justify-center items-center rounded-full overflow-hidden
           shadow-[inset_0_0_4px_4px_rgba(0,0,0,0.1)] {$$restProps["class"] || ''}"
    style="background-color: {user.avatar ? "white" : bgColor};"
>
    {#if user.avatar}
        <img src={user.avatar} alt="Avatar de {user.firstName} {user.lastName}" class="relative w-full h-full object-cover" />
    {:else}
        <span style="font-size: {textSize}px;" class="text-white font-semibold uppercase">{initials}</span>
    {/if}
</div>
