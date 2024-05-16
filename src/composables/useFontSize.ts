
export function useFontSize() {

    const onResize = useDebounceFn(() => {
        const base = (document.body.clientWidth / import.meta.env.VITE_APP_BASE_CLIENT_WIDTH) * import.meta.env.VITE_APP_BASE_FONT_SIZE
        document.documentElement.style.fontSize = `${base}px`
    }, 500)

    onMounted(() => {
        window.addEventListener('resize', onResize)
        onResize()
    })

    onBeforeMount(() => {
        window.removeEventListener('resize', onResize)
    })

}