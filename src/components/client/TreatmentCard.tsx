
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Eye } from 'lucide-react';

interface Treatment {
  id: string;
  title: string;
  type: string;
  startDate: string;
  currentPhase: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  duration: string;
  timeElapsed: string;
  timeRemaining: string;
  lastUpdate: string;
}

interface TreatmentCardProps {
  treatment: Treatment;
}

const getBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Ativo</Badge>;
    case 'completed':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Concluído</Badge>;
    case 'paused':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pausado</Badge>;
    default:
      return <Badge variant="outline">Outro</Badge>;
  }
};

export const TreatmentCard = ({ treatment }: TreatmentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 text-bravo-blue mr-2" />
              {treatment.title}
              <span className="ml-3">
                {getBadge(treatment.status)}
              </span>
            </CardTitle>
            <CardDescription className="mt-1">
              {treatment.type} • Iniciado em {new Date(treatment.startDate).toLocaleDateString('pt-BR')}
            </CardDescription>
          </div>
          <Button asChild size="sm">
            <Link to={`/cliente/tratamentos/${treatment.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Link>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-500">Fase Atual:</span>
              <p className="font-semibold">{treatment.currentPhase}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Tempo Decorrido:</span>
              <p className="font-semibold">{treatment.timeElapsed}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Última Atualização:</span>
              <p className="font-semibold">
                {new Date(treatment.lastUpdate).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progresso do Tratamento</span>
              <span>{treatment.progress}%</span>
            </div>
            <Progress value={treatment.progress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
