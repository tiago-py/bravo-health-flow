
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Search, DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DoctorHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Mock payment history data - each subscription generates multiple payment records
  const allPaymentHistory = [
    // João Silva - Queda Capilar (Semestral - 6 pagamentos)
    {
      id: '1',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2023-03-25',
      paymentNumber: 1,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '2',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2023-02-25',
      paymentNumber: 2,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '3',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2023-01-25',
      paymentNumber: 3,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '4',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2022-12-25',
      paymentNumber: 4,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '5',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2022-11-25',
      paymentNumber: 5,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '6',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2022-10-25',
      paymentNumber: 6,
      amount: 180.00,
      status: 'paid'
    },
    
    // João Silva - Disfunção Erétil (Semestral - 6 pagamentos)
    {
      id: '7',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'disfuncao-eretil',
      plan: 'semestral',
      paymentDate: '2023-03-20',
      paymentNumber: 1,
      amount: 220.00,
      status: 'paid'
    },
    {
      id: '8',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'disfuncao-eretil',
      plan: 'semestral',
      paymentDate: '2023-02-20',
      paymentNumber: 2,
      amount: 220.00,
      status: 'paid'
    },
    {
      id: '9',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'disfuncao-eretil',
      plan: 'semestral',
      paymentDate: '2023-01-20',
      paymentNumber: 3,
      amount: 220.00,
      status: 'paid'
    },
    {
      id: '10',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'disfuncao-eretil',
      plan: 'semestral',
      paymentDate: '2022-12-20',
      paymentNumber: 4,
      amount: 220.00,
      status: 'paid'
    },
    {
      id: '11',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'disfuncao-eretil',
      plan: 'semestral',
      paymentDate: '2022-11-20',
      paymentNumber: 5,
      amount: 220.00,
      status: 'paid'
    },
    {
      id: '12',
      patientName: 'João Silva',
      patientAge: 32,
      type: 'disfuncao-eretil',
      plan: 'semestral',
      paymentDate: '2022-10-20',
      paymentNumber: 6,
      amount: 220.00,
      status: 'paid'
    },
    
    // Marcos Oliveira - Disfunção Erétil (Trimestral - 3 pagamentos)
    {
      id: '13',
      patientName: 'Marcos Oliveira',
      patientAge: 45,
      type: 'disfuncao-eretil',
      plan: 'trimestral',
      paymentDate: '2023-03-25',
      paymentNumber: 1,
      amount: 290.00,
      status: 'paid'
    },
    {
      id: '14',
      patientName: 'Marcos Oliveira',
      patientAge: 45,
      type: 'disfuncao-eretil',
      plan: 'trimestral',
      paymentDate: '2022-12-25',
      paymentNumber: 2,
      amount: 290.00,
      status: 'paid'
    },
    {
      id: '15',
      patientName: 'Marcos Oliveira',
      patientAge: 45,
      type: 'disfuncao-eretil',
      plan: 'trimestral',
      paymentDate: '2022-09-25',
      paymentNumber: 3,
      amount: 290.00,
      status: 'paid'
    },
    
    // André Costa - Queda Capilar (Semestral - 6 pagamentos)
    {
      id: '16',
      patientName: 'André Costa',
      patientAge: 28,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2023-03-24',
      paymentNumber: 1,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '17',
      patientName: 'André Costa',
      patientAge: 28,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2023-02-24',
      paymentNumber: 2,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '18',
      patientName: 'André Costa',
      patientAge: 28,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2023-01-24',
      paymentNumber: 3,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '19',
      patientName: 'André Costa',
      patientAge: 28,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2022-12-24',
      paymentNumber: 4,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '20',
      patientName: 'André Costa',
      patientAge: 28,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2022-11-24',
      paymentNumber: 5,
      amount: 180.00,
      status: 'paid'
    },
    {
      id: '21',
      patientName: 'André Costa',
      patientAge: 28,
      type: 'queda-capilar',
      plan: 'semestral',
      paymentDate: '2022-10-24',
      paymentNumber: 6,
      amount: 180.00,
      status: 'paid'
    },
    
    // Ricardo Mendes - Disfunção Erétil (Trimestral - 3 pagamentos)
    {
      id: '22',
      patientName: 'Ricardo Mendes',
      patientAge: 37,
      type: 'disfuncao-eretil',
      plan: 'trimestral',
      paymentDate: '2023-03-24',
      paymentNumber: 1,
      amount: 290.00,
      status: 'paid'
    },
    {
      id: '23',
      patientName: 'Ricardo Mendes',
      patientAge: 37,
      type: 'disfuncao-eretil',
      plan: 'trimestral',
      paymentDate: '2022-12-24',
      paymentNumber: 2,
      amount: 290.00,
      status: 'paid'
    },
    {
      id: '24',
      patientName: 'Ricardo Mendes',
      patientAge: 37,
      type: 'disfuncao-eretil',
      plan: 'trimestral',
      paymentDate: '2022-09-24',
      paymentNumber: 3,
      amount: 290.00,
      status: 'paid'
    },
    
    // Carlos Eduardo - Disfunção Erétil (Trimestral - 3 pagamentos)
    {
      id: '25',
      patientName: 'Carlos Eduardo',
      patientAge: 41,
      type: 'disfuncao-eretil',
      plan: 'trimestral',
      paymentDate: '2023-03-23',
      paymentNumber: 1,
      amount: 290.00,
      status: 'paid'
    },
    {
      id: '26',
      patientName: 'Carlos Eduardo',
      patientAge: 41,
      type: 'disfuncao-eretil',
      plan: 'trimestral',
      paymentDate: '2022-12-23',
      paymentNumber: 2,
      amount: 290.00,
      status: 'paid'
    },
    {
      id: '27',
      patientName: 'Carlos Eduardo',
      patientAge: 41,
      type: 'disfuncao-eretil',
      plan: 'trimestral',
      paymentDate: '2022-09-23',
      paymentNumber: 3,
      amount: 290.00,
      status: 'paid'
    },
  ];
  
  // Filter payment history based on search query and filters
  const filteredPayments = allPaymentHistory.filter(payment => {
    // Search filter
    const matchesSearch = payment.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    
    // Date filter
    let matchesDate = true;
    const paymentDate = new Date(payment.paymentDate);
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    if (dateFilter === 'today') {
      matchesDate = paymentDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'week') {
      matchesDate = paymentDate >= lastWeek;
    } else if (dateFilter === 'month') {
      matchesDate = paymentDate >= lastMonth;
    }
    
    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">
          Histórico de Pagamentos
        </h1>
        <p className="text-gray-600">
          Histórico completo de pagamentos por cliente e tipo de tratamento
        </p>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre por nome, tipo de tratamento ou data de pagamento
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
            <CardTitle>Histórico de Pagamentos</CardTitle>
            <span className="text-sm text-gray-500">
              {filteredPayments.length} {filteredPayments.length === 1 ? 'pagamento' : 'pagamentos'}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPayments.length > 0 ? (
            <div className="space-y-4">
              {filteredPayments.map(payment => (
                <div 
                  key={payment.id} 
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      <h3 className="font-medium">{payment.patientName}</h3>
                      <span className="text-sm text-gray-500 ml-2">{payment.patientAge} anos</span>
                      <Badge className="ml-2" variant="outline">
                        {payment.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                      </Badge>
                      <Badge className={payment.plan === 'semestral' ? 'bg-blue-100 text-blue-800 ml-2' : 'bg-green-100 text-green-800 ml-2'}>
                        {payment.plan === 'semestral' ? 'Semestral' : 'Trimestral'}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar size={14} className="mr-1" />
                      <span>Pagamento em {new Date(payment.paymentDate).toLocaleDateString('pt-BR')}</span>
                      <span className="mx-2">•</span>
                      <DollarSign size={14} className="mr-1" />
                      <span>R$ {payment.amount.toFixed(2)}</span>
                      <span className="mx-2">•</span>
                      <span>{payment.paymentNumber}º pagamento</span>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to={`/medico/paciente/${payment.patientName.toLowerCase().replace(' ', '-')}`}>
                      Ver paciente
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">Nenhum pagamento encontrado com os filtros selecionados.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorHistory;
