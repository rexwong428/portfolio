/* Theme toggle. The document's initial theme is set by the inline script in
   <head> so the right theme paints on the first frame; this only handles the
   click, the persisted preference, and keeping the button's label truthful. */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("themeToggle");
  if (!btn) return;

  var media = window.matchMedia("(prefers-color-scheme: light)");

  function current() {
    return root.getAttribute("data-theme") || (media.matches ? "light" : "dark");
  }

  function label() {
    var next = current() === "light" ? "dark" : "light";
    btn.setAttribute("aria-label", "Switch to " + next + " theme");
  }

  btn.addEventListener("click", function () {
    var next = current() === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });

  // If the visitor has never chosen, keep following the OS.
  media.addEventListener("change", function () {
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}
    if (!stored) label();
  });

  label();
})();
