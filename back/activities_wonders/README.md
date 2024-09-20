### Microservice Activities Wonders

## Déscription : 

    - Microservce qui stocke les les activitées et les catagories des activités, les images de categories d'activiés, les leviews et les notes des activités

## Détail des tables :


# Activités

`activity :`

    - Table sert à stocker les activités, comprend l'id de la categorie d'activité ( le modele de données peut changer quand on aura des données du scrapping ).

`activitycategory :`

    - Table sert à stocker la catagorie d'une activité (ex:  sports aquatiques, randonnées, point de vue, sports de neige, etc...).

`picture : `

    - table sert à stocker l'image d'une categorie ( a voir si on la garde car si une categorie est lié a une seule image autant juste avoir un champ image)

# Reviews

`review : `

    - Table sert à stocker le commentaire de l'utilisateur ainsi que la note 

`rating: `

    - table stocke les notes utilisables par les utilisateurs de 1 à 5 ( ca evite d'avoir des -100 ou des 45 ... Ca aurait pu etre géré coté front en dur)


