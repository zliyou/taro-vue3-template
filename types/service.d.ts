/** 请求的相关类型 */
declare namespace RequestService {
    type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

    interface AxiosConfig {
        /** 请求类型 */
        contentType?: string
        /** 是否显示Toast */
        useErrMsg?: boolean
    }

    interface RequestParam {
        url: string
        method?: RequestMethod
        data?: any
        axiosConfig?: AxiosConfig
    }

    /** 请求错误 */
    interface RequestError {
        /** 错误码 */
        errorCode: string | number
        /** 错误信息 */
        message: string
    }

    /** 后端接口返回的数据结构配置 */
    interface BackendResultConfig<T> {
        /** 表示后端请求状态码的属性字段 */
        code: string | number
        /** 表示后端请求数据的属性字段 */
        data: string
        /** 表示后端消息的属性字段 */
        message: string
    }
}
