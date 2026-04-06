# Waqar — Home Tutor Portfolio

This is a simple static portfolio site scaffold to present your teaching journey and services. It's designed to be hosted for free (GitHub Pages or Netlify) without buying a domain.

Files:
- `index.html` — single-page portfolio
- `styles.css` — simple responsive styles
- `assets/` — logo and placeholder resume

Quick local preview (PowerShell):

```powershell
# from this folder (d:\WaqarPortfolio\portfolio)
# Python 3.x (built-in) - serves at http://localhost:8000
python -m http.server 8000
```

Hosting (free) options:

1) GitHub Pages (recommended):
   - Create a new GitHub repository and push this folder.
   - Enable Pages from `main` branch (root) in repository Settings -> Pages.
   - Your site will be available at `https://<your-username>.github.io/<repo-name>/`.

   Example commands (PowerShell):

```powershell
cd d:\WaqarPortfolio\portfolio
git init
git add .
git commit -m "Initial portfolio scaffold"
# Create repo on GitHub using the website, then add remote and push:
# git remote add origin https://github.com/<your-username>/<repo-name>.git
# git branch -M main
# git push -u origin main
```

2) Netlify (drag & drop or connect to repo):
   - Go to netlify.com, sign up, and drag the `portfolio` folder onto the Sites area to deploy instantly.
   - Or connect your GitHub repo and let Netlify auto-deploy on pushes.

What you should do next:
- Replace contact details and phone/email in `index.html`.
- Add a real `assets/resume.pdf` (the `.gitignore` currently excludes it if you want to keep it private; remove that line to include it in the repo).
- Add photos, project screenshots, and testimonials to `index.html`.

If you want, I can:
- Add a simple contact form (Netlify/Formspree) so parents can message you directly.
- Prepare a GitHub repo (I can create the local git commit and help with push commands; you'll need to create the remote repo and provide the URL or run the push yourself).
- Convert this into a multi-page site or add more styling.
