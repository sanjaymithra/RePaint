(function () {
  const STYLE_ID = "__repaint_custom_css__";
  let _lastCssText = "";
  let _lastEnabled = false;

  function getHostname() {
    try {
      if (typeof repaintNormalizeHostname === "function") {
        return repaintNormalizeHostname(location.href);
      }
      return (location.hostname || "local-file").toLowerCase();
    } catch (e) {
      console.warn("[Repaint content.js] Error resolving hostname:", e);
      return "unknown";
    }
  }

  function ensureStyleEl() {
    let el = document.getElementById(STYLE_ID);
    const target = document.head || document.documentElement || document.body;
    if (!target) return null;

    if (!el || !el.isConnected) {
      if (el) el.remove();
      el = document.createElement("style");
      el.id = STYLE_ID;
      el.setAttribute("type", "text/css");
      if (_lastEnabled && _lastCssText) {
        el.textContent = _lastCssText;
      }
      target.appendChild(el);
    } else if (el.parentElement !== target && target.tagName === "HEAD") {
      target.appendChild(el);
    }
    return el;
  }

  function applyProfileCSS(cssText, isEnabled) {
    _lastCssText = cssText || "";
    _lastEnabled = isEnabled;

    const el = ensureStyleEl();
    if (!el) return;

    if (isEnabled && cssText && typeof cssText === "string" && cssText.trim()) {
      el.textContent = cssText;
      if (el.parentElement) {
        el.parentElement.appendChild(el);
      }
    } else {
      el.textContent = "";
    }
  }
})();
