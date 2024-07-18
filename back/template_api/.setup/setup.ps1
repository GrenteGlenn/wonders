# Copier le fichier pre-commit
Copy-Item -Path "./pre-commit-windows" -Destination "../../../.git/hooks/pre-commit"

# Afficher un message
Write-Output "Done! :)"