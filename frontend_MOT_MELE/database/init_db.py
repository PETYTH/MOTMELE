from pymongo import MongoClient

# Connexion MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mots_melees"]
collection = db["mots"]

# Mots initiaux
initial_words = ["maison", "chien", "chat", "école", "soleil", "voiture", "ordinateur", "python"]

# Ajouter des mots si la collection est vide
if collection.count_documents({}) == 0:
    collection.insert_many([{"mot": word, "frequence": 1} for word in initial_words])
    print("Base de données initialisée avec des mots par défaut.")
else:
    print("La base de données est déjà remplie.")
