Projet Flask : Système d'Autocomplétion
Description
Ce projet est une API simple permettant d'effectuer des suggestions de mots via un système d'autocomplétion. Les données sont stockées dans une base de données MongoDB, et l'API permet aussi d'ajouter de nouveaux mots ou d'augmenter leur fréquence si le mot existe déjà.

Fonctionnalités
Autocomplétion :

Propose des mots qui commencent par une chaîne partielle fournie par l'utilisateur.
Retourne une erreur si la chaîne est inférieure à deux caractères.
Ajout de mots :

Ajoute un nouveau mot dans la base de données.
Si le mot existe déjà, la fréquence associée est augmentée.
Prérequis
Python 3.x
MongoDB (en cours d'exécution sur localhost:27017)
Les dépendances Python suivantes :
Flask
Flask-Cors
pymongo
Installation
Clonez ce dépôt ou copiez le code source dans un répertoire local :

bash
Copier le code
git clone <url_du_depot>
cd <nom_du_dossier>
Installez un environnement virtuel (optionnel mais recommandé) :

bash
Copier le code
python -m venv env
source env/bin/activate  # Sur Linux/macOS
env\Scripts\activate     # Sur Windows
Installez les dépendances nécessaires :

bash
Copier le code
pip install Flask Flask-Cors pymongo
Assurez-vous que MongoDB est en cours d'exécution sur localhost:27017.
Si ce n'est pas le cas, démarrez MongoDB.

Démarrage
Exécutez le fichier principal app.py :

bash
Copier le code
python app.py
L'application sera accessible à l'adresse suivante :

arduino
Copier le code
http://127.0.0.1:5000/
Points de terminaison API
1. /autocomplete (POST)
Description : Propose des suggestions de mots correspondant à une chaîne partielle donnée.
Corps de la requête :
json
Copier le code
{
  "partial_word": "chaîne_partielle"
}
Réponse réussie (200) :
json
Copier le code
{
  "suggestions": ["chaîne1", "chaîne2", "chaîne3"]
}
Erreur (400) :
json
Copier le code
{
  "error": "Veuillez fournir au moins 2 lettres."
}
2. /add_word (POST)
Description : Ajoute un mot ou augmente sa fréquence s'il existe déjà.
Corps de la requête :
json
Copier le code
{
  "new_word": "mot_nouveau"
}
Réponse réussie (200) :
json
Copier le code
{
  "message": "Le mot 'mot_nouveau' a été ajouté avec succès."
}
Erreur (400) :
json
Copier le code
{
  "error": "Le mot doit avoir au moins 2 lettres."
}
Structure de la base de données MongoDB
Base de données : mots_melees
Collection : mots
Exemple de document :
json
Copier le code
{
  "_id": "id_unique",
  "mot": "maison",
  "frequence": 1
}
Exemple avec Postman ou curl
1. Tester /autocomplete
Commande curl :
bash
Copier le code
curl -X POST http://127.0.0.1:5000/autocomplete \
-H "Content-Type: application/json" \
-d '{"partial_word": "cha"}'
Réponse attendue :
json
Copier le code
{
  "suggestions": ["chat", "chaise"]
}
2. Tester /add_word
Commande curl :
bash
Copier le code
curl -X POST http://127.0.0.1:5000/add_word \
-H "Content-Type: application/json" \
-d '{"new_word": "ciel"}'
Réponse attendue :
json
Copier le code
{
  "message": "Le mot 'ciel' a été ajouté avec succès."
}
Problèmes connus
Si MongoDB n'est pas en cours d'exécution, l'API ne fonctionnera pas.
Les suggestions sont limitées aux mots commencés par la chaîne exacte (non sensible à la casse).
Améliorations futures
Ajouter la pagination pour les résultats d'autocomplétion.
Implémenter un système de score pondéré basé sur la fréquence.
Ajouter une interface utilisateur pour tester l'API.
Auteur
Nom : [Votre Nom]
Contact : [Votre Email]