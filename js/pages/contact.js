/**
 * ============================================================
 *  Patricia Real Estate – Contact Page JavaScript
 *
 *  HOW THIS WORKS:
 *  When the user submits the form, this script validates the
 *  fields and sends the enquiry via EmailJS (no server needed).
 *  The EmailJS SDK and emailjs.init() are loaded in <head>.
 *
 *  CONFIGURATION:
 *  – Set YOUR_SERVICE_ID and YOUR_TEMPLATE_ID below to match
 *    your EmailJS account once you have set it up.
 *  – Replace YOUR_PUBLIC_KEY in the <head> init call too.
 * ============================================================
 */

const OWNER_EMAIL = 'info@patriciaestateagent.com';
const EMAILJS_SERVICE_ID  = 'service_5i8eaae';
const EMAILJS_TEMPLATE_ID = 'template_kzef07t';

/* ── Init ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  initContactContext();
  prefillFromUrl();
  bindContactForm();
});

/* ── Context ───────────────────────────────────────────── */
function initContactContext() {
  var params = new URLSearchParams(window.location.search);
  var from = params.get('from');
  var pageMarket = document.body.dataset.market || 'uk';
  var context = getContactContext(pageMarket, from);
  var backLink = document.getElementById('backLink');
  var aboutLink = document.getElementById('aboutLink');
  var enquireNowBtn = document.getElementById('enquireNowBtn');
  var areasText = document.getElementById('areasText');
  var breadcrumbHome = document.getElementById('breadcrumbHome');

  if (backLink) {
    backLink.href = context.backHref;
    backLink.textContent = context.backLabel;
  }

  if (aboutLink) aboutLink.href = context.aboutHref;
  if (enquireNowBtn) enquireNowBtn.href = context.contactHref;
  if (areasText) areasText.textContent = context.areasText;

  if (breadcrumbHome) {
    breadcrumbHome.href = context.breadcrumbHref;
    breadcrumbHome.textContent = context.breadcrumbLabel;
  }
}

function getContactContext(pageMarket, from) {
  if (from === 'ecuador') {
    return {
      backHref: '../ecuador/index.html',
      backLabel: 'Projects',
      aboutHref: '../about.html?from=ecuador',
      contactHref: 'contact.html?from=ecuador',
      areasText: 'Ecuador Pacific coast projects. Contact us for prices and payment plans.',
      breadcrumbHref: '../ecuador/index.html',
      breadcrumbLabel: 'Ecuador',
      dataSrc: '../ecuador/data.js'
    };
  }

  if (pageMarket === 'spain' || from === 'spain') {
    return {
      backHref: 'index.html',
      backLabel: 'Properties',
      aboutHref: '../about.html?from=spain',
      contactHref: 'contact.html?from=spain',
      areasText: 'Barcelona, Madrid, Marbella, Costa del Sol and more.',
      breadcrumbHref: 'index.html',
      breadcrumbLabel: 'Spain',
      dataSrc: 'data.js'
    };
  }

  return {
    backHref: 'index.html',
    backLabel: 'Properties',
    aboutHref: '../about.html',
    contactHref: 'contact.html',
    areasText: 'Hampshire, Surrey, and surrounding counties.',
    breadcrumbHref: 'index.html',
    breadcrumbLabel: 'Home',
    dataSrc: 'data.js'
  };
}

/* ── URL Pre-fill ──────────────────────────────────────── */
function prefillFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const propertyName = params.get('property');
  if (!propertyName) return;
  const input = document.getElementById('property');
  if (input) input.value = propertyName;
}

/* ── Contact Form (EmailJS) ────────────────────────────── */
function bindContactForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Client-side validation
    clearErrors();
    let valid = true;

    const fromName  = document.getElementById('from_name').value.trim();
    const fromEmail = document.getElementById('from_email').value.trim();
    const subject   = document.getElementById('subject').value;
    const message   = document.getElementById('message').value.trim();

    if (!fromName) { markError('from_name', 'Please enter your name.'); valid = false; }
    if (!fromEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
      markError('from_email', 'Please enter a valid email address.'); valid = false;
    }
    if (!subject) { markError('subject', 'Please select a subject.'); valid = false; }
    if (!message)  { markError('message', 'Please enter a message.'); valid = false; }
    if (!valid) return;

    var btn    = document.getElementById('submit-btn');
    var status = document.getElementById('form-status');

    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.style.display = 'none';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(function() {
        btn.textContent = 'Message Sent ✓';
        status.style.display = 'block';
        status.style.color = 'green';
        status.textContent = 'Thank you — we\'ll be in touch within 24 hours.';
        form.reset();
      }, function(error) {
        btn.disabled = false;
        btn.textContent = 'Send Message →';
        status.style.display = 'block';
        status.style.color = 'red';
        status.textContent = 'Sorry, something went wrong. Please email us directly at ' + OWNER_EMAIL;
        console.error('EmailJS error:', error);
      });
  });

  // Clear inline errors as the user types
  ['from_name', 'from_email', 'subject', 'message'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function() { removeError(id); });
  });
}

/* ── Error Helpers ─────────────────────────────────────── */
function markError(fieldId, message) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.classList.add('field-error');
  const errorId = fieldId + '-error';
  if (!document.getElementById(errorId)) {
    const msg = document.createElement('span');
    msg.id = errorId;
    msg.className = 'field-error-msg';
    msg.textContent = message;
    el.after(msg);
  }
}

function removeError(fieldId) {
  const el = document.getElementById(fieldId);
  if (el) el.classList.remove('field-error');
  const msg = document.getElementById(fieldId + '-error');
  if (msg) msg.remove();
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(function(el) { el.classList.remove('field-error'); });
  document.querySelectorAll('.field-error-msg').forEach(function(el) { el.remove(); });
}
