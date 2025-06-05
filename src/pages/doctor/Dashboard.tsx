
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuth();
  
  // Mock data for recent evaluations
  const recentEvaluations = [
    {
      id: '5',
      name: 'Carlos Eduardo',
      age: 41,
      date: '2023-03-23T15:10:00',
      type: 'disfuncao-eretil'
    },
    {
      id: '6',
      name: 'Paulo Vieira',
      age: 35,
      date: '2023-03-23T11:30:00',
      type: 'queda-capilar'
    },
    {
      id: '7',
      name: 'Gustavo Martins',
      age: 29,
      date: '2023-03-22T14:45:00',
      type: 'queda-capilar'
    },
  ];

  // Mock data for urgent patients (preview)
  const urgentPatients = [
    {
      id: '2',
      name: 'Marcos Oliveira',
      age: 45,
      date: '2023-03-25T10:15:00',
      type: 'disfuncao-eretil',
    },
    {
      id: '9',
      name: 'Gabriel Lima',
      age: 26,
      date: '2023-03-23T08:30:00',
      type: 'disfuncao-eretil',
    },
  ];
  
  // Dashboard stats
  const stats = [
    {
      title: 'Avaliações pendentes',
      value: 8,
      change: '+3 hoje',
      changeType: 'increase'
    },
    {
      title: 'Avaliações concluídas',
      value: 32,
      change: '+3 hoje',
      changeType: 'neutral'
    },
    {
      title: 'Tempo médio de resposta',
      value: '2.3h',
      change: '-10min',
      changeType: 'decrease'
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue">
          Painel do Médico
        </h1>
        
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/medico/historico">
              Ver histórico completo
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  {stat.title}
                </span>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                  <span className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'decrease' ? 'text-red-600' : 
                    'text-gray-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Urgent Patients Preview */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pacientes Urgentes</span>
              <Badge className="bg-red-100 text-red-800">
                {urgentPatients.length} pacientes
              </Badge>
            </CardTitle>
            <CardDescription>
              Pacientes que precisam de atenção prioritária
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-red-900">{patient.name}</h3>
                      <span className="text-sm text-red-700 ml-2">{patient.age} anos</span>
                      <Badge className="ml-2" variant="outline">
                        {patient.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-red-600 mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>Aguardando desde {new Date(patient.date).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/medico/paciente/${patient.id}`}>
                      Avaliar agora
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-100 pt-4">
            <Button className="w-full" asChild>
              <Link to="/medico/avaliacao">
                Ver fila completa de avaliação
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Avaliações Recentes</CardTitle>
            <CardDescription>
              Últimos pacientes avaliados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvaluations.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      <h3 className="font-medium">{patient.name}</h3>
                      <span className="text-sm text-gray-500 ml-2">{patient.age} anos</span>
                      <Badge className="ml-2" variant="outline">
                        {patient.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar size={14} className="mr-1" />
                      <span>Avaliado em {new Date(patient.date).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to={`/medico/paciente/${patient.id}`}>
                      Ver detalhes
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-100 pt-4">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/medico/historico">
                Ver todos os pacientes
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
