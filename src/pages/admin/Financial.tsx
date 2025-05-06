
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, ArrowUp, ArrowDown, DollarSign, TrendingUp, CreditCard, Users } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AdminFinancial = () => {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [yearFilter, setYearFilter] = useState('2023');
  const [searchTransaction, setSearchTransaction] = useState('');
  
  // Mock financial data for charts
  const revenueData = [
    { month: 'Jan', revenue: 105000 },
    { month: 'Fev', revenue: 118000 },
    { month: 'Mar', revenue: 127000 },
    { month: 'Abr', revenue: 142000 },
    { month: 'Mai', revenue: 150000 },
    { month: 'Jun', revenue: 164000 },
    { month: 'Jul', revenue: 180000 },
    { month: 'Ago', revenue: 195000 },
    { month: 'Set', revenue: 210000 },
    { month: 'Out', revenue: 222000 },
    { month: 'Nov', revenue: 238000 },
    { month: 'Dez', revenue: 255000 },
  ];
  
  const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Fev', users: 1350 },
    { month: 'Mar', users: 1450 },
    { month: 'Abr', users: 1620 },
    { month: 'Mai', users: 1780 },
    { month: 'Jun', users: 1950 },
    { month: 'Jul', users: 2100 },
    { month: 'Ago', users: 2260 },
    { month: 'Set', users: 2380 },
    { month: 'Out', users: 2490 },
    { month: 'Nov', users: 2580 },
    { month: 'Dez', users: 2650 },
  ];
  
  // Mock transactions data
  const transactions = [
    {
      id: '1',
      date: '2023-12-15',
      customer: 'João Silva',
      plan: 'Plano Premium - Queda Capilar',
      amount: 249.9,
      status: 'succeeded',
      paymentMethod: 'credit_card'
    },
    {
      id: '2',
      date: '2023-12-14',
      customer: 'Carlos Santos',
      plan: 'Plano Básico - Disfunção Erétil',
      amount: 159.9,
      status: 'succeeded',
      paymentMethod: 'credit_card'
    },
    {
      id: '3',
      date: '2023-12-14',
      customer: 'Pedro Oliveira',
      plan: 'Plano Premium - Queda Capilar',
      amount: 249.9,
      status: 'succeeded',
      paymentMethod: 'pix'
    },
    {
      id: '4',
      date: '2023-12-13',
      customer: 'Ricardo Mendes',
      plan: 'Plano Premium - Disfunção Erétil',
      amount: 259.9,
      status: 'failed',
      paymentMethod: 'credit_card'
    },
    {
      id: '5',
      date: '2023-12-12',
      customer: 'Fernando Costa',
      plan: 'Plano Básico - Queda Capilar',
      amount: 149.9,
      status: 'succeeded',
      paymentMethod: 'credit_card'
    },
    {
      id: '6',
      date: '2023-12-11',
      customer: 'Lucas Martins',
      plan: 'Plano Premium - Disfunção Erétil',
      amount: 259.9,
      status: 'refunded',
      paymentMethod: 'pix'
    }
  ];
  
  // Filter transactions based on search
  const filteredTransactions = transactions.filter(transaction =>
    transaction.customer.toLowerCase().includes(searchTransaction.toLowerCase()) ||
    transaction.plan.toLowerCase().includes(searchTransaction.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchTransaction.toLowerCase())
  );
  
  // Financial summary stats
  const financialSummary = [
    {
      title: 'Receita Total',
      value: 'R$ 255.000',
      change: '+12% vs mês anterior',
      changeType: 'increase',
      icon: <DollarSign className="h-8 w-8 text-bravo-blue opacity-80" />,
    },
    {
      title: 'Total de Assinantes',
      value: '2.650',
      change: '+70 novos assinantes',
      changeType: 'increase',
      icon: <Users className="h-8 w-8 text-bravo-blue opacity-80" />,
    },
    {
      title: 'Valor Médio',
      value: 'R$ 218,50',
      change: '+8% vs mês anterior',
      changeType: 'increase',
      icon: <TrendingUp className="h-8 w-8 text-bravo-blue opacity-80" />,
    },
    {
      title: 'Taxa de Conversão',
      value: '32,4%',
      change: '+2.1% vs mês anterior',
      changeType: 'increase',
      icon: <CreditCard className="h-8 w-8 text-bravo-blue opacity-80" />,
    }
  ];
  
  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Financeiro</h1>
        <p className="text-gray-600">
          Gerenciamento financeiro e análise de receitas
        </p>
      </div>
      
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {financialSummary.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="bg-bravo-beige bg-opacity-30 p-3 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Receita Anual</CardTitle>
              <Select
                value={yearFilter}
                onValueChange={setYearFilter}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>
              Visão geral da receita por mês
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value/1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#5D7C8A"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Crescimento de Assinantes</CardTitle>
            <CardDescription>
              Total de usuários ativos por mês
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userGrowthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} usuários`, 'Assinantes']} />
                  <Bar dataKey="users" fill="#5D7C8A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Transactions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>
                Visualize e filtre as últimas transações
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar..."
                  value={searchTransaction}
                  onChange={(e) => setSearchTransaction(e.target.value)}
                  className="pl-8 w-full md:w-[200px]"
                />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium">Data</th>
                  <th className="px-4 py-3 text-left font-medium">Cliente</th>
                  <th className="px-4 py-3 text-left font-medium">Plano</th>
                  <th className="px-4 py-3 text-left font-medium">Método</th>
                  <th className="px-4 py-3 text-left font-medium">Valor</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                    <td className="px-4 py-3">{transaction.customer}</td>
                    <td className="px-4 py-3 max-w-xs truncate">{transaction.plan}</td>
                    <td className="px-4 py-3">
                      {transaction.paymentMethod === 'credit_card' ? 'Cartão de crédito' : 'PIX'}
                    </td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(transaction.amount)}</td>
                    <td className="px-4 py-3">
                      {transaction.status === 'succeeded' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <ArrowDown size={12} className="mr-1" />
                          Recebido
                        </span>
                      ) : transaction.status === 'failed' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Falha
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <ArrowUp size={12} className="mr-1" />
                          Estornado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      Nenhuma transação encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFinancial;
