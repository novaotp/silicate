/**
 *
 * @typedef {object} ScaleParams
 * @property {number} duration
 * @property {number} start
 * @property {number} opacity
 * @property {number|undefined} end
 *
 * @param {HTMLElement} node
 * @param {ScaleParams | import('svelte/transition').FadeParams} params
 * @returns {import('svelte/transition').TransitionConfig}
 */
export function scale(node: HTMLElement, { duration, start, end, opacity }: ScaleParams | import('svelte/transition').FadeParams): import('svelte/transition').TransitionConfig;
export type ScaleParams = {
    duration: number;
    start: number;
    opacity: number;
    end: number | undefined;
};
