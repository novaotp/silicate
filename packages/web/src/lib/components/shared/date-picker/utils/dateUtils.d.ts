/** @typedef {import("../i18n").i18nType} i18nType */
/**
 *
 * @param {Date|string} date
 * @param {string} format
 * @param {i18nType} i18n
 * @param {string} type
 * @returns {Date}
 */
export function parseDate(date: Date | string, format: string, i18n: i18nType, type: string): Date;
/**
 * @param {Date} date
 * @param {string} format
 * @param {i18nType} i18n
 * @param {string} type
 * @returns {string} date' string representation
 */
export function formatDate(date: Date, format: string, i18n: i18nType, type: string): string;
/**
 * @param {number} year
 * @param {number} month
 * @returns {number}
 */
export function getDaysInMonth(year: number, month: number): number;
/**
 * Date comparison a < b
 *
 * @param {Date|string} a
 * @param {Date} b
 * @returns
 */
export function isLower(a: Date | string, b: Date): boolean;
/**
 * Date comparison a > b
 *
 * @param {Date|string} a
 * @param {Date} b
 * @returns
 */
export function isGreater(a: Date | string, b: Date): boolean;
export type i18nType = import("../i18n").i18nType;
export type MapperFunction = (d: Date, v: number) => any;
export type SetterMap = Record<string, MapperFunction>;
