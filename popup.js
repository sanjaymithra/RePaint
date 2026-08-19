(function () {
  let activeTabId = null;
  let activeHostname = "";
  let siteProfiles = {};
  let masterEnabled = true;
  let uploadedCssText = "";

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

  function escapeHTML(str) {
    return String(str || "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  function renderProfiles() {
    profilesList.innerHTML = "";
    const keys = Object.keys(siteProfiles);

    if (keys.length === 0) {
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

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

      const toggleInput = row.querySelector(".profile-toggle-input");
      toggleInput.addEventListener("change", () => {
        p.enabled = toggleInput.checked;
        p.updatedAt = Date.now();
        chrome.storage.local.set({ siteProfiles, masterEnabled: masterKillSwitch.checked });
      });

      const delBtn = row.querySelector(".profile-del-btn");
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm(`Delete profile "${p.name || key}"?`)) {
          delete siteProfiles[key];
          chrome.storage.local.set({ siteProfiles, masterEnabled: masterKillSwitch.checked });
          renderProfiles();
        }
      });

      profilesList.appendChild(row);
    });
  }

  function openAddModal() {
    uploadedCssText = "";
    cssFileInput.value = "";
    fileChosenLabel.textContent = "Choose a .css file...";
    listView.hidden = true;
    addModalView.hidden = false;
  }

  function closeAddModal() {
    addModalView.hidden = true;
    listView.hidden = false;
  }

  btnOpenAddModal.addEventListener("click", openAddModal);
  btnCancelModal.addEventListener("click", closeAddModal);
  btnCancelAdd.addEventListener("click", closeAddModal);

  chrome.storage.local.get(["siteProfiles", "masterEnabled"], (store) => {
    masterEnabled = store.masterEnabled !== undefined ? store.masterEnabled : true;
    masterKillSwitch.checked = masterEnabled;
    siteProfiles = store.siteProfiles || REPAINT_DEFAULT_PROFILES || {};
    renderProfiles();
  });
})();
