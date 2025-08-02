# Rename-Project.ps1

function Get-ReplacementString {
    while ($true) {
        $replacement = Read-Host "Enter the new project name"
        if ([string]::IsNullOrWhiteSpace($replacement)) {
            Write-Host "Input cannot be empty. Try again.`n" -ForegroundColor Yellow
            continue
        }

        Write-Host "Are you sure you want to rename the project to: '$replacement'? (Y/N)"
        $confirmation = Read-Host

        if ($confirmation -match '^[Yy]$') {
            return $replacement
        } elseif ($confirmation -match '^[Nn]$') {
            Write-Host "`nLet's try again..." -ForegroundColor Cyan
        } else {
            Write-Host "Invalid input. Please enter 'Y' or 'N'.`n" -ForegroundColor Red
        }
    }
}

function Get-AllItems($path) {
    $items = @()
    foreach ($entry in Get-ChildItem -Force -LiteralPath $path) {
        if ($entry.Name -eq '.git') { continue }

        $items += $entry

        if ($entry.PSIsContainer) {
            $items += Get-AllItems -path $entry.FullName
        }
    }
    return $items
}

function Replace-Content($path, $oldValue, $newValue) {
    $content = Get-Content $path -Raw
    if ($content -match $oldValue) {
        $newContent = $content -creplace $oldValue, $newValue
        Set-Content $path $newContent
    }
}

function Rename-ItemWithCheck($itemPath, $oldValue, $newValue) {
    $itemName = Split-Path $itemPath -Leaf
    if ($itemName -match $oldValue) {
        $parentPath = Split-Path $itemPath -Parent
        $newName = $itemName -creplace $oldValue, $newValue
        $newPath = Join-Path $parentPath $newName
        Rename-Item -Path $itemPath -NewName $newName -Force
        return $newPath
    }
    return $itemPath
}

# MAIN
$originalValue = "SampleTemplate"
$replacementValue = Get-ReplacementString

# Use custom recursive traversal that skips .git
$allItems = Get-AllItems -path "." | Sort-Object FullName -Descending

foreach ($item in $allItems) {
    if (-not $item.PSIsContainer) {
        Replace-Content -path $item.FullName -oldValue $originalValue -newValue $replacementValue
    }
}

foreach ($item in $allItems) {
    Rename-ItemWithCheck -itemPath $item.FullName -oldValue $originalValue -newValue $replacementValue | Out-Null
}

# Rename root folder if needed
$currentFolder = Get-Item "."
Rename-ItemWithCheck -itemPath $currentFolder.FullName -oldValue $originalValue -newValue $replacementValue | Out-Null

# Delete the script itself
$scriptPath = $MyInvocation.MyCommand.Path
Start-Sleep -Milliseconds 200
try {
    Remove-Item -Path $scriptPath -Force
} catch {
    Write-Host "Could not delete the script file. You may need to delete it manually." -ForegroundColor Yellow
}
