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

/* ============================================================
   Motion upgrade — particles, typewriter, marquee, tilt,
   live console, scroll progress. Skipped under reduced motion.
   ============================================================ */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll progress ---------- */
  var progress = document.getElementById("progress");
  if (progress && !reducedMotion) {
    var updateProgress = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- marquee: duplicate track for seamless loop ---------- */
  var track = document.getElementById("marqueeTrack");
  if (track && !reducedMotion) {
    track.innerHTML += track.innerHTML;
  }

  /* ---------- typewriter rotator ---------- */
  var rotator = document.getElementById("rotator");
  if (rotator) {
    var words = ["AI products", "SaaS platforms", "cloud systems", "mobile apps", "automations"];
    if (reducedMotion) {
      rotator.textContent = words[0];
    } else {
      var wi = 0, ci = words[0].length, deleting = false;
      var typeTick = function () {
        var word = words[wi];
        if (deleting) {
          ci--;
          if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        } else {
          ci++;
          if (ci === word.length) {
            deleting = true;
            rotator.textContent = word;
            setTimeout(typeTick, 2100);
            return;
          }
        }
        rotator.textContent = words[deleting || ci > 0 ? wi : wi].slice(0, ci);
        setTimeout(typeTick, deleting ? 45 : 85);
      };
      setTimeout(typeTick, 2100);
    }
  }

  /* ---------- hero particle constellation ---------- */
  var canvas = document.getElementById("heroCanvas");
  if (canvas && !reducedMotion && window.matchMedia("(min-width: 720px)").matches) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, pts = [], mouse = { x: -9999, y: -9999 };
    var running = true;

    var resize = function () {
      var rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(90, Math.floor(W / 16));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.4 + 0.5,
          c: Math.random() < 0.6 ? "rgba(120, 205, 255, 0.5)" : "rgba(167, 139, 250, 0.5)"
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    canvas.parentElement.addEventListener("mousemove", function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener("mouseleave", function () {
      mouse.x = -9999; mouse.y = -9999;
    });

    var LINK = 110;
    var draw = function () {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        // gentle pull toward cursor
        var mdx = mouse.x - p.x, mdy = mouse.y - p.y;
        var md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 160 && md > 0.001) {
          p.x += (mdx / md) * 0.18; p.y += (mdy / md) * 0.18;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            var a = (1 - Math.sqrt(d2) / LINK) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(100, 190, 255, " + a.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    // only animate while hero is on screen
    new IntersectionObserver(function (entries) {
      var visible = entries[0].isIntersecting;
      if (visible && !running) { running = true; draw(); }
      else if (!visible) { running = false; }
    }).observe(canvas.parentElement);
    draw();
  }

  /* ---------- live console: ticking metrics + streaming feed ---------- */
  var mReq = document.getElementById("mReq");
  var mLat = document.getElementById("mLat");
  var feed = document.getElementById("feedRows");
  if (!reducedMotion && mReq && mLat) {
    var req = 412806, lat = 84;
    setInterval(function () {
      req = Math.max(380000, Math.min(450000, req + Math.round((Math.random() - 0.48) * 4200)));
      lat = Math.max(61, Math.min(118, lat + Math.round((Math.random() - 0.5) * 7)));
      mReq.textContent = req.toLocaleString("en-US");
      mLat.textContent = lat + " ms";
      [mReq, mLat].forEach(function (el) {
        el.classList.remove("is-tick");
        void el.offsetWidth;
        el.classList.add("is-tick");
      });
    }, 2600);
  }
  if (!reducedMotion && feed) {
    var pool = [
      ['ok', 'claims-triage', 'Resolved 1,214 documents · 99.2% confidence'],
      ['ok', 'dispatch-optimizer', 'Re-routed 287 shipments · saved 5.1h'],
      ['ok', 'churn-signals', 'Cohort scored · 312 accounts flagged'],
      ['warn', 'ledger-sync', 'Retrying upstream (attempt 3/5)'],
      ['ok', 'invoice-parser', 'Extracted 96 line items · 0 escalations'],
      ['ok', 'fleet-telemetry', 'Anomaly scan clean · 4.1M events'],
      ['ok', 'kyc-screening', 'Batch cleared · 100% audit coverage'],
      ['ok', 'ledger-sync', 'Upstream recovered · queue drained']
    ];
    var pi = 0;
    setInterval(function () {
      var item = pool[pi % pool.length]; pi++;
      var row = document.createElement("div");
      row.className = "feed-row is-new";
      row.innerHTML = '<span class="dot ' + item[0] + '"></span>' +
        '<span class="feed-name">' + item[1] + '</span>' +
        '<span class="feed-desc">' + item[2] + '</span>' +
        '<span class="feed-time">now</span>';
      feed.insertBefore(row, feed.firstChild);
      var rows = feed.querySelectorAll(".feed-row");
      if (rows.length > 4) feed.removeChild(rows[rows.length - 1]);
    }, 3400);
  }

  /* ---------- 3D tilt on case cards ---------- */
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!reducedMotion && fine) {
    Array.prototype.forEach.call(document.querySelectorAll(".tilt"), function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (-py * 6).toFixed(2) + "deg) rotateY(" +
          (px * 8).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }
})();

/* ============================================================
   Contact brief form — budget chips + mailto submit
   ============================================================ */

(function () {
  "use strict";

  var form = document.getElementById("briefForm");
  if (!form) return;

  var chips = Array.prototype.slice.call(document.querySelectorAll("#budgetChips .chip"));
  var selectedBudget = "";
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var isSelected = chip.classList.contains("is-selected");
      chips.forEach(function (c) {
        c.classList.remove("is-selected");
        c.setAttribute("aria-checked", "false");
      });
      if (!isSelected) {
        chip.classList.add("is-selected");
        chip.setAttribute("aria-checked", "true");
        selectedBudget = chip.textContent.trim();
      } else {
        selectedBudget = "";
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("bfName").value.trim();
    var email = document.getElementById("bfEmail").value.trim();
    var company = document.getElementById("bfCompany").value.trim();
    var msg = document.getElementById("bfMsg").value.trim();
    var body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      (company ? "Company: " + company + "\n" : "") +
      (selectedBudget ? "Budget: " + selectedBudget + " (USD)\n" : "") +
      "\n" + msg;
    var href = "mailto:hello@meridian.engineering" +
      "?subject=" + encodeURIComponent("Project brief — " + (company || name)) +
      "&body=" + encodeURIComponent(body);
    window.location.href = href;
    var status = document.getElementById("formStatus");
    if (status) status.classList.add("is-shown");
  });
})();

/* ============================================================
   Scrollspy — highlight the nav link for the section in view
   (homepage only; sections map to their hash nav links)
   ============================================================ */

(function () {
  "use strict";

  var map = [
    ["capabilities", 'a[href="#capabilities"]'],
    ["platform", 'a[href="#platform"]'],
    ["work", 'a[href="work.html"]'],
    ["process", 'a[href="#process"]'],
  ];
  var pairs = map
    .map(function (m) {
      return {
        section: document.getElementById(m[0]),
        link: document.querySelector(".nav-links " + m[1]),
      };
    })
    .filter(function (p) { return p.section && p.link; });
  if (!pairs.length || !("IntersectionObserver" in window)) return;

  var clear = function () {
    pairs.forEach(function (p) { p.link.classList.remove("is-active"); });
  };
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      clear();
      var hit = pairs.filter(function (p) { return p.section === entry.target; })[0];
      if (hit) hit.link.classList.add("is-active");
    });
  }, { rootMargin: "-30% 0px -55% 0px" });
  pairs.forEach(function (p) { spy.observe(p.section); });

  // above the first section (hero), nothing is highlighted
  var hero = document.getElementById("top");
  if (hero) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) clear();
    }, { rootMargin: "-10% 0px -70% 0px" }).observe(hero);
  }
})();
