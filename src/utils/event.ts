class DelayEvent {

    private events: Map<string, ((() => Promise<void>)|(() => void))[]>
    private isRuning: boolean
    private currentKey: string|undefined
    private executeKeys: string[] = []
    private queueKey: string|undefined = undefined
    
    constructor() {
        this.events = new Map()
        this.isRuning = false
    }

    defaultQueue(key: string) {
        if (!this.events.has(key)) {
            this.events.set(key, [])
        }
        return this
    }

    queue(key?: string) {
        const queueKey = key || 'default'
        this.defaultQueue(queueKey)
        return this.events.get(queueKey)
    }

    tag(key: string) {
        this.queueKey = key
        this.defaultQueue(key)
        return this
    }

    wait(time: number) {
        this.queue(this.queueKey)?.push(() => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve()
                }, time);
            })
        })
        return this
    }

    run(fuc: (() => void)|(() => Promise<void>)) {
        this.queue(this.queueKey)?.push(fuc)
        return this
    }

    get() {
        return this.queue(this.queueKey)?.shift()
    }

    isPromise(obj: any) {
        return obj instanceof Promise
    }

    isNum(obj: any) {
        return typeof obj === 'number'
    }

    async loop() {
        const list = this.queue(this.queueKey)
        if (list) {
            for(const temp of list) {
                if (this.isRuning) {
                    const fuc = temp()
                    if (this.isPromise(fuc)) {
                        await fuc
                    }
                } else {
                    break
                }
            }
        }
        if (this.isRuning) {
            if (this.executeKeys.length) {
                this.start()
            } else {
                this.stop()
            }
        }
    }

    async start() {
        if (!this.currentKey) {
            this.isRuning = true
            this.currentKey = this.executeKeys.shift()
            await this.loop()
        }
    }

    async execute(key?: string) {
        const execute = key || 'default'
        if (!this.executeKeys.includes(execute)) {
            this.executeKeys.push(execute)
        }
        await this.start()
    }

    stop() {
        this.isRuning = false
        this.currentKey && this.events.delete(this.currentKey)
        this.currentKey = undefined
    }

    clear(key: string) {
        if (key !== this.currentKey) {
            const list = this.queue(key)
            list?.splice(0, list.length)
        }
        if(this.currentKey === key) {
            this.stop()
        } else {
            this.events.delete(key)
        }
    }
}

export default DelayEvent