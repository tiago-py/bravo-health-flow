import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, subDays, subWeeks, subMonths, isAfter, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
  Users,
  CreditCard,
  CalendarClock,
  TrendingUp,
  User,
  BarChart3,
  Sparkles,
  FileText,
  ChevronRight,
  ArrowRightLeft,
  CalendarIcon
} from 'lucide-react';

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [customDateFrom, setCustomDateFrom] = useState<Date>();
  const [customDateTo, setCustomDateTo] = useState<Date>();
  
  // Função para calcular a data de início baseada no filtro selecionado
  const getDateFrom = () => {
    const today = new Date();
    switch (dateRange) {
      case 'day':
        return subDays(today, 1);
      case 'week':
        return subWeeks(today, 1);
      case 'month':
        return subMonths(today, 1);
      case 'year':
        return subMonths(today, 12);
      default:
        return customDateFrom || subMonths(today, 1);
    }
  };

  const getDateTo = () => {
    return customDateTo || new Date();
  };
  
  // Mock stats data baseado no período selecionado
  const getStatsForPeriod = () => {
    const dateFrom = getDateFrom();
    const dateTo = getDateTo();
    
    // Simular dados diferentes baseados no período
    const multiplier = dateRange === 'day' ? 0.1 : dateRange === 'week' ? 0.3 : dateRange === 'year' ? 4 : 1;
    
    return {
      totalUsers: Math.floor(1254 * multiplier),
      activeUsers: Math.floor(874 * multiplier),
      totalTreatments: Math.floor(982 * multiplier),
      activeSubscriptions: Math.floor(743 * multiplier),
      monthlyRevenue: 98670.50 * multiplier,
      averageSessionTime: 18.5,
      capillaryLossPatients: Math.floor(624 * multiplier),
      erectileDysfunctionPatients: Math.floor(358 * multiplier)
    };
  };

  const stats = getStatsForPeriod();
  
  // Mock recent users data
  const recentUsers = [
    { id: '1', name: 'Carlos Oliveira', email: 'carlos@example.com', dateJoined: '2023-03-20', status: 'active' },
    { id: '2', name: 'Márcia Silva', email: 'marcia@example.com', dateJoined: '2023-03-19', status: 'active' },
    { id: '3', name: 'Roberto Almeida', email: 'roberto@example.com', dateJoined: '2023-03-18', status: 'pending' },
    { id: '4', name: 'Amanda Costa', email: 'amanda@example.com', dateJoined: '2023-03-17', status: 'active' },
    { id: '5', name: 'Lucas Martins', email: 'lucas@example.com', dateJoined: '2023-03-16', status: 'active' }
  ];
  
  // Mock recent transactions data
  const recentTransactions = [
    { id: '1', user: 'Carlos Oliveira', amount: 139.90, date: '2023-03-20', plan: 'Mensal' },
    { id: '2', name: 'Márcia Silva', amount: 399.90, date: '2023-03-19', plan: 'Trimestral' },
    { id: '3', name: 'Roberto Almeida', amount: 139.90, date: '2023-03-18', plan: 'Mensal' },
    { id: '4', name: 'Amanda Costa', amount: 699.90, date: '2023-03-17', plan: 'Semestral' },
    { id: '5', name: 'Lucas Martins', amount: 139.90, date: '2023-03-16', plan: 'Mensal' }
  ];

  const getPeriodLabel = () => {
    switch (dateRange) {
      case 'day':
        return 'Último dia';
      case 'week':
        return 'Última semana';
      case 'month':
        return 'Último mês';
      case 'year':
        return 'Último ano';
      default:
        return 'Período personalizado';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Visão geral da plataforma e métricas principais
        </p>
      </div>

      {/* Filtros de Data */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Período</CardTitle>
          <CardDescription>
            Selecione o período para visualizar as métricas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              {(['day', 'week', 'month', 'year'] as const).map((range) => (
                <Button
                  key={range}
                  size="sm"
                  variant={dateRange === range ? "default" : "outline"}
                  onClick={() => setDateRange(range)}
                >
                  {range === 'day' ? 'Dia' : range === 'week' ? 'Semana' : range === 'month' ? 'Mês' : 'Ano'}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">ou</span>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "justify-start text-left font-normal",
                      !customDateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {customDateFrom ? format(customDateFrom, "dd/MM/yyyy", { locale: ptBR }) : "Data início"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={customDateFrom}
                    onSelect={setCustomDateFrom}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <span className="text-sm text-gray-500">até</span>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "justify-start text-left font-normal",
                      !customDateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {customDateTo ? format(customDateTo, "dd/MM/yyyy", { locale: ptBR }) : "Data fim"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={customDateTo}
                    onSelect={setCustomDateTo}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              Período: {getPeriodLabel()}
              {customDateFrom && customDateTo && (
                <span className="ml-2">
                  ({format(customDateFrom, "dd/MM/yyyy", { locale: ptBR })} - {format(customDateTo, "dd/MM/yyyy", { locale: ptBR })})
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Usuários
            </CardTitle>
            <Users size={18} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-500 font-medium">+16%</span> em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Assinaturas Ativas
            </CardTitle>
            <CreditCard size={18} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-500 font-medium">+9%</span> em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Receita do Período
            </CardTitle>
            <TrendingUp size={18} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.monthlyRevenue.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-500 font-medium">+23%</span> em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tempo Médio de Sessão
            </CardTitle>
            <CalendarClock size={18} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageSessionTime} min</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-amber-500 font-medium">+3%</span> em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts and Data Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Distribuição de Pacientes</CardTitle>
              <CardDescription>
                Por tipo de tratamento no período selecionado
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <BarChart3 size={120} className="text-gray-300" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Tratamentos</CardTitle>
            <CardDescription>
              Total de pacientes por categoria no período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                  <span>Queda Capilar</span>
                </div>
                <span className="font-medium">{stats.capillaryLossPatients}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Disfunção Erétil</span>
                </div>
                <span className="font-medium">{stats.erectileDysfunctionPatients}</span>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ArrowRightLeft className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Conversão</span>
                  </div>
                  <span className="font-medium">64.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Users and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Usuários Recentes</CardTitle>
              <CardDescription>
                Novos cadastros na plataforma
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/usuarios">
                Ver todos <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <User size={14} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="text-xs">
                    {new Date(user.dateJoined).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>
                Últimos pagamentos realizados
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/financeiro">
                Ver todas <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <CreditCard size={14} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{transaction.plan}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">
                    {transaction.amount.toLocaleString('pt-BR', { 
                      style: 'currency', 
                      currency: 'BRL' 
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
