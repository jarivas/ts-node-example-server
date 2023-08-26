import NodeCache from 'node-cache'

export default class Cache {
    private static cache = new NodeCache({ stdTTL: 600, checkperiod: 100 })

    static on(eventName: string | symbol, listener: (...args: any[]) => void) {
        Cache.cache.on(eventName, listener)
    }

    static close() {
        Cache.cache.close()
    }

    static has(key: string): boolean {
        return Cache.cache.has(key)
    }

    static get(key: string): any {
        return Cache.cache.get(key)
    }

    static set(key: string, value: any) {
        Cache.cache.set(key, value)
    }
}