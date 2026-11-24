// Nexwall: console languages. pt-BR is the default; es and en are selectable.
var LANGS = ["pt", "es", "en"];
var KEY = "nx_lang";

var Lang = {
  langs: LANGS,
  getLang() {
    try {
      var q = (window.location.search.match(/[?&]lang=([a-z]{2})/i) || [])[1];
      if (q && LANGS.indexOf(q.toLowerCase()) >= 0) {
        try { window.localStorage.setItem(KEY, q.toLowerCase()); } catch (e) {}
        return q.toLowerCase();
      }
    } catch (e) {}
    try {
      var s = window.localStorage.getItem(KEY);
      if (s && LANGS.indexOf(s) >= 0) return s;
    } catch (e) {}
    return "pt";
  },
  setLang(l) {
    try { window.localStorage.setItem(KEY, l); } catch (e) {}
    // strip ?lang= so the saved choice wins, then reload to rebuild tables/date formats
    var url = window.location.href.replace(/([?&])lang=[a-z]{2}&?/i, "$1").replace(/[?&]$/, "");
    if (url === window.location.href) window.location.reload();
    else window.location.href = url;
  },
  initLang() {
    var lang = Lang.getLang();
    var all = {
      pt: require("./locale-pt.json").pt,
      es: require("./locale-es.json").es,
      en: require("./locale-en.json").en
    };
    try { document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : lang); } catch (e) {}
    return {
      messages: all,
      locale: lang
    };
  }
};

export default Lang;
