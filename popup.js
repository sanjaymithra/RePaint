(function () {
  let activeHostname = "";
  let siteProfiles = {};
  let masterEnabled = true;

  const masterKillSwitch = document.getElementById("masterKillSwitch");
  const profilesList = document.getElementById("profilesList");

  function escapeHTML(str) {
    return String(str || "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  function renderProfiles() {
    profilesList.innerHTML = "";
    const keys = Object.keys(siteProfiles);
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
        </div>
      `;

      const toggleInput = row.querySelector(".profile-toggle-input");
      toggleInput.addEventListener("change", () => {
        p.enabled = toggleInput.checked;
        p.updatedAt = Date.now();
        chrome.storage.local.set({ siteProfiles });
      });

      profilesList.appendChild(row);
    });
  }

  masterKillSwitch.addEventListener("change", () => {
    masterEnabled = masterKillSwitch.checked;
    chrome.storage.local.set({ masterEnabled });
  });

  chrome.storage.local.get(["siteProfiles", "masterEnabled"], (store) => {
    masterEnabled = store.masterEnabled !== undefined ? store.masterEnabled : true;
    masterKillSwitch.checked = masterEnabled;
    siteProfiles = store.siteProfiles || REPAINT_DEFAULT_PROFILES || {};
    renderProfiles();
  });
})();
