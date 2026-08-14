/* Contact form.
   GitHub Pages serves static files only, so a form needs somewhere off site to
   post to. This posts to FormSubmit, which relays the message to Rex's inbox
   and needs no account: the first submission triggers an activation email that
   he clicks once, after which messages arrive directly.

   Submission is AJAX so the visitor stays on the page. If the relay is
   unreachable, the handler falls back to composing a mailto so the message is
   never simply lost. */
(function () {
  "use strict";

  var TO = "rex.wongtakwai@gmail.com";
  var ENDPOINT = "https://formsubmit.co/ajax/" + TO;

  var form = document.getElementById("contactForm");
  if (!form) return;

  var note = document.getElementById("cf-note");
  var button = form.querySelector("button[type=submit]");
  var idle = note ? note.textContent : "";
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

  function say(html) { note.innerHTML = html; }

  function mailtoFallback(name, email, message) {
    return "mailto:" + TO +
      "?subject=" + encodeURIComponent("Portfolio enquiry from " + name) +
      "&body=" + encodeURIComponent(message + "\n\n--\n" + name + "\n" + email);
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
      say(problem[1]);
      problem[0].focus();
      return;
    }

    // bots fill every field they can see; this one is hidden from people
    if (form.querySelector("[name=_honey]").value) return;

    var name = fields.name.value.trim();
    var email = fields.email.value.trim();
    var message = fields.message.value.trim();

    button.disabled = true;
    say("Sending…");

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: "Portfolio enquiry from " + name,
        _template: "table",
        _captcha: "false"
      })
    })
      .then(function (res) { return res.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (String(data.success) !== "true") throw new Error(data.message || "relay refused");
        form.reset();
        say("Thanks, your message is on its way. I will reply to " + email + ".");
      })
      .catch(function () {
        say('That did not go through. Please write to <a href="' +
            mailtoFallback(name, email, message) + '">' + TO + "</a> instead.");
      })
      .then(function () {
        button.disabled = false;
        setTimeout(function () {
          if (note.textContent.indexOf("on its way") !== -1) say(idle);
        }, 12000);
      });
  });
})();
