'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SuggestionPreviewProps {
  suggestion: string;
  currentWord: string;
  onSelect: (word: string) => void;
  isSelected?: boolean;
}

export function SuggestionPreview({ 
  suggestion, 
  currentWord, 
  onSelect,
  isSelected 
}: SuggestionPreviewProps) {
  const prefix = currentWord.toLowerCase();
  const suffix = suggestion.slice(prefix.length);

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onSelect(suggestion)}
      className={cn(
        "font-mono transition-all duration-200",
        isSelected ? "bg-primary/20 text-primary border-primary" : "hover:bg-primary/10 hover:text-primary"
      )}
    >
      <span className="font-semibold">{prefix}</span>
      <span className={cn(
        "transition-colors",
        isSelected ? "text-primary/80" : "text-muted-foreground"
      )}>{suffix}</span>
    </Button>
  );
}