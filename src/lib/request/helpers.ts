import { getEnv, getAccountInfoSync, showToast } from '@tarojs/taro'
import { CONTENT_TYPE } from '../constant'
import { get } from '../storage'

/** 获取请求头 */
export function getRequestHeaders(axiosConfig: RequestService.AxiosConfig) {
    const header: TaroGeneral.IAnyObject = {}
    /** 获取token */
    const token = get('brp_token')
    if (token) {
        /** 添加token */
        header.Authorization = token
    }
    /** 增加类型 */
    header['Content-Type'] = axiosConfig?.contentType || CONTENT_TYPE.json
    return header
}

/** token过期 */
export function handleExpireToken() {
    //   const { resetAuthStore } = useAuthStore();
    //   const { toLogin } = useRouterPush();
    //   resetAuthStore();
    //   toLogin();

    return null
}

export function showErrorMsg(message: string) {
    showToast({
        title: message,
        icon: 'none'
    })
}
