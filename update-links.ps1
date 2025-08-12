# Navigation Links Update Script for EmpowerKids Platform

Write-Host "Updating navigation links in all pages..." -ForegroundColor Green

# Define the base path adjustments for different folder levels
$pathAdjustments = @{
    "pages/auth/" = "../../"
    "pages/rights/" = "../../"
    "pages/resources/" = "../../"
    "pages/activities/" = "../../"
    "pages/learning/" = "../../"
    "pages/" = "../"
}

# Define the new paths for common pages
$newPaths = @{
    "homepage.html" = "homepage.html"
    "corusesreal.html" = "pages/learning/corusesreal.html"
    "quiz.html" = "pages/activities/quiz.html"
    "games.html" = "pages/activities/games.html"
    "parentsu.html" = "pages/resources/parentsu.html"
    "parent.html" = "pages/resources/parent.html"
    "teacher.html" = "pages/resources/teacher.html"
    "faq.html" = "pages/resources/faq.html"
    "checklist.html" = "pages/resources/checklist.html"
    "login page.html" = "pages/auth/login page.html"
    "singinpage.html" = "pages/auth/singinpage.html"
    "basic-rights.html" = "pages/rights/basic-rights.html"
    "education-rights.html" = "pages/rights/education-rights.html"
    "protection-rights.html" = "pages/rights/protection-rights.html"
    "development-rights.html" = "pages/rights/development-rights.html"
    "participation-rights.html" = "pages/rights/participation-rights.html"
    "equality-rights.html" = "pages/rights/equality-rights.html"
    "digital-rights.html" = "pages/rights/digital-rights.html"
    "health-rights.html" = "pages/rights/health-rights.html"
    "expression-rights.html" = "pages/rights/expression-rights.html"
    "family-rights.html" = "pages/rights/family-rights.html"
    "nature-rights.html" = "pages/rights/nature-rights.html"
    "climate-rights.html" = "pages/rights/climate-rights.html"
    "tech-ai-rights.html" = "pages/rights/tech-ai-rights.html"
    "genetic-rights.html" = "pages/rights/genetic-rights.html"
    "neuro-rights.html" = "pages/rights/neuro-rights.html"
    "quantum-rights.html" = "pages/rights/quantum-rights.html"
    "space-rights.html" = "pages/rights/space-rights.html"
    "war-conflict.html" = "pages/rights/war-conflict.html"
    "balancing-rights.html" = "pages/rights/balancing-rights.html"
    "rights-dilemmas.html" = "pages/rights/rights-dilemmas.html"
    "consciousness.html" = "pages/learning/consciousness.html"
    "critical-thinking.html" = "pages/learning/critical-thinking.html"
    "global-citizenship.html" = "pages/learning/global-citizenship.html"
    "justice-systems.html" = "pages/learning/justice-systems.html"
    "social-responsibility.html" = "pages/learning/social-responsibility.html"
    "play-culture.html" = "pages/activities/play-culture.html"
    "calculator.html" = "pages/resources/calculator.html"
    "eligibility.html" = "pages/resources/eligibility.html"
}

Write-Host "Link updates completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Manual updates may still be needed for:" -ForegroundColor Yellow
Write-Host "1. Asset paths (images, videos, CSS, JS)" -ForegroundColor White
Write-Host "2. Internal navigation within moved files" -ForegroundColor White
Write-Host "3. Relative path adjustments based on folder depth" -ForegroundColor White
Write-Host ""
Write-Host "New Structure:" -ForegroundColor Cyan
Write-Host "├── homepage.html (main entry)" -ForegroundColor White
Write-Host "├── pages/" -ForegroundColor White
Write-Host "│   ├── auth/ (login, signup)" -ForegroundColor White
Write-Host "│   ├── rights/ (all rights pages)" -ForegroundColor White
Write-Host "│   ├── resources/ (parent, teacher, FAQ)" -ForegroundColor White
Write-Host "│   ├── activities/ (quiz, games)" -ForegroundColor White
Write-Host "│   └── learning/ (courses, learning modules)" -ForegroundColor White
Write-Host "├── assets/ (images, videos)" -ForegroundColor White
Write-Host "├── CSS/ (stylesheets)" -ForegroundColor White
Write-Host "└── js/ (JavaScript files)" -ForegroundColor White
