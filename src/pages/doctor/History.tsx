
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DoctorHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Mock patient history data
  const allPatients = [
    {
      id: '1',
      name: 'João Silva',
      age: 32,
      evaluationDate: '2023-03-25',
      type: 'queda-capilar',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Marcos Oliveira',
      age: 45,
      evaluationDate: '2023-03-25',
      type: 'disfuncao-eretil',
      status: 'completed'
    },
    {
      id: '3',
      name: 'André Costa',
      age: 28,
      evaluationDate: '2023-03-24',
      type: 'queda-capilar',
      status: 'completed'
    },
    {
      id: '4',
      name: 'Ricardo Mendes',
      age: 37,
      evaluationDate: '2023-03-24',
      type: 'disfuncao-eretil',
      status: 'pending'
    },
    {
      id: '5',
      name: 'Carlos Eduardo',
      age: 41,
      evaluationDate: '2023-03-23',
      type: 'disfuncao-eretil',
      status: 'completed'
    },
    {
      id: '6',
      name: 'Paulo Vieira',
      age: 35,
      evaluationDate: '2023-03-23',
      type: 'queda-capilar',
      status: 'completed'
    },
    {
      id: '7',
      name: 'Gustavo Martins',
      age: 29,
      evaluationDate: '2023-03-22',
      type: 'queda-capilar',
      status: 'completed'
    },
    {
      id: '8',
      name: 'Fernando Alves',
      age: 52,
      evaluationDate: '2023-03-20',
      type: 'disfuncao-eretil',
      status: 'completed'
    },
    {
      id: '9',
      name: 'Rodrigo Lima',
      age: 33,
      evaluationDate: '2023-03-18',
      type: 'queda-capilar',
      status: 'completed'
    },
    {
      id: '10',
      name: 'Lucas Santos',
      age: 27,
      evaluationDate: '2023-03-15',
      type: 'queda-capilar',
      status: 'completed'
    },
  ];
  
  // Filter patients based on search query and filters
  const filteredPatients = allPatients.filter(patient => {
    // Search filter
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = typeFilter === 'all' || patient.type === typeFilter;
    
    // Date filter
    let matchesDate = true;
    const evaluationDate = new Date(patient.evaluationDate);
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    if (dateFilter === 'today') {
      matchesDate = evaluationDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'week') {
      matchesDate = evaluationDate >= lastWeek;
    } else if (dateFilter === 'month') {
      matchesDate = evaluationDate >= lastMonth;
    }
    
    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">
          Histórico de Pacientes
        </h1>
        <p className="text-gray-600">
          Veja o histórico completo de pacientes avaliados
        </p>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre por nome, tipo de tratamento ou data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar por nome do paciente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo de tratamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="queda-capilar">Queda Capilar</SelectItem>
                  <SelectItem value="disfuncao-eretil">Disfunção Erétil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={dateFilter}
                onValueChange={setDateFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtrar por data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as datas</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Results */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Resultados</CardTitle>
            <span className="text-sm text-gray-500">
              {filteredPatients.length} {filteredPatients.length === 1 ? 'paciente' : 'pacientes'}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPatients.length > 0 ? (
            <div className="space-y-4">
              {filteredPatients.map(patient => (
                <div 
                  key={patient.id} 
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200 transition-all"
                >
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
                      <span>Avaliado em {new Date(patient.evaluationDate).toLocaleDateString('pt-BR')}</span>
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
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">Nenhum paciente encontrado com os filtros selecionados.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorHistory;
