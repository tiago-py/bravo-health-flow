
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  displayName: string;
}

export const DashboardHeader = ({ displayName }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold text-bravo-blue">
          Bem-vindo, {displayName.split(' ')[0]}
        </h1>
        <p className="text-gray-600">
          Aqui você pode acompanhar seu tratamento e avaliações
        </p>
      </div>
      
      <div className="mt-4 md:mt-0 flex space-x-3">
        <Button asChild>
          <Link to="/anamnese/queda-capilar">
            Refazer Avaliação
          </Link>
        </Button>
        <Button 
          variant="outline" 
          asChild
        >
          <Link to="/cliente/suporte">
            Suporte
          </Link>
        </Button>
      </div>
    </div>
  );
};
