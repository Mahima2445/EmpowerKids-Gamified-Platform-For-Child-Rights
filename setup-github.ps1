# GitHub Setup Script for EmpowerKids Platform

Write-Host "Setting up GitHub repository for EmpowerKids Platform..." -ForegroundColor Green

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Initialize git repository if not already done
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .

# Commit files
Write-Host "Committing files..." -ForegroundColor Yellow
git commit -m "Initial commit: EmpowerKids Platform with enhanced structure"

# Instructions for GitHub setup
Write-Host "`n=== GitHub Setup Instructions ===" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com and create a new repository"
Write-Host "2. Name it: empowerkids-platform"
Write-Host "3. Don't initialize with README (we already have one)"
Write-Host "4. Copy the repository URL"
Write-Host "5. Run the following commands:"
Write-Host ""
Write-Host "git remote add origin https://github.com/YOUR-USERNAME/empowerkids-platform.git" -ForegroundColor White
Write-Host "git branch -M main" -ForegroundColor White
Write-Host "git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "=== GitHub Pages Setup ===" -ForegroundColor Cyan
Write-Host "1. Go to your repository on GitHub"
Write-Host "2. Click Settings tab"
Write-Host "3. Scroll to Pages section"
Write-Host "4. Source: Deploy from a branch"
Write-Host "5. Branch: main"
Write-Host "6. Folder: / (root)"
Write-Host "7. Click Save"
Write-Host ""
Write-Host "Your site will be available at: https://YOUR-USERNAME.github.io/empowerkids-platform" -ForegroundColor Green
Write-Host ""
Write-Host "Setup complete! 🎉" -ForegroundColor Green
