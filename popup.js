(function () {
  let activeTabId = null;
  let activeHostname = "";
  let siteProfiles = {};
  let masterEnabled = true;
  let uploadedCssText = "";

  // DOM Elements
  const masterKillSwitch = document.getElementById("masterKillSwitch");
  const listView = document.getElementById("listView");
  const profilesList = document.getElementById("profilesList");
  const emptyState = document.getElementById("emptyState");
  const btnOpenAddModal = document.getElementById("btnOpenAddModal");

  const addModalView = document.getElementById("addModalView");
  const btnCancelModal = document.getElementById("btnCancelModal");
  const btnCancelAdd = document.getElementById("btnCancelAdd");
  const btnSaveAdd = document.getElementById("btnSaveAdd");
  const inputProfileName = document.getElementById("inputProfileName");
  const cssFileInput = document.getElementById("cssFileInput");
  const fileChosenLabel = document.getElementById("fileChosenLabel");

  // Safe tab message sender with auto-injection fallback
  async function sendMessageToTab(tabId, message) {
    if (!tabId) return null;
    try {
      return await chrome.tabs.sendMessage(tabId, message);
    } catch (err) {
      console.warn("[Repaint popup.js] Initial sendMessage failed; injecting content script:", err);
      try {
        await chrome.scripting.executeScript({
          target: { tabId },
          files: ["themes.js", "content.js"]
        });
        await new Promise((r) => setTimeout(r, 60));
        return await chrome.tabs.sendMessage(tabId, message);
      } catch (injectErr) {
        console.warn("[Repaint popup.js] Fallback injection failed (possibly restricted URL):", injectErr);
        return null;
      }
    }
  }

  function renderProfiles() {
    profilesList.innerHTML = "";
    const keys = Object.keys(siteProfiles);

    if (keys.length === 0) {
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    // Check matching profile for current active tab
    const activeMatch = repaintFindMatchingProfile(activeHostname, siteProfiles);

    keys.forEach((key) => {
      const p = siteProfiles[key];
      if (!p) return;

      const row = document.createElement("div");
      row.className = "profile-row";
      if (activeMatch && activeMatch.key === key) {
        row.classList.add("is-active-domain");
      }

      const isEnabled = p.enabled !== undefined ? !!p.enabled : true;

      row.innerHTML = `
        <div class="profile-row-left">
          <span class="profile-row-name" title="${escapeHTML(p.name || key)}">${escapeHTML(p.name || key)}</span>
        </div>
        <div class="profile-row-right">
          <label class="synth-toggle" title="Toggle ${escapeHTML(p.name || key)}">
            <input type="checkbox" class="profile-toggle-input" ${isEnabled ? "checked" : ""} />
            <span class="toggle-track">
              <span class="toggle-thumb">
                <span class="thumb-core"></span>
              </span>
            </span>
          </label>
          <button class="profile-del-btn" title="Delete Profile">✕</button>
        </div>
      `;

      // Profile Row Toggle
      const toggleInput = row.querySelector(".profile-toggle-input");
      toggleInput.addEventListener("change", () => {
        p.enabled = toggleInput.checked;
        p.updatedAt = Date.now();
        saveProfilesToStorage();

        // If this profile matches the current active tab, update live immediately
        if (activeMatch && activeMatch.key === key && activeTabId) {
          sendMessageToTab(activeTabId, {
            type: "REPAINT_PROFILE_APPLY",
            masterEnabled: masterKillSwitch.checked,
            enabled: p.enabled,
            css: p.css || "",
            key
          });
        }
      });

      // Delete Profile Button
      const delBtn = row.querySelector(".profile-del-btn");
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm(`Delete profile "${p.name || key}"?`)) {
          const wasActive = activeMatch && activeMatch.key === key;
          delete siteProfiles[key];
          saveProfilesToStorage();
          renderProfiles();

          if (wasActive && activeTabId) {
            sendMessageToTab(activeTabId, {
              type: "REPAINT_PROFILE_APPLY",
              masterEnabled: masterKillSwitch.checked,
              enabled: false,
              css: "",
              key
            });
          }
        }
      });

      profilesList.appendChild(row);
    });
  }

  function saveProfilesToStorage() {
    chrome.storage.local.set({ siteProfiles, masterEnabled: masterKillSwitch.checked }, () => {
      if (chrome.runtime.lastError) {
        console.error("[Repaint popup.js] Storage save error:", chrome.runtime.lastError);
      }
    });
  }

  function openAddModal() {
    uploadedCssText = "";
    cssFileInput.value = "";
    fileChosenLabel.textContent = "Choose a .css file...";

    const suggestedName = activeHostname && activeHostname !== "local-file" && activeHostname !== "unknown" && activeHostname !== "browser-internal"
      ? repaintGetSuggestedProfileName(activeHostname)
      : "";
    inputProfileName.value = suggestedName;

    listView.hidden = true;
    addModalView.hidden = false;
    inputProfileName.focus();
  }

  function closeAddModal() {
    addModalView.hidden = true;
    listView.hidden = false;
  }

  function handleFileSelection(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const sizeStr = file.size > 1024 ? (file.size / 1024).toFixed(1) + " KB" : file.size + " B";
    fileChosenLabel.textContent = `${file.name} (${sizeStr})`;

    const reader = new FileReader();
    reader.onload = (readEvent) => {
      uploadedCssText = readEvent.target.result || "";
    };
    reader.onerror = (err) => {
      console.error("[Repaint popup.js] File read error:", err);
      alert("Failed to read CSS file.");
    };
    reader.readAsText(file);
  }

  async function handleSaveNewProfile() {
    const name = inputProfileName.value.trim();
    if (!name) {
      alert("Please enter a profile name.");
      inputProfileName.focus();
      return;
    }

    if (!uploadedCssText || !uploadedCssText.trim()) {
      alert("Please select a valid .css file to upload.");
      return;
    }

    // Auto-bind to current active tab hostname
    let targetDomain = repaintCleanDomainKey(activeHostname);
    if (!targetDomain || targetDomain === "local-file" || targetDomain === "unknown" || targetDomain === "browser-internal") {
      targetDomain = name.toLowerCase().replace(/[^a-z0-9.-]/g, "-") + ".com";
    }
    const domainKey = targetDomain;

    siteProfiles[domainKey] = {
      name,
      css: uploadedCssText,
      enabled: true,
      updatedAt: Date.now()
    };

    saveProfilesToStorage();
    closeAddModal();
    renderProfiles();

    // Immediately inject live into active tab if matches
    if (activeTabId) {
      sendMessageToTab(activeTabId, {
        type: "REPAINT_PROFILE_APPLY",
        masterEnabled: masterKillSwitch.checked,
        enabled: true,
        css: uploadedCssText,
        key: domainKey
      });
    }
  }

  function escapeHTML(str) {
    return String(str || "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  // Master Kill-Switch Handler
  masterKillSwitch.addEventListener("change", () => {
    masterEnabled = masterKillSwitch.checked;
    saveProfilesToStorage();

    // Send update to active tab
    if (activeTabId) {
      const match = repaintFindMatchingProfile(activeHostname, siteProfiles);
      const isProfileOn = match && match.profile && match.profile.enabled;
      const shouldApply = masterEnabled && isProfileOn;

      sendMessageToTab(activeTabId, {
        type: "REPAINT_PROFILE_APPLY",
        masterEnabled,
        enabled: shouldApply,
        css: match && match.profile ? match.profile.css : "",
        key: match ? match.key : null
      });
    }
  });

  // Modal event listeners
  btnOpenAddModal.addEventListener("click", openAddModal);
  btnCancelModal.addEventListener("click", closeAddModal);
  btnCancelAdd.addEventListener("click", closeAddModal);
  btnSaveAdd.addEventListener("click", handleSaveNewProfile);
  cssFileInput.addEventListener("change", handleFileSelection);

  // Initialize popup
  async function init() {
    // 1. Get active tab URL and hostname
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs && tabs[0] && tabs[0].url) {
        activeTabId = tabs[0].id;
        if (/^(chrome|edge|brave|devtools|about|chrome-extension):\/\//i.test(tabs[0].url)) {
          activeHostname = "browser-internal";
        } else {
          activeHostname = repaintNormalizeHostname(tabs[0].url);
        }
      }
    } catch (e) {
      console.warn("[Repaint popup.js] Error querying active tab:", e);
    }

    // 2. Load profiles and masterEnabled state from storage
    chrome.storage.local.get(["siteProfiles", "masterEnabled"], (store) => {
      masterEnabled = store.masterEnabled !== undefined ? store.masterEnabled : true;
      masterKillSwitch.checked = masterEnabled;

      siteProfiles = store.siteProfiles || REPAINT_DEFAULT_PROFILES || {};
      renderProfiles();
    });

    // 3. Bind external credit links
    document.querySelectorAll(".credit-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = link.getAttribute("href");
        if (url) {
          chrome.tabs.create({ url });
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
