(function() {
  function ensureBackToTopStyles() {
    if (document.getElementById('backToTopStyles')) return;

    var style = document.createElement('style');
    style.id = 'backToTopStyles';
    style.textContent =
      '.back-to-top{' +
      'position:fixed;' +
      'right:24px;' +
      'bottom:24px;' +
      'width:52px;' +
      'height:52px;' +
      'border:1px solid rgba(200,167,90,0.28);' +
      'border-radius:999px;' +
      'background:rgba(31,41,51,0.92);' +
      'color:#C8A75A;' +
      'font-size:1.25rem;' +
      'line-height:1;' +
      'cursor:pointer;' +
      'display:inline-flex;' +
      'align-items:center;' +
      'justify-content:center;' +
      'box-shadow:0 14px 28px rgba(0,0,0,0.22);' +
      'opacity:0;' +
      'visibility:hidden;' +
      'pointer-events:none;' +
      'transform:translateY(14px);' +
      'transition:opacity 0.22s ease, transform 0.22s ease, visibility 0.22s ease, border-color 0.22s ease, background 0.22s ease;' +
      'z-index:1100;' +
      '}' +
      '.back-to-top:hover{' +
      'background:rgba(31,41,51,1);' +
      'border-color:rgba(200,167,90,0.52);' +
      '}' +
      '.back-to-top:focus-visible{' +
      'outline:2px solid #C8A75A;' +
      'outline-offset:3px;' +
      '}' +
      '.back-to-top.visible{' +
      'opacity:1;' +
      'visibility:visible;' +
      'pointer-events:auto;' +
      'transform:translateY(0);' +
      '}' +
      '@media (max-width:560px){' +
      '.back-to-top{' +
      'right:16px;' +
      'bottom:16px;' +
      'width:48px;' +
      'height:48px;' +
      '}' +
      '}';

    document.head.appendChild(style);
  }

  function ensureBackToTopButton() {
    var button = document.getElementById('backToTop');
    if (button) return button;

    if (!document.body) return null;

    button = document.createElement('button');
    button.className = 'back-to-top';
    button.id = 'backToTop';
    button.type = 'button';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '&#8593;';
    document.body.appendChild(button);
    return button;
  }

  function initBackToTop() {
    ensureBackToTopStyles();

    var backToTop = ensureBackToTopButton();
    if (!backToTop || backToTop.dataset.bound === 'true') return;

    function syncBackToTop() {
      backToTop.classList.toggle('visible', window.scrollY > 480);
    }

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    syncBackToTop();
    window.addEventListener('scroll', syncBackToTop, { passive: true });
    backToTop.dataset.bound = 'true';
  }

  window.initBackToTop = initBackToTop;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
  } else {
    initBackToTop();
  }
})();
