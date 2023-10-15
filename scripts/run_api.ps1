
Import-Module ./scripts/utils.psm1

$rootPath = Get-RootPath

Set-Location $rootPath/packages/backend

npm start

Set-Location $rootPath
