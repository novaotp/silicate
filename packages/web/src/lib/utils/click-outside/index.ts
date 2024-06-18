import type { Action } from 'svelte/action';

interface ClickOutsideParams {
    /** An array of elements that, if clicked, won't trigger the event. */
    avoid: HTMLElement[];
}

/**
 * Fires an `emit` event if a click was fired from outside of the node.
 * @param node The node on which the action was to attached, automatically supplied.
 * @param params Additional properties.
 */
export const clickOutside: Action<HTMLElement, ClickOutsideParams | undefined, { 'on:emit': (e: CustomEvent<HTMLElement>) => void }> = (
    node,
    params = { avoid: [] }
) => {
    const handleClick = (event: MouseEvent) => {
        /* @ts-expect-error event.target works */
        if (node && !node.contains(event.currentTarget) && !event.defaultPrevented && (params.avoid.length === 0 || !params.avoid.find((el) => el === event.currentTarget))) {
            node.dispatchEvent(new CustomEvent('emit', { detail: node }));
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
};
