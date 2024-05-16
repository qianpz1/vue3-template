
import { useLocalStorage } from '@vueuse/core'

const theme = useLocalStorage<'light'|'dark'>('theme', 'light')

export default function useThemes() {
    const toogleTheme = (data: 'light'|'dark') => {
        theme.value = data
        saveTheme(data)
    }
    const saveTheme = (data: 'light'|'dark') => {
        window.document.documentElement.setAttribute('data-theme', data)
    }

    onMounted(() => {
        const localTheme = window.document.documentElement.dataset.theme
        if (localTheme !== theme.value) {
            saveTheme(theme.value)
        }
    })

    return {
        theme,
        toogleTheme
    }
}