
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Clock, Calendar, User, Users, FileText, DollarSign } from 'lucide-react';
import { HistoryItemForm } from './HistoryItemForm';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [showHistoryForm, setShowHistoryForm] = useState(false);
  
  // Mock data for dashboard stats
  const stats = [
    {
      title: 'Total de Usuários',
      value: 1247,
      change: '+12% este mês',
      changeType: 'increase',
      icon: <Users size={24} />
    },
    {
      title: 'Prescrições Ativas',
      value: 89,
      change: '+5 hoje',
      changeType: 'increase',
      icon: <FileText size={24} />
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.230',
      change: '+8% este mês',
      changeType: 'increase',
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

  const handleHistorySubmit = async (data: any) => {
    console.log('History item submitted:', data);
    // Aqui você implementaria a lógica para salvar o item no histórico
    setShowHistoryForm(false);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue">
          Painel Administrativo
        </h1>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button onClick={() => setShowHistoryForm(true)}>
            Adicionar ao Histórico
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/configuracoes">
              Configurações
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Stats */}
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
                    <span className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                  <span className={`text-sm font-medium mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'decrease' ? 'text-red-600' : 
                    'text-gray-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-bravo-blue">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesso rápido às principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild className="h-auto flex-col py-4">
                <Link to="/admin/usuarios">
                  <Users size={24} className="mb-2" />
                  Gerenciar Usuários
                </Link>
              </Button>
              <Button asChild className="h-auto flex-col py-4" variant="outline">
                <Link to="/admin/medicos">
                  <User size={24} className="mb-2" />
                  Gerenciar Médicos
                </Link>
              </Button>
              <Button asChild className="h-auto flex-col py-4" variant="outline">
                <Link to="/admin/prescricoes">
                  <FileText size={24} className="mb-2" />
                  Ver Prescrições
                </Link>
              </Button>
              <Button asChild className="h-auto flex-col py-4" variant="outline">
                <Link to="/admin/financeiro">
                  <DollarSign size={24} className="mb-2" />
                  Relatório Financeiro
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activities */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas atividades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.message}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-100 pt-4">
            <Button variant="outline" className="w-full">
              Ver todas as atividades
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* History Form Modal */}
      {showHistoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-4">Adicionar Item ao Histórico</h2>
            <HistoryItemForm
              onSubmit={handleHistorySubmit}
              onCancel={() => setShowHistoryForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
