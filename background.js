importScripts("themes.js");

chrome.runtime.onInstalled.addListener(() => {
  console.log("[Repaint background.js] Extension installed/updated.");
  chrome.storage.local.get(["siteProfiles", "masterEnabled"], (store) => {
    const toSet = {};
    if (store.masterEnabled === undefined) {
      toSet.masterEnabled = true;
    }
    if (!store.siteProfiles) {
      toSet.siteProfiles = REPAINT_DEFAULT_PROFILES;
    }
    if (Object.keys(toSet).length > 0) {
      chrome.storage.local.set(toSet, () => {
        console.log("[Repaint background.js] Defaults initialized:", toSet);
      });
    }
  });
});
