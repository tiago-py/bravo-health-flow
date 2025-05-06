
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { Plus, Pencil, MoreVertical, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

interface TreatmentPlan {
  id: string;
  name: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  status: 'active' | 'inactive' | 'draft';
  price: number;
  interval: 'monthly' | 'quarterly' | 'semiannual' | 'annual';
  description: string;
  features: PlanFeature[];
  popular?: boolean;
}

const AdminTreatmentPlans = () => {
  const [activeTab, setActiveTab] = useState<string>('queda-capilar');
  
  // Mock treatment plan data
  const treatmentPlans: TreatmentPlan[] = [
    {
      id: '1',
      name: 'Plano Básico - Queda Capilar',
      type: 'queda-capilar',
      status: 'active',
      price: 149.9,
      interval: 'monthly',
      description: 'Tratamento básico para queda capilar com medicamentos essenciais.',
      features: [
        { id: '1-1', name: 'Minoxidil 5%', included: true },
        { id: '1-2', name: 'Finasterida 1mg', included: true },
        { id: '1-3', name: 'Consulta médica online', included: true },
        { id: '1-4', name: 'Entrega mensal', included: true },
        { id: '1-5', name: 'Acompanhamento semanal', included: false },
        { id: '1-6', name: 'Complexo vitamínico', included: false }
      ],
      popular: false
    },
    {
      id: '2',
      name: 'Plano Premium - Queda Capilar',
      type: 'queda-capilar',
      status: 'active',
      price: 249.9,
      interval: 'monthly',
      description: 'Tratamento completo para queda capilar com todos os medicamentos e acompanhamento.',
      features: [
        { id: '2-1', name: 'Minoxidil 5%', included: true },
        { id: '2-2', name: 'Finasterida 1mg', included: true },
        { id: '2-3', name: 'Consulta médica online', included: true },
        { id: '2-4', name: 'Entrega mensal', included: true },
        { id: '2-5', name: 'Acompanhamento semanal', included: true },
        { id: '2-6', name: 'Complexo vitamínico', included: true }
      ],
      popular: true
    },
    {
      id: '3',
      name: 'Plano Básico - Disfunção Erétil',
      type: 'disfuncao-eretil',
      status: 'active',
      price: 159.9,
      interval: 'monthly',
      description: 'Tratamento básico para disfunção erétil com medicamentos essenciais.',
      features: [
        { id: '3-1', name: 'Sildenafila 50mg', included: true },
        { id: '3-2', name: 'Consulta médica online', included: true },
        { id: '3-3', name: 'Entrega mensal discreta', included: true },
        { id: '3-4', name: 'Acompanhamento mensal', included: false },
        { id: '3-5', name: 'Tadalafila 5mg', included: false }
      ],
      popular: false
    },
    {
      id: '4',
      name: 'Plano Premium - Disfunção Erétil',
      type: 'disfuncao-eretil',
      status: 'active',
      price: 259.9,
      interval: 'monthly',
      description: 'Tratamento completo para disfunção erétil com todos os medicamentos e acompanhamento.',
      features: [
        { id: '4-1', name: 'Sildenafila 50mg', included: true },
        { id: '4-2', name: 'Tadalafila 5mg', included: true },
        { id: '4-3', name: 'Consulta médica online', included: true },
        { id: '4-4', name: 'Entrega mensal discreta', included: true },
        { id: '4-5', name: 'Acompanhamento semanal', included: true }
      ],
      popular: true
    },
    {
      id: '5',
      name: 'Plano Anual - Queda Capilar',
      type: 'queda-capilar',
      status: 'draft',
      price: 1999.9,
      interval: 'annual',
      description: 'Tratamento anual para queda capilar com desconto de 30% em relação ao plano mensal.',
      features: [
        { id: '5-1', name: 'Minoxidil 5%', included: true },
        { id: '5-2', name: 'Finasterida 1mg', included: true },
        { id: '5-3', name: 'Consulta médica online', included: true },
        { id: '5-4', name: 'Entrega mensal', included: true },
        { id: '5-5', name: 'Acompanhamento semanal', included: true },
        { id: '5-6', name: 'Complexo vitamínico', included: true }
      ],
      popular: false
    }
  ];

  // Filter plans by type
  const filteredPlans = treatmentPlans.filter(plan => plan.type === activeTab);
  
  // Toggle plan status
  const togglePlanStatus = (planId: string) => {
    // In a real app, this would update the plan status through an API
    toast.success('Status do plano atualizado com sucesso!');
  };
  
  // Edit plan
  const editPlan = (planId: string) => {
    // In a real app, this would navigate to plan edit page
    toast.info('Funcionalidade de edição em desenvolvimento.');
  };
  
  // Duplicate plan
  const duplicatePlan = (planId: string) => {
    // In a real app, this would duplicate the plan
    toast.success('Plano duplicado com sucesso!');
  };
  
  // Format price with currency
  const formatPrice = (price: number, interval: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">Planos de Tratamento</h1>
          <p className="text-gray-600">
            Gerencie os planos de tratamento disponíveis na plataforma
          </p>
        </div>
        
        <Button className="mt-4 md:mt-0">
          <Plus size={16} className="mr-2" />
          Adicionar Plano
        </Button>
      </div>
      
      {/* Treatment Plans Tabs */}
      <Tabs defaultValue="queda-capilar" onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="queda-capilar">Queda Capilar</TabsTrigger>
          <TabsTrigger value="disfuncao-eretil">Disfunção Erétil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="queda-capilar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPlans.map(plan => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                onToggleStatus={togglePlanStatus}
                onEdit={editPlan}
                onDuplicate={duplicatePlan}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="disfuncao-eretil">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPlans.map(plan => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                onToggleStatus={togglePlanStatus}
                onEdit={editPlan}
                onDuplicate={duplicatePlan}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Treatment Plan Card Component
const PlanCard = ({ 
  plan, 
  onToggleStatus, 
  onEdit, 
  onDuplicate 
}: { 
  plan: TreatmentPlan, 
  onToggleStatus: (id: string) => void,
  onEdit: (id: string) => void,
  onDuplicate: (id: string) => void
}) => {
  return (
    <Card className={`border ${plan.popular ? 'border-bravo-blue' : 'border-gray-200'}`}>
      <CardHeader className={`${plan.popular ? 'bg-bravo-beige bg-opacity-20' : ''}`}>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center">
              {plan.name}
              {plan.popular && (
                <Badge className="ml-2 bg-bravo-blue">Popular</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {plan.status === 'active' ? (
                <span className="flex items-center text-green-600">
                  <CheckCircle size={14} className="mr-1" />
                  Ativo
                </span>
              ) : plan.status === 'draft' ? (
                <span className="text-amber-600">Rascunho</span>
              ) : (
                <span className="text-gray-500">Inativo</span>
              )}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(plan.id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar plano
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(plan.id)}>
                Duplicar plano
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(plan.id)}>
                {plan.status === 'active' ? 'Desativar plano' : 'Ativar plano'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(plan.price)}
          </span>
          <span className="text-gray-500 ml-2">
            /{plan.interval === 'monthly' ? 'mês' : 
              plan.interval === 'quarterly' ? 'trimestre' : 
              plan.interval === 'semiannual' ? 'semestre' : 'ano'}
          </span>
        </div>
        
        <p className="text-gray-600">{plan.description}</p>
        
        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-medium">Características do plano:</h4>
          <ul className="space-y-1">
            {plan.features.map(feature => (
              <li 
                key={feature.id} 
                className={`flex items-center text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400 line-through'}`}
              >
                <CheckCircle 
                  size={16} 
                  className={`mr-2 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} 
                />
                {feature.name}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-4 flex justify-between">
        <Button variant="outline" onClick={() => onEdit(plan.id)}>
          <Pencil size={14} className="mr-2" />
          Editar
        </Button>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`status-${plan.id}`} className="text-sm">
            {plan.status === 'active' ? 'Ativo' : 'Inativo'}
          </Label>
          <Switch
            id={`status-${plan.id}`}
            checked={plan.status === 'active'}
            onCheckedChange={() => onToggleStatus(plan.id)}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminTreatmentPlans;
