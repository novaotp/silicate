/**
 * @typedef {object} ValueInit
 * @property {string[]} valueArray
 * @property {string[]} prevValue
 * @property {Date[]} innerDates
 */
/**
 * Init internal props
 *
 * @param {string|string[]|null} value
 * @param {Date|Date[]|null} initialDate
 * @param {string} format
 * @param {import("../i18n").i18nType} i18n
 * @param {string} formatType
 * @returns {ValueInit}
 */
export function initProps(value: string | string[] | null, initialDate: Date | Date[] | null, format: string, i18n: import("../i18n").i18nType, formatType: string): ValueInit;
/**
 * FUTURE: test that this works for PHP format type as well
 *
 * @param {'auto'|'date'|'datetime'|'time'} mode
 * @param {string} format
 * @returns {'auto'|'date'|'datetime'|'time'}
 */
export function computeResolvedMode(mode: 'auto' | 'date' | 'datetime' | 'time', format: string): 'auto' | 'date' | 'datetime' | 'time';
export type ValueInit = {
    valueArray: string[];
    prevValue: string[];
    innerDates: Date[];
};
