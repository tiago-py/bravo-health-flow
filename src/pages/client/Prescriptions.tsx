
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Loader2, RefreshCw, AlertCircle, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface TreatmentItem {
  id: string;
  type: 'prescription';
  title: string;
  date: string;
  status: 'completed' | 'active';
  details: {
    doctor?: string;
    medications?: string[];
    duration?: string;
    notes?: string;
  };
}

const ClientPrescriptions = () => {
  const { user } = useAuth();
  const [treatments, setTreatments] = useState<TreatmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data para evitar erros de fetch
  const mockTreatmentData: TreatmentItem[] = [
    {
      id: '1',
      type: 'prescription',
      title: 'Prescrição Médica - Tratamento Capilar Premium',
      date: '2024-03-20T14:30:00Z',
      status: 'active',
      details: {
        doctor: 'Dr. Carlos Silva',
        medications: [
          'Minoxidil 5% - Aplicar 1ml 2x ao dia no couro cabeludo',
          'Finasterida 1mg - 1 comprimido ao dia',
          'Vitaminas capilares - 2 cápsulas ao dia',
          'Shampoo especial - Usar 3x por semana'
        ],
        duration: '6 meses',
        notes: 'Tratamento em andamento. Próxima avaliação em 2 meses.'
      }
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Prescrição Médica - Tratamento Inicial',
      date: '2024-01-10T09:00:00Z',
      status: 'completed',
      details: {
        doctor: 'Dr. Carlos Silva',
        medications: [
          'Minoxidil 2% - Aplicar 1ml 1x ao dia',
          'Suplemento vitamínico - 1 cápsula ao dia'
        ],
        duration: '3 meses',
        notes: 'Tratamento inicial concluído com sucesso. Evoluiu para tratamento premium.'
      }
    }
  ];

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usar dados mock em vez de fazer requisição real
      setTreatments(mockTreatmentData);
      
    } catch (err) {
      console.error('Erro ao carregar tratamentos:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      toast.error('Falha ao carregar tratamentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const getBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Ativo</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Concluído</Badge>;
      default:
        return <Badge variant="outline">Outro</Badge>;
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meus Tratamentos</h1>
          <p className="text-gray-600">Acompanhe suas prescrições médicas e medicamentos</p>
        </div>
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-bravo-blue mb-4" />
          <p className="text-gray-600">Carregando seus tratamentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meus Tratamentos</h1>
          <p className="text-gray-600">Acompanhe suas prescrições médicas e medicamentos</p>
        </div>
        <Card>
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-8 w-8 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar tratamentos</h3>
            <p className="text-sm text-gray-500 mb-6">{error}</p>
            <Button 
              variant="outline" 
              onClick={fetchTreatments}
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

  if (treatments.length === 0) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meus Tratamentos</h1>
          <p className="text-gray-600">Acompanhe suas prescrições médicas e medicamentos</p>
        </div>
        <Card>
          <CardContent className="py-8 text-center">
            <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum tratamento encontrado</h3>
            <p className="text-sm text-gray-500">
              Seus tratamentos e prescrições aparecerão aqui
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meus Tratamentos</h1>
        <p className="text-gray-600">Acompanhe suas prescrições médicas e medicamentos</p>
      </div>
      
      <div className="space-y-6">
        {treatments.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 text-indigo-500 mr-2" />
                    {item.title}
                    <span className="ml-3">
                      {getBadge(item.status)}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <User size={16} className="mr-2 text-gray-500 mt-0.5" />
                  <span className="text-sm text-gray-700">{item.details.doctor}</span>
                </div>
                
                <div className="text-sm text-gray-700">
                  <span className="font-medium block mb-2">Medicamentos:</span>
                  <ul className="list-disc pl-5 space-y-1">
                    {item.details.medications?.map((med, index) => (
                      <li key={index}>{med}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Duração:</span> {item.details.duration}
                </div>
                
                {item.details.notes && (
                  <div className="text-sm text-gray-700">
                    <span className="font-medium block mb-1">Observações:</span>
                    <p className="text-gray-600">{item.details.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientPrescriptions;
