import { decrypt, encrypt } from "@/utils/crypto";

export function setCookie(key: string, value: string, hour: number = 24) {
    let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(encrypt(value))};`;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + hour * 60 * 60 * 1000);
    cookie += `expires=${expirationDate.toUTCString()};`;
    document.cookie = cookie;
}

export function getCookie(key: string): string {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(part => part.trim());
        if (cookieName === encodeURIComponent(key)) {
            return decrypt(decodeURIComponent(cookieValue)) || '';
        }
    }
    return '';
}