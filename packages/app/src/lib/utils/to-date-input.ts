/** Transforms a given date object to a valid date value for `<input type="date" />`. */
export const toDateInputValue = (date: Date): string => {
    const local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0,10);
};
