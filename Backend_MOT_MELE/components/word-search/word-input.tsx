'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAutocompleteSuggestions, addNewWord } from '@/lib/api';

export function WordInput() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleInputChange = async (value: string) => {
    setInput(value);
    if (value.length >= 2) {
      try {
        const result = await getAutocompleteSuggestions(value);
        setSuggestions(result.suggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleAddWord = async () => {
    if (input.length < 2) {
      toast({
        title: 'Erreur',
        description: 'Le mot doit contenir au moins 2 lettres.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await addNewWord(input);
      toast({
        title: 'Succès',
        description: result.message,
      });
      setInput('');
      setSuggestions([]);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le mot.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Entrez un mot..."
          className="flex-1"
        />
        <Button onClick={handleAddWord}>Ajouter</Button>
      </div>
      {suggestions.length > 0 && (
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-2">Suggestions:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="secondary"
                size="sm"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}