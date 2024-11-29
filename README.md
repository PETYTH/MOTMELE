# PredictWord - Compléteur Automatique avec Machine Learning

---

## **Description**

PredictWord est une application interactive basée sur le Machine Learning permettant de compléter automatiquement des mots partiellement saisis par l'utilisateur. Ce projet combine un modèle NLP (Natural Language Processing) pré-entraîné et une base de données enrichie par les utilisateurs pour offrir des suggestions intelligentes.

---

## **Fonctionnalités principales**

1. **Complétion automatique des mots :**
    - L'utilisateur entre un mot avec des lettres manquantes (par exemple : `ch__n`).
    - L'application complète le mot à l'aide d'un modèle NLP pré-entraîné et de mots stockés dans la base de données.

2. **Suggestions dynamiques :**
    - Si plusieurs suggestions sont disponibles, elles apparaissent dans les champs de saisie à intervalles réguliers.

3. **Ajout de nouveaux mots :**
    - Les utilisateurs peuvent enrichir la base de données en ajoutant des mots. Ces mots sont ensuite intégrés dans les suggestions futures.

4. **Interface interactive :**
    - Les champs de saisie sont dynamiques et changent automatiquement en fonction des suggestions.

---

## **Pourquoi ce Projet Intègre le Machine Learning ?**

1. **Modèle NLP (Natural Language Processing) :**
    - Utilisation de modèles pré-entraînés comme **GPT-2** pour prédire et compléter des mots manquants.
    - Exemple :
        - Entrée partielle : `ch__n`.
        - Prédictions : `chien`, `chaîne`, `chanson`.

2. **Apprentissage Continu :**
    - Chaque nouveau mot ajouté par l’utilisateur est stocké dans une base MongoDB et intégré dans les suggestions futures, créant un système adaptatif.

3. **Combinaison NLP + Base de Données :**
    - Le système combine les suggestions générées par le modèle NLP et les mots enregistrés dans la base de données pour offrir des résultats pertinents.

---

## **Technologies utilisées**

### **Backend**
- **Flask :** Framework backend pour créer une API REST.
- **Hugging Face Transformers :** Modèle NLP (ex. GPT-2) pour générer des prédictions.
- **MongoDB :** Base de données NoSQL pour stocker les mots ajoutés par les utilisateurs.
- **Python Libraries :**
    - `transformers` : Gestion des modèles NLP.
    - `pymongo` : Connexion et gestion de MongoDB.
    - `flask-cors` : Pour autoriser les requêtes entre le frontend et le backend.

### **Frontend**
- **React.js :** Interface utilisateur interactive.
- **Axios :** Gestion des requêtes HTTP entre le frontend et le backend.
- **CSS :** Stylisation dynamique des champs de saisie et animations.

---

## **Structure du projet**

```plaintext
Project_ML/
│
├── backend/
│   ├── app.py                  # Serveur Flask (API REST).
│   ├── requirements.txt        # Liste des dépendances backend.
│   ├── config/                 # Configuration (MongoDB, modèles NLP, etc.).
│   └── models/                 # Gestion des mots (base de données).
│
├── frontend/
│   ├── src/
│   │   ├── App.js              # Composant principal React.
│   │   ├── components/         # Composants réutilisables.
│   │   └── styles.css          # Styles CSS.
│   └── package.json            # Dépendances frontend.
│
├── README.md                   # Documentation du projet.
