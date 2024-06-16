/** @typedef {typeof __propDef.props}  CalendarProps */
/** @typedef {typeof __propDef.events}  CalendarEvents */
/** @typedef {typeof __propDef.slots}  CalendarSlots */
export default class Calendar extends SvelteComponentTyped<{
    wid: number;
    dates: Date[];
    i18n: import("../i18n").i18nType;
    additionalDisableFn: (arg0: Date) => boolean;
    startDate?: Date;
    endDate?: Date;
    weekStart?: number;
    initialView?: number;
    enableTimeToggle?: boolean;
    isRange?: boolean;
    hoverDate?: number;
    handleGridNav?: (key: string, shiftKey: boolean) => void;
}, {
    date: CustomEvent<any>;
    switch: CustomEvent<any>;
    internal_hoverUpdate: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get handleGridNav(): (key: string, shiftKey: boolean) => void;
}
export type CalendarProps = typeof __propDef.props;
export type CalendarEvents = typeof __propDef.events;
export type CalendarSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        wid: number;
        dates: Date[];
        i18n: import("../i18n").i18nType;
        additionalDisableFn: ((arg0: Date) => boolean) | null;
        startDate?: Date | null;
        endDate?: Date | null;
        weekStart?: number;
        initialView?: number;
        enableTimeToggle?: boolean;
        isRange?: boolean;
        hoverDate?: number | null;
        handleGridNav?: (key: string, shiftKey: boolean) => void;
    };
    events: {
        date: CustomEvent<any>;
        switch: CustomEvent<any>;
        internal_hoverUpdate: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
