(function() {
  function initInteractionGuard() {
    if (document.documentElement.dataset.interactionGuardBound === 'true') {
      return;
    }

    document.addEventListener('contextmenu', function(event) {
      event.preventDefault();
    });

    document.documentElement.dataset.interactionGuardBound = 'true';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractionGuard);
  } else {
    initInteractionGuard();
  }
})();
