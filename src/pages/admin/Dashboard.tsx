
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
    </div>
  );
};

export default AdminDashboard;
