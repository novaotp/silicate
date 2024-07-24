<script lang="ts">
    import { cn } from "$utils/cn";
    import type { HTMLInputAttributes } from "svelte/elements";

    type FormInputEvent<T extends Event = Event> = T & {
        currentTarget: EventTarget & HTMLInputElement;
    };

    type $$Props = HTMLInputAttributes;
	type $$Events = {
        blur: FormInputEvent<FocusEvent>;
        change: FormInputEvent<Event>;
        click: FormInputEvent<MouseEvent>;
        focus: FormInputEvent<FocusEvent>;
        focusin: FormInputEvent<FocusEvent>;
        focusout: FormInputEvent<FocusEvent>;
        keydown: FormInputEvent<KeyboardEvent>;
        keypress: FormInputEvent<KeyboardEvent>;
        keyup: FormInputEvent<KeyboardEvent>;
        mouseover: FormInputEvent<MouseEvent>;
        mouseenter: FormInputEvent<MouseEvent>;
        mouseleave: FormInputEvent<MouseEvent>;
        mousemove: FormInputEvent<MouseEvent>;
        paste: FormInputEvent<ClipboardEvent>;
        input: FormInputEvent<InputEvent>;
        wheel: FormInputEvent<WheelEvent>;
    };

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export { className as class };
</script>

<input
    class={cn("relative w-full bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-50 rounded-lg px-5 h-[50px] text-sm", className)}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:focusin
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:paste
	on:input
	on:wheel|passive
	{...$$restProps}
/>
