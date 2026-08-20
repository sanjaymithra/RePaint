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

  /**
   * Inject the <style> element into the best available target.
   * Prefer <head> (the standard location for stylesheets) — only fall back to
   * <html> when <head> doesn't exist yet (document_start on first load).
   * If the element already exists but was orphaned (SPA framework removed it),
   * re-create and re-append it.
   */
  function ensureStyleEl() {
    let el = document.getElementById(STYLE_ID);

    // Pick the best parent: <head> > <html> > <body>
    const target = document.head || document.documentElement || document.body;
    if (!target) return null;

    if (!el || !el.isConnected) {
      // Element is missing or was detached — (re)create it
      if (el) el.remove(); // clean up orphan reference
      el = document.createElement("style");
      el.id = STYLE_ID;
      el.setAttribute("type", "text/css");
      // Restore last known content so SPA navigation doesn't flash un-themed
      if (_lastEnabled && _lastCssText) {
        el.textContent = _lastCssText;
      }
      target.appendChild(el);
      console.log("[Repaint content.js] Style element (re)created in <" + target.tagName.toLowerCase() + ">");
    } else if (el.parentElement !== target && target.tagName === "HEAD") {
      // Migrate from <html> to <head> once <head> becomes available
      target.appendChild(el);
    }

    return el;
  }

  function applyProfileCSS(cssText, isEnabled) {
    _lastCssText = cssText || "";
    _lastEnabled = isEnabled;

    const el = ensureStyleEl();
    if (!el) {
      console.warn("[Repaint content.js] No target for style element yet; will retry.");
      return;
    }

    if (isEnabled && cssText && typeof cssText === "string" && cssText.trim()) {
      console.log("[Repaint content.js] Applying custom CSS profile (" + cssText.length + " bytes)");
      el.textContent = cssText;
      // Move to the very end of <head> so it overrides everything before it
      if (el.parentElement) {
        el.parentElement.appendChild(el);
      }
    } else {
      console.log("[Repaint content.js] Custom profile disabled or empty; clearing CSS.");
      el.textContent = "";
    }
  }

  function evaluateAndApply(siteProfiles, masterEnabled) {
    if (masterEnabled === undefined) masterEnabled = true;
    const host = getHostname();
    if (host === "unknown" || host === "browser-internal") return;

    if (masterEnabled === false) {
      console.log("[Repaint content.js] Master toggle is OFF; clearing all styles.");
      applyProfileCSS("", false);
      return;
    }

    const match = typeof repaintFindMatchingProfile === "function"
      ? repaintFindMatchingProfile(host, siteProfiles || {})
      : null;

    console.log("[Repaint content.js] Evaluating host:", host, "Match result:", match);

    if (match && match.profile && match.profile.enabled) {
      applyProfileCSS(match.profile.css, true);
    } else {
      applyProfileCSS("", false);
    }
  }

  function loadAndApply() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["siteProfiles", "masterEnabled"], function (store) {
        if (chrome.runtime.lastError) {
          console.error("[Repaint content.js] Storage error:", chrome.runtime.lastError);
          return;
        }
        var masterEnabled = store.masterEnabled !== undefined ? store.masterEnabled : true;
        evaluateAndApply(store.siteProfiles || {}, masterEnabled);
      });
    }
  }

  // --- LIFECYCLE: Run at multiple stages to guarantee injection ---

  // 1. Immediate (document_start)
  loadAndApply();

  // 2. When <head> and DOM are ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      ensureStyleEl(); // migrate <style> into <head> now that it exists
      loadAndApply();
    }, { once: true });
  }

  // 3. After full page load (images, iframes, etc.)
  window.addEventListener("load", function () {
    ensureStyleEl();
    loadAndApply();
  }, { once: true });

  // 4. SPA in-app navigation (React Router pushState / popState)
  window.addEventListener("popstate", loadAndApply);

  // 5. MutationObserver: watch for removal of our <style> element.
  //    Instagram's React can remove or replace <head> children during hydration.
  var _observerActive = false;
  function startObserver() {
    if (_observerActive) return;
    _observerActive = true;

    var observer = new MutationObserver(function () {
      var el = document.getElementById(STYLE_ID);
      if (!el || !el.isConnected) {
        console.log("[Repaint content.js] Style element was removed; re-injecting.");
        ensureStyleEl();
      }
    });

    var watchTarget = document.head || document.documentElement;
    if (watchTarget) {
      observer.observe(watchTarget, { childList: true, subtree: false });
    }

    // Also watch documentElement in case <head> itself gets replaced
    if (document.documentElement && watchTarget !== document.documentElement) {
      observer.observe(document.documentElement, { childList: true, subtree: false });
    }
  }

  // Start observer once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  } else {
    startObserver();
  }
})();
