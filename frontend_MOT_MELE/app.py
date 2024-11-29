from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connexion MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mots_melees"]
collection = db["mots"]

# Ajouter des mots initiaux
initial_words = ["maison", "chien", "chat", "école", "soleil", "voiture", "ordinateur", "python"]

if collection.count_documents({}) == 0:
    collection.insert_many([{"mot": word, "frequence": 1} for word in initial_words])

@app.route('/autocomplete', methods=['POST'])
def autocomplete():
    data = request.json
    partial_word = data.get("partial_word", "").lower()
    if len(partial_word) < 2:
        return jsonify({"error": "Veuillez fournir au moins 2 lettres."}), 400

    # Récupérer les mots correspondant au début
    words = [doc["mot"] for doc in collection.find()]
    suggestions = [word for word in words if word.startswith(partial_word)]
    return jsonify({"suggestions": suggestions})

@app.route('/add_word', methods=['POST'])
def add_word():
    data = request.json
    new_word = data.get("new_word", "").lower()

    if len(new_word) < 2:
        return jsonify({"error": "Le mot doit avoir au moins 2 lettres."}), 400

    # Vérifier si le mot existe déjà
    existing_word = collection.find_one({"mot": new_word})
    if existing_word:
        # Augmenter la fréquence
        collection.update_one({"mot": new_word}, {"$inc": {"frequence": 1}})
    else:
        # Ajouter un nouveau mot
        collection.insert_one({"mot": new_word, "frequence": 1})

    return jsonify({"message": f"Le mot '{new_word}' a été ajouté avec succès."})

if __name__ == "__main__":
    app.run(debug=True)
