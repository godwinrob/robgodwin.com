# [robgodwin.com](https://robgodwin.com/)

Personal site for Rob Godwin. It's plain static HTML, CSS and a few lines of JS, with no build step and no dependencies.

```
public/          ← everything that gets deployed
  index.html
  404.html
  css/site.css
  js/site.js
  img/*.webp
  CNAME          ← custom domain for GitHub Pages
```

## Local preview

```bash
python3 -m http.server 8000 --directory public
```

Then open http://localhost:8000.

## Hosting (GitHub Pages)

`.github/workflows/deploy.yml` publishes `public/` to GitHub Pages on every push to `master`.

One-time setup:

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. **Settings → Pages → Custom domain:** `robgodwin.com`, then tick **Enforce HTTPS** once the certificate is issued.
3. At your DNS provider, point the domain at GitHub Pages:

   | Type  | Name  | Value                 |
   |-------|-------|-----------------------|
   | A     | @     | 185.199.108.153       |
   | A     | @     | 185.199.109.153       |
   | A     | @     | 185.199.110.153       |
   | A     | @     | 185.199.111.153       |
   | AAAA  | @     | 2606:50c0:8000::153   |
   | AAAA  | @     | 2606:50c0:8001::153   |
   | AAAA  | @     | 2606:50c0:8002::153   |
   | AAAA  | @     | 2606:50c0:8003::153   |
   | CNAME | www   | godwinrob.github.io   |

   Remove any old A/CNAME records that point at the previous host.

### Other hosts

Because the site is just the `public/` folder, it also works on Cloudflare Pages or Netlify: set the build command to none and the output directory to `public`.
