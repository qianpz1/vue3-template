import { addRoutes } from "@/router"

export function useRoutes() {

    const createRoutes = () => {
        const remote = import.meta.env.VITE_APP_REMOTE_ROUTER
        if (remote === 'true') {
            console.log('load remote routes')
        } else {
            addRoutes()
        }
    }
    

    return {
        createRoutes
    }
}