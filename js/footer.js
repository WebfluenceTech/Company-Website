/* Shared footer. Injected on subpages to keep markup DRY.
   index.html keeps its footer inline (works with JS disabled). */
(function () {
  "use strict";
  var root = document.getElementById("footer-root");
  if (!root) return;
  var year = new Date().getFullYear();
  root.outerHTML =
    '<footer class="footer"><div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a class="brand" href="index.html" aria-label="Meridian home">' +
            '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">' +
              '<rect x="0.5" y="0.5" width="31" height="31" rx="5.5" fill="none" stroke="currentColor" stroke-opacity="0.35"/>' +
              '<path d="M8 23V9l8 9 8-9v14" stroke="url(#mgf)" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
              '<defs><linearGradient id="mgf" x1="8" y1="9" x2="24" y2="23" gradientUnits="userSpaceOnUse"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>' +
            '</svg><span class="brand-name">Meridian</span></a>' +
          '<p class="footer-tag">Senior software engineering.<br>San Francisco · New York.</p>' +
          '<p class="footer-status"><span class="dot ok pulse"></span>All systems operational</p>' +
        '</div>' +
        '<nav class="footer-col" aria-label="Services"><h3>Services</h3>' +
          '<a href="service-ai.html">AI &amp; Machine Learning</a>' +
          '<a href="service-saas.html">SaaS Products</a>' +
          '<a href="service-enterprise.html">Enterprise Platforms</a>' +
          '<a href="service-mobile.html">Web &amp; Mobile</a>' +
          '<a href="service-cloud.html">Cloud &amp; DevOps</a>' +
          '<a href="service-automation.html">Automation</a></nav>' +
        '<nav class="footer-col" aria-label="Company"><h3>Company</h3>' +
          '<a href="about.html">About</a>' +
          '<a href="index.html#process">How we work</a>' +
          '<a href="work.html">Selected work</a>' +
          '<a href="about.html#careers">Careers</a>' +
          '<a href="index.html#contact">Contact</a></nav>' +
        '<nav class="footer-col" aria-label="Resources"><h3>Resources</h3>' +
          '<a href="index.html#platform">Engineering standards</a>' +
          '<a href="work.html">Case studies</a>' +
          '<a href="index.html#contact">Start a project</a>' +
          '<a href="mailto:press@meridian.engineering">Press &amp; partnerships</a>' +
          '<a href="https://github.com/WebfluenceTech/Company-Website" target="_blank" rel="noopener">View source on GitHub ↗</a></nav>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<p>© ' + year + ' Meridian Systems, Inc. · 588 Townsend St, San Francisco, CA</p>' +
        '<p class="footer-disclosure"><sup>*</sup>Meridian is a fictional company. A brand, product &amp; engineering design study. All clients, people, and metrics are invented.</p>' +
      '</div>' +
    '</div></footer>';
})();
