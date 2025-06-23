import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import { DashboardHeader } from '@/components/client/DashboardHeader';
import { TreatmentStatusCard } from '@/components/client/TreatmentStatusCard';
import { QuickActionCard } from '@/components/client/QuickActionCard';
import { getTreatmentStatus } from '@/utils/treatmentStatus';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [treatmentData, setTreatmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE_URL = import.meta.env.VITE_API_URL_BASE;
        
        if (!API_BASE_URL) {
          throw new Error('API base URL is not configured');
        }

        // Fetch profile data
        const profileResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const profileData = await profileResponse.json();
        setProfileData(profileData);

        // Fetch treatment data
        const treatmentResponse = await fetch(`${API_BASE_URL}/api/client/treatments`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!treatmentResponse.ok) {
          throw new Error('Failed to fetch treatment data');
        }

        const treatmentData = await treatmentResponse.json();
        setTreatmentData(treatmentData);

      } catch (err) {
        setError(err.message);
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      loadData();
    }
  }, [user]);

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

  const quickActionCards = [
    {
      title: 'Tratamentos',
      description: 'Acompanhe a evolução dos seus tratamentos',
      linkTo: '/cliente/tratamentos',
      buttonText: 'Ver tratamentos'
    },
    {
      title: 'Histórico',
      description: 'Veja o histórico completo de suas avaliações e tratamentos',
      linkTo: '/cliente/historico',
      buttonText: 'Ver histórico'
    },
    {
      title: 'Meu Perfil',
      description: 'Atualize seus dados pessoais e endereço de entrega',
      linkTo: '/cliente/perfil',
      buttonText: 'Editar perfil'
    },
    {
      title: 'Suporte',
      description: 'Precisa de ajuda? Entre em contato com a equipe Bravo',
      linkTo: '/cliente/suporte',
      buttonText: 'Falar com suporte'
    }
  ];

  return (
    <div>
      <DashboardHeader displayName={displayName} />
      
      <div className="grid grid-cols-1 gap-4">
        {/* Treatment Status Card */}
        <TreatmentStatusCard 
          currentTreatment={currentTreatment}
          treatmentStatusInfo={treatmentStatusInfo}
        />
        
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {quickActionCards.map((card) => (
            <QuickActionCard
              key={card.title}
              title={card.title}
              description={card.description}
              linkTo={card.linkTo}
              buttonText={card.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;