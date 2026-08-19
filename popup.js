(function () {
  let masterEnabled = true;
  const masterKillSwitch = document.getElementById("masterKillSwitch");

  masterKillSwitch.addEventListener("change", () => {
    masterEnabled = masterKillSwitch.checked;
    chrome.storage.local.set({ masterEnabled });
  });

  chrome.storage.local.get(["masterEnabled"], (store) => {
    masterEnabled = store.masterEnabled !== undefined ? store.masterEnabled : true;
    masterKillSwitch.checked = masterEnabled;
  });
})();
