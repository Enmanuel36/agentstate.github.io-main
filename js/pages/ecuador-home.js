(function() {
  function esc(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createProjectCard(project) {
    var card = document.createElement('a');
    var contactHref = '../uk/contact.html?from=ecuador&property=' + encodeURIComponent(project.name || '');
    var projectHref = project.slug ? 'projects/' + encodeURIComponent(project.slug) + '.html' : contactHref;
    var photoCount = Array.isArray(project.photos) ? project.photos.length : 0;

    card.className = 'ec-project-card';
    card.href = projectHref;

    var imageWrap = document.createElement('div');
    imageWrap.className = 'ec-project-img';

    var fallback = document.createElement('span');
    fallback.textContent = project.emoji || '🌴';
    imageWrap.appendChild(fallback);

    if (photoCount > 0) {
      var img = document.createElement('img');
      img.src = project.photos[0];
      img.alt = project.name || 'Ecuador project';
      img.addEventListener('load', function() {
        fallback.style.display = 'none';
      });
      img.addEventListener('error', function() {
        img.remove();
      });
      imageWrap.appendChild(img);

      if (photoCount > 1) {
        var badge = document.createElement('span');
        badge.style.cssText = 'position:absolute;bottom:6px;right:8px;background:rgba(0,0,0,.55);color:#fff;font-size:10px;padding:2px 7px;border-radius:20px;';
        badge.textContent = '📷 ' + photoCount;
        imageWrap.appendChild(badge);
      }
    }

    var body = document.createElement('div');
    body.className = 'ec-project-body';
    body.innerHTML =
      '<div class="ec-project-type">' + esc(project.type) + '</div>' +
      '<div class="ec-project-name">' + esc(project.name) + '</div>' +
      '<div class="ec-project-location">📍 ' + esc(project.location) + '</div>' +
      '<div class="ec-project-desc">' + esc(project.desc) + '</div>';

    var footer = document.createElement('div');
    footer.className = 'ec-project-footer';
    footer.innerHTML =
      '<span class="ec-project-price">' + esc(project.price) + '</span>' +
      '<span class="ec-project-link">' + (project.slug ? 'View project →' : 'Enquire →') + '</span>';

    card.appendChild(imageWrap);
    card.appendChild(body);
    card.appendChild(footer);
    return card;
  }

  function getEcuadorProjects() {
    if (Array.isArray(window.ecuadorProjects)) return window.ecuadorProjects;
    if (typeof ecuadorProjects !== 'undefined' && Array.isArray(ecuadorProjects)) return ecuadorProjects;
    return [];
  }

  function initEcuadorHome() {
    var grid = document.getElementById('projectsGrid');
    if (!grid || grid.dataset.projectsBound === 'true') return;

    var allProjects = getEcuadorProjects();
    var visibleProjects = allProjects.filter(function(project) {
      return !project.hidden;
    });
    var countEl = document.getElementById('projectCount');

    if (countEl) {
      countEl.textContent = String(visibleProjects.length);
    }

    grid.innerHTML = '';

    if (!visibleProjects.length) {
      grid.innerHTML = [
        '<div class="empty-state" style="grid-column:1 / -1;display:block;">',
        '  <div class="empty-icon">',
        '    <svg viewBox="0 0 24 24" fill="none" stroke="#C8A75A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="36" height="36"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>',
        '  </div>',
        '  <h3>More listings coming soon</h3>',
        '  <p>We&#8217;re adding new properties shortly. In the meantime, get in touch and we&#8217;ll find the right match for you.</p>',
        '  <a href="../uk/contact.html?from=ecuador" class="btn btn-primary" style="margin-top:1.5rem;display:inline-flex;">Get in Touch &#8594;</a>',
        '</div>'
      ].join('');
    } else {
      visibleProjects.forEach(function(project) {
        grid.appendChild(createProjectCard(project));
      });
    }

    grid.dataset.projectsBound = 'true';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEcuadorHome);
  } else {
    initEcuadorHome();
  }
})();
