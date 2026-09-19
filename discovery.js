(() => {
  const samples = {
    language: { image: 'material-01.png', caption: 'Alfabetização: letra D e sua família silábica.', alt: 'Página real: letra D e família silábica' },
    syllables: { image: 'material-04.png', caption: 'Alfabetização: complete as sílabas dos animais.', alt: 'Página real: complete as sílabas dos animais' },
    math: { image: 'material-12.png', caption: 'Adicional de matemática: contagem dos animais.', alt: 'Página real do adicional de matemática: contagem dos animais' }
  };
  const image = document.getElementById('discovery-sample');
  const caption = document.getElementById('sample-caption');
  if (!image || !caption) return;
  caption.setAttribute('aria-live', 'polite');
  document.querySelectorAll('[data-sample]').forEach(button => {
    button.addEventListener('click', () => {
      const sample = samples[button.dataset.sample];
      if (!sample) return;
      image.src = `./images/${sample.image}`;
      image.alt = sample.alt;
      caption.textContent = sample.caption;
      document.querySelectorAll('[data-sample]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });
})();
