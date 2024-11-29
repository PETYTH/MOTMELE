'use client';

import { Button } from '@/components/ui/button';
import { Eraser, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addNewWord } from '@/lib/api';

interface WordControlsProps {
  letters: string[];
  onReset: () => void;
  disabled: boolean;
}

export function WordControls({ letters, onReset, disabled }: WordControlsProps) {
  const { toast } = useToast();

  const handleComplete = async () => {
    const word = letters.join('').trim();
    if (word.length < 2) {
      toast({
        title: 'Erreur',
        description: 'Le mot doit contenir au moins 2 lettres.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await addNewWord(word);
      toast({
        title: 'Succès',
        description: result.message,
      });
      onReset();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le mot.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        disabled={disabled}
        className="flex-1"
      >
        <Eraser className="h-4 w-4 mr-2" />
        Réinitialiser
      </Button>
      <Button
        size="sm"
        onClick={handleComplete}
        disabled={disabled}
        className="flex-1"
      >
        <Check className="h-4 w-4 mr-2" />
        Compléter
      </Button>
    </div>
  );
}