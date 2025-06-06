
import { Loader2 } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meus Tratamentos</h1>
        <p className="text-gray-600">Gerencie e acompanhe todos os seus tratamentos</p>
      </div>
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-bravo-blue mb-4" />
        <p className="text-gray-600">Carregando seus tratamentos...</p>
      </div>
    </div>
  );
};
