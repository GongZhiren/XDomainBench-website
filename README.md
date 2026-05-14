# XDomainBench Website

Polished project website for the XDomainBench paper, dataset, and experiments.

## Local preview

```bash
cd /scratch/gongzhiren/benchmark/paper/website
python -m http.server 8080
```

Open: `http://localhost:8080`

## Structure

- `index.html`: full page sections and content
- `styles.css`: premium visual theme (paper-style warm pink + purple palette)
- `script.js`: figure lightbox and BibTeX copy
- `assets/indexed/`: only figures actually indexed in paper chapters

## Included indexed assets

- `XDomainBench.png`
- `overview.png`
- `bench_design.png`
- `distribution.png`
- `domain_heatmap.png`
- `example.png`
- `mechanism_summary_left.png`
- `mechanism_summary_right.png`
- `radar_scaling.png`
- `turn1_barplot1.png`

## Deploy to GitHub Pages (recommended)

1. Push this folder to the repo (for example under `benchmark/paper/website`).
2. In GitHub repository settings, open **Pages**.
3. Source: select branch `main`, folder where `index.html` lives.
4. Save and wait for GitHub Pages build.

Then the site is publicly accessible from the generated Pages URL.
