# Performance Optimizations Apply Script
# This script copies optimized component files over the originals

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Applying Performance Optimizations" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Backup original files
Write-Host "Creating backups..." -ForegroundColor Yellow
$backupDir = Join-Path $scriptDir "components\backups"
if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

Copy-Item (Join-Path $scriptDir "components\ParticleBackground.tsx") (Join-Path $backupDir "ParticleBackground.tsx.backup") -Force
Copy-Item (Join-Path $scriptDir "components\game-ui.tsx") (Join-Path $backupDir "game-ui.tsx.backup") -Force
Copy-Item (Join-Path $scriptDir "components\loading-screen.tsx") (Join-Path $backupDir "loading-screen.tsx.backup") -Force

Write-Host "Backups created in components\backups\" -ForegroundColor Green

# Apply optimizations
Write-Host ""
Write-Host "Applying optimizations..." -ForegroundColor Yellow

Copy-Item (Join-Path $scriptDir "components\ParticleBackground.optimized.tsx") (Join-Path $scriptDir "components\ParticleBackground.tsx") -Force
Write-Host "✓ ParticleBackground.tsx optimized" -ForegroundColor Green

Copy-Item (Join-Path $scriptDir "components\game-ui.optimized.tsx") (Join-Path $scriptDir "components\game-ui.tsx") -Force
Write-Host "✓ game-ui.tsx optimized (responsive + score animation fix)" -ForegroundColor Green

Copy-Item (Join-Path $scriptDir "components\loading-screen.optimized.tsx") (Join-Path $scriptDir "components\loading-screen.tsx") -Force
Write-Host "✓ loading-screen.tsx optimized" -ForegroundColor Green

# Update page.tsx loading time
Write-Host ""
Write-Host "Updating page.tsx loading time..." -ForegroundColor Yellow
$pagePath = Join-Path $scriptDir "app\page.tsx"
$pageContent = Get-Content $pagePath -Raw
$pageContent = $pageContent -replace '}, 2000\) // Show loading screen for 2 seconds', '}, 1000) // OPTIMIZED: Reduced from 2000ms to 1000ms'
Set-Content -Path $pagePath -Value $pageContent
Write-Host "✓ Loading time reduced from 2000ms to 1000ms" -ForegroundColor Green

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Optimizations Applied Successfully!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Changes made:" -ForegroundColor Yellow
Write-Host "  • Reduced particle count from 20/30 to 10/15"
Write-Host "  • Removed expensive grid/hexagon drawing"
Write-Host "  • Optimized glow effects"
Write-Host "  • Made GameUI fully responsive"
Write-Host "  • Fixed score popup lag"
Write-Host "  • Reduced loading screen time to 1 second"
Write-Host "  • Simplified animations for better performance"
Write-Host ""
Write-Host "Original files backed up to: components\backups\" -ForegroundColor Cyan
Write-Host ""
