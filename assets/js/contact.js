/* Contact form.
   GitHub Pages serves static files only, so the form posts to FormSubmit, which
   relays the message to Rex's inbox.

   It submits natively rather than over fetch. FormSubmit treats /ajax/<email>
   as a separate form from <email> and each needs its own activation; the plain
   endpoint is the activated one. A hidden _next sends the visitor straight back
   here afterwards, so the round trip is a redirect rather than a mail app.

   This file validates before that submission happens, drops anything that fills
   the honeypot, and reports the outcome on return. */
(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var note = document.getElementById("cf-note");
  var idle = note ? note.textContent : "";
  var fields = {
    name: document.getElementById("cf-name"),
    email: document.getElementById("cf-email"),
    message: document.getElementById("cf-message")
  };

  /* returning from a successful relay */
  if (/[?&]sent=1(&|$)/.test(window.location.search)) {
    if (note) note.textContent = "Thanks, your message is on its way. I will reply as soon as I can.";
    history.replaceState(null, "", window.location.pathname + "#contact");
    var target = document.getElementById("contact");
    if (target) target.scrollIntoView();
  }

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
    fields[k].addEventListener("input", function () {
      mark(fields[k], false);
      if (note.textContent !== idle && note.textContent.indexOf("on its way") === -1) note.textContent = idle;
    });
  });

  form.addEventListener("submit", function (e) {
    Object.keys(fields).forEach(function (k) { mark(fields[k], false); });

    var problem = firstProblem();
    if (problem) {
      e.preventDefault();
      mark(problem[0], true);
      note.textContent = problem[1];
      problem[0].focus();
      return;
    }

    /* bots fill every field they can find; this one is hidden from people */
    var honey = form.querySelector("[name=_honey]");
    if (honey && honey.value) {
      e.preventDefault();
      return;
    }

    note.textContent = "Sending…";
  });
})();
