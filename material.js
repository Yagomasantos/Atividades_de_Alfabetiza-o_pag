(() => {
  const track = document.getElementById('material-track');
  if (!track) return;
  const slides = [...track.querySelectorAll('.material-slide')];
  const prev = document.getElementById('material-prev');
  const next = document.getElementById('material-next');
  const counter = document.getElementById('material-counter');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const step = () => slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
  function update() {
    const last = track.scrollLeft >= track.scrollWidth - track.clientWidth - 3;
    const index = Math.min(slides.length - 1, Math.round(track.scrollLeft / step()));
    const visible = Math.max(1, Math.round(track.clientWidth / step()));
    counter.textContent = visible > 1 ? `${index + 1}–${Math.min(slides.length, index + visible)} / ${slides.length}` : `${index + 1} / ${slides.length}`;
    prev.disabled = track.scrollLeft < 3;
    next.disabled = last;
  }
  function move(direction) {
    const target = Math.round(track.scrollLeft / step()) + direction;
    track.scrollTo({left: target * step(), behavior: reducedMotion.matches ? 'auto' : 'smooth'});
  }
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); move(e.key === 'ArrowRight' ? 1 : -1); }
  });
  track.addEventListener('scroll', update, {passive: true});
  window.addEventListener('resize', update);
  update();
})();
