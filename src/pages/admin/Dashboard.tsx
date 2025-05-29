
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Users,
  CreditCard,
  CalendarClock,
  TrendingUp,
  UserCheck,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminDashboard = () => {
  // Mock stats data
  const stats = {
    totalUsers: 1254,
    activeUsers: 874,
    totalTreatments: 982,
    activeSubscriptions: 743,
    monthlyRevenue: 98670.50,
    averageSessionTime: 18.5,
    totalDoctors: 23,
    activeDoctors: 18,
    quedaCapilarPatients: 687,
    disfuncaoEretilPatients: 567
  };

  // Mock recent users data
  const recentUsers = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', plan: 'Premium', status: 'Ativo' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', plan: 'Basic', status: 'Ativo' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', plan: 'Premium', status: 'Pendente' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', plan: 'Basic', status: 'Ativo' },
    { id: 5, name: 'Carlos Lima', email: 'carlos@email.com', plan: 'Premium', status: 'Ativo' }
  ];

  // Mock recent transactions data
  const recentTransactions = [
    { id: 1, user: 'João Silva', amount: 299.90, plan: 'Premium', date: '2024-01-15', status: 'Aprovado' },
    { id: 2, user: 'Maria Santos', amount: 149.90, plan: 'Basic', date: '2024-01-15', status: 'Aprovado' },
    { id: 3, user: 'Pedro Costa', amount: 299.90, plan: 'Premium', date: '2024-01-14', status: 'Pendente' },
    { id: 4, user: 'Ana Oliveira', amount: 149.90, plan: 'Basic', date: '2024-01-14', status: 'Aprovado' },
    { id: 5, user: 'Carlos Lima', amount: 299.90, plan: 'Premium', date: '2024-01-13', status: 'Aprovado' }
  ];

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
              <span className="text-green-500 font-medium">+16%</span> em relação ao mês anterior
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
              <span className="text-green-500 font-medium">+9%</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
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
              <span className="text-green-500 font-medium">+23%</span> em relação ao mês anterior
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
              <span className="text-amber-500 font-medium">+3%</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Médicos
            </CardTitle>
            <Stethoscope size={18} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDoctors}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-blue-500 font-medium">{stats.activeDoctors}</span> ativos atualmente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Médicos Ativos
            </CardTitle>
            <UserCheck size={18} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDoctors}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-500 font-medium">78%</span> do total de médicos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pacientes Queda Capilar
            </CardTitle>
            <Users size={18} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.quedaCapilarPatients}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-500 font-medium">55%</span> do total de pacientes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pacientes Disfunção Erétil
            </CardTitle>
            <Users size={18} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.disfuncaoEretilPatients}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-500 font-medium">45%</span> do total de pacientes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usuários Recentes</CardTitle>
            <CardDescription>
              Últimos usuários cadastrados na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.plan}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/admin/users">
                  Ver todos os usuários
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transações Recentes</CardTitle>
            <CardDescription>
              Últimas transações processadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.user}</div>
                        <div className="text-sm text-gray-500">{transaction.plan}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.amount.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      })}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Aprovado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/admin/financial">
                  Ver todas as transações
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
