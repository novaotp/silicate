$scriptPath = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$parentPath = (Get-Item $scriptPath).Parent.FullName
$envPath = "ROOT_PATH=$parentPath"
$envPath | Out-File -FilePath .env -Encoding utf8
