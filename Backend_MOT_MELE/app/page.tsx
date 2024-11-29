import { WordGrid } from '@/components/word-search/word-grid';
import { Brain, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center mb-8 space-y-4">
            <div className="relative">
              <div className="absolute -left-12 -top-8">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="flex items-center space-x-3">
                <Brain className="h-12 w-12 text-primary" />
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Mots Mêlés ML
                </h1>
              </div>
              <div className="absolute -right-10 -bottom-6">
                <Sparkles className="h-6 w-6 text-primary animate-pulse delay-150" />
              </div>
            </div>
            <p className="text-muted-foreground text-center max-w-md">
              Découvrez la puissance de l'apprentissage automatique pour enrichir votre vocabulaire
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <span>Recherche de Mots</span>
              <div className="h-1 flex-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full ml-4" />
            </h2>
            <p className="text-muted-foreground mb-6">
              Entrez des lettres pour trouver des mots correspondants. 
              Ajoutez ou supprimez des champs selon vos besoins.
            </p>
            <WordGrid />
          </div>
        </div>
      </div>
    </main>
  );
}