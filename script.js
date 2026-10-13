document.addEventListener('DOMContentLoaded', function () {
  // Download PDF -> browser print dialog ("Save as PDF")
  var btn = document.getElementById('download-btn');
  if (btn) btn.addEventListener('click', function () { window.print(); });

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Live website screenshots for portfolio cards
  document.querySelectorAll('.card[data-site]').forEach(function (card) {
    var site = card.getAttribute('data-site');
    var thumb = card.querySelector('.thumb');
    var title = card.querySelector('h3');
    if (!thumb) return;
    var src = 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(site) + '?w=800&h=500';
    var img = new Image();
    var tries = 0;
    function fallback() {
      thumb.classList.add('fallback');
      thumb.textContent = title ? title.textContent : site;
    }
    img.onload = function () {
      // mshots returns a small placeholder while generating; retry a few times
      if (img.naturalWidth < 400 && tries < 3) {
        tries++;
        setTimeout(function () { img.src = src + '&r=' + tries; }, 3000);
        return;
      }
      if (img.naturalWidth < 400) { fallback(); return; }
      thumb.style.backgroundImage = 'url("' + img.src + '")';
    };
    img.onerror = fallback;
    img.src = src;
  });

  // Portfolio filters
  var buttons = document.querySelectorAll('.filters button');
  var cards = document.querySelectorAll('.grid .card');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      buttons.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      var f = b.getAttribute('data-filter');
      cards.forEach(function (c) {
        c.classList.toggle('hidden', f !== 'all' && c.getAttribute('data-cat') !== f);
      });
    });
  });
});
