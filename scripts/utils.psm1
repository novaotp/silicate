
function Get-RootPath {
    $envPath = Get-Content -Path .env | Where-Object { $_ -match "ROOT_PATH" }
    $rootPath = $envPath.Split('=')[1]
    return $rootPath
}
Export-ModuleMember -Function Get-RootPath
