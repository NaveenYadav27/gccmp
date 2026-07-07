param(
    [Parameter(Mandatory=$true)]
    [string]$SudoPassword,
    [string]$SshKey = ""
)

$RemoteHost = "sxl-admin@100.106.152.51"
$RemoteDir = "/home/sxl-admin/cybersec-masters"
$SudoPwdPlain = $SudoPassword

function Invoke-SSH {
    param([string]$Cmd)
    if ($SshKey) { ssh -i $SshKey $RemoteHost $Cmd }
    else { ssh $RemoteHost $Cmd }
}

function Invoke-SCP {
    param([string]$Source, [string]$Dest)
    if ($SshKey) { scp -i $SshKey $Source $Dest }
    else { scp $Source $Dest }
}

Write-Host "Preparing environment files..." -ForegroundColor Cyan
if (!(Test-Path ".env")) {
    Write-Host "No .env file found. Copying .env.example as .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" -Destination ".env"
}

Write-Host "Compressing project (excluding node_modules and .git)..." -ForegroundColor Cyan
tar --exclude="node_modules" --exclude=".git" -czf deploy.tar.gz .

Write-Host "Uploading project archive..." -ForegroundColor Cyan
Invoke-SCP "deploy.tar.gz" "${RemoteHost}:/home/sxl-admin/"

# Build the remote script content - write to a local temp file and SCP it over
$ScriptContent = @"
#!/bin/bash
set -e
SUDO_PWD='$SudoPwdPlain'
REMOTE_DIR='$RemoteDir'

echo '--- Step 1: Setup directory ---'
mkdir -p `$REMOTE_DIR
mv /home/sxl-admin/deploy.tar.gz `$REMOTE_DIR/

echo '--- Step 2: Wipe old build (using sudo for root-owned Docker files) ---'
cd `$REMOTE_DIR
echo "`$SUDO_PWD" | sudo -S rm -rf src/ .output/ node_modules/ || true

echo '--- Step 3: Extract new build ---'
tar -xzf deploy.tar.gz
rm deploy.tar.gz

echo '--- Step 4: Fix file ownership ---'
echo "`$SUDO_PWD" | sudo -S chown -R sxl-admin:sxl-admin `$REMOTE_DIR

echo '--- Step 5: Rebuild and restart Docker containers ---'
echo "`$SUDO_PWD" | sudo -S docker compose up --build -d
echo "`$SUDO_PWD" | sudo -S docker compose restart nginx

echo '--- Deployment complete! ---'
"@

# Write to a local temp file
$ScriptContent | Out-File -FilePath "remote_deploy.sh" -Encoding ascii -NoNewline

Write-Host "Uploading deployment script..." -ForegroundColor Cyan
Invoke-SCP "remote_deploy.sh" "${RemoteHost}:/home/sxl-admin/remote_deploy.sh"

Write-Host "Running deployment on remote server (this takes 2-3 minutes)..." -ForegroundColor Cyan
Invoke-SSH "bash /home/sxl-admin/remote_deploy.sh"

Write-Host "Cleaning up local files..." -ForegroundColor Cyan
Remove-Item deploy.tar.gz -ErrorAction SilentlyContinue
Remove-Item remote_deploy.sh -ErrorAction SilentlyContinue

Write-Host "Done! Visit: http://100.106.152.51:3000" -ForegroundColor Green
