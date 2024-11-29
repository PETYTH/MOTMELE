'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LetterInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  index: number;
  isHighlighted?: boolean;
}

export function LetterInput({ value, onChange, onKeyDown, index, isHighlighted }: LetterInputProps) {
  return (
    <Input
      type="text"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value.toLowerCase())}
      onKeyDown={onKeyDown}
      className={cn(
        "w-12 h-12 text-center text-lg font-medium transition-all duration-300",
        "focus:ring-2 focus:ring-primary focus:border-primary",
        "hover:border-primary/50",
        isHighlighted && "bg-primary/10 border-primary text-primary font-bold scale-105",
        "rounded-lg shadow-sm"
      )}
      aria-label={`Lettre ${index + 1}`}
    />
  );
}