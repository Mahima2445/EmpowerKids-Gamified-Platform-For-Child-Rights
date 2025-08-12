# EmpowerKids Platform - Deployment Instructions

## 🚀 Quick Deployment to GitHub Pages

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Repository name: `empowerkids-platform`
4. Description: `A gamified platform for children's rights education`
5. Set to Public
6. **Don't** initialize with README (we already have one)
7. Click "Create repository"

### Step 2: Push Your Code
```bash
# Set the main branch
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/empowerkids-platform.git

# Push your code
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click the **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select "Deploy from a branch"
5. Choose **main** branch
6. Choose **/ (root)** folder
7. Click **Save**

### Step 4: Access Your Site
Your site will be available at:
```
https://YOUR-USERNAME.github.io/empowerkids-platform
```

*Note: It may take a few minutes for the site to be live*

## 🌐 Alternative Deployment Options

### Netlify (Recommended for additional features)
1. Go to [Netlify](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Choose GitHub and your repository
5. Build settings:
   - Build command: `npm run build-prod` (optional)
   - Publish directory: `.` (root)
6. Click "Deploy site"

### Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   - Framework: Other
   - Root directory: `./`
6. Click "Deploy"

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy
```

## 🔧 Local Development Server

### Option 1: Node.js serve
```bash
npm install
npm run dev
```

### Option 2: Python server
```bash
python -m http.server 8000
```

### Option 3: PHP server (if using backend)
```bash
php -S localhost:8000
```

## 📁 File Structure for Deployment

```
Deployed Files:
├── homepage.html (entry point)
├── assets/ (images, videos)
├── CSS/ (stylesheets)
├── js/ (JavaScript files)
├── *.html (all page files)
└── package.json

Not Deployed:
├── docs/ (documentation)
├── .github/ (workflows)
├── setup-github.ps1
└── .gitignore
```

## 🔒 Environment Configuration

### Production Settings
- Ensure all paths are relative
- Optimize images and videos
- Minify CSS and JavaScript
- Enable HTTPS

### GitHub Pages Limitations
- Static files only (no server-side processing)
- No PHP backend support
- File size limits (1GB repository, 100MB per file)

## 📊 Monitoring Your Deployment

### GitHub Pages Status
- Check repository Settings > Pages for deployment status
- View deployment history in Actions tab
- Monitor traffic in Insights tab

### Custom Domain (Optional)
1. Purchase domain from provider
2. Add CNAME file with your domain
3. Configure DNS settings
4. Update GitHub Pages settings

## 🐛 Troubleshooting

### Common Issues:

**Site not loading:**
- Check if GitHub Pages is enabled
- Verify main branch has your files
- Wait 5-10 minutes for deployment

**Images not showing:**
- Check file paths use `assets/` prefix
- Ensure files are committed to repository
- Verify file names match exactly (case-sensitive)

**CSS not loading:**
- Check file paths in HTML
- Ensure CSS files are in repository
- Clear browser cache

**JavaScript errors:**
- Check browser console for errors
- Verify file paths are correct
- Ensure all dependencies are loaded

## 📈 Performance Optimization

### Before Deployment:
1. Optimize image sizes
2. Minify CSS and JavaScript
3. Remove unused files
4. Test on multiple devices

### After Deployment:
1. Test site speed
2. Check mobile responsiveness
3. Verify all links work
4. Test in different browsers

---

<div align="center">
  <p><strong>Your EmpowerKids platform is ready to deploy! 🚀</strong></p>
  <p>Questions? Check our <a href="docs/DEVELOPMENT.md">Development Guide</a></p>
</div>
