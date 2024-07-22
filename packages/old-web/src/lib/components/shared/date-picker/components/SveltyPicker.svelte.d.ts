export const config: {
    theme: string;
    format: string;
    formatType: string;
    displayFormat: any;
    displayFormatType: any;
    minuteIncrement: number;
    weekStart: number;
    inputClasses: string;
    todayBtnClasses: string;
    clearBtnClasses: string;
    hourOnly: boolean;
    todayBtn: boolean;
    clearBtn: boolean;
    clearToggle: boolean;
    autocommit: boolean;
    i18n: import("../i18n").i18nType;
};
/** @typedef {typeof __propDef.props}  SveltyPickerProps */
/** @typedef {typeof __propDef.events}  SveltyPickerEvents */
/** @typedef {typeof __propDef.slots}  SveltyPickerSlots */
export default class SveltyPicker extends SvelteComponentTyped<{
    todayBtn?: boolean;
    clearBtn?: boolean;
    startDate?: string | Date;
    endDate?: string | Date;
    weekStart?: number;
    isRange?: boolean;
    i18n?: import("../i18n").i18nType;
    hourOnly?: boolean;
    minuteIncrement?: number;
    name?: string;
    value?: string | string[] | null;
    inputId?: string;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    initialDate?: Date | Date[];
    pickerOnly?: boolean;
    startView?: number;
    mode?: "date" | "time" | "auto" | "datetime";
    disableDatesFn?: (arg0: Date) => boolean;
    manualInput?: boolean;
    theme?: string;
    format?: string;
    formatType?: string;
    displayFormat?: string;
    displayFormatType?: string;
    inputClasses?: string;
    todayBtnClasses?: string;
    clearBtnClasses?: string;
    clearToggle?: boolean;
    autocommit?: boolean;
    validatorAction?: any[];
    ce_valueElement?: HTMLInputElement;
    ce_displayElement?: HTMLInputElement;
    positionResolver?: Function;
}, {
    input: CustomEvent<any>;
    change: CustomEvent<any>;
    mousedown: MouseEvent;
    dateChange: CustomEvent<any>;
    cancel: CustomEvent<any>;
    blur: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    inputs: {
        value: string | string[];
        displayValue: string;
        disabled: boolean;
        isDirty: boolean;
        onKeyDown: (e: KeyboardEvent) => void;
        onInputFocus: () => void;
        onInputBlur: () => void;
    };
    'action-row': {
        onCancel: () => void;
        onConfirm: () => void;
        onClear: () => void;
        onToday: () => void;
        isTodayDisabled: boolean;
        currentMode: string;
        i18n: import("../i18n").i18nType;
    };
}> {
}
export type SveltyPickerProps = typeof __propDef.props;
export type SveltyPickerEvents = typeof __propDef.events;
export type SveltyPickerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        todayBtn?: boolean;
        clearBtn?: boolean;
        startDate?: Date | string | null;
        endDate?: Date | string | null;
        weekStart?: number;
        isRange?: boolean;
        i18n?: import("../i18n").i18nType;
        hourOnly?: boolean;
        minuteIncrement?: number;
        name?: string;
        value?: string | string[] | null;
        inputId?: string;
        disabled?: boolean;
        placeholder?: string | null | undefined;
        required?: boolean;
        initialDate?: Date | Date[] | null;
        pickerOnly?: boolean;
        startView?: number;
        mode?: 'auto' | 'date' | 'datetime' | 'time';
        disableDatesFn?: ((arg0: Date) => boolean) | null;
        manualInput?: boolean;
        theme?: string;
        format?: string;
        formatType?: string;
        displayFormat?: string | null;
        displayFormatType?: string | null;
        inputClasses?: string;
        todayBtnClasses?: string;
        clearBtnClasses?: string;
        clearToggle?: boolean;
        autocommit?: boolean;
        validatorAction?: Array<any> | null;
        ce_valueElement?: HTMLInputElement | null;
        ce_displayElement?: HTMLInputElement | null;
        positionResolver?: Function | null;
    };
    events: {
        input: CustomEvent<any>;
        change: CustomEvent<any>;
        mousedown: MouseEvent;
        dateChange: CustomEvent<any>;
        cancel: CustomEvent<any>;
        blur: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        inputs: {
            value: string | string[];
            displayValue: string;
            disabled: boolean;
            isDirty: boolean;
            onKeyDown: (e: KeyboardEvent) => void;
            onInputFocus: () => void;
            onInputBlur: () => void;
        };
        'action-row': {
            onCancel: () => void;
            onConfirm: () => void;
            onClear: () => void;
            onToday: () => void;
            isTodayDisabled: boolean;
            currentMode: string;
            i18n: import("../i18n").i18nType;
        };
    };
};
export {};
