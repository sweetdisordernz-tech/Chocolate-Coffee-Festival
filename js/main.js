(function () {
  "use strict";

  // Each feature is isolated in its own try/catch so a failure in one
  // (e.g. a missing nav element) can never block the others — in
  // particular the scroll-reveal fallback below, which must always run
  // or content stays invisible.

  function initNav() {
    var menuToggle = document.getElementById("menuToggle");
    var mainNav = document.getElementById("mainNav");
    var backdrop = document.getElementById("drawerBackdrop");
    if (!menuToggle || !mainNav || !backdrop) return;

    function openDrawer() {
      mainNav.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      backdrop.hidden = false;
      document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      backdrop.hidden = true;
      document.body.style.overflow = "";
    }

    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.contains("is-open");
      if (isOpen) closeDrawer(); else openDrawer();
    });

    backdrop.addEventListener("click", closeDrawer);

    // ---- Dropdown menus (By Occasion, By Recipient, Collections, More Gifts, About) ----
    var dropdownItems = Array.prototype.slice.call(document.querySelectorAll(".nav-item.has-dropdown"));

    function closeAllDropdowns(except) {
      dropdownItems.forEach(function (item) {
        if (item === except) return;
        item.classList.remove("open");
        var trigger = item.querySelector(".nav-caret, .nav-link--toggle");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeDrawer();
        closeAllDropdowns();
      }
    });

    dropdownItems.forEach(function (item) {
      var trigger = item.querySelector(".nav-caret, .nav-link--toggle");
      if (!trigger) return;

      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var isOpen = item.classList.contains("open");
        closeAllDropdowns(item);
        item.classList.toggle("open", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    document.addEventListener("click", function (e) {
      var withinDropdown = e.target.closest(".nav-item.has-dropdown");
      if (!withinDropdown) closeAllDropdowns();
    });

    // Close the mobile drawer whenever a real navigation link is followed.
    mainNav.querySelectorAll(".dropdown-panel a, .nav-item:not(.has-dropdown) .nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        closeDrawer();
      });
    });

    // Reset open dropdowns / drawer state when resizing across the mobile breakpoint.
    var mobileQuery = window.matchMedia("(max-width: 900px)");
    mobileQuery.addEventListener("change", function () {
      closeDrawer();
      closeAllDropdowns();
    });
  }

  function initHeaderShadow() {
    var siteHeader = document.querySelector(".site-header");
    if (!siteHeader) return;

    var ticking = false;
    function updateHeaderShadow() {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 4);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderShadow);
        ticking = true;
      }
    }, { passive: true });
    updateHeaderShadow();
  }

  function initScrollReveal() {
    var revealTargets = document.querySelectorAll(".reveal");
    if (!revealTargets.length) return;

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });

    // Safety net: if anything about the observer misbehaves, never leave
    // content permanently invisible.
    window.setTimeout(function () {
      revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    }, 4000);
  }

  [initNav, initHeaderShadow, initScrollReveal].forEach(function (init) {
    try { init(); } catch (err) { /* one feature failing must not block the others */ }
  });
})();
