import spacy

# Charger le modèle SpaCy
nlp = spacy.load("fr_core_news_md")

def suggest_words(partial_word, collection):
    words = [doc["mot"] for doc in collection.find()]
    similarities = []

    for word in words:
        doc_partial = nlp(partial_word)
        doc_word = nlp(word)
        similarity = doc_partial.similarity(doc_word)
        similarities.append((word, similarity))

    sorted_words = sorted(similarities, key=lambda x: x[1], reverse=True)
    return [word for word, score in sorted_words if score > 0.5]
