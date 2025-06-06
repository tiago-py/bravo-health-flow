
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meus Tratamentos</h1>
        <p className="text-gray-600">Gerencie e acompanhe todos os seus tratamentos</p>
      </div>
      <Card>
        <CardContent className="py-8 text-center">
          <AlertCircle className="h-8 w-8 mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar tratamentos</h3>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="mx-auto"
          >
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
