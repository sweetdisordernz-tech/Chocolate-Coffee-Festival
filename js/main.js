(function () {
  "use strict";

  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");
  var backdrop = document.getElementById("drawerBackdrop");

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

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDrawer();
      closeAllDropdowns();
    }
  });

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
})();
