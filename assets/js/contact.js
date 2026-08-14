/* Contact form.
   GitHub Pages serves static files only, so there is no server to post to.
   Rather than depend on a third party form service, this composes a mailto:
   and hands it to the visitor's own mail app with everything filled in.
   The address stays visible in the footer as a fallback. */
(function () {
  "use strict";

  var TO = "rex.wongtakwai@gmail.com";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var note = document.getElementById("cf-note");
  var fields = {
    name: document.getElementById("cf-name"),
    email: document.getElementById("cf-email"),
    message: document.getElementById("cf-message")
  };

  function mark(input, invalid) {
    var wrap = input.closest(".field");
    if (wrap) wrap.classList.toggle("field--invalid", invalid);
    input.setAttribute("aria-invalid", invalid ? "true" : "false");
  }

  function firstProblem() {
    if (!fields.name.value.trim()) return [fields.name, "Please add your name."];
    var email = fields.email.value.trim();
    if (!email) return [fields.email, "Please add an email address so I can reply."];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return [fields.email, "That email address does not look right."];
    if (!fields.message.value.trim()) return [fields.message, "Please write a message."];
    return null;
  }

  Object.keys(fields).forEach(function (k) {
    fields[k].addEventListener("input", function () { mark(fields[k], false); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    Object.keys(fields).forEach(function (k) { mark(fields[k], false); });

    var problem = firstProblem();
    if (problem) {
      mark(problem[0], true);
      note.textContent = problem[1];
      problem[0].focus();
      return;
    }

    var name = fields.name.value.trim();
    var subject = "Portfolio enquiry from " + name;
    var body = fields.message.value.trim() + "\n\n--\n" + name + "\n" + fields.email.value.trim();

    note.innerHTML = "Opening your email app. If nothing happens, write to " +
      '<a href="mailto:' + TO + '">' + TO + "</a>.";

    window.location.href = "mailto:" + TO +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
})();
