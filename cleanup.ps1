
$root = Get-Location

function Remove-NpmModules ([string] $route) {
  [string] $prefix = "$route : "
  [string] $removingMessage = "Removing node_modules...                             "
  [string] $noModulesDetected = "No node_modules detected...                           "
  [string] $successMessage = "Successfully removed node_modules!                "
  [string] $errorMessage = "Oops! Something went wrong. Please check manually.          "

  Set-Location $route

  if (Test-Path "node_modules") {
    Write-Host -NoNewline "`r$prefix $removingMessage"
    Remove-Item -Recurse -Force "node_modules"
    if ($LASTEXITCODE -ne 0) {
      Write-Host "`r$prefix $errorMessage"
    }
    else {
      Write-Host -NoNewine "`r$prefix $successMessage"
    }
  } else {
    Write-Host "`r$prefix $noModulesDetected"
  }

  Set-Location $root
}

Clear-Host
Write-Host "Removing dependencies..."

Remove-NpmModules -route "packages/backend"
Remove-NpmModules -route "packages/frontend"
Remove-NpmModules -route "packages/shared"
