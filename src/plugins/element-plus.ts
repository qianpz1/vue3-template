import { ElLoading, ElMessage, MessageParams } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

let _loading: ReturnType <typeof ElLoading.service>|null = null

//开启loading
export function showLoading() {
    if (_loading) {
        return
    }
    _loading = ElLoading.service({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.3)'
    })
}

//关闭loading
export function closeLoading() {
    if (_loading) {
        _loading.close()
        _loading = null
    }
}

//显示提示信息
export function showTips(params: MessageParams) {
    ElMessage(Object.assign({ showClose: true, type: 'success' }, params))
}