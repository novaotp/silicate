param (
    [Parameter(Mandatory=$true)]
    [ValidateSet("web", "express")]
    [string]$app
)

Import-Module .\scripts\utils.psm1

$rootPath = Get-RootPath

if ($app -eq "web") {
    Set-Location -Path "$rootPath/packages/frontend"
    Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run dev"
    Set-Location -Path $rootPath
} 
elseif ($app -eq "express") {
    Set-Location -Path "$rootPath/packages/backend/api"
    Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start"
    Set-Location -Path $rootPath
}
else {
    $acceptedOptions = "web, express"
    Write-Host "Invalid app param, expected $acceptedOptions" -ForegroundColor Red
    return
}
