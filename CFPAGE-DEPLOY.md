## Cloudflare Pages Deployment

### 1. Open Cloudflare Pages
Visit https://dash.cloudflare.com/pages.

### 2. Create a Project
- Select **Create a project**
- Choose **Connect to Git**
- Pick your GitHub repository

### 3. Configure the Build
Fill out the visual form with:

```
Framework preset: None
Build command: npm run build:web
Build output directory: dist/apps/web
Root directory: (leave empty)
```

Add an entry under **Environment variables**:

```
NODE_VERSION = 20
```

### 4. Save and Deploy
Click **Save and Deploy**. That is all it takes.

## Included Configuration Files

- `apps/web/public/_redirects` – SPA routing support
- `apps/web/public/_headers` – basic cache headers
- `package.json` `build:web` script – triggers the web build

## Post-Deployment Checklist

1. Open the assigned `.pages.dev` domain
2. Confirm the site renders as expected
3. Refresh a few routes to ensure SPA navigation works

## Optional: Custom Domains

After the first deployment:
1. Open **Custom domains** in your Pages project
2. Add your domain name
3. Follow the DNS instructions provided by Cloudflare

No additional configuration files are required.
