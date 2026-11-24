// Nexwall: guest page languages. pt-BR is the default; es and en are selectable.
export const LANGS = ['pt', 'es', 'en']
export const DEFAULT_LANG = 'pt'
const KEY = 'nx_lang'

export function detectLang() {
  try {
    var q = (window.location.search.match(/[?&]lang=([a-z]{2})/i) || [])[1]
    if (q && LANGS.indexOf(q.toLowerCase()) >= 0) return q.toLowerCase()
  } catch (e) { /* ignore */ }
  try {
    var s = window.localStorage.getItem(KEY)
    if (s && LANGS.indexOf(s) >= 0) return s
  } catch (e) { /* ignore */ }
  return DEFAULT_LANG
}

export function saveLang(l) {
  try { window.localStorage.setItem(KEY, l) } catch (e) { /* ignore */ }
  try { document.documentElement.setAttribute('lang', l === 'pt' ? 'pt-BR' : l) } catch (e) { /* ignore */ }
}

export function allMessages() {
  return Object.assign({}, require('./locale-pt.json'), require('./locale-es.json'), require('./locale-en.json'))
}

// Terms/marketing texts may hold several languages: [[pt]]...[[es]]...[[en]]...
// Texts without markers are returned unchanged.
export function pickLang(text, lang) {
  if (!text || text.indexOf('[[') < 0) return text || ''
  var parts = {}
  var re = /\[\[(pt|es|en)\]\]([\s\S]*?)(?=\[\[(?:pt|es|en)\]\]|$)/g
  var m
  while ((m = re.exec(text)) !== null) parts[m[1]] = m[2].trim()
  return parts[lang] || parts[DEFAULT_LANG] || parts.en || text
}
