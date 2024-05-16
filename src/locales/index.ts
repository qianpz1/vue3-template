import { createI18n } from 'vue-i18n'
import { getItem } from '@/utils/storage'

import en from '@/locales/en/common.json'
import zh from '@/locales/zh/common.json'

const messages = {
  en: en,
  zh: zh
}

export const i18n = createI18n({
  legacy: false,
  locale: getItem('lang') || 'zh',
  messages: messages
})