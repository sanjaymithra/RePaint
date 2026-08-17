// Shared between content.js, background.js, and popup.js

function repaintNormalizeHostname(raw) {
  if (!raw) return "local-file";
  try {
    let target = String(raw).trim();
    if (target.includes("://")) {
      const u = new URL(target);
      if (u.protocol === "file:") return "local-file";
      target = u.hostname || "local-file";
    }
    // Remove port if present
    target = target.split(":")[0].toLowerCase().trim();
    // Strip leading www.
    target = target.replace(/^www\./, "");
    return target || "local-file";
  } catch (e) {
    return "unknown";
  }
}

function repaintCleanDomainKey(domain) {
  if (!domain) return "";
  let clean = String(domain).toLowerCase().trim();
  // Remove protocol
  clean = clean.replace(/^[a-z]+:\/\//, "");
  // Remove path and query and port
  clean = clean.split("/")[0].split("?")[0].split("#")[0].split(":")[0];
  // Remove leading wildcards, dots, and www.
  clean = clean.replace(/^\*\./, "").replace(/^\.+/, "").replace(/^www\./, "");
  return clean;
}
