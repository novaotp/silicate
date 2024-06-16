/**
 * @typedef {object} Dataset
 * @property {any[][]} grid
 * @property {Date[][]} days
 * @property {string[][]} months
 * @property {number[][]} years
 * @property {number[]} selectionMark
 * @property {number} todayMark
 * @property {number} prevTo
 * @property {number} nextFrom
 *
 * @typedef {import("../i18n").i18nType} i18nType
 */
/**
 * Compute view grid content based on given 'currentView' property
 *
 * @param {Date} currentDate
 * @param {Date[]} selectedDates
 * @param {number} view
 * @param {i18nType} locale
 * @param {number} weekStart
 * @returns {Dataset}
 */
export function compute(currentDate: Date, selectedDates: Date[], view: number, locale: i18nType, weekStart: number): Dataset;
export type Dataset = {
    grid: any[][];
    days: Date[][];
    months: string[][];
    years: number[][];
    selectionMark: number[];
    todayMark: number;
    prevTo: number;
    nextFrom: number;
};
export type i18nType = import("../i18n").i18nType;
