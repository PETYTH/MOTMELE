from transfor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       mers import pipeline
from transformers import pipeline

# Pipeline de génération
generator = pipeline("text-generation", model="dbddv01/gpt2-french-small")

def generate_words(theme, collection):
    response = generator(f"Liste de mots sur le thème {theme} : ", max_length=50, num_return_sequences=1)
    generated_text = response[0]["generated_text"]
    words = generated_text.split(":")[1].split(",")[:10]
    clean_words = [word.strip().lower() for word in words]

    # Ajouter à MongoDB
    for word in clean_words:
        if collection.find_one({"mot": word}) is None:
            collection.insert_one({"mot": word, "frequence": 1})

    return clean_words

# Pipeline de génération
generator = pipeline("text-generation", model="dbddv01/gpt2-french-small")

def generate_words(theme, collection):
    response = generator(f"Liste de mots sur le thème {theme} : ", max_length=50, num_return_sequences=1)
    generated_text = response[0]["generated_text"]
    words = generated_text.split(":")[1].split(",")[:10]
    clean_words = [word.strip().lower() for word in words]

    # Ajouter à MongoDB
    for word in clean_words:
        if collection.find_one({"mot": word}) is None:
            collection.insert_one({"mot": word, "frequence": 1})

    return clean_words
