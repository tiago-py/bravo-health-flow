
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Clock, CalendarClock } from 'lucide-react';

const ClientDashboard = () => {
  const { user } = useAuth();
  
  // Mock treatment status
  const treatmentStatus = {
    status: 'active', // active, pending, awaiting_review
    type: 'Queda Capilar',
    planName: 'Plano Premium',
    lastEvaluation: '2023-03-15',
    nextShipment: '2023-04-10',
    progressPercentage: 75,
    notifications: 1,
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue">
            Bem-vindo, {user?.name?.split(' ')[0]}
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
      
      <div className="grid grid-cols-1 gap-4">
        {/* Treatment Status Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Seu Tratamento</CardTitle>
                <CardDescription>Status atual e informações</CardDescription>
              </div>
              <div className="flex items-center">
                {treatmentStatus.status === 'active' && (
                  <span className="flex items-center text-sm text-green-600 font-medium">
                    <CheckCircle size={16} className="mr-1" />
                    Ativo
                  </span>
                )}
                {treatmentStatus.status === 'pending' && (
                  <span className="flex items-center text-sm text-amber-600 font-medium">
                    <Clock size={16} className="mr-1" />
                    Pendente
                  </span>
                )}
                {treatmentStatus.status === 'awaiting_review' && (
                  <span className="flex items-center text-sm text-blue-600 font-medium">
                    <Clock size={16} className="mr-1" />
                    Em análise médica
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo de Tratamento</h3>
                <p className="font-medium">{treatmentStatus.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Plano</h3>
                <p className="font-medium">{treatmentStatus.planName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Última Avaliação</h3>
                <p className="font-medium">{new Date(treatmentStatus.lastEvaluation).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            
            {treatmentStatus.status === 'active' && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progresso do Tratamento</span>
                  <span>{treatmentStatus.progressPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full" 
                    style={{ width: `${treatmentStatus.progressPercentage}%` }}
                  />
                </div>
                
                <div className="flex items-center mt-4 text-sm text-gray-600">
                  <CalendarClock size={16} className="mr-2" />
                  <span>Próxima entrega em {new Date(treatmentStatus.nextShipment).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-gray-100 pt-4">
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Veja mais detalhes sobre seu tratamento e histórico
              </p>
              <Button variant="outline" asChild>
                <Link to="/cliente/prescricoes">
                  Ver prescrições
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* View Prescriptions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Prescrições</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 text-sm text-gray-600">
              Acesse suas prescrições médicas e orientações de uso
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/cliente/prescricoes">
                  Ver prescrições
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Treatment History */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Histórico</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 text-sm text-gray-600">
              Veja o histórico completo de suas avaliações e tratamentos
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/cliente/historico">
                  Ver histórico
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Edit Profile */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 text-sm text-gray-600">
              Atualize seus dados pessoais e endereço de entrega
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/cliente/perfil">
                  Editar perfil
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Get Support */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Suporte</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 text-sm text-gray-600">
              Precisa de ajuda? Entre em contato com a equipe Bravo
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/cliente/suporte">
                  Falar com suporte
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
