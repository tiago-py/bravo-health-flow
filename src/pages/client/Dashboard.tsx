
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Clock, CalendarClock, Loader2, AlertCircle } from 'lucide-react';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [treatmentData, setTreatmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data
  const mockProfileData = {
    name: 'João Silva Santos',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    }
  };

  const mockTreatmentData = {
    current: {
      id: '1',
      type: 'Tratamento Capilar Premium',
      plan: 'Plano Intensivo',
      status: 'active',
      progress: 65,
      lastEvaluation: '2024-05-15T10:30:00Z',
      nextShipment: '2024-06-10T00:00:00Z',
      startDate: '2024-03-01T00:00:00Z',
      duration: '6 meses'
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use mock data instead of real API calls
        setProfileData(mockProfileData);
        setTreatmentData(mockTreatmentData);
      } catch (err) {
        setError(err.message);
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getTreatmentStatus = (treatment) => {
    if (!treatment) return { status: 'none', color: 'gray', icon: Clock, text: 'Sem tratamento' };
    
    switch (treatment.status?.toLowerCase()) {
      case 'active':
      case 'ativo':
        return { status: 'active', color: 'green', icon: CheckCircle, text: 'Ativo' };
      case 'pending':
      case 'pendente':
        return { status: 'pending', color: 'amber', icon: Clock, text: 'Pendente' };
      case 'awaiting_review':
      case 'em_analise':
        return { status: 'awaiting_review', color: 'blue', icon: Clock, text: 'Em análise médica' };
      default:
        return { status: 'unknown', color: 'gray', icon: AlertCircle, text: 'Status desconhecido' };
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="animate-spin" size={24} />
            <span>Carregando seus dados...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-red-500" size={24} />
              <CardTitle className="text-red-700">Erro ao carregar dados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">
              Não foi possível conectar com o servidor: {error}
            </p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = profileData?.name || user?.name || 'Usuário';
  const currentTreatment = treatmentData?.current || treatmentData?.[0];
  const treatmentStatusInfo = getTreatmentStatus(currentTreatment);
  const StatusIcon = treatmentStatusInfo.icon;

  return (
    <div>
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
        
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* View Treatments */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tratamentos</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 text-sm text-gray-600">
              Acompanhe a evolução dos seus tratamentos
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/cliente/tratamentos">
                  Ver tratamentos
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
