# Rose Liu — personal site

Plain HTML/CSS, no build step. Hosted on GitHub Pages: https://roseliu1202.github.io/

```
index.html             Research (home): hero, featured project, ongoing work
art/index.html         Art
experiments/index.html Experiments (FitAlign, Next Step, Hybrid Body, WoGO)
about/index.html       About + contact
fitalignar/index.html  FitAlign AR case study (keeps the old /fitalignar URL)
style.css              all styles
assets/                images and videos
```

## Editing

- Add a project: copy a `<div class="card">` block on the right page. Wrap it in
  `<a href="...">` instead of `<div>` to link it to a case-study page.
- Swap a grey placeholder: replace `<div class="placeholder">…</div>` with
  `<img class="media" src="../assets/your-file.jpg" alt="…">` (or a `<video class="media" …>`).
- Text in [square brackets] and the contact links on the About page are placeholders.
- New case study: copy the `fitalignar/` folder, rename it, edit the text.

Edits pushed to `main` go live within a minute or two.
