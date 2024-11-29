'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addNewWord } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface WordFormProps {
  onWordAdded: () => void;
}

export function WordForm({ onWordAdded }: WordFormProps) {
  const [newWord, setNewWord] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.length < 2) {
      toast({
        title: 'Erreur',
        description: 'Le mot doit contenir au moins 2 lettres.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await addNewWord(newWord);
      toast({
        title: 'Succès',
        description: result.message,
      });
      setNewWord('');
      onWordAdded();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le mot.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={newWord}
        onChange={(e) => setNewWord(e.target.value.toLowerCase())}
        placeholder="Ajouter un nouveau mot..."
        className="flex-1"
      />
      <Button type="submit">
        <Plus className="h-4 w-4 mr-2" />
        Ajouter
      </Button>
    </form>
  );
}