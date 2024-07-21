import type { Action } from 'svelte/action';

interface ClickOutsideParams {
    /**
     * An array of elements that, if clicked, won't trigger the event.
     * @description Make sure to set `pointer-events: none` on the `avoid`'s elements' children to correctly identify the click was hit on the parent node.
     */
    avoid?: HTMLElement[];
}

/**
 * Fires an `emit` event if a click was fired from outside of the node.
 * @param node The node on which the action was attached, automatically supplied.
 * @param params Additional properties.
 * @description Make sure to set `pointer-events: none` on the node's children to correctly identify the click was hit on the node.
 */
export const clickOutside: Action<HTMLElement, ClickOutsideParams | undefined, { 'on:emit': (event: CustomEvent<HTMLElement>) => void }> = (
    node,
    params = { avoid: [] }
) => {
    const avoidElements = params.avoid ?? [];

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();

        try {
            const target = event.target as Node;

            if (!node) return;
            if (node.contains(target)) return;
            if (avoidElements.some((element) => element.contains(target))) return;

            node.dispatchEvent(new CustomEvent('emit', { detail: node }));
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

    document.addEventListener('click', handleClick);

    return {
        update(newParams: ClickOutsideParams | undefined) {
            params = newParams;
        },
        destroy() {
            document.removeEventListener('click', handleClick);
        }
    };
};
