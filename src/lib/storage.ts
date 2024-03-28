import { isUndef, dateNow, dateParse } from '@/lib/utils'
import Taro from '@tarojs/taro'

/**
 * 判断是否过期
 *
 * @param {String} time 日期
 *
 * @return {} 是否已经过期
 */
function isExpire(time: string) {
    return dateParse(time).valueOf() < dateNow().valueOf()
}

/**
 * 获得数据
 *
 * @param {} key
 *
 * @return {} 结果内容
 */
export function get(key: string) {
    // 判断是否存在expire
    const exp = getExpire(key)
    if (!isUndef(exp) && isExpire(exp!)) {
        // 如果发现过期数据，那么删除数据和过期时间
        del(key)
        del('_e_' + key)
    }
    const result = Taro.getStorageSync(key)
    return result
}

/**
 * 获得expire时间
 *
 * @param {} key
 * @return {string | null}
 */
export function getExpire(key: string) {
    return Taro.getStorageSync('_e_' + key)
}

/**
 * 设置数据
 *
 * @param {} key
 * @param {} value 允许string/number/object，对object将进行JSON.stringify
 */
export async function set(key: string, value: string | number | object) {
    let result: string = ''
    if (typeof value === 'string') {
        result = value
    } else if (typeof value === 'number') {
        result = value + ''
    } else if (typeof value === 'object') {
        result = JSON.stringify(value)
    }
    await Taro.setStorage({
        key,
        data: result
    })
}

/**
 * 标记过期数据
 *
 * @param {} key
 * @param {} expire 过期时间
 */
export function expire(key: string, exp: string) {
    set('_e_' + key, exp)
}

/**
 * 设置数据，包括expire
 *
 * @param {string} key
 * @param {any} value
 * @param {} exp 过期时间,例如2019-01-01
 */
export function setex(key: string, value: string | number | object, exp: string) {
    set(key, value)
    if (exp) {
        expire(key, exp)
    }
}

/**
 * 删除数据
 */
export async function del(key: string) {
    await Taro.removeStorage({
        key
    })
}

/**
 * 支持普通的key也支持path
 * @param {} exp 过期时间,例如2019-01-01
 */
export async function pathSet(keyOrPath: string, value: string | number | object, exp?: string) {
    const parts = keyOrPath.split('.')
    if (parts.length === 1) {
        if (exp) {
            setex(keyOrPath, value, exp)
        } else {
            set(keyOrPath, value)
        }
    } else {
        const first = parts.shift()!
        const last = parts.pop()!
        const storeValue = (await get(first)) || '{}'
        const obj = JSON.parse(storeValue)
        let traverse = obj
        for (const part of parts) {
            // 寻找失败
            if (!traverse[part]) {
                traverse[part] = {}
            }
            if (typeof traverse[part] !== 'object') {
                return
            }
            traverse = traverse[part]
        }
        traverse[last] = value
        if (exp) {
            setex(first, obj, exp)
        } else {
            set(first, obj)
        }
    }
}

export async function pathDel(keyOrPath: string) {
    const parts = keyOrPath.split('.')
    if (parts.length === 1) {
        del(keyOrPath)
    } else {
        const first = parts.shift()!
        const last = parts.pop()!
        const storeValue = (await get(first)) || '{}'
        const obj = JSON.parse(storeValue)
        let traverse = obj
        for (const part of parts) {
            // 寻找失败
            if (!traverse[part]) {
                traverse[part] = {}
            }
            if (typeof traverse[part] !== 'object') {
                return
            }
            traverse = traverse[part]
        }
        delete traverse[last]
        const exp = await getExpire(first)
        if (exp) {
            setex(first, obj, exp)
        } else {
            set(first, obj)
        }
    }
}

export async function pathGet(keyOrPath: string) {
    const parts = keyOrPath.split('.')
    if (parts.length === 1) {
        return get(keyOrPath)
    } else {
        const first = parts.shift()!
        const last = parts.pop()!
        const storeValue = (await get(first)) || '{}'
        let traverse = JSON.parse(storeValue)
        for (const part of parts) {
            traverse = traverse[part]
            // 寻找失败
            if (!traverse || typeof traverse !== 'object') {
                return
            }
        }
        return traverse[last]
    }
}
