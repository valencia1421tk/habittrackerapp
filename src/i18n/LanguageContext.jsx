import { createContext, useContext, useState } from 'react'
import { translations, LANGUAGES } from './translations'

const LANG_KEY = 'habit-tracker-lang'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(LANG_KEY)
    return saved && translations[saved] ? saved : 'ja'
  })

  function switchLang(code) {
    setLang(code)
    localStorage.setItem(LANG_KEY, code)
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
