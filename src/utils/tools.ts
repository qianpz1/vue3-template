
export function toJSONStr(data: any, def?: string) {
    let result: string|undefined = undefined
    try {
        if (Object.prototype.toString.call(data) === '[object String]') {
            result = data
        } else {
            result = JSON.stringify(data)
        }
    } catch (error) {
        if (def === undefined) {
            throw error
        }
        result = def
    }
    return result
}


export function toJSONObj<T>(data: string, def?: T) {
    let result: T|null = null
    try {
        result = JSON.parse(data)
    } catch (error) {
        if (def === undefined) {
            throw error
        }
        result = def
    }
    return result
}