/**
 * Copyright 2026 The Pennsylvania State University
 * @license Apache-2.0, see LICENSE for full text.
 */const a=`
  glossy-portfolio-header {
    top: var(--haxcms-top-offset, 0px);
  }
`;function o(){const e=globalThis.document.querySelector("glossy-portfolio-theme");if(!e||!e.shadowRoot||e.__haxArtBarOffset)return;e.__haxArtBarOffset=!0;const t=new globalThis.CSSStyleSheet;t.replaceSync(a),e.shadowRoot.adoptedStyleSheets=[...e.shadowRoot.adoptedStyleSheets,t]}function r(e){const t=globalThis.document.documentElement,s=()=>{const l=Math.ceil(e.getBoundingClientRect().height);l>0&&t.style.setProperty("--haxcms-top-offset",`${l}px`)};globalThis.ResizeObserver&&new globalThis.ResizeObserver(s).observe(e),s()}function n(){if(globalThis.document.querySelector("hax-network-bar"))return;const e=globalThis.document.createElement("hax-network-bar");e.setAttribute("current","art"),e.style.display="block",e.style.position="sticky",e.style.top="0",e.style.zIndex="1000",globalThis.document.body.insertBefore(e,globalThis.document.body.firstChild),r(e),o(),globalThis.customElements.whenDefined("glossy-portfolio-theme").then(()=>globalThis.requestAnimationFrame(o)),globalThis.addEventListener("haxcms-theme-ready",o)}import("@haxtheweb/hax-network-bar/hax-network-bar.js").then(()=>{globalThis.document.body?n():globalThis.addEventListener("DOMContentLoaded",n,{once:!0})}).catch(()=>{}),import("@haxtheweb/haxcms-elements/lib/core/ui/haxcms-goggles-site.js").then(e=>{e&&typeof e.siteGoggles=="function"&&e.siteGoggles()}).catch(()=>{});
