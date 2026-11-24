var Lang = {
  initLang() {
    // get browser lang and init locales
    var messages = {};
    var userLang = navigator.language || navigator.userLanguage;
    // Nexwall: the console is always shown in Portuguese (Brazil)
    userLang = "pt";
    messages = require("./locale-pt.json");

    return {
      messages: messages,
      locale: userLang
    };
  }
};

export default Lang;
