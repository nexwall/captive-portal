// Nexwall: light / dark / system theme, same palette switch as the Partner Portal
var KEY = "nx_theme";
var MODES = ["system", "light", "dark"];
function mode() {
  try { var s = window.localStorage.getItem(KEY); if (MODES.indexOf(s) >= 0) return s; } catch (e) {}
  return "system";
}
function isDark(m) {
  if (m === "dark") return true;
  if (m === "light") return false;
  return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
}
var Theme = {
  mode: mode,
  apply() {
    var d = isDark(mode());
    document.documentElement.setAttribute("data-theme", d ? "dark" : "light");
    document.documentElement.classList.toggle("dark", d);
  },
  next() {
    var n = MODES[(MODES.indexOf(mode()) + 1) % MODES.length];
    try { window.localStorage.setItem(KEY, n); } catch (e) {}
    Theme.apply();
    return n;
  },
  init() {
    Theme.apply();
    try {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { if (mode() === "system") Theme.apply(); });
    } catch (e) {}
  }
};
export default Theme;
