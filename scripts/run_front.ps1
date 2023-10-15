
Import-Module ./scripts/utils.psm1

$rootPath = Get-RootPath

Set-Location $rootPath/packages/frontend

npm run dev
