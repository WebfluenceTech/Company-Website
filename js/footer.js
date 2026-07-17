/* Shared footer — injected on subpages to keep markup DRY.
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
              '<rect width="32" height="32" rx="8" fill="currentColor" opacity="0.08"/>' +
              '<path d="M8 23V9l8 9 8-9v14" stroke="url(#mgf)" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
              '<defs><linearGradient id="mgf" x1="8" y1="9" x2="24" y2="23" gradientUnits="userSpaceOnUse"><stop stop-color="#4cd6ff"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs>' +
            '</svg><span class="brand-name">Meridian</span></a>' +
          '<p class="footer-tag">Senior software engineering.<br>San Francisco · New York.</p>' +
          '<p class="footer-status"><span class="dot ok pulse"></span>All systems operational</p>' +
        '</div>' +
        '<nav class="footer-col" aria-label="Capabilities"><h4>Capabilities</h4>' +
          '<a href="index.html#capabilities">AI &amp; Machine Learning</a>' +
          '<a href="index.html#capabilities">SaaS Products</a>' +
          '<a href="index.html#capabilities">Enterprise Platforms</a>' +
          '<a href="index.html#capabilities">Web &amp; Mobile</a>' +
          '<a href="index.html#capabilities">Cloud &amp; DevOps</a>' +
          '<a href="index.html#capabilities">Automation</a></nav>' +
        '<nav class="footer-col" aria-label="Company"><h4>Company</h4>' +
          '<a href="about.html">About</a>' +
          '<a href="index.html#process">How we work</a>' +
          '<a href="work.html">Selected work</a>' +
          '<a href="about.html#careers">Careers</a>' +
          '<a href="index.html#contact">Contact</a></nav>' +
        '<nav class="footer-col" aria-label="Resources"><h4>Resources</h4>' +
          '<a href="index.html#platform">Engineering standards</a>' +
          '<a href="work.html">Case studies</a>' +
          '<a href="index.html#contact">Start a project</a>' +
          '<a href="index.html#contact">Press &amp; partnerships</a></nav>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<p>© ' + year + ' Meridian Systems, Inc. · 588 Townsend St, San Francisco, CA</p>' +
        '<p class="footer-disclosure"><sup>*</sup>Meridian is a fictional company — a brand, product &amp; engineering design study. All clients, people, and metrics are invented.</p>' +
      '</div>' +
    '</div></footer>';
})();
