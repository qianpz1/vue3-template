import { RouteRecordRaw } from 'vue-router';
import router from './router'

//匹配页面名
const getPageInfo = function(path: string) {
    const page = path.replace(/config.ts/, 'index.vue')
    const match = path.match(/\/views\/(\S*)\/config.ts/)
    const name = match ? match[1] : ''
    return [page, name]
}

//循环获取子路由
function loopClassify(routeRaw: RouteRecordRaw, extraRouteRaws: Array<RouteRecordRaw>) {
    const children = extraRouteRaws.filter(ele => ele.meta?.parent === routeRaw.name)
    routeRaw.children = children
    if (children.length) {
        children.forEach(item => {
            loopClassify(item, extraRouteRaws)
        })
    }
    return routeRaw
}

//读取本地页面
function getLoaclRoutes () {
    const configs = import.meta.glob('../views/**/config.ts', { import: 'default', eager: true })
    const pages = import.meta.glob('../views/**/index.vue')
    return Object.entries(configs).map((item: any) => {
        const [configPath, config] = item
        const [page, name] = getPageInfo(configPath)
        const { parent, params } = config
        return {
            path: `${ parent ? '' : '/' }${name}${params ? `${params}` : ''}`,
            name: name,
            meta: {
                title: config.title,
                langs: config.langs ? (Array.isArray(config.langs) ? config.langs : [config.langs]) : [],
                auth: config.auth,
                parent: parent
            },
            component: pages[page]
        }
    })
}
 
//加载路由
const loadlRouters = () => {
    const localRouteRaws = getLoaclRoutes()
    const topRouteRaws = localRouteRaws.filter(ele => !ele.meta.parent)
    const extraRouteRaws = localRouteRaws.filter(ele => ele.meta.parent)
    return topRouteRaws.map(item => {
        return loopClassify(item, extraRouteRaws)
    })
}

export const addRoutes = () => {
    const next = loadlRouters()
    next.forEach(element => {
      router.addRoute(element)  
    })
}