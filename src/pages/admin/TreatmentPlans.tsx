
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/sonner';
import { Edit2, Archive, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Plan {
  id: string;
  name: string;
  description: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  price: number;
  active: boolean;
  benefits: string[];
  details: {
    medications: string[];
    consultations: number;
    duration: string;
    shipping: boolean;
  };
}

const AdminTreatmentPlans = () => {
  const [filterType, setFilterType] = useState<'all' | 'queda-capilar' | 'disfuncao-eretil'>('all');
  const [showArchived, setShowArchived] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  // Mock plans data
  const plans: Plan[] = [
    {
      id: '1',
      name: 'Queda Capilar - Básico',
      description: 'Plano inicial para tratamento de queda capilar',
      type: 'queda-capilar',
      price: 99.90,
      active: true,
      benefits: [
        'Minoxidil 5%',
        'Avaliação médica online',
        'Entrega mensal',
        'Suporte por e-mail'
      ],
      details: {
        medications: ['Minoxidil 5%'],
        consultations: 1,
        duration: '3 meses',
        shipping: true
      }
    },
    {
      id: '2',
      name: 'Queda Capilar - Premium',
      description: 'Tratamento completo para queda capilar',
      type: 'queda-capilar',
      price: 149.90,
      active: true,
      benefits: [
        'Minoxidil 5%',
        'Finasterida 1mg',
        'Complexo vitamínico',
        'Acompanhamento mensal',
        'Suporte prioritário'
      ],
      details: {
        medications: ['Minoxidil 5%', 'Finasterida 1mg', 'Complexo vitamínico'],
        consultations: 4,
        duration: '3 meses',
        shipping: true
      }
    },
    {
      id: '3',
      name: 'Disfunção Erétil - Básico',
      description: 'Tratamento inicial para disfunção erétil',
      type: 'disfuncao-eretil',
      price: 119.90,
      active: true,
      benefits: [
        'Medicação sob demanda',
        'Avaliação médica online',
        'Entrega discreta',
        'Suporte por e-mail'
      ],
      details: {
        medications: ['Sildenafila 50mg'],
        consultations: 1,
        duration: '3 meses',
        shipping: true
      }
    },
    {
      id: '4',
      name: 'Disfunção Erétil - Premium',
      description: 'Tratamento avançado para disfunção erétil',
      type: 'disfuncao-eretil',
      price: 189.90,
      active: true,
      benefits: [
        'Medicação diária',
        'Acompanhamento médico',
        'Entrega discreta',
        'Suporte prioritário'
      ],
      details: {
        medications: ['Tadalafila 5mg'],
        consultations: 4,
        duration: '3 meses',
        shipping: true
      }
    }
  ];

  // Filter plans based on type and search query
  const filteredPlans = plans.filter(plan => {
    const matchesType = filterType === 'all' || plan.type === filterType;
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArchived = showArchived ? !plan.active : plan.active;
    return matchesType && matchesSearch && matchesArchived;
  });

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setEditDialogOpen(true);
  };

  const togglePlanStatus = (planId: string, currentStatus: boolean) => {
    // In a real app, this would update the plan status via API
    toast.success(`Plano ${currentStatus ? 'arquivado' : 'ativado'} com sucesso`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-4 md:mb-0">
          Planos de Tratamento
        </h1>
        
        <Button>
          <Plus size={16} className="mr-2" />
          Criar novo plano
        </Button>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre e pesquise os planos de tratamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <Input
                placeholder="Buscar por nome ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Tabs value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
                  <TabsTrigger value="queda-capilar" className="flex-1">Queda Capilar</TabsTrigger>
                  <TabsTrigger value="disfuncao-eretil" className="flex-1">Disfunção Erétil</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-archived"
                checked={showArchived}
                onCheckedChange={setShowArchived}
              />
              <label htmlFor="show-archived" className="text-sm text-gray-700">
                Mostrar planos arquivados
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Plans List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    {plan.name}
                    {!plan.active && (
                      <Badge variant="outline" className="ml-2">
                        Arquivado
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className="text-2xl font-bold text-bravo-blue">
                  R$ {plan.price.toFixed(2)}
                  <span className="text-sm font-normal text-gray-500">/mês</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Benefícios inclusos:</h4>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-bravo-blue rounded-full mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Duração:</span>
                    <p className="font-medium">{plan.details.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Consultas:</span>
                    <p className="font-medium">{plan.details.consultations}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-gray-100 pt-4">
              <div className="flex justify-between w-full">
                <Button
                  variant={plan.active ? "destructive" : "default"}
                  onClick={() => togglePlanStatus(plan.id, plan.active)}
                >
                  <Archive size={16} className="mr-2" />
                  {plan.active ? 'Arquivar' : 'Ati
var'}
                </Button>
                <Button variant="outline" onClick={() => handleEditPlan(plan)}>
                  <Edit2 size={16} className="mr-2" />
                  Editar
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum plano encontrado com os filtros selecionados.</p>
        </div>
      )}
      
      {/* Edit Plan Dialog */}
      {selectedPlan && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Plano</DialogTitle>
              <DialogDescription>
                Faça as alterações necessárias no plano de tratamento.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do plano</label>
                <Input 
                  value={selectedPlan.name}
                  onChange={() => {}}  // In a real app, this would update the plan
                />
              </div>
              
              {/* Add more fields here */}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                // In a real app, this would save the changes
                toast.success('Plano atualizado com sucesso!');
                setEditDialogOpen(false);
              }}>
                Salvar alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminTreatmentPlans;
