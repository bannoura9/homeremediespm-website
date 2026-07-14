/* Home Remedies PM — interactions */
(function () {
  "use strict";

  /* Sticky header shadow on scroll */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu toggle */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
      var open = document.body.classList.contains("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  /* Close mobile menu on link click */
  document.querySelectorAll(".mobile-menu a").forEach(function (a) {
    a.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
    });
  });

  /* Reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Contact form -> pre-filled email (no backend on static hosting) */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      var name = ((data.get("firstName") || "") + " " + (data.get("lastName") || "")).trim();
      var subjectType = data.get("subject") || "General inquiry";
      var body =
        "Name: " + name + "\n" +
        "Email: " + (data.get("email") || "") + "\n" +
        "Phone: " + (data.get("phone") || "") + "\n" +
        "Regarding: " + subjectType + "\n\n" +
        (data.get("message") || "");
      var href =
        "mailto:homeremediespm@gmail.com" +
        "?subject=" + encodeURIComponent("Website inquiry — " + subjectType + (name ? " (" + name + ")" : "")) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      var status = document.getElementById("formStatus");
      if (status) {
        status.textContent = "Opening your email app… if nothing happens, email us directly at homeremediespm@gmail.com.";
        status.style.color = "var(--forest)";
      }
    });
  }

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
