
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Link } from 'react-router-dom';
import { ArrowRight, Users, CalendarDays, FileSparkles, Package, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard = () => {
  // Mock revenue data
  const revenueData = [
    { month: 'Jan', revenue: 95000 },
    { month: 'Fev', revenue: 115000 },
    { month: 'Mar', revenue: 124000 },
    { month: 'Abr', revenue: 138000 },
    { month: 'Mai', revenue: 145000 },
    { month: 'Jun', revenue: 160000 },
    { month: 'Jul', revenue: 172000 },
    { month: 'Ago', revenue: 180000 },
    { month: 'Set', revenue: 197000 },
    { month: 'Out', revenue: 210000 },
    { month: 'Nov', revenue: 226000 },
    { month: 'Dez', revenue: 242000 },
  ];

  // Mock user acquisition data
  const userAcquisitionData = [
    { month: 'Jan', users: 120 },
    { month: 'Fev', users: 145 },
    { month: 'Mar', users: 162 },
    { month: 'Abr', users: 180 },
    { month: 'Mai', users: 205 },
    { month: 'Jun', users: 228 },
    { month: 'Jul', users: 252 },
    { month: 'Ago', users: 278 },
    { month: 'Set', users: 305 },
    { month: 'Out', users: 332 },
    { month: 'Nov', users: 358 },
    { month: 'Dez', users: 382 },
  ];

  // Summary cards data
  const summaryCards = [
    {
      title: 'Total de usuários',
      value: '12,458',
      change: '+12.5%',
      changeDirection: 'up',
      description: 'vs. mês anterior',
      icon: <Users className="h-8 w-8 text-bravo-blue" />,
    },
    {
      title: 'Novas anamneses',
      value: '842',
      change: '+5.2%',
      changeDirection: 'up',
      description: 'vs. mês anterior',
      icon: <FileSparkles className="h-8 w-8 text-bravo-blue" />,
    },
    {
      title: 'Planos ativos',
      value: '6,842',
      change: '+8.1%',
      changeDirection: 'up',
      description: 'vs. mês anterior',
      icon: <Package className="h-8 w-8 text-bravo-blue" />,
    },
    {
      title: 'Receita mensal',
      value: 'R$ 242K',
      change: '+7.3%',
      changeDirection: 'up',
      description: 'vs. mês anterior',
      icon: <Wallet className="h-8 w-8 text-bravo-blue" />,
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      event: 'Nova avaliação médica',
      user: 'Dr. Bruno Silva',
      time: '5 minutos atrás',
      type: 'doctor',
    },
    {
      id: 2,
      event: 'Novo usuário registrado',
      user: 'Carlos Eduardo',
      time: '10 minutos atrás',
      type: 'registration',
    },
    {
      id: 3,
      event: 'Pedido de assinatura',
      user: 'Marcos Oliveira',
      time: '25 minutos atrás',
      type: 'subscription',
    },
    {
      id: 4,
      event: 'Nova anamnese submetida',
      user: 'André Costa',
      time: '30 minutos atrás',
      type: 'anamnese',
    },
    {
      id: 5,
      event: 'Alteração de plano',
      user: 'Pedro Santos',
      time: '1 hora atrás',
      type: 'subscription',
    },
    {
      id: 6,
      event: 'Nova avaliação médica',
      user: 'Dra. Carla Santos',
      time: '1 hora atrás',
      type: 'doctor',
    }
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral da plataforma</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                  <div className={`flex items-center mt-2 ${
                    card.changeDirection === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.changeDirection === 'up' ? (
                      <ArrowUpRight size={16} className="mr-1" />
                    ) : (
                      <ArrowDownRight size={16} className="mr-1" />
                    )}
                    <span className="text-sm font-medium">{card.change}</span>
                    <span className="text-xs text-gray-500 ml-1">{card.description}</span>
                  </div>
                </div>
                <div className="bg-bravo-beige bg-opacity-30 p-3 rounded-full">
                  {card.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Receita mensal</CardTitle>
            <CardDescription>
              Receita total por mês em 2023
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
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
          </CardContent>
        </Card>

        {/* User Acquisition Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Aquisição de usuários</CardTitle>
            <CardDescription>
              Novos usuários registrados por mês em 2023
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userAcquisitionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} usuários`, 'Novos usuários']} />
                <Bar dataKey="users" fill="#5D7C8A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Atividades recentes</CardTitle>
            <CardDescription>
              Últimas atividades na plataforma
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/usuarios">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="mr-4">
                  {activity.type === 'doctor' ? (
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                  ) : activity.type === 'registration' ? (
                    <div className="bg-green-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                  ) : activity.type === 'subscription' ? (
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Package className="h-5 w-5 text-purple-600" />
                    </div>
                  ) : (
                    <div className="bg-amber-100 p-2 rounded-full">
                      <FileSparkles className="h-5 w-5 text-amber-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {activity.event}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
