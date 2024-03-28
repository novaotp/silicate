export const formatDate = (date: string | Date): string => {
    if (typeof date === "string") {
        date = new Date(date)
    }

    return date.toLocaleString("fr-CH", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
};
