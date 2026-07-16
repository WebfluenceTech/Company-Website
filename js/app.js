/* Meridian — interactions
   Nav scroll state · mobile menu · accessible tabs ·
   scroll reveals · stat counters. All gated behind
   prefers-reduced-motion where motion is involved. */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- nav scroll state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- tabs (roving tabindex, arrow keys) ---------- */
  var tabList = document.querySelector(".tab-list");
  if (tabList) {
    var tabs = Array.prototype.slice.call(tabList.querySelectorAll(".tab"));
    var panels = tabs.map(function (t) {
      return document.getElementById(t.getAttribute("aria-controls"));
    });

    function selectTab(index, focus) {
      tabs.forEach(function (t, i) {
        var active = i === index;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
        t.tabIndex = active ? 0 : -1;
        panels[i].classList.toggle("is-active", active);
        panels[i].hidden = !active;
      });
      if (focus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { selectTab(i, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next !== null) {
          e.preventDefault();
          selectTab(next, true);
        }
      });
    });
  }

  /* ---------- scroll reveals ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
        el.style.transitionDelay = delay ? delay + "ms" : "";
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- stat counters ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  function renderFinal(el) {
    el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
  }
  if (reducedMotion || !("IntersectionObserver" in window)) {
    counters.forEach(renderFinal);
  } else {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        cio.unobserve(el);
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var duration = 1400;
        var start = null;
        function tick(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
