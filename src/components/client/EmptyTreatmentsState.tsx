
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Plus } from 'lucide-react';

export const EmptyTreatmentsState = () => {
  return (
    <Card>
      <CardContent className="py-8 text-center">
        <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum tratamento encontrado</h3>
        <p className="text-sm text-gray-500 mb-6">
          Seus tratamentos aparecerão aqui quando iniciados
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/anamnese/queda-capilar">
              <Plus className="h-4 w-4 mr-2" />
              Iniciar Tratamento Capilar
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/anamnese/disfuncao-eretil">
              <Plus className="h-4 w-4 mr-2" />
              Iniciar Tratamento para Disfunção Erétil
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
