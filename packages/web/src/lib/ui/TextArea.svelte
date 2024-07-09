<script lang="ts">
    import { cn } from "$utils/cn";
    import type { HTMLTextareaAttributes } from "svelte/elements";

    type FormTextAreaEvent<T extends Event = Event> = T & {
        currentTarget: EventTarget & HTMLTextAreaElement;
    };

    type $$Props = HTMLTextareaAttributes;
	type $$Events = {
        blur: FormTextAreaEvent<FocusEvent>;
        change: FormTextAreaEvent<Event>;
        click: FormTextAreaEvent<MouseEvent>;
        focus: FormTextAreaEvent<FocusEvent>;
        focusin: FormTextAreaEvent<FocusEvent>;
        focusout: FormTextAreaEvent<FocusEvent>;
        keydown: FormTextAreaEvent<KeyboardEvent>;
        keypress: FormTextAreaEvent<KeyboardEvent>;
        keyup: FormTextAreaEvent<KeyboardEvent>;
        mouseover: FormTextAreaEvent<MouseEvent>;
        mouseenter: FormTextAreaEvent<MouseEvent>;
        mouseleave: FormTextAreaEvent<MouseEvent>;
        mousemove: FormTextAreaEvent<MouseEvent>;
        paste: FormTextAreaEvent<ClipboardEvent>;
        input: FormTextAreaEvent<InputEvent>;
        wheel: FormTextAreaEvent<WheelEvent>;
    };


	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export { className as class };
</script>

<textarea
    class={cn("relative w-full bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-50 rounded-lg p-5 h-[150px] text-sm resize-none", className)}
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
