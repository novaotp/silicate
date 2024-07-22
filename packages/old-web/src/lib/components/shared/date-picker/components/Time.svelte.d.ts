/** @typedef {typeof __propDef.props}  TimeProps */
/** @typedef {typeof __propDef.events}  TimeEvents */
/** @typedef {typeof __propDef.slots}  TimeSlots */
export default class Time extends SvelteComponentTyped<{
    wid: number;
    i18n: import("../i18n").i18nType;
    date?: Date;
    startDate?: Date;
    endDate?: Date;
    hourOnly?: boolean;
    minuteIncrement?: number;
    showMeridian?: boolean;
    hasDateComponent?: boolean;
    showMinuteView?: () => void;
    makeTick?: (val: number) => void;
}, {
    time: CustomEvent<any>;
    switch: CustomEvent<any>;
    'time-switch': CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get showMinuteView(): () => void;
    get makeTick(): (val: number) => void;
}
export type TimeProps = typeof __propDef.props;
export type TimeEvents = typeof __propDef.events;
export type TimeSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        wid: number;
        i18n: import("../i18n").i18nType;
        date?: Date | null;
        startDate?: Date | null;
        endDate?: Date | null;
        hourOnly?: boolean;
        minuteIncrement?: number;
        showMeridian?: boolean;
        hasDateComponent?: boolean;
        showMinuteView?: () => void;
        makeTick?: (val: number) => void;
    };
    events: {
        time: CustomEvent<any>;
        switch: CustomEvent<any>;
        'time-switch': CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
