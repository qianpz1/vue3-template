import { decrypt, encrypt } from "@/utils/crypto";

export function setItem(key: string, value: any) {
    localStorage.setItem(key, encrypt(value))
}

export function getItem(key: string) {
    const msg = localStorage.getItem(key)
    return msg ? decrypt(msg) : null
}