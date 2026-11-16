(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var system = window.matchMedia("(prefers-color-scheme: dark)");
  var preference;

  try { preference = localStorage.getItem("theme"); } catch (error) {}
  if (preference !== "light" && preference !== "dark") preference = null;

  function applyTheme() {
    var theme = preference || (system.matches ? "dark" : "light");
    root.setAttribute("data-theme", theme);
    if (toggle) toggle.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
  }

  applyTheme();
  if (toggle) {
    toggle.addEventListener("click", function () {
      preference = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", preference); } catch (error) {}
      applyTheme();
    });
  }
  system.addEventListener("change", applyTheme);
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var intro = document.querySelector(".home-intro");
  var layoutAnimation;
  var paragraphAnimations = [];
  var layoutRevision = 0;
  var settleDetails = [];

  function stopLayout() {
    layoutRevision += 1;
    if (layoutAnimation) layoutAnimation.cancel();
    paragraphAnimations.forEach(function (animation) { animation.cancel(); });
    layoutAnimation = null;
    paragraphAnimations = [];
    if (intro) intro.style.height = "";
  }

  function updateLayout(update) {
    if (!intro || reducedMotion.matches || typeof intro.animate !== "function") {
      stopLayout();
      update();
      return;
    }

    // Measure the current visual positions before interrupting an earlier transition.
    var heightBefore = intro.getBoundingClientRect().height;
    var paragraphs = Array.from(intro.querySelectorAll(":scope > .intro-sentence"));
    var positionsBefore = paragraphs.map(function (paragraph) {
      return paragraph.getBoundingClientRect().top;
    });
    stopLayout();
    update();
    var heightAfter = intro.getBoundingClientRect().height;
    var timing = { duration: 260, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" };

    // Keep the footer in normal flow while the introduction changes height.
    intro.style.height = heightAfter + "px";
    layoutAnimation = intro.animate([
      { height: heightBefore + "px" },
      { height: heightAfter + "px" }
    ], timing);
    paragraphs.forEach(function (paragraph, index) {
      var offset = positionsBefore[index] - paragraph.getBoundingClientRect().top;
      if (Math.abs(offset) < 0.5) return;
      paragraphAnimations.push(paragraph.animate([
        { transform: "translateY(" + offset + "px)" },
        { transform: "translateY(0)" }
      ], timing));
    });

    var revision = layoutRevision;
    layoutAnimation.finished.then(function () {
      if (revision !== layoutRevision) return;
      intro.style.height = "";
      layoutAnimation = null;
      paragraphAnimations = [];
    }).catch(function () {});
  }

  window.addEventListener("resize", stopLayout);
  reducedMotion.addEventListener("change", function () {
    if (!reducedMotion.matches) return;
    stopLayout();
    settleDetails.forEach(function (settle) { settle(); });
  });

  document.querySelectorAll(".inline-detail[aria-controls]").forEach(function (button) {
    var id = button.getAttribute("aria-controls");
    var detail = document.getElementById(id);
    if (!detail) return;
    detail.hidden = true;
    button.hidden = false;
    document.querySelectorAll("[data-disclosure-fallback]").forEach(function (fallback) {
      if (fallback.getAttribute("data-disclosure-fallback") === id) fallback.hidden = true;
    });
    var detailAnimation;
    var detailRevision = 0;
    function settle() {
      detailRevision += 1;
      if (detailAnimation) detailAnimation.cancel();
      detailAnimation = null;
      detail.hidden = button.getAttribute("aria-expanded") !== "true";
      detail.inert = false;
    }
    settleDetails.push(settle);

    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") !== "true";
      var opacity = detail.hidden ? 0 : parseFloat(window.getComputedStyle(detail).opacity);
      var revision = ++detailRevision;
      button.setAttribute("aria-expanded", String(expanded));
      if (detailAnimation) detailAnimation.cancel();
      detailAnimation = null;

      if (reducedMotion.matches || typeof detail.animate !== "function") {
        settle();
        return;
      }

      if (expanded) {
        detail.inert = false;
        updateLayout(function () { detail.hidden = false; });
        detailAnimation = detail.animate([
          { opacity: opacity }, { opacity: 1 }
        ], { duration: 200, easing: "ease-out" });
        detailAnimation.finished.catch(function () {});
      } else {
        // Remove closing links from keyboard navigation while they fade out.
        detail.inert = true;
        detailAnimation = detail.animate([
          { opacity: opacity }, { opacity: 0 }
        ], { duration: 110, easing: "ease-in", fill: "forwards" });
        detailAnimation.finished.then(function () {
          if (revision !== detailRevision) return;
          updateLayout(function () { detail.hidden = true; });
          detailAnimation.cancel();
          detailAnimation = null;
          detail.inert = false;
        }).catch(function () {});
      }
    });
  });
})();
