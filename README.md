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

One-time setup. Do steps 1 and 2 **before** merging to `master`, otherwise the first deploy fails because Pages isn't enabled yet. You can rerun it later from the Actions tab.

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

   Replace only the existing `@` and `www` A/AAAA/CNAME records that point at the old web host. **Leave MX, TXT (SPF/DKIM/DMARC) and any `mail.` records alone**, or email to rob@robgodwin.com will stop working.

   Until the custom domain is active, the site at `godwinrob.github.io/robgodwin.com/` will look unstyled, because asset paths are root-relative. That's expected and goes away once `robgodwin.com` resolves.

### Cutover checklist

- **Preview first.** Before step 2, you can check the deployed site at `https://godwinrob.github.io/robgodwin.com/`, though it will look unstyled (see above). Once the custom domain is set, that URL redirects to robgodwin.com.
- **Lower the DNS TTL** on the `@`/`www` records to about 300s a day ahead, so the switch takes effect quickly.
- **Check CAA records.** If the domain has any CAA records, add `0 issue "letsencrypt.org"`, otherwise GitHub can't issue the HTTPS certificate.
- **Expect a short HTTPS gap.** GitHub issues the certificate only after DNS points at it. Until then, HTTPS visitors may see a certificate warning, usually for minutes and occasionally up to an hour, so do the switch at a quiet time. Turn on **Enforce HTTPS** once it's issued.
- **Verify the domain** to prevent takeover: GitHub profile **Settings → Pages → Add a domain**, then add the `_github-pages-challenge-godwinrob` TXT record it gives you.

### Other hosts

Because the site is just the `public/` folder, it also works on Cloudflare Pages or Netlify: set the build command to none and the output directory to `public`.
