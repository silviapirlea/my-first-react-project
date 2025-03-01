export function getFromStorage(key: string): string | null {
    const value = localStorage.getItem(key);
    if(value === null) {
        return null;
    }
    return value
}

export function setToStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}