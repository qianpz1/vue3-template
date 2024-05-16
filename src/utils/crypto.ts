import { AES, enc } from 'crypto-ts'
import { toJSONObj, toJSONStr } from './tools'

const key = import.meta.env.VITE_APP_AES_KEY

// function encryptKey(key: string): string {
//     return key.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).reverse().join('');
// }

function decryptKey(key: string): string {
    return key.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 1)).reverse().join('');
}

export function encrypt (data: any) {
    const msg = toJSONStr(data, data)
    return AES.encrypt(msg!, decryptKey(key)).toString()
}

export function decrypt (data: string) {
    const msg = AES.decrypt(data, decryptKey(key)).toString(enc.Utf8)
    return toJSONObj(msg, msg)
}