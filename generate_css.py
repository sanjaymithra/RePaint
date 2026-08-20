import os

with open('/Users/sanjay/Downloads/repaint/joi_b64.txt', 'r') as f:
    joi_data_uri = f.read().strip()

css = f"""/* ==========================================================================
   REPAINT: BLADE RUNNER 2049 — NEON_LINK WITH HOLOGRAPHIC JOI
   Visual Source of Truth: Stitch "NEON_LINK - Holographic Feed" Design System
   Structural Target: Real Instagram DOM
   ========================================================================== */

/* ==========================================================================
   1. DESIGN TOKENS & SYSTEM VARIABLES
   ========================================================================== */
:root,
html,
body {{
  /* Atmospheric Palette */
  --nl-void-navy: #08081a;
  --nl-midnight-blue: #0d0d26;
  --nl-background: #131317;
  --nl-surface: rgba(19, 19, 23, 0.80);
  --nl-surface-lowest: rgba(14, 14, 18, 0.65);
  --nl-surface-low: rgba(27, 27, 31, 0.45);
  --nl-surface-container: rgba(31, 31, 35, 0.60);
  --nl-surface-high: #2a292e;

  /* Accent & Lighting Tokens */
  --nl-cyan-primary: #00dce6;
  --nl-cyan-glow: #00f3ff;
  --nl-cyan-tint: #e3fdff;
  --nl-magenta-secondary: #e1005a;
  --nl-magenta-glow: #ffb6c1;
  --nl-tertiary-violet: #6a5980;

  /* Glass & Outlines */
  --nl-glass-stroke: rgba(0, 243, 255, 0.12);
  --nl-glass-stroke-hover: rgba(0, 243, 255, 0.28);
  --nl-glass-stroke-magenta: rgba(225, 0, 90, 0.20);
  --nl-card-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  --nl-ambient-cyan: 0 0 20px rgba(0, 243, 255, 0.08);

  /* Typography Colors */
  --nl-text-primary: #e5e1e7;
  --nl-text-secondary: #b9cacb;
  --nl-text-muted: #849495;
  --nl-text-dim: rgba(229, 225, 231, 0.50);

  /* Instagram Native Semantic Variable Mappings */
  --ig-primary-background: 8, 8, 26 !important;
  --ig-secondary-background: 13, 13, 38 !important;
  --ig-elevated-background: 19, 19, 23 !important;
  --ig-highlight-background: 38, 38, 45 !important;
  --ig-primary-text: 229, 225, 231 !important;
  --ig-secondary-text: 185, 202, 203 !important;
  --ig-stroke: 0, 220, 230 !important;
  --ig-border-color: 0, 243, 255 !important;
  --ig-link: 0, 220, 230 !important;
  --ig-badge: 225, 0, 90 !important;
  --ig-banner-background: 19, 19, 23 !important;
  --always-black: 8, 8, 26 !important;
  --always-white: 229, 225, 231 !important;
  --web-always-black: 8, 8, 26 !important;
  --web-always-white: 229, 225, 231 !important;
  --barcelona-primary-background: 8, 8, 26 !important;
  --barcelona-secondary-background: 13, 13, 38 !important;
  --desktop-nav-background: 19, 19, 23 !important;

  color-scheme: dark !important;
}}

/* ==========================================================================
   2. GLOBAL ENVIRONMENT & TYPOGRAPHY
   ========================================================================== */
body,
input,
textarea,
button,
select,
[role="button"],
span, p, a, h1, h2, h3, h4, h5, h6, time, label {{
  font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
}}

html {{
  background-color: var(--nl-void-navy) !important;
  scroll-behavior: smooth !important;
}}

body {{
  background-color: var(--nl-void-navy) !important;
  background-image:
    radial-gradient(circle at 12% 35%, rgba(225, 0, 90, 0.18) 0%, transparent 50%),
    radial-gradient(circle at 88% 75%, rgba(0, 243, 255, 0.14) 0%, transparent 52%),
    radial-gradient(circle at 50% 10%, rgba(13, 13, 38, 0.8) 0%, transparent 60%),
    linear-gradient(175deg, #08081a 0%, #0d0d26 40%, #131317 100%) !important;
  background-attachment: fixed !important;
  color: var(--nl-text-primary) !important;
  min-height: 100vh !important;
  overflow-x: hidden !important;
}}

/* ==========================================================================
   3. HOLOGRAPHIC JOI BACKGROUND LAYER (PROMINENT ON MIDDLE-LEFT)
   ========================================================================== */
@keyframes joiHoloAtmosphere {{
  0%, 100% {{
    opacity: 0.52;
    filter: drop-shadow(0 0 30px rgba(225, 0, 90, 0.75)) drop-shadow(0 0 60px rgba(0, 243, 255, 0.50)) contrast(125%) brightness(112%);
    transform: translateY(-50%) translate3d(0, 0, 0);
  }}
  50% {{
    opacity: 0.62;
    filter: drop-shadow(0 0 45px rgba(225, 0, 90, 0.95)) drop-shadow(0 0 85px rgba(0, 243, 255, 0.65)) contrast(135%) brightness(120%);
    transform: translateY(-50%) translate3d(3px, -2px, 0);
  }}
}}

body::before {{
  content: "" !important;
  position: fixed !important;
  top: 50% !important;
  left: 0 !important;
  transform: translateY(-50%) !important;
  width: 580px !important;
  height: 520px !important;
  background-image: url("{joi_data_uri}") !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center left !important;
  z-index: 0 !important;
  pointer-events: none !important;
  mix-blend-mode: screen !important;
  opacity: 0.55 !important;
  animation: joiHoloAtmosphere 8s ease-in-out infinite !important;
  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 98%),
                      linear-gradient(to top, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%),
                      linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%) !important;
  mask-image: linear-gradient(to right, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 98%) !important;
  will-change: transform, opacity !important;
}}

/* Atmospheric Film Grain */
body::after {{
  content: "" !important;
  position: fixed !important;
  top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
  pointer-events: none !important;
  z-index: 99999 !important;
  opacity: 0.035 !important;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E") !important;
}}

/* Universal Selection Highlight */
::selection {{
  background: rgba(0, 220, 230, 0.3) !important;
  color: var(--nl-cyan-tint) !important;
}}

/* Clear Meta's internal container solid blacks so Joi shines through */
div[id^="mount"],
main,
section,
[role="main"],
[role="feed"],
div[role="presentation"]:not([role="dialog"] *) {{
  background-color: transparent !important;
}}

/* ==========================================================================
   4. SIDEBAR NAVIGATION DOCK (LEVEL 1: TRANSLUCENT GLASS)
   ========================================================================== */
nav,
[role="navigation"],
div[aria-label="Navigation"],
aside:not([role="complementary"]) {{
  background: rgba(19, 19, 23, 0.82) !important;
  backdrop-filter: blur(40px) saturate(130%) !important;
  -webkit-backdrop-filter: blur(40px) saturate(130%) !important;
  border-right: 1px solid var(--nl-glass-stroke) !important;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5) !important;
  z-index: 50 !important;
}}

/* Brand Logo (NEON_LINK / Instagram) */
nav svg[aria-label="Instagram"],
nav header svg {{
  color: var(--nl-cyan-primary) !important;
  filter: drop-shadow(0 0 8px rgba(0, 220, 230, 0.45)) !important;
}}

/* Navigation Links */
nav a,
nav div[role="button"],
nav div[tabindex="0"] {{
  color: var(--nl-text-secondary) !important;
  border-radius: 10px !important;
  margin: 3px 0 !important;
  padding: 10px 14px !important;
  border-left: 2px solid transparent !important;
  transition: all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
}}

/* Active Navigation Tab */
nav a[aria-current="page"],
nav a[href="/"],
nav a.active-link {{
  color: var(--nl-cyan-primary) !important;
  font-weight: 600 !important;
  background: rgba(0, 220, 230, 0.08) !important;
  border-left: 2px solid var(--nl-cyan-primary) !important;
  box-shadow: inset 0 0 12px rgba(0, 220, 230, 0.06) !important;
}}

/* Nav Item Hover: Subtle Micro-Elevation */
nav a:hover,
nav div[role="button"]:hover,
nav div[tabindex="0"]:hover {{
  color: var(--nl-cyan-tint) !important;
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(12px) !important;
  border-left: 2px solid rgba(0, 220, 230, 0.7) !important;
  transform: translateX(3px) translate3d(0, 0, 0) !important;
  box-shadow: 0 0 16px rgba(0, 243, 255, 0.12) !important;
}}

nav svg {{
  color: inherit !important;
  fill: currentColor !important;
  transition: all 0.2s ease !important;
}}

/* Notification Dot */
nav div[style*="background-color: rgb(255, 48, 64)"],
nav span[style*="background-color: rgb(255, 48, 64)"],
nav div[class*="x1n2onr6"] {{
  background-color: var(--nl-magenta-secondary) !important;
  box-shadow: 0 0 8px rgba(225, 0, 90, 0.8) !important;
}}

/* ==========================================================================
   5. STORIES MODULE (LEVEL 3: SUBTLE GLASSMORPHISM TRAY)
   ========================================================================== */
main div[style*="overflow-x"],
div[role="menu"] {{
  background: var(--nl-surface-low) !important;
  backdrop-filter: blur(30px) saturate(120%) !important;
  -webkit-backdrop-filter: blur(30px) saturate(120%) !important;
  border: 1px solid var(--nl-glass-stroke) !important;
  border-radius: 16px !important;
  padding: 12px 14px !important;
  margin-bottom: 24px !important;
  box-shadow: var(--nl-card-shadow) !important;
}}

/* Story Avatar Gradient Ring */
ul li div[role="button"] {{
  background: transparent !important;
  border: none !important;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
}}

ul li div[role="button"]:hover {{
  transform: translateY(-2px) scale(1.04) !important;
}}

ul li img,
main canvas {{
  border-radius: 50% !important;
  border: 2px solid transparent !important;
  box-shadow: 0 0 0 2px var(--nl-void-navy), 0 0 12px rgba(0, 243, 255, 0.35) !important;
  transition: box-shadow 0.25s ease !important;
}}

ul li div[role="button"]:hover img {{
  box-shadow: 0 0 0 2px var(--nl-void-navy), 0 0 18px rgba(0, 243, 255, 0.6), 0 0 28px rgba(225, 0, 90, 0.3) !important;
}}

ul li span,
ul li a span {{
  color: var(--nl-text-secondary) !important;
  font-size: 11px !important;
  letter-spacing: 0.05em !important;
  font-weight: 500 !important;
}}

/* ==========================================================================
   6. FEED POSTS — LEVEL 2: CINEMATIC GLASS CARDS (EXACT STITCH TARGET)
   ========================================================================== */
article {{
  background: var(--nl-surface-lowest) !important;
  backdrop-filter: blur(40px) saturate(130%) !important;
  -webkit-backdrop-filter: blur(40px) saturate(130%) !important;
  border: 1px solid var(--nl-glass-stroke) !important;
  border-radius: 20px !important;
  margin-bottom: 28px !important;
  position: relative !important;
  overflow: hidden !important;
  box-shadow: var(--nl-card-shadow), var(--nl-ambient-cyan) !important;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease !important;
}}

/* Subtle 0.2-1° Micro-Elevation & Restrained Underglow on Hover */
article:hover {{
  transform: translateY(-2px) scale(1.002) translate3d(0, 0, 0) !important;
  border-color: var(--nl-glass-stroke-hover) !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55),
              0 0 24px rgba(0, 243, 255, 0.16),
              0 0 45px rgba(225, 0, 90, 0.08) !important;
}}

/* Post Header */
article header {{
  background: transparent !important;
  border-bottom: 1px solid rgba(0, 243, 255, 0.08) !important;
  padding: 14px 18px !important;
}}

article header h3,
article header a span,
article header span {{
  color: var(--nl-text-primary) !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em !important;
}}

article header a:hover span {{
  color: var(--nl-cyan-primary) !important;
  transition: color 0.2s ease !important;
}}

/* Post Media: Clean, undisturbed high-resolution display */
article img,
article video {{
  border-radius: 0px !important;
  filter: contrast(104%) saturate(108%) brightness(98%) !important;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.3s ease !important;
}}

article:hover img {{
  transform: scale(1.008) !important;
  filter: contrast(106%) saturate(112%) brightness(100%) !important;
}}

/* ==========================================================================
   7. INTERACTIVE ACTION CONTROLS (LEVEL 4: SUBTLE LIGHTING FEEDBACK)
   ========================================================================== */
article section {{
  padding: 12px 16px !important;
  background: transparent !important;
}}

article section button,
article section div[role="button"],
div[aria-label*="Reel"] div[role="button"],
div[role="dialog"] button,
div[role="dialog"] div[role="button"] {{
  color: var(--nl-text-primary) !important;
  background: transparent !important;
  border: 1px solid transparent !important;
  border-radius: 8px !important;
  padding: 6px !important;
  margin: 0 2px !important;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
  cursor: pointer !important;
}}

/* Action Button Hover: Clean Cyan Illumination (Restrained, not bulky) */
article section button:hover,
article section div[role="button"]:hover,
div[aria-label*="Reel"] div[role="button"]:hover,
div[role="dialog"] button:hover {{
  color: var(--nl-cyan-primary) !important;
  background: rgba(0, 243, 255, 0.08) !important;
  border-color: rgba(0, 243, 255, 0.22) !important;
  box-shadow: 0 0 12px rgba(0, 243, 255, 0.30) !important;
  transform: translateY(-1px) scale(1.08) !important;
}}

/* Heart Button: Magenta Glow */
article section button:hover svg[aria-label="Like"],
article section div[role="button"]:hover svg[aria-label="Like"] {{
  color: var(--nl-magenta-secondary) !important;
  filter: drop-shadow(0 0 8px rgba(225, 0, 90, 0.6)) !important;
}}

/* Liked State Heart */
svg[aria-label="Unlike"] {{
  color: var(--nl-magenta-secondary) !important;
  fill: var(--nl-magenta-secondary) !important;
  filter: drop-shadow(0 0 10px rgba(225, 0, 90, 0.8)) !important;
}}

/* Carousel Chevrons */
button[aria-label="Next"],
button[aria-label="Go back"],
button._afxw,
button._afxx {{
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: rgba(19, 19, 23, 0.85) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid var(--nl-glass-stroke) !important;
  color: var(--nl-cyan-primary) !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 243, 255, 0.2) !important;
  border-radius: 50% !important;
  width: 36px !important;
  height: 36px !important;
  z-index: 30 !important;
  pointer-events: auto !important;
  cursor: pointer !important;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
}}

button[aria-label="Next"]:hover,
button[aria-label="Go back"]:hover {{
  background: rgba(0, 243, 255, 0.18) !important;
  border-color: var(--nl-cyan-primary) !important;
  box-shadow: 0 0 18px rgba(0, 243, 255, 0.55), 0 0 30px rgba(225, 0, 90, 0.25) !important;
  transform: scale(1.1) !important;
}}

/* ==========================================================================
   8. REELS & VIDEO PLAYBACK (SEAMLESS UNBLOCKED VIEWPORT)
   ========================================================================== */
main div[style*="aspect-ratio"] video,
div[role="main"] video,
video,
div[aria-label*="Reel"] video {{
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  background: transparent !important;
  z-index: 2 !important;
}}

div[aria-label*="Reel"] {{
  border-radius: 16px !important;
  overflow: hidden !important;
  box-shadow: var(--nl-card-shadow) !important;
}}

/* Reels Floating Action Stack */
div[aria-label*="Reel"] div[role="button"] {{
  background: rgba(19, 19, 23, 0.70) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid var(--nl-glass-stroke) !important;
  border-radius: 50% !important;
  width: 44px !important;
  height: 44px !important;
  margin-bottom: 12px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
}}

div[aria-label*="Reel"] div[role="button"]:hover {{
  border-color: var(--nl-cyan-primary) !important;
  box-shadow: 0 0 16px rgba(0, 243, 255, 0.5) !important;
  transform: scale(1.08) !important;
}}

/* ==========================================================================
   9. DIRECT MESSAGES / CHAT TERMINAL
   ========================================================================== */
div[role="listitem"] {{
  border-bottom: 1px solid rgba(0, 243, 255, 0.08) !important;
  background: transparent !important;
  border-radius: 10px !important;
  transition: all 0.2s ease !important;
}}

div[role="listitem"]:hover {{
  background: rgba(0, 243, 255, 0.05) !important;
  border-left: 2px solid var(--nl-cyan-primary) !important;
  transform: translateX(2px) !important;
}}

/* Sent Message Bubbles (Subtle Cyan-to-Magenta Glass Gradient) */
div[dir="auto"][style*="background-color: rgb(55, 151, 240)"],
div[dir="auto"][style*="background-color: rgb(0, 149, 246)"] {{
  background: linear-gradient(135deg, rgba(0, 220, 230, 0.28), rgba(225, 0, 90, 0.20)) !important;
  border: 1px solid rgba(0, 243, 255, 0.22) !important;
  color: var(--nl-text-primary) !important;
  border-radius: 18px 18px 4px 18px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 12px rgba(0, 243, 255, 0.12) !important;
}}

/* Received Message Bubbles (Frosted Dark Glass) */
div[dir="auto"][style*="background-color: rgb(38, 38, 38)"],
div[dir="auto"][style*="background-color: rgb(46, 46, 46)"] {{
  background: rgba(27, 27, 31, 0.75) !important;
  backdrop-filter: blur(15px) !important;
  border: 1px solid var(--nl-glass-stroke) !important;
  color: var(--nl-text-secondary) !important;
  border-radius: 18px 18px 18px 4px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
}}

/* Chat Input Field */
div[role="textbox"],
input[placeholder*="Search"],
input[placeholder*="Message"] {{
  background: rgba(14, 14, 18, 0.85) !important;
  color: var(--nl-text-primary) !important;
  border: 1px solid var(--nl-glass-stroke) !important;
  border-radius: 24px !important;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.5) !important;
  transition: all 0.22s ease !important;
}}

div[role="textbox"]:focus-within,
input:focus {{
  border-color: var(--nl-cyan-primary) !important;
  box-shadow: 0 0 14px rgba(0, 243, 255, 0.35), inset 0 2px 8px rgba(0, 0, 0, 0.5) !important;
}}

/* ==========================================================================
   10. PROFILE PAGE & USER CONTROLS
   ========================================================================== */
header img[crossorigin="anonymous"],
img[alt*="profile picture"],
img[alt*="'s profile picture"] {{
  border-radius: 50% !important;
  border: 2px solid var(--nl-cyan-primary) !important;
  box-shadow:
    0 0 0 3px var(--nl-void-navy),
    0 0 0 5px rgba(0, 243, 255, 0.3),
    0 0 20px rgba(0, 243, 255, 0.35),
    0 0 35px rgba(225, 0, 90, 0.2) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}}

header img[crossorigin="anonymous"]:hover {{
  transform: scale(1.05) !important;
  box-shadow:
    0 0 0 3px var(--nl-void-navy),
    0 0 0 6px var(--nl-cyan-primary),
    0 0 28px rgba(0, 243, 255, 0.6),
    0 0 50px rgba(225, 0, 90, 0.35) !important;
}}

/* Primary Profile Buttons (Edit Profile, Follow, Sync) */
header section button,
header section a[role="button"],
button._acan,
button._acap {{
  background: rgba(0, 220, 230, 0.12) !important;
  color: var(--nl-cyan-tint) !important;
  border: 1px solid rgba(0, 243, 255, 0.35) !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  padding: 8px 18px !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
  cursor: pointer !important;
}}

header section button:hover,
header section a[role="button"]:hover,
button._acan:hover,
button._acap:hover {{
  background: rgba(0, 220, 230, 0.24) !important;
  border-color: var(--nl-cyan-primary) !important;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.5), 0 0 35px rgba(225, 0, 90, 0.25) !important;
  transform: translateY(-1px) !important;
}}

/* ==========================================================================
   11. RIGHT COLUMN (LEVEL 3: SUGGESTED CONNECTIONS MODULE)
   ========================================================================== */
div[role="complementary"],
aside.lg\\:flex {{
  background: var(--nl-surface-low) !important;
  backdrop-filter: blur(30px) !important;
  -webkit-backdrop-filter: blur(30px) !important;
  border: 1px solid var(--nl-glass-stroke) !important;
  border-radius: 20px !important;
  padding: 20px !important;
  box-shadow: var(--nl-card-shadow) !important;
  transition: all 0.3s ease !important;
}}

div[role="complementary"]:hover {{
  border-color: var(--nl-glass-stroke-hover) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), var(--nl-ambient-cyan) !important;
}}

/* Switch & Follow CTA buttons */
div[role="complementary"] button {{
  color: var(--nl-cyan-primary) !important;
  font-weight: 600 !important;
  transition: all 0.2s ease !important;
}}

div[role="complementary"] button:hover {{
  color: var(--nl-cyan-tint) !important;
  text-shadow: 0 0 8px rgba(0, 243, 255, 0.6) !important;
}}

/* ==========================================================================
   12. MODALS, DIALOGS & OVERLAYS (LEVEL 5: OPAQUE FROSTED COVER)
   ========================================================================== */
div[role="dialog"],
div[aria-modal="true"] {{
  background-color: rgba(14, 14, 18, 0.94) !important;
  backdrop-filter: blur(40px) saturate(140%) !important;
  -webkit-backdrop-filter: blur(40px) saturate(140%) !important;
  border: 1px solid var(--nl-glass-stroke-hover) !important;
  border-radius: 20px !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.85),
              0 0 35px rgba(0, 243, 255, 0.18),
              0 0 70px rgba(225, 0, 90, 0.10) !important;
  z-index: 1000 !important;
}}

/* ==========================================================================
   13. REFINED SCROLLBAR
   ========================================================================== */
::-webkit-scrollbar {{
  width: 8px !important;
  height: 8px !important;
}}
::-webkit-scrollbar-track {{
  background: rgba(19, 19, 23, 0.5) !important;
}}
::-webkit-scrollbar-thumb {{
  background: rgba(0, 243, 255, 0.20) !important;
  border-radius: 4px !important;
  transition: background 0.2s ease !important;
}}
::-webkit-scrollbar-thumb:hover {{
  background: rgba(0, 243, 255, 0.45) !important;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.6) !important;
}}

/* ==========================================================================
   14. REDUCED MOTION PREFERENCE (PERFORMANCE & ACCESSIBILITY)
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {{
  body::before,
  body::after,
  article,
  button,
  nav a {{
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }}
}}
"""

with open('/Users/sanjay/Downloads/repaint/instagram-gameboy.css', 'w') as out:
    out.write(css)

print('Updated instagram-gameboy.css with prominent Joi hologram background layer!')
