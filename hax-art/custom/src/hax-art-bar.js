/**
 * Copyright 2026 The Pennsylvania State University
 * @license Apache-2.0, see LICENSE for full text.
 */

/**
 * Puts the HAX network bar across the top of art.hax.cloud with Art as the
 * current property. It lives on the body, above the site, so it survives
 * theme changes.
 *
 * glossy-portfolio-theme pins its header to the top of the window. The bar
 * stays pinned above it and keeps --haxcms-top-offset on the page at its
 * height, the room a page keeps above everything else (the HAXcms editor
 * bar already sits under it). The theme's header is moved down by the same
 * amount, so the two never overlap.
 *
 * The bar is imported here, not up front, so the rest of this site's code
 * still runs if it can't load.
 */
const HEADER_OFFSET = `
  glossy-portfolio-header {
    top: var(--haxcms-top-offset, 0px);
  }
`;

/** move glossy's fixed header under the bar, once the theme has rendered */
function offsetThemeHeader() {
  const theme = globalThis.document.querySelector("glossy-portfolio-theme");
  if (!theme || !theme.shadowRoot || theme.__haxArtBarOffset) {
    return;
  }
  theme.__haxArtBarOffset = true;
  const sheet = new globalThis.CSSStyleSheet();
  sheet.replaceSync(HEADER_OFFSET);
  theme.shadowRoot.adoptedStyleSheets = [
    ...theme.shadowRoot.adoptedStyleSheets,
    sheet,
  ];
}

/** keep the bar's height on the page as --haxcms-top-offset */
function trackHeight(bar) {
  const root = globalThis.document.documentElement;
  const size = () => {
    const height = Math.ceil(bar.getBoundingClientRect().height);
    if (height > 0) {
      root.style.setProperty("--haxcms-top-offset", `${height}px`);
    }
  };
  if (globalThis.ResizeObserver) {
    new globalThis.ResizeObserver(size).observe(bar);
  }
  size();
}

function addBar() {
  if (globalThis.document.querySelector("hax-network-bar")) {
    return;
  }
  const bar = globalThis.document.createElement("hax-network-bar");
  bar.setAttribute("current", "art");
  bar.style.display = "block";
  bar.style.position = "sticky";
  bar.style.top = "0";
  // over the theme's pinned header (--ddd-z-sticky) and its content
  bar.style.zIndex = "1000";
  globalThis.document.body.insertBefore(bar, globalThis.document.body.firstChild);
  trackHeight(bar);
  offsetThemeHeader();
  // the theme renders after this file runs; catch it when it does
  globalThis.customElements
    .whenDefined("glossy-portfolio-theme")
    .then(() => globalThis.requestAnimationFrame(offsetThemeHeader));
  globalThis.addEventListener("haxcms-theme-ready", offsetThemeHeader);
}

import("@haxtheweb/hax-network-bar/hax-network-bar.js")
  .then(() => {
    if (globalThis.document.body) {
      addBar();
    } else {
      globalThis.addEventListener("DOMContentLoaded", addBar, { once: true });
    }
  })
  .catch(() => {});
