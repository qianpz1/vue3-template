import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosError } from 'axios'

const baseURL: string = import.meta.env.VITE_APP_BASE_URL
const tokenName: string = import.meta.env.VITE_APP_TOKEN_NAME
const tokenContent: string = import.meta.env.VITE_APP_TOKEN_CONTENT
const timeout = 5000

const service = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    withCredentials: true
});


service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers[tokenName] = tokenContent.replace(/!1/g, () => getCookie(tokenName))
        config.tips = config.tips ?? true
        config.loading = config.loading ?? false
        if (config.loading) showLoading()
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.config.loading) closeLoading()
        return response
    },
    (error: any) => {
        const { response, config } = error
        const { retry, retryCount = 0 } = config
        if (!axios.isCancel(error) && retry > 0) {
            if (retry && retry > retryCount) {
                config['retryCount'] = Number(retryCount) + 1
               return service(config)
            }
        } else if (response && response.status == 401) {
            window.location.href = '/login'
        }
        if (config.tips) {
            showTips({ message: error.message, type: 'error' })
        }
        if (config.loading) closeLoading()
        return Promise.reject(error);
    }
);

const getErrorMsg = (error: any) => {
    let err: string|undefined = undefined
    if (error instanceof Error) {
        err = error.message
    } else if (error instanceof AxiosError) {
        err = error.response?.data?.msg || error.stack
    } else if (error instanceof Object) {
        err = toJSONStr(error, error.toString())
    } else {
        err = `${error}`
    }
    return err
}

const wapperRequest = async <T, D>(fun: Promise<AxiosResponse<T, D>>): Promise<[T?, string?]> => {
    let result: T|undefined = undefined
    let err: string|undefined = undefined
    try {
        const data = await fun
        result = data.data
    } catch (error) {
        err = getErrorMsg(error)
    }
    return [result, err]
}

export const get = <T, D>(url: string, params?: AxiosRequestConfig<D>): Promise<[T?, string?]> => wapperRequest<T, D>(service.get(url, params));
export const post = <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<[T?, string?]> => wapperRequest<T, D>(service.post(url, data, config));
export const put = <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<[T?, string?]> => wapperRequest<T, D>(service.put(url, data, config));
export const del = <T, D>(url: string, params?: AxiosRequestConfig<D>): Promise<[T?, string?]> => wapperRequest<T, D>(service.delete(url, params));
export const patch = <T, D>(url: string, params?: AxiosRequestConfig<D>): Promise<[T?, string?]> => wapperRequest<T, D>(service.patch(url, params));
