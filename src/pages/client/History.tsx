
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, User, CheckCircle, AlertCircle } from 'lucide-react';

const ClientHistory = () => {
  // Mock history data
  const history = [
    {
      id: 1,
      type: 'anamnese',
      title: 'Anamnese inicial de queda capilar',
      date: '2022-09-10',
      status: 'completed',
      details: {
        doctor: 'Dr. Bruno Silva',
        observations: 'Paciente apresenta queda capilar moderada nas entradas frontais e coroa. Recomendado tratamento inicial com minoxidil 2% e finasterida 1mg.'
      }
    },
    {
      id: 2,
      type: 'prescription',
      title: 'Prescrição inicial',
      date: '2022-09-12',
      status: 'completed',
      details: {
        doctor: 'Dr. Bruno Silva',
        medications: ['Minoxidil 2%', 'Finasterida 1mg'],
        duration: '6 meses'
      }
    },
    {
      id: 3,
      type: 'shipment',
      title: 'Entrega de medicamentos',
      date: '2022-09-15',
      status: 'completed',
      details: {
        address: 'Rua Exemplo, 123 - São Paulo, SP',
        tracking: 'BR123456789SP'
      }
    },
    {
      id: 4,
      type: 'follow-up',
      title: 'Acompanhamento de 3 meses',
      date: '2022-12-10',
      status: 'completed',
      details: {
        doctor: 'Dr. Bruno Silva',
        observations: 'Paciente relata melhora na queda e início de novos crescimentos. Recomendado continuar tratamento atual.'
      }
    },
    {
      id: 5,
      type: 'anamnese',
      title: 'Reavaliação de 6 meses',
      date: '2023-03-12',
      status: 'completed',
      details: {
        doctor: 'Dr. Bruno Silva',
        observations: 'Melhora significativa observada. Recomendado ajustar o tratamento para minoxidil 5% para otimizar resultados.'
      }
    },
    {
      id: 6,
      type: 'prescription',
      title: 'Prescrição atualizada',
      date: '2023-03-15',
      status: 'completed',
      details: {
        doctor: 'Dr. Bruno Silva',
        medications: ['Minoxidil 5%', 'Finasterida 1mg', 'Complexo Vitamínico Capilar'],
        duration: '6 meses'
      }
    },
    {
      id: 7,
      type: 'shipment',
      title: 'Entrega de medicamentos',
      date: '2023-03-18',
      status: 'completed',
      details: {
        address: 'Rua Exemplo, 123 - São Paulo, SP',
        tracking: 'BR987654321SP'
      }
    },
    {
      id: 8,
      type: 'follow-up',
      title: 'Próximo acompanhamento',
      date: '2023-06-15',
      status: 'scheduled',
      details: {
        doctor: 'Dr. Bruno Silva',
        notes: 'Avaliação trimestral de acompanhamento'
      }
    }
  ];
  
  // Helper function to get icon by type
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
  
  // Helper function to get badge by type and status
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Histórico de Tratamento</h1>
        <p className="text-gray-600">
          Acompanhe todas as etapas do seu tratamento
        </p>
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
                            {item.details.medications.map((med, index) => (
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
