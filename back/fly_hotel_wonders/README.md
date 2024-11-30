### Microservice `Country`

# Tables :
    - Country: table qui stocke les informationd d'un pays et surtout sa description. Quand on fait un get/:id une verification est faite si la description n'a pas été  créé il y a plus de 29 jours, si  c'est le cas un call openai est fait pour mettre à jour cette information. 

    - City: Table qui stocke les villes et est lié a Country avec une relation OneToMany

# Note: Pour le bon fonctionnement du microservice qui utilise les service de `OPENAI` vous devez posseder et exporte la variable suivante :`

    - export OPENAI_API_KEY="your_api_key_here"

`Pour plus d'information voici le lien de la doc de OPENAI : https://platform.openai.com/docs/quickstart`

