### Microservice Quiz Wonders

## Déscription : 

    - Microservce qui stocke les questionnaires, les reponses utilisateurs aux questionnaires et prochainement la reponse IA concerant l'itineraire

## Détail des tables :


# Stockage des questions

`quiz :`

    - Table sert pricipalement a regroupper les question, donc savoir quelle question est à quelle questionnaire. Cette table est relié  à la table Tag pour definir quel est l'ordre des quiz ( car nous avons convenu que au lieu de soumettre à l'utilisateur un questionnaire de 4à questions nous allons lui soumettre plusieurs petits questionnaires pour affiner le resultat et ne pas perdre l'utilisateur)

    Pour créer un quiz il faut:

     - Créer prealablement un tag qui comporte les champs suivants et sert a donner un autre aux questionnaires: 
            - name: string

     - Donner un nom au quiz
            - name: string

    json de création `http://localhost:3000/api/quiz`: 

    `{
        "tag_id": 2,
        "name": "test de création" 
     }`

`quizLine :`

    - Table stocke les questions d'un questionnaire, on reconnait a quel quiz elle appartient grace à la relation avec la table `quiz`. Cette table comporte plusieurs champs dont :
        - question: la question elle meme 
        - is_boolean, is_text, response kind_id (je sais pas si vais garder des booleans dans la table pour definir le type de reponse ou bien la table response_kind)
        - step: ordre de la question
        - is_required: si l'utilisateur doit repondre a cette question
        - tag_id: debut de refacto du champ step (pareil je sais pas quelle logique garder)

        Json de création `http://localhost:3000/api/quiz-line` : 
            `
            {
                "quiz_id": 4,
                "question": "test de création",
                "is_required": true,
                "is_text": true,
                "is_boolean": false,
                "tag_id": 2,
                "response_kind_id": 1,
                "step": 2
            }
            `

`quizAnswertext : `

    - Table sert a stocker les reponses pre-faites ( quand on attend pas un text libre de l'utilisateur mais un choix de reponses existantes ). Dans cette table on stocke la reponse dans le champ `answer` et on le lie à `quizLine` pour savoir a quelle question appartient cette reponse.

    Json de création `http://localhost:3000/api/quiz-answer-text` :

        `
        {
            "quiz_line_id": 4,
            "answer": "test de création"
        }
        `


# Stockage des réponses

`quizresponse : `

    - Table a l'utilité similaire  à la table `quiz` mais au lieu de permettre d'identifier a quel questionnaire appartiennent les questions on identifie a quelle questionnaire et a quel utilisateur appartiennent les reponses.

    Json de création `http://localhost:3000/api/quiz-response` :
         `
         {
            "user_id": 1,
            "quiz_id": 2
        }
         ` 

`userAnswer: `

    - table qui stocke la reponse a une question et est lié à la table quizresponse pour connaitre a quel jeu de reponses ( a quel questionnaire appartient cette reponse). Si boolean donc reponse boolean, si text donc text si reponse predefinie donc quiz_answer_text_id.

    Json de création `http://localhost:3000/api/user-answer` :

        `
        {
            "user_id": 1,
            "quiz_id": 2
        }
        `

# Autres 


`Status :`

    - table qui serira prochainement a identifier quelle activité a ete faite ou pas.

`userQuizIaResultCountry` et `userQuizIaresult`

    - Tables qui stockeront la reponse ngenré par l'IA. Le stockage reste flou donc modele risque de changer.

`organization` et `organizationUrl :` 

    - tables qui servirons a stocker les activitées et l'etat des activités (à faire, fait, etc...) 

