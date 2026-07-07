$RemoteHost = "sxl-admin@100.106.152.51"
$RemoteDir = "/home/sxl-admin/cybersec-masters"

$SudoPassword = Read-Host "Enter sudo password for $RemoteHost" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($SudoPassword)
$SudoPwdPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host "Fetching Docker logs for the Node server..." -ForegroundColor Cyan
ssh $RemoteHost "echo '$SudoPwdPlain' | sudo -S docker compose -f $RemoteDir/docker-compose.yml logs --tail=50 cybersec-masters"

Write-Host "`nFetching Docker logs for Nginx..." -ForegroundColor Cyan
ssh $RemoteHost "echo '$SudoPwdPlain' | sudo -S docker compose -f $RemoteDir/docker-compose.yml logs --tail=50 nginx"
