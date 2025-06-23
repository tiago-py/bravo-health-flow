import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, User, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface HistoryItem {
  id: string;
  type: 'anamnese' | 'prescription' | 'shipment' | 'follow-up' | string;
  title: string;
  date: string;
  status: 'completed' | 'scheduled';
  details: {
    doctor?: string;
    observations?: string;
    medications?: string[];
    duration?: string;
    address?: string;
    tracking?: string;
    notes?: string;
  };
}

const ClientHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const API_BASE_URL = import.meta.env.VITE_API_URL_BASE;
      
      if (!API_BASE_URL) {
        throw new Error('API base URL is not configured');
      }

      const response = await fetch(`${API_BASE_URL}/api/client/treatments`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch history data');
      }

      const historyData = await response.json();
      setHistory(historyData);
      
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      toast.error('Falha ao carregar histórico');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchHistory();
    }
  }, [user]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'anamnese':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'prescription':
        return <FileText className="h-6 w-6 text-indigo-500" />;
      case 'shipment':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'follow-up':
        return <Calendar className="h-6 w-6 text-amber-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const getBadge = (type: string, status: string) => {
    if (status === 'scheduled') {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Agendado</Badge>;
    }
    
    switch (type) {
      case 'anamnese':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Anamnese</Badge>;
      case 'prescription':
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Prescrição</Badge>;
      case 'shipment':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Entrega</Badge>;
      case 'follow-up':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Acompanhamento</Badge>;
      default:
        return <Badge variant="outline">Outro</Badge>;
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">Histórico de Tratamento</h1>
          <p className="text-gray-600">Acompanhe todas as etapas do seu tratamento</p>
        </div>
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-bravo-blue mb-4" />
          <p className="text-gray-600">Carregando seu histórico...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">Histórico de Tratamento</h1>
          <p className="text-gray-600">Acompanhe todas as etapas do seu tratamento</p>
        </div>
        <Card>
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-8 w-8 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar histórico</h3>
            <p className="text-sm text-gray-500 mb-6">{error}</p>
            <Button 
              variant="outline" 
              onClick={fetchHistory}
              className="mx-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">Histórico de Tratamento</h1>
          <p className="text-gray-600">Acompanhe todas as etapas do seu tratamento</p>
        </div>
        <Card>
          <CardContent className="py-8 text-center">
            <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum registro encontrado</h3>
            <p className="text-sm text-gray-500">
              Seu histórico de tratamento aparecerá aqui assim que houver registros
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Histórico de Tratamento</h1>
        <p className="text-gray-600">Acompanhe todas as etapas do seu tratamento</p>
      </div>
      
      <div className="relative">
        {/* Timeline track */}
        <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200" />
        
        <div className="space-y-8 relative">
          {history.map((item) => (
            <div key={item.id} className="relative">
              {/* Timeline icon */}
              <div className="absolute left-0 top-4 -ml-1 w-8 h-8 rounded-full bg-white flex items-center justify-center z-10 border border-gray-200">
                {getIcon(item.type)}
              </div>
              
              {/* Card content */}
              <div className="ml-12 pt-1">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center">
                          {item.title}
                          <span className="ml-3">
                            {getBadge(item.type, item.status)}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          {new Date(item.date).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {item.type === 'anamnese' && (
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <User size={16} className="mr-2 text-gray-500 mt-0.5" />
                          <span className="text-sm text-gray-700">{item.details.doctor}</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium block">Observações:</span>
                          <p className="mt-1">{item.details.observations}</p>
                        </div>
                      </div>
                    )}
                    
                    {item.type === 'prescription' && (
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <User size={16} className="mr-2 text-gray-500 mt-0.5" />
                          <span className="text-sm text-gray-700">{item.details.doctor}</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium block">Medicamentos:</span>
                          <ul className="list-disc pl-5 mt-1">
                            {item.details.medications?.map((med, index) => (
                              <li key={index}>{med}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">Duração:</span> {item.details.duration}
                        </div>
                      </div>
                    )}
                    
                    {item.type === 'shipment' && (
                      <div className="space-y-2 text-sm text-gray-700">
                        <div>
                          <span className="font-medium">Endereço: </span> 
                          {item.details.address}
                        </div>
                        <div>
                          <span className="font-medium">Código de rastreio: </span> 
                          {item.details.tracking}
                        </div>
                      </div>
                    )}
                    
                    {item.type === 'follow-up' && (
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-start">
                          <User size={16} className="mr-2 text-gray-500 mt-0.5" />
                          <span>{item.details.doctor}</span>
                        </div>
                        {item.status === 'completed' && item.details.observations && (
                          <p>{item.details.observations}</p>
                        )}
                        {item.status === 'scheduled' && item.details.notes && (
                          <p>{item.details.notes}</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientHistory;