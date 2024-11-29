// API client for word search endpoints
export async function getAutocompleteSuggestions(partialWord: string) {
  const response = await fetch('http://localhost:5000/autocomplete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ partial_word: partialWord }),
  });
  return response.json();
}

export async function addNewWord(word: string) {
  const response = await fetch('http://localhost:5000/add_word', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ new_word: word }),
  });
  return response.json();
}