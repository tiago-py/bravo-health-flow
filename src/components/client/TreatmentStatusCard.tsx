
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Clock, CalendarClock, AlertCircle } from 'lucide-react';

interface TreatmentStatusCardProps {
  currentTreatment: any;
  treatmentStatusInfo: {
    status: string;
    color: string;
    icon: any;
    text: string;
  };
}

export const TreatmentStatusCard = ({ currentTreatment, treatmentStatusInfo }: TreatmentStatusCardProps) => {
  const StatusIcon = treatmentStatusInfo.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Seu Tratamento</CardTitle>
            <CardDescription>Status atual e informações</CardDescription>
          </div>
          <div className="flex items-center">
            <span className={`flex items-center text-sm text-${treatmentStatusInfo.color}-600 font-medium`}>
              <StatusIcon size={16} className="mr-1" />
              {treatmentStatusInfo.text}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {currentTreatment ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo de Tratamento</h3>
                <p className="font-medium">{currentTreatment.type || currentTreatment.treatmentType || 'Não especificado'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Plano</h3>
                <p className="font-medium">{currentTreatment.plan || currentTreatment.planName || 'Não especificado'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Última Avaliação</h3>
                <p className="font-medium">
                  {currentTreatment.lastEvaluation 
                    ? new Date(currentTreatment.lastEvaluation).toLocaleDateString('pt-BR')
                    : 'Não informado'
                  }
                </p>
              </div>
            </div>
            
            {treatmentStatusInfo.status === 'active' && (
              <div className="mt-4">
                {currentTreatment.progress !== undefined && (
                  <>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Progresso do Tratamento</span>
                      <span>{currentTreatment.progress || 0}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full" 
                        style={{ width: `${currentTreatment.progress || 0}%` }}
                      />
                    </div>
                  </>
                )}
                
                {currentTreatment.nextShipment && (
                  <div className="flex items-center mt-4 text-sm text-gray-600">
                    <CalendarClock size={16} className="mr-2" />
                    <span>
                      Próxima entrega em {new Date(currentTreatment.nextShipment).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Nenhum tratamento ativo encontrado</p>
            <Button asChild>
              <Link to="/anamnese/queda-capilar">
                Iniciar Avaliação
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
      {currentTreatment && (
        <CardFooter className="border-t border-gray-100 pt-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Veja mais detalhes sobre seu tratamento e histórico
            </p>
            <Button variant="outline" asChild>
              <Link to="/cliente/tratamentos">
                Ver tratamentos
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
