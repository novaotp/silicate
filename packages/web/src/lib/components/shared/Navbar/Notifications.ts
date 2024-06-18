export const timeDiff = (inputTime: string | Date): string => {
    const now = new Date();

    if (typeof inputTime === 'string') {
        inputTime = new Date(inputTime);
    }

    const diffInMs = now.getTime() - inputTime.getTime();
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return `Il y a ${seconds} secondes`;
    } else if (minutes < 60) {
        return `Il y a ${minutes} minutes`;
    } else if (hours < 24) {
        return `Il y a ${hours} heures`;
    } else {
        return `Il y a ${days} jours`;
    }
}
