
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, ArrowUp, ArrowDown, DollarSign, TrendingUp, CreditCard, Users, Loader2, AlertCircle } from 'lucide-react';
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
import { toast } from '@/components/ui/sonner';

interface FinancialSummary {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

interface Transaction {
  id: string;
  date: string;
  customer: string;
  plan: string;
  amount: number;
  status: 'succeeded' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'pix';
}

// Mock data
const mockFinancialSummary: FinancialSummary[] = [
  {
    title: 'Receita Total',
    value: 'R$ 125.450',
    change: '+12.3% vs mês anterior',
    changeType: 'increase'
  },
  {
    title: 'Total de Assinantes',
    value: '2.847',
    change: '+8.2% vs mês anterior',
    changeType: 'increase'
  },
  {
    title: 'Valor Médio',
    value: 'R$ 89,50',
    change: '+2.1% vs mês anterior',
    changeType: 'increase'
  },
  {
    title: 'Taxa de Conversão',
    value: '4.2%',
    change: '-0.5% vs mês anterior',
    changeType: 'decrease'
  }
];

const mockRevenueData = [
  { month: 'Jan', revenue: 95000 },
  { month: 'Fev', revenue: 102000 },
  { month: 'Mar', revenue: 108000 },
  { month: 'Abr', revenue: 98000 },
  { month: 'Mai', revenue: 115000 },
  { month: 'Jun', revenue: 125450 },
  { month: 'Jul', revenue: 130000 },
  { month: 'Ago', revenue: 128000 },
  { month: 'Set', revenue: 135000 },
  { month: 'Out', revenue: 142000 },
  { month: 'Nov', revenue: 138000 },
  { month: 'Dez', revenue: 145000 }
];

const mockUserGrowthData = [
  { month: 'Jan', users: 1850 },
  { month: 'Fev', users: 1920 },
  { month: 'Mar', users: 2100 },
  { month: 'Abr', users: 2050 },
  { month: 'Mai', users: 2300 },
  { month: 'Jun', users: 2450 },
  { month: 'Jul', users: 2580 },
  { month: 'Ago', users: 2650 },
  { month: 'Set', users: 2720 },
  { month: 'Out', users: 2800 },
  { month: 'Nov', users: 2847 },
  { month: 'Dez', users: 2900 }
];

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    date: '2024-06-04',
    customer: 'João Silva Santos',
    plan: 'Tratamento Capilar Premium - 3 meses',
    amount: 285.00,
    status: 'succeeded',
    paymentMethod: 'credit_card'
  },
  {
    id: 'TXN002',
    date: '2024-06-04',
    customer: 'Maria Oliveira Costa',
    plan: 'Tratamento Disfunção Erétil - 1 mês',
    amount: 95.00,
    status: 'succeeded',
    paymentMethod: 'pix'
  },
  {
    id: 'TXN003',
    date: '2024-06-03',
    customer: 'Carlos Eduardo Lima',
    plan: 'Tratamento Capilar Básico - 1 mês',
    amount: 125.00,
    status: 'failed',
    paymentMethod: 'credit_card'
  },
  {
    id: 'TXN004',
    date: '2024-06-03',
    customer: 'Ana Paula Ferreira',
    plan: 'Consulta + Medicamentos - 2 meses',
    amount: 190.00,
    status: 'succeeded',
    paymentMethod: 'pix'
  },
  {
    id: 'TXN005',
    date: '2024-06-02',
    customer: 'Roberto Almeida',
    plan: 'Tratamento Completo - 6 meses',
    amount: 450.00,
    status: 'refunded',
    paymentMethod: 'credit_card'
  },
  {
    id: 'TXN006',
    date: '2024-06-02',
    customer: 'Fernanda Ribeiro',
    plan: 'Tratamento Capilar Premium - 3 meses',
    amount: 285.00,
    status: 'succeeded',
    paymentMethod: 'credit_card'
  },
  {
    id: 'TXN007',
    date: '2024-06-01',
    customer: 'Pedro Henrique Silva',
    plan: 'Medicamentos Básicos - 1 mês',
    amount: 75.00,
    status: 'succeeded',
    paymentMethod: 'pix'
  },
  {
    id: 'TXN008',
    date: '2024-06-01',
    customer: 'Juliana Martins',
    plan: 'Tratamento Hormonal - 2 meses',
    amount: 320.00,
    status: 'succeeded',
    paymentMethod: 'credit_card'
  }
];

const AdminFinancial = () => {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear().toString());
  const [searchTransaction, setSearchTransaction] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary[]>([]);
  const [revenueData, setRevenueData] = useState<{ month: string; revenue: number }[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<{ month: string; users: number }[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load mock data
  useEffect(() => {
    const loadMockData = () => {
      setLoading(true);
      setError(null);
      
      // Simulate loading delay
      setTimeout(() => {
        setFinancialSummary(mockFinancialSummary);
        setRevenueData(mockRevenueData);
        setUserGrowthData(mockUserGrowthData);
        setTransactions(mockTransactions);
        setLoading(false);
      }, 1000);
    };

    loadMockData();
  }, [yearFilter]);

  // Filter transactions based on search
  const filteredTransactions = transactions.filter(transaction =>
    transaction.customer.toLowerCase().includes(searchTransaction.toLowerCase()) ||
    transaction.plan.toLowerCase().includes(searchTransaction.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchTransaction.toLowerCase())
  );

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleExport = async () => {
    try {
      // Mock export functionality
      toast.success('Export completed successfully (mock data)');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export financial data');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading financial data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="text-red-600">{error}</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

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
                  {stat.title === 'Receita Total' && <DollarSign className="h-8 w-8 text-bravo-blue opacity-80" />}
                  {stat.title === 'Total de Assinantes' && <Users className="h-8 w-8 text-bravo-blue opacity-80" />}
                  {stat.title === 'Valor Médio' && <TrendingUp className="h-8 w-8 text-bravo-blue opacity-80" />}
                  {stat.title === 'Taxa de Conversão' && <CreditCard className="h-8 w-8 text-bravo-blue opacity-80" />}
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
                  {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
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
              <Button variant="outline" onClick={handleExport}>
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
