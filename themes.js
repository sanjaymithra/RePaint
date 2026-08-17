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

function repaintGetSuggestedProfileName(hostname) {
  const host = repaintCleanDomainKey(hostname);
  if (!host || host === "local-file") return "Local Page";

  const knownBrands = {
    "linkedin.com": "LinkedIn",
    "youtube.com": "YouTube",
    "github.com": "GitHub",
    "twitter.com": "Twitter",
    "x.com": "X (Twitter)",
    "reddit.com": "Reddit",
    "facebook.com": "Facebook",
    "instagram.com": "Instagram",
    "wikipedia.org": "Wikipedia",
    "news.ycombinator.com": "Hacker News",
    "notion.so": "Notion",
    "medium.com": "Medium",
    "stackoverflow.com": "Stack Overflow",
    "twitch.tv": "Twitch",
    "discord.com": "Discord"
  };

  if (knownBrands[host]) {
    return knownBrands[host];
  }

  // Remove common subdomains (www, m, mobile, api, web)
  const cleanHost = host.replace(/^(www\.|m\.|mobile\.|app\.|web\.)/, "");
  const parts = cleanHost.split(".");
  let namePart = parts[0];
  if (parts.length >= 2 && parts[0] !== "co" && parts[0] !== "com") {
    namePart = parts[0];
  }

  return namePart.charAt(0).toUpperCase() + namePart.slice(1);
}
