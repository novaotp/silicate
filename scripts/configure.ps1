# Configure the repo (install npm modules etc.)

$root = Get-Location
function Install-NpmModules ([string] $route, [string] $override) {
  [string] $prefix = "$route : "
  [string] $removingMessage = "Removing npm_modules...                  "
  [string] $installingMessage = "Installing npm_modules...              "
  [string] $errorMessage = "Oops! Something went wrong. Please check manually.          "
  [string] $successMessage = "Successfully installed npm modules!     "
  [string] $skipInstall = "Skipped installation!     "

  Set-Location $route

  if ($override -eq "y") {
    if (Test-Path "node_modules") {
      Write-Host -NoNewline "`r$prefix $removingMessage"
      Remove-Item -Recurse -Force "node_modules"
    }
    Write-Host -NoNewline "`r$prefix $installingMessage"
    npm i *> $null 2>&1
    if ($LASTEXITCODE -ne 0) {
      Write-Host "`r$prefix $errorMessage"
    }
    else {
      Write-Host "`r$prefix $successMessage"
    }
  }
  else {
    if (Test-Path "node_modules") {
      Write-Host -NoNewline "`r$prefix $skipInstall"
    }
    else {
      Write-Host -NoNewline "`r$prefix No node_modules detected..."
      Write-Host -NoNewline "`r$prefix $installingMessage"
      npm i *> $null 2>&1
      if ($LASTEXITCODE -ne 0) {
        Write-Host "`r$prefix $errorMessage"
      }
      else {
        Write-Host "`r$prefix $successMessage"
      }
    }

    if ($LASTEXITCODE -ne 0) {
      Write-Host "`r$prefix $errorMessage"
    }
  }

  Set-Location $root
}

Clear-Host
Write-Host "Starting powershell script..."
[string] $override = Read-Host "Remove and reinstall the node_modules folder if it already exists ? (y/n) "
Clear-Host
Write-Host "Starting powershell script..."

Install-NpmModules -route "packages/backend" -override $override
Install-NpmModules -route "packages/frontend" -override $override
Install-NpmModules -route "packages/shared" -override $override
