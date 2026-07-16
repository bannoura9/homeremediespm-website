/* Home Remedies PM — interactions */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     Conversion tracking — GA4 key events + Clarity session tags.
     Clarity tags let you filter recordings down to sessions that
     actually converted.
     --------------------------------------------------------- */
  function track(name, params) {
    var p = params || {};
    if (typeof window.gtag === "function") window.gtag("event", name, p);
    if (typeof window.clarity === "function") {
      window.clarity("set", name, p.form_id || p.method || "true");
      if (name === "generate_lead") window.clarity("upgrade", "lead");
    }
  }

  /* Phone + email clicks, delegated so it also covers links injected
     later (announcement bar, exit popup). */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!a) return;
    var phone = a.getAttribute("href").indexOf("tel:") === 0;
    track(phone ? "contact_phone_click" : "contact_email_click", {
      method: phone ? "phone" : "email",
      page_path: location.pathname
    });
  });

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
      track("generate_lead", { form_id: "contact", lead_type: subjectType });
      window.location.href = href;
      var status = document.getElementById("formStatus");
      if (status) {
        status.textContent = "Opening your email app… if nothing happens, email us directly at homeremediespm@gmail.com.";
        status.style.color = "var(--forest)";
      }
    });
  }

  /* Free Rental Analysis form -> pre-filled email */
  var rental = document.getElementById("rentalForm");
  if (rental) {
    rental.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var d = new FormData(rental);
      var name = (d.get("raName") || "").trim();
      var addr = (d.get("raAddress") || "").trim();
      var email = (d.get("raEmail") || "").trim();
      var phone = (d.get("raPhone") || "").trim();
      if (!name || !addr || !email) return;
      var body =
        "New FREE RENTAL ANALYSIS request:\n\n" +
        "Property address: " + addr + "\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n";
      var href =
        "mailto:homeremediespm@gmail.com" +
        "?subject=" + encodeURIComponent("Free rental analysis — " + addr) +
        "&body=" + encodeURIComponent(body);
      track("generate_lead", { form_id: "rental_analysis", lead_type: "Rental analysis" });
      window.location.href = href;
      var s = document.getElementById("rentalStatus");
      if (s) { s.textContent = "Opening your email app… or just call (720) 722-0357. We'll be in touch within one business day."; s.style.color = "var(--forest)"; }
    });
  }

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Announcement bar — spells out the current month, site-wide
     --------------------------------------------------------- */
  (function announcementBar() {
    if (sessionStorage.getItem("hr_announce_closed") === "1") return;
    var months = ["January","February","March","April","May","June",
      "July","August","September","October","November","December"];
    var month = months[new Date().getMonth()];
    var bar = document.createElement("div");
    bar.className = "announce";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Announcement");
    bar.innerHTML =
      '<div class="announce__inner">' +
        '<span>🏡 Now booking free property consultations for <span class="month">' + month + '</span> — limited spots.</span>' +
        '<a class="announce__cta" href="contact.html">Reserve your spot</a>' +
      '</div>' +
      '<button class="announce__close" type="button" aria-label="Dismiss announcement">×</button>';
    document.body.insertBefore(bar, document.body.firstChild);
    bar.querySelector(".announce__close").addEventListener("click", function () {
      bar.remove();
      sessionStorage.setItem("hr_announce_closed", "1");
    });
  })();

  /* ---------------------------------------------------------
     Exit-intent lead popup — shows once per visit, emails inquiry
     --------------------------------------------------------- */
  (function exitIntentPopup() {
    if (sessionStorage.getItem("hr_lead_seen") === "1") return;

    var overlay = document.createElement("div");
    overlay.className = "lead-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Free consultation offer");
    overlay.innerHTML =
      '<div class="lead-modal">' +
        '<button class="lead-modal__close" type="button" aria-label="Close">×</button>' +
        '<span class="eyebrow">Before you go</span>' +
        '<h3>Get a free property consultation</h3>' +
        '<p>Tell us where to reach you and we’ll show you exactly what stress-free management or a smooth sale looks like — no obligation.</p>' +
        '<form id="leadForm" novalidate>' +
          '<input type="text" name="leadName" placeholder="Your name" autocomplete="name" required>' +
          '<input type="tel" name="leadPhone" placeholder="Phone number" autocomplete="tel">' +
          '<input type="email" name="leadEmail" placeholder="Email address" autocomplete="email" required>' +
          '<button type="submit">Get my free consultation</button>' +
        '</form>' +
        '<p class="lead-modal__fine">We’ll only use this to contact you about your inquiry.</p>' +
      '</div>';

    function open() {
      if (sessionStorage.getItem("hr_lead_seen") === "1") return;
      if (!overlay.isConnected) document.body.appendChild(overlay);
      requestAnimationFrame(function () { overlay.classList.add("open"); });
      sessionStorage.setItem("hr_lead_seen", "1");
    }
    function close() {
      overlay.classList.remove("open");
      setTimeout(function () { if (overlay.isConnected) overlay.remove(); }, 320);
    }

    /* Desktop: fire when the cursor leaves the top of the viewport */
    document.addEventListener("mouseout", function onOut(e) {
      if (e.clientY <= 0 && !e.relatedTarget) {
        open();
        document.removeEventListener("mouseout", onOut);
      }
    });
    /* Mobile fallback: no exit intent, so show after 25s of engagement */
    setTimeout(open, 25000);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.classList.contains("lead-modal__close")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) close();
    });

    overlay.addEventListener("submit", function (e) {
      if (e.target.id !== "leadForm") return;
      e.preventDefault();
      var f = e.target;
      var name = (f.leadName.value || "").trim();
      var phone = (f.leadPhone.value || "").trim();
      var email = (f.leadEmail.value || "").trim();
      if (!name || !email) { (name ? f.leadEmail : f.leadName).focus(); return; }
      var body =
        "New consultation request from the website popup:\n\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n";
      var href =
        "mailto:homeremediespm@gmail.com" +
        "?subject=" + encodeURIComponent("Free consultation request — " + name) +
        "&body=" + encodeURIComponent(body);
      track("generate_lead", { form_id: "exit_popup", lead_type: "Free consultation" });
      window.location.href = href;
      f.parentNode.innerHTML =
        '<span class="eyebrow">Thank you</span>' +
        '<h3>You’re all set, ' + (name.split(" ")[0] || "there") + '.</h3>' +
        '<p>Your email app is opening so you can send your request — or just call us at ' +
        '<a href="tel:+17207220357">(720) 722-0357</a>. We’ll be in touch shortly.</p>';
      setTimeout(close, 4000);
    });
  })();
})();
