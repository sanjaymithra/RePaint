// Shared between content.js, background.js, and popup.js

const REPAINT_DEFAULT_PROFILES = {
  "news.ycombinator.com": {
    name: "Hacker News Synthwave",
    css: `/* Hacker News Synthwave Theme */
body {
  background-color: #0d071e !important;
  color: #f2eefc !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}
#hnmain {
  background-color: #160d33 !important;
  border: 1px solid rgba(0, 240, 255, 0.3) !important;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.15) !important;
  border-radius: 6px !important;
}
td[bgcolor="#ff6600"] {
  background-color: #21114a !important;
  border-bottom: 2px solid #ff2a85 !important;
}
a:link, a:visited {
  color: #00f0ff !important;
  text-decoration: none !important;
}
a:hover {
  color: #ff2a85 !important;
  text-shadow: 0 0 6px rgba(255, 42, 133, 0.6) !important;
}
.c00, .c00 a:link {
  color: #f2eefc !important;
}
.subtext, .subtext a:link, .subtext a:visited {
  color: #9d8db8 !important;
}
.pagetop, .pagetop a:link, .pagetop a:visited {
  color: #00f0ff !important;
  font-weight: bold !important;
}`,
    sourceUrl: "",
    enabled: true,
    updatedAt: Date.now()
  },
  "github.com": {
    name: "GitHub Cyber Neon",
    css: `/* GitHub Cyber Neon Highlights */
:root {
  --color-accent-fg: #00f0ff !important;
  --color-accent-emphasis: #ff2a85 !important;
}
body {
  background-color: #0a0518 !important;
}
.Header {
  background-color: #12082b !important;
  border-bottom: 1px solid rgba(0, 240, 255, 0.3) !important;
}
.btn-primary {
  background: linear-gradient(135deg, #ff2a85, #7b2cbf) !important;
  border: 1px solid #ff2a85 !important;
  box-shadow: 0 0 10px rgba(255, 42, 133, 0.4) !important;
}`,
    sourceUrl: "",
    enabled: false,
    updatedAt: Date.now()
  }
};

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
