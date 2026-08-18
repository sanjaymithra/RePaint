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

  function evaluateAndApply(siteProfiles, masterEnabled) {
    if (masterEnabled === undefined) masterEnabled = true;
    const host = getHostname();
    if (host === "unknown" || host === "browser-internal") return;

    if (masterEnabled === false) {
      applyProfileCSS("", false);
      return;
    }

    const match = typeof repaintFindMatchingProfile === "function"
      ? repaintFindMatchingProfile(host, siteProfiles || {})
      : null;

    if (match && match.profile && match.profile.enabled) {
      applyProfileCSS(match.profile.css, true);
    } else {
      applyProfileCSS("", false);
    }
  }

  function loadAndApply() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["siteProfiles", "masterEnabled"], function (store) {
        if (chrome.runtime.lastError) return;
        var masterEnabled = store.masterEnabled !== undefined ? store.masterEnabled : true;
        evaluateAndApply(store.siteProfiles || {}, masterEnabled);
      });
    }
  }

  // Lifecycle
  loadAndApply();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      ensureStyleEl();
      loadAndApply();
    }, { once: true });
  }

  window.addEventListener("load", function () {
    ensureStyleEl();
    loadAndApply();
  }, { once: true });

  // Messaging
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if (msg && msg.type === "REPAINT_PROFILE_APPLY") {
        var masterOn = msg.masterEnabled !== undefined ? msg.masterEnabled : true;
        var profileOn = !!msg.enabled;
        var shouldApply = masterOn && profileOn;

        applyProfileCSS(msg.css || "", shouldApply);
        sendResponse({ ok: true, applied: shouldApply, host: getHostname() });
        return false;
      }

      if (msg && msg.type === "REPAINT_PING") {
        sendResponse({ ok: true, pong: true, host: getHostname() });
        return false;
      }
    });
  }

  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener(function (changes, area) {
      if (area === "local" && (changes.siteProfiles || changes.masterEnabled)) {
        loadAndApply();
      }
    });
  }
})();
