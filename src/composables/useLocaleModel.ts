import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { getItem } from '@/utils/storage'
import { nextTick } from 'vue'
import { i18n } from '@/locales'

const localeList = new Set<string>()
let localeLang = getItem('lang') || 'zh'
const locale = ref(en)

export function useLocale () {
    async function loadLocaleMessages(locales?: string[]) {
        if (!locales) {
            return nextTick()
        }
        const langs = {}
        for(let locale of locales) {
            if (!localeList.has(locale)) {
                try {
                    const json = await import(/* webpackChunkName: "lang" */ `../locales/${localeLang}/${locale}.json`)
                    Object.assign(langs, json.default)
                    localeList.add(locale)
                } catch(e) {
                    console.warn(`${locale}.json is not found`)
                }
            }
        }
        i18n.global.setLocaleMessage(localeLang, Object.assign(i18n.global.messages, langs))
        return nextTick()
    }
    async function switchLang(lang: 'zh'|'en', langs?: string[]) {
        localeLang = lang
        switch(lang) {
            case 'en':
                locale.value = en
                break
            case 'zh':
                locale.value = zhCn
                break
        }
        i18n.global.locale.value = lang
        await loadLocaleMessages(langs)
    }
    return {
        locale,
        switchLang,
        loadLocaleMessages
    }
}