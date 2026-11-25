/* Rose Liu — shared site script: Art dropdown + click-to-enlarge lightbox */
(() => {
  // ---------- Art dropdown ----------
  document.querySelectorAll('.nav-drop').forEach(drop => {
    const btn = drop.querySelector('.nav-drop-btn');
    const set = open => { drop.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); };
    btn.addEventListener('click', e => { e.stopPropagation(); set(!drop.classList.contains('open')); });
    document.addEventListener('click', e => { if (!drop.contains(e.target)) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  });

  // ---------- Lightbox ----------
  // Any .exp-item or .lb-item (a figure holding an img or video) opens enlarged on click.
  // Optional caption: <figcaption><strong>Title</strong><span>Description</span></figcaption>
  const items = [...document.querySelectorAll('.exp-item, .lb-item')];
  if (!items.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Enlarged view');
  lb.innerHTML =
    '<button class="lb-btn lb-close" aria-label="Close">&times;</button>' +
    '<button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>' +
    '<button class="lb-btn lb-next" aria-label="Next">&#8250;</button>' +
    '<div class="lb-media"></div><div class="lb-cap"></div>';
  document.body.append(lb);
  const media = lb.querySelector('.lb-media');
  const cap = lb.querySelector('.lb-cap');
  let i = 0;

  function show(n) {
    i = (n + items.length) % items.length;
    const el = items[i].querySelector('video, img').cloneNode();
    if (el.tagName === 'VIDEO') Object.assign(el, { controls: true, muted: true, autoplay: true, loop: true, playsInline: true });
    el.removeAttribute('loading');
    media.replaceChildren(el);
    cap.replaceChildren();
    const fc = items[i].querySelector('figcaption');
    const t = fc?.querySelector('strong')?.textContent.trim();
    const d = fc?.querySelector('span')?.textContent.trim();
    if (t) { const s = document.createElement('strong'); s.textContent = t; cap.append(s); }
    if (d) { const s = document.createElement('span'); s.textContent = d; cap.append(s); }
    cap.hidden = !t && !d;
  }
  const open = n => { show(n); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { lb.classList.remove('open'); media.replaceChildren(); document.body.style.overflow = ''; items[i].focus(); };

  items.forEach((it, n) => {
    it.tabIndex = 0;
    it.addEventListener('click', () => open(n));
    it.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(n); } });
  });
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-close')) close(); });
  lb.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); show(i - 1); });
  lb.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); show(i + 1); });
  media.addEventListener('click', e => e.stopPropagation());
  cap.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();
