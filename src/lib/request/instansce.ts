import { request } from '@tarojs/taro'
import { getRequestHeaders } from './helpers'

async function axios<T>(
    config: RequestService.RequestParam
): Promise<RequestService.BackendResultConfig<T>> {
    const { method, data, url } = config
    const axiosConfig = config.axiosConfig
    const header = getRequestHeaders(axiosConfig!)
    return await new Promise((resolve, reject) => {
        request({
            /** 兼容Url不同的情况，可以通过填写完整路径 */
            url,
            method,
            /** 对所有请求添加时间戳以防止缓存 */
            data: { _t: Date.now(), ...data },
            header,
            timeout: 30 * 1000,
            success: res => {
                const { status } = res.data
                /** 登陆失败 */
                if (status === 401) {
                    // 重新登陆
                }
                return resolve(res.data)
            },
            fail: err => {
                reject(err)
            },
            complete: () => {
                //
            }
        })
    })
}

export default axios
