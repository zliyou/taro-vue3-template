import Taro from '@tarojs/taro'

/**
 * 是否是null或者undefined
 *
 * @param {} v 参数
 *
 * @return {boolean}
 */
export function isUndef(v: any): v is null | undefined {
    return v === null || v === undefined
}

/**
 * 等待毫秒数
 */
export function wait(ms: number) {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

/**
 * 是否是某种类型
 */
export function isType(name: string) {
    return (val: any) => Object.prototype.toString.call(val) === `[object ${name}]`
}

export const isArray = (Array.isArray || isType('Array')) as (val: any) => val is any[]
export const isString = isType('String') as (val: any) => val is string
export const isBoolean = isType('Boolean')
export const isFunction = isType('Function')
export const isPlainObject = isType('Object')

export async function getStorage(key: string) {
    const { data: result } = await Taro.getStorage({
        key
    }).catch((err: any) => {
        console.log(err)
        return {
            data: null
        }
    })
    return result
}

export async function setStorage(key: string, value: any) {
    // @ts-ignore
    await api.setStorage({
        key,
        data: value
    })
}

/**
 * 获得当天的Date，要求北京时区
 *
 * @return {Date} 当天日期，UTC时间+8小时
 */
export function dateToday() {
    const date = new Date()
    return dateParse(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`)
}

/*
 * 日期文本解析
 *
 * @param {String} v 要求必须是 1. Y-m-d H:i:s 2. Y-m-d
 *
 * @return {Date} 解析后的日期 UTC+08:00
 */
export function dateParse(v): Date {
    if (isUndef(v) || v === '') {
        return v
    }
    const chunk = v.split(' ')
    const date = chunk[0]
    const time = chunk[1]
    const dateChunk = date.split('-')
    const d = new Date()
    d.setFullYear(dateChunk[0])
    d.setMonth(dateChunk[1] - 1)
    d.setMonth(dateChunk[1] - 1)
    d.setDate(dateChunk[2])
    let hour = 0
    let minute = 0
    let second = 0
    if (!isUndef(time)) {
        const timeChunk = time.split(':')
        hour = timeChunk[0]
        minute = timeChunk[1]
        second = timeChunk[2]
    }
    d.setHours(hour)
    d.setMinutes(minute)
    d.setSeconds(second)
    d.setMilliseconds(0)
    return new Date(d.valueOf())
}

/**
 * 对于数字进行format操作
 */
export function _format(number) {
    if (number < 0) {
        return number
    } else if (number < 10) {
        return '0' + number
    } else {
        return number
    }
}

/**
 * 日期格式化
 *
 * @param {Date|Number} v UTC+08:00
 * @param {String} format 格式内容
 *
 * @return {string} 经过format的日期数据
 */
export function dateFormat(v: any, format?: string) {
    const type = typeof v
    if (isUndef(v) || (type !== 'number' && !(v instanceof Date)) || v === '') {
        return v
    }
    // 使用默认的format
    if (!format) {
        format = 'Y-m-d'
    }
    if (typeof v === 'number') {
        v = new Date(v)
    } else {
        v = new Date(v.valueOf())
    }

    format = format.replace('Y', v.getFullYear())
    format = format.replace('m', v.getMonth() + 1)
    format = format.replace('M', _format(v.getMonth() + 1))
    format = format.replace('d', v.getDate())
    format = format.replace('D', _format(v.getDate()))
    format = format.replace('H', _format(v.getHours()))
    format = format.replace('i', _format(v.getMinutes()))
    format = format.replace('s', _format(v.getSeconds()))

    return format
}

/**
 * 日期天数差距
 *
 * @param {} v 较小的日期
 * @param {} c 比较的日期
 *
 * @return {number} 差距天数，当差距小于1天的时候，将不进行处理
 */
export function dateDiff(v: Date, c: Date) {
    if (isUndef(v)) {
        return v
    }
    return Math.floor((c.valueOf() - v.valueOf()) / 86400000)
}

/**
 * 移动日期
 *
 * @param {Date} v 传入进来的日期
 * @param {} day
 */
export function dateOffset(v, day) {
    if (isUndef(v)) {
        return v
    }
    return new Date(v.valueOf() + day * 86400000)
}

export function date(str: string) {
    return new Date(str)
}

/**
 * 获得当前的时间
 *
 * @return {Date} 当天
 */
export function dateNow() {
    const date = new Date(new Date().valueOf())
    return dateParse(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    )
}

/**
 * 金额格式化
 * @param {*} v 金额数据
 * @param {string} division 除数
 * @param {string} precision 精度
 */
export function currency(
    v: number | null | undefined,
    division = 100,
    precision = 2
): string | null | undefined {
    if (isUndef(v)) {
        return v
    }

    return String(((v as number) / division).toFixed(precision))
}

const monthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * 是否是闰年
 */
export function isLeapYear(year: number) {
    if (year % 4 !== 0) {
        return false
    }
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    return true
}

/**
 * 获得一个月有多少天
 *
 * @param {} year
 * @param {} month
 */
export function getMonthDay(year: number, month: number) {
    if (isLeapYear(year) && month === 2) {
        return 29
    }
    return monthDay[month]
}

export function getYear(date: Date) {
    return date.getFullYear()
}
export function getMonth(date: Date) {
    return date.getMonth()
}
export function getDay(date: Date) {
    return date.getDay()
}

export function priceRange(price: { min: number; max: number }, format = '${min}~${max}') {
    if (price.min === price.max) {
        return price.min + ''
    } else {
        return format.replace(/\${min}/g, price.min + '').replace(/\${max}/g, price.max + '')
    }
}

export const EMPTY_LIST = {
    list: [],
    loaded: false,
    req: false
}

export const EMPTY_LIST_TOTAL = {
    list: [],
    loaded: false,
    req: false,
    total: 0
}

export function compareVersion(v1: string, v2: string) {
    const v1List = v1.split('.')
    const v2List = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1List.push('0')
    }
    while (v2.length < len) {
        v2List.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1List[i])
        const num2 = parseInt(v2List[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }

    return 0
}

export function formatFloat(num: number, digit: number) {
    const m = Math.pow(10, digit)
    return parseInt(String(num * m), 10) / m
}

export function parseDiscount(v: string | number) {
    return parseFloat(String(v))
}

export function computedDiscount(v: string) {
    return formatFloat(Number(v) / 10, 2).toFixed(2)
}

export function wxToast(message: string, type: 'success' | 'loading' | 'none' = 'none') {
    Taro.showToast({
        title: message,
        icon: type
    })
}

/**
 * 生成key
 */
export function getMapKey(obj: object) {
    const keys = Object.keys(obj)
    // @ts-ignore
    return keys
        .sort()
        .map(key => obj[key])
        .join('_')
}

/**
 * 精度值计算(减法)
 */
export function accuracy(num1: number | string, num2: number | string) {
    if (typeof num1 !== 'number') {
        num1 = parseFloat(num1) | 0
    }
    if (typeof num2 !== 'number') {
        num2 = parseFloat(num2) | 0
    }
    const ext1Len = num1.toString().split('.')[1] ? num1.toString().split('.')[1].length : 0
    const ext2Len = num2.toString().split('.')[1] ? num2.toString().split('.')[1].length : 0
    const m = Math.pow(10, Math.max(ext1Len, ext2Len))
    return (num1 * m - num2 * m) / m
}
/**
 * 精度计算  减法
 */
export function Subtr(arg1: number | string, arg2: number | string) {
    let r1 = 0
    let r2 = 0
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    const m = Math.pow(10, Math.max(r1, r2))
    // 动态控制精度长度
    const n = r1 >= r2 ? r1 : r2
    return ((+arg1 * m - +arg2 * m) / m).toFixed(n)
}

/**
 * 精度计算，加减乘除
 */
export const math = {
    add(num1: number, num2: number) {
        return comp('add', num1, num2)
    },
    subtract(num1: number, num2: number) {
        // return comp('accuracy', num1, num2);
        return comp('Subtr', num1, num2)
    },
    multiply(num1: number, num2: number) {
        return comp('multiply', num1, num2)
    }
    // divide(num1: number, num2: number) {
    //     return comp('divide', num1, num2);
    // },
}
const compMap = {
    add: (num1: number, num2: number) => {
        let r1 = 0
        let r2 = 0
        try {
            r1 = num1.toString().split('.')[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = num2.toString().split('.')[1].length
        } catch (e) {
            r2 = 0
        }
        const m = Math.pow(10, Math.max(r1, r2))
        return (num1 * m + num2 * m) / m
    },
    multiply: (num1: number, num2: number) => {
        let m = 0
        const s1 = num1.toString()
        const s2 = num2.toString()
        try {
            m += s1.split('.')[1].length
        } catch {
            //
        }
        try {
            m += s2.split('.')[1].length
        } catch (e) {
            //
        }
        return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
    },
    accuracy,
    Subtr
}
function comp(_func: string, num1: number, num2: number) {
    // let t = $mathChain($mathBignumber(args[0]));
    // for (let i = 1; i < args.length; i++) {
    //     t = t[_func]($mathBignumber(args[i]));
    // }
    // 防止超过6位使用科学计数法
    // return parseFloat($mathFormat(t.done()));
    return parseFloat(compMap[_func](num1, num2))
}
