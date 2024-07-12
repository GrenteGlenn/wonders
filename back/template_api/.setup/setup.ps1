# Copier le fichier pre-commit
Copy-Item -Path "./pre-commit-windows" -Destination "../../../.git/hooks/"

# Afficher un message
Write-Output "Done! :)"