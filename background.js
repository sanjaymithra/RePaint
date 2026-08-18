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

function hostnameFromUrl(url) {
  if (!url) return null;
  return typeof repaintNormalizeHostname === "function"
    ? repaintNormalizeHostname(url)
    : null;
}

async function updateBadge(tabId, url) {
  const host = hostnameFromUrl(url);
  if (!host || host === "unknown" || host === "browser-internal") {
    chrome.action.setBadgeText({ tabId, text: "" });
    return;
  }

  chrome.storage.local.get(["siteProfiles", "masterEnabled"], (store) => {
    const masterEnabled = store.masterEnabled !== undefined ? store.masterEnabled : true;
    if (!masterEnabled) {
      chrome.action.setBadgeText({ tabId, text: "" });
      return;
    }

    const siteProfiles = store.siteProfiles || {};
    const match = typeof repaintFindMatchingProfile === "function"
      ? repaintFindMatchingProfile(host, siteProfiles)
      : null;

    const isEnabled = !!(match && match.profile && match.profile.enabled);
    chrome.action.setBadgeText({ tabId, text: isEnabled ? "ON" : "" });
    chrome.action.setBadgeBackgroundColor({ tabId, color: "#ff007f" });
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) updateBadge(tabId, tab.url);
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => tab && tab.url && updateBadge(tabId, tab.url));
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && (changes.siteProfiles || changes.masterEnabled)) {
    chrome.tabs.query({ active: true }, (tabs) => {
      tabs.forEach((t) => t.url && updateBadge(t.id, t.url));
    });
  }
});
