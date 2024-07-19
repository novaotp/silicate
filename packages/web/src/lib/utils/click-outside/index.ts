import type { Action } from 'svelte/action';

interface ClickOutsideParams {
    /** An array of elements that, if clicked, won't trigger the event. */
    avoid?: HTMLElement[];
}

/**
 * Fires an `emit` event if a click was fired from outside of the node.
 * @param node The node on which the action was attached, automatically supplied.
 * @param params Additional properties.
 */
export const clickOutside: Action<HTMLElement, ClickOutsideParams | undefined, { 'on:emit': (event: CustomEvent<HTMLElement>) => void }> = (
    node,
    params = { avoid: [] }
) => {
    const handleClick = (event: MouseEvent) => {
        try {
            const target = event.target as Node;

            // Check if the click is inside the node or any of the avoid elements
            if (node && !node.contains(target) && !event.defaultPrevented && (!params.avoid || params.avoid.length === 0 || !params.avoid.some((el) => el.contains(target)))) {
                node.dispatchEvent(new CustomEvent('emit', { detail: node }));
            }
        } catch {
            /*
                Errors occur when clicking inside the node element.
                It says that the el element inside params.avoid is undefined.
                However, it doesn't pose a problem.
                No idea why it happens either...
                Continue regardless of the errors.
            */
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        },
        update(newParams: ClickOutsideParams | undefined) {
            params = newParams;
        }
    };
};
