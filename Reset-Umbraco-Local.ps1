# This script deletes the 'Data' and 'Logs' folders inside any '*.Web\umbraco' directory from the script's location.

# Find all *.TestSite\umbraco folders under the script's directory
$umbracoFolders = Get-ChildItem -Path $PSScriptRoot -Recurse -Directory |
    Where-Object { $_.FullName -match '\\src\\[^\\]+\.TestSite\\umbraco$' }

foreach ($umbracoPath in $umbracoFolders) {
    $dataPath = Join-Path -Path $umbracoPath.FullName -ChildPath "Data"
    $logsPath = Join-Path -Path $umbracoPath.FullName -ChildPath "Logs"

    if (Test-Path $dataPath) {
        Remove-Item $dataPath -Recurse -Force -ErrorAction SilentlyContinue
        Write-Output "Removed folder: $dataPath"
    } else {
        Write-Output "Folder not found: $dataPath"
    }

    if (Test-Path $logsPath) {
        Remove-Item $logsPath -Recurse -Force -ErrorAction SilentlyContinue
        Write-Output "Removed folder: $logsPath"
    } else {
        Write-Output "Folder not found: $logsPath"
    }
}