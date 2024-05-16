import router from './router'

const { loadLocaleMessages } = useLocale()
const tokenName = import.meta.env.VITE_APP_TOKEN_NAME

router.beforeEach(async (to, __from, next) => {
    const { title, auth, langs } = to.meta
    document.title = title || '';
    if (tokenName && auth && !getCookie(tokenName)) {
        next('/login')
        return
    }
    if (langs) {
        await loadLocaleMessages(langs)
    }
    next();
});

router.afterEach((__to, __from) => {
    
})