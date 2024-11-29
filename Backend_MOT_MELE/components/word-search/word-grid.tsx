'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LetterInput } from './letter-input';
import { SuggestionPreview } from './suggestion-preview';
import { WordForm } from './word-form';
import { getAutocompleteSuggestions } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Plus, Minus, RotateCcw, Search, Wand2 } from 'lucide-react';

export function WordGrid() {
  const [letters, setLetters] = useState<string[]>(Array(2).fill(''));
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getCurrentWord = () => letters.join('').toLowerCase();

  const updateLetters = async (index: number, value: string) => {
    const newLetters = [...letters];
    newLetters[index] = value;
    setLetters(newLetters);
    setSelectedWord(null);
    setHighlightedIndices([]);
    setIsAnalyzing(false);

    if (value && index < letters.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const analyzeWord = async () => {
    const word = getCurrentWord();
    if (word.length >= 2) {
      setIsAnalyzing(true);
      try {
        const result = await getAutocompleteSuggestions(word);
        setSuggestions(result.suggestions);
        if (result.suggestions.length > 0) {
          handleSelectSuggestion(result.suggestions[0]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !letters[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setSelectedWord(null);
      setHighlightedIndices([]);
      setIsAnalyzing(false);
    } else if (e.key === 'Enter') {
      analyzeWord();
    }
  };

  const addField = () => {
    if (letters.length < 10) {
      setLetters([...letters, '']);
      setSelectedWord(null);
      setHighlightedIndices([]);
      setIsAnalyzing(false);
    }
  };

  const removeField = () => {
    if (letters.length > 2) {
      setLetters(letters.slice(0, -1));
      setSelectedWord(null);
      setHighlightedIndices([]);
      setIsAnalyzing(false);
    }
  };

  const resetFields = () => {
    setLetters(Array(letters.length).fill(''));
    setSuggestions([]);
    setSelectedWord(null);
    setHighlightedIndices([]);
    setIsAnalyzing(false);
    inputRefs.current[0]?.focus();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSelectedWord(suggestion);
    const newLetters = [...suggestion.split(''), ...Array(Math.max(0, letters.length - suggestion.length)).fill('')];
    setLetters(newLetters.slice(0, letters.length));
    
    // Highlight the completed letters
    const indices = Array.from({ length: suggestion.length }, (_, i) => i);
    setHighlightedIndices(indices);
    setIsAnalyzing(true);
  };

  const refreshSuggestions = async () => {
    const word = getCurrentWord();
    if (word.length >= 2) {
      try {
        const result = await getAutocompleteSuggestions(word);
        setSuggestions(result.suggestions);
      } catch (error) {
        console.error('Error refreshing suggestions:', error);
      }
    }
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, letters.length);
  }, [letters.length]);

  const currentWord = getCurrentWord();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Lettres ({letters.length})</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={removeField}
              disabled={letters.length <= 2}
              title="Supprimer un champ"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={addField}
              disabled={letters.length >= 10}
              title="Ajouter un champ"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={resetFields}
              title="Réinitialiser"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {letters.map((letter, index) => (
              <LetterInput
                key={index}
                value={letter}
                onChange={(value) => updateLetters(index, value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                index={index}
                isHighlighted={highlightedIndices.includes(index)}
              />
            ))}
          </div>
          
          <Button 
            onClick={analyzeWord}
            disabled={currentWord.length < 2}
            className="w-full group"
          >
            <Wand2 className="h-4 w-4 mr-2 group-hover:animate-bounce" />
            Analyser les lettres
          </Button>
        </div>
      </div>

      {suggestions.length > 0 && (
        <Card className="p-4 transition-all duration-300 hover:shadow-md">
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Search className="h-4 w-4 mr-2 text-primary" />
            Suggestions
          </h4>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <SuggestionPreview
                key={suggestion}
                suggestion={suggestion}
                currentWord={currentWord}
                onSelect={handleSelectSuggestion}
                isSelected={selectedWord === suggestion}
              />
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h4 className="text-sm font-medium mb-3">Ajouter un nouveau mot</h4>
        <WordForm onWordAdded={refreshSuggestions} />
      </Card>
    </div>
  );
}