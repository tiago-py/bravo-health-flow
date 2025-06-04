
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Clock, User, Users, FileText, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard stats
  const stats = [
    {
      title: 'Total de Usuários',
      value: 1247,
      change: '+12% este mês',
      changeType: 'increase' as const,
      icon: <Users size={24} />
    },
    {
      title: 'Prescrições Ativas',
      value: 89,
      change: '+5 hoje',
      changeType: 'increase' as const,
      icon: <FileText size={24} />
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.230',
      change: '+8% este mês',
      changeType: 'increase' as const,
      icon: <DollarSign size={24} />
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: '1',
      type: 'user_registration',
      message: 'Novo usuário cadastrado: João Silva',
      time: '2 minutos atrás'
    },
    {
      id: '2',
      type: 'prescription_created',
      message: 'Nova prescrição criada para paciente #1234',
      time: '15 minutos atrás'
    },
    {
      id: '3',
      type: 'doctor_approved',
      message: 'Médico Dr. Maria Santos aprovado',
      time: '1 hora atrás'
    },
    {
      id: '4',
      type: 'payment_received',
      message: 'Pagamento recebido: R$ 250,00',
      time: '2 horas atrás'
    }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue">
          Painel Administrativo
        </h1>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/configuracoes">
              Configurações
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                  <span className={`text-sm mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="bg-bravo-beige bg-opacity-30 p-3 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>
            Últimas atividades na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                <div className="bg-bravo-blue bg-opacity-10 p-2 rounded-full">
                  <Clock size={16} className="text-bravo-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Ver todas as atividades
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboard;
