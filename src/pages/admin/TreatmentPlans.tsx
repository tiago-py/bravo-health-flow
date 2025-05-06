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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Plus, 
  Pencil, 
  MoreVertical, 
  CheckCircle, 
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
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

interface PlanTag {
  id: string;
  name: string;
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
  imageUrl?: string;
  tags: PlanTag[];
  recommendedDuration?: string;
}

// New Plan Form State
interface PlanFormState {
  id?: string;
  name: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  status: 'active' | 'inactive' | 'draft';
  price: number;
  interval: 'monthly' | 'quarterly' | 'semiannual' | 'annual';
  description: string;
  features: PlanFeature[];
  popular: boolean;
  imageUrl?: string;
  tags: PlanTag[];
  recommendedDuration: string;
}

const AdminTreatmentPlans = () => {
  const [activeTab, setActiveTab] = useState<string>('queda-capilar');
  const [isAddingPlan, setIsAddingPlan] = useState<boolean>(false);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [planForm, setPlanForm] = useState<PlanFormState>({
    name: '',
    type: 'queda-capilar',
    status: 'draft',
    price: 0,
    interval: 'monthly',
    description: '',
    features: [],
    popular: false,
    tags: [],
    recommendedDuration: '1-3 meses'
  });
  
  // Mock treatment plan data
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([
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
      popular: false,
      tags: [
        { id: '1', name: 'queda_leve' },
        { id: '2', name: 'iniciante' }
      ],
      recommendedDuration: '1-3 meses'
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
      popular: true,
      imageUrl: 'https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d3?ixlib=rb-4.0.3',
      tags: [
        { id: '3', name: 'queda_severa' },
        { id: '4', name: 'avancado' }
      ],
      recommendedDuration: '3-6 meses'
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
      popular: false,
      tags: [
        { id: '5', name: 'disfuncao_leve' }
      ],
      recommendedDuration: '1-3 meses'
    },
    {
      id: '4',
      name: 'Plano Premium - Disfunção Erétil',
      type: 'disfuncao-eretil',
      status: 'active',
      price: 259.9,
      interval: 'monthly',
      description: 'Tratamento completo para disfunção erétil com medicamentos avançados e acompanhamento.',
      features: [
        { id: '4-1', name: 'Sildenafila 50mg', included: true },
        { id: '4-2', name: 'Tadalafila 5mg', included: true },
        { id: '4-3', name: 'Consulta médica online', included: true },
        { id: '4-4', name: 'Entrega mensal discreta', included: true },
        { id: '4-5', name: 'Acompanhamento semanal', included: true }
      ],
      popular: true,
      tags: [
        { id: '6', name: 'disfuncao_moderada' },
        { id: '7', name: 'disfuncao_severa' }
      ],
      recommendedDuration: '3-6 meses'
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
      popular: false,
      tags: [
        { id: '8', name: 'queda_severa' },
        { id: '9', name: 'compromisso_longo' }
      ],
      recommendedDuration: '12 meses'
    }
  ]);

  // Filter plans by type
  const filteredPlans = treatmentPlans.filter(plan => plan.type === activeTab);
  
  // Toggle plan status
  const togglePlanStatus = (planId: string) => {
    setTreatmentPlans(plans => 
      plans.map(plan => {
        if (plan.id === planId) {
          const newStatus = plan.status === 'active' ? 'inactive' : 'active';
          return { ...plan, status: newStatus };
        }
        return plan;
      })
    );
    toast.success('Status do plano atualizado com sucesso!');
  };
  
  // Edit plan
  const editPlan = (planId: string) => {
    const plan = treatmentPlans.find(p => p.id === planId);
    if (plan) {
      setPlanForm({
        id: plan.id,
        name: plan.name,
        type: plan.type,
        status: plan.status,
        price: plan.price,
        interval: plan.interval,
        description: plan.description,
        features: [...plan.features],
        popular: plan.popular || false,
        imageUrl: plan.imageUrl || '',
        tags: [...(plan.tags || [])],
        recommendedDuration: plan.recommendedDuration || ''
      });
      setEditingPlan(planId);
      setIsAddingPlan(true);
    }
  };
  
  // Duplicate plan
  const duplicatePlan = (planId: string) => {
    const planToDuplicate = treatmentPlans.find(p => p.id === planId);
    if (planToDuplicate) {
      const newPlan = {
        ...planToDuplicate,
        id: Date.now().toString(),
        name: `${planToDuplicate.name} (Cópia)`,
        status: 'draft' as const
      };
      
      setTreatmentPlans([...treatmentPlans, newPlan]);
      toast.success('Plano duplicado com sucesso!');
    }
  };
  
  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  // Handle plan form input change
  const handlePlanFormChange = (field: keyof PlanFormState, value: any) => {
    setPlanForm(prev => ({ ...prev, [field]: value }));
  };
  
  // Add a new feature to the plan
  const addFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      name: '',
      included: true
    };
    
    setPlanForm(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }));
  };
  
  // Update a feature
  const updateFeature = (id: string, field: keyof PlanFeature, value: any) => {
    setPlanForm(prev => ({
      ...prev,
      features: prev.features.map(feature => 
        feature.id === id ? { ...feature, [field]: value } : feature
      )
    }));
  };
  
  // Remove a feature
  const removeFeature = (id: string) => {
    setPlanForm(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature.id !== id)
    }));
  };
  
  // Add a new tag
  const addTag = (name: string) => {
    // Check if tag already exists
    if (planForm.tags.some(tag => tag.name === name)) {
      return;
    }
    
    const newTag = {
      id: Date.now().toString(),
      name
    };
    
    setPlanForm(prev => ({
      ...prev,
      tags: [...prev.tags, newTag]
    }));
  };
  
  // Remove a tag
  const removeTag = (id: string) => {
    setPlanForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.id !== id)
    }));
  };
  
  // Save the plan
  const savePlan = () => {
    // Validation
    if (!planForm.name) {
      toast.error('Por favor, informe o nome do plano.');
      return;
    }
    
    if (planForm.price <= 0) {
      toast.error('O preço deve ser maior que zero.');
      return;
    }
    
    if (!planForm.description) {
      toast.error('Por favor, informe a descrição do plano.');
      return;
    }
    
    if (planForm.features.length === 0) {
      toast.error('Adicione pelo menos uma característica ao plano.');
      return;
    }
    
    // Remove empty features
    const validFeatures = planForm.features.filter(f => f.name.trim() !== '');
    
    if (validFeatures.length === 0) {
      toast.error('Adicione pelo menos uma característica válida ao plano.');
      return;
    }
    
    const formToSave = {
      ...planForm,
      features: validFeatures
    };
    
    // If editing, update the existing plan
    if (editingPlan) {
      setTreatmentPlans(plans => 
        plans.map(plan => plan.id === editingPlan ? { ...formToSave, id: plan.id } as TreatmentPlan : plan)
      );
      toast.success('Plano atualizado com sucesso!');
    } 
    // Otherwise, add a new plan
    else {
      const newPlan = {
        ...formToSave,
        id: Date.now().toString()
      } as TreatmentPlan;
      
      setTreatmentPlans([...treatmentPlans, newPlan]);
      toast.success('Novo plano adicionado com sucesso!');
    }
    
    // Reset form and state
    resetForm();
  };
  
  // Reset the form
  const resetForm = () => {
    setPlanForm({
      name: '',
      type: activeTab as 'queda-capilar' | 'disfuncao-eretil',
      status: 'draft',
      price: 0,
      interval: 'monthly',
      description: '',
      features: [],
      popular: false,
      tags: [],
      recommendedDuration: ''
    });
    setEditingPlan(null);
    setIsAddingPlan(false);
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
        
        <Button className="mt-4 md:mt-0" onClick={() => setIsAddingPlan(true)}>
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
      
      {/* Add/Edit Plan Dialog */}
      <Dialog open={isAddingPlan} onOpenChange={setIsAddingPlan}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPlan ? 'Editar Plano' : 'Adicionar Novo Plano'}</DialogTitle>
            <DialogDescription>
              {editingPlan 
                ? 'Atualize os detalhes do plano de tratamento existente' 
                : 'Preencha os detalhes para adicionar um novo plano de tratamento'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Plano</Label>
                <Input
                  id="name"
                  value={planForm.name}
                  onChange={(e) => handlePlanFormChange('name', e.target.value)}
                  placeholder="Ex: Plano Básico - Queda Capilar"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Tratamento</Label>
                <Select
                  value={planForm.type}
                  onValueChange={(value: 'queda-capilar' | 'disfuncao-eretil') => handlePlanFormChange('type', value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="queda-capilar">Queda Capilar</SelectItem>
                    <SelectItem value="disfuncao-eretil">Disfunção Erétil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  value={planForm.price}
                  onChange={(e) => handlePlanFormChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="149.90"
                  step="0.01"
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interval">Intervalo de Cobrança</Label>
                <Select
                  value={planForm.interval}
                  onValueChange={(value: 'monthly' | 'quarterly' | 'semiannual' | 'annual') => 
                    handlePlanFormChange('interval', value)
                  }
                >
                  <SelectTrigger id="interval">
                    <SelectValue placeholder="Selecione o intervalo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                    <SelectItem value="semiannual">Semestral</SelectItem>
                    <SelectItem value="annual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recommendedDuration">Duração Recomendada</Label>
              <Input
                id="recommendedDuration"
                value={planForm.recommendedDuration}
                onChange={(e) => handlePlanFormChange('recommendedDuration', e.target.value)}
                placeholder="Ex: 1-3 meses"
              />
              <p className="text-xs text-gray-500">
                Informação exibida ao cliente sobre a duração sugerida do tratamento
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={planForm.description}
                onChange={(e) => handlePlanFormChange('description', e.target.value)}
                placeholder="Descreva os benefícios deste plano"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL da Imagem (opcional)</Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  value={planForm.imageUrl || ''}
                  onChange={(e) => handlePlanFormChange('imageUrl', e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <ImageIcon size={14} className="mr-1" />
                  Upload
                </Button>
              </div>
              
              {planForm.imageUrl && (
                <div className="mt-2 max-h-48 w-full overflow-hidden rounded border">
                  <img 
                    src={planForm.imageUrl} 
                    alt={planForm.name} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Erro+ao+carregar+imagem';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  checked={planForm.popular}
                  onCheckedChange={(checked) => handlePlanFormChange('popular', checked)}
                />
                <Label htmlFor="popular">Plano popular (destacado)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={planForm.status === 'active'}
                  onCheckedChange={(checked) => 
                    handlePlanFormChange('status', checked ? 'active' : 'inactive')
                  }
                />
                <Label htmlFor="status">Plano ativo</Label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Características do Plano</Label>
                <Button variant="outline" size="sm" onClick={addFeature}>
                  <Plus size={14} className="mr-1" />
                  Adicionar
                </Button>
              </div>
              
              {planForm.features.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <Switch
                    checked={feature.included}
                    onCheckedChange={(checked) => updateFeature(feature.id, 'included', checked)}
                  />
                  <Input
                    value={feature.name}
                    onChange={(e) => updateFeature(feature.id, 'name', e.target.value)}
                    placeholder="Característica do plano"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(feature.id)}
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </Button>
                </div>
              ))}
              
              {planForm.features.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  Nenhuma característica adicionada. Clique em "Adicionar" para incluir as características do plano.
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <Label>Tags para Vínculo com Anamnese</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {planForm.tags.map((tag) => (
                  <Badge key={tag.id} className="flex items-center gap-1">
                    {tag.name}
                    <button 
                      onClick={() => removeTag(tag.id)}
                      className="ml-1 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  id="newTag"
                  placeholder="Nova tag..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        addTag(input.value.trim());
                        input.value = '';
                      }
                    }
                  }}
                />
                <Button 
                  variant="outline"
                  onClick={() => {
                    const input = document.getElementById('newTag') as HTMLInputElement;
                    if (input.value.trim()) {
                      addTag(input.value.trim());
                      input.value = '';
                    }
                  }}
                >
                  Adicionar Tag
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Adicione tags para que este plano seja selecionado automaticamente com base nas respostas da anamnese
              </p>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={resetForm}>Cancelar</Button>
            <Button onClick={savePlan}>
              {editingPlan ? 'Salvar Alterações' : 'Adicionar Plano'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
        {plan.imageUrl && (
          <div className="mb-4 rounded-md overflow-hidden h-36">
            <img 
              src={plan.imageUrl} 
              alt={plan.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      
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
        
        {plan.recommendedDuration && (
          <div className="text-sm text-gray-700">
            <span className="font-medium">Duração recomendada:</span> {plan.recommendedDuration}
          </div>
        )}
        
        <p className="text-gray-600">{plan.description}</p>
        
        {plan.tags && plan.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {plan.tags.map((tag, index) => (
              <Badge key={index} variant="outline">{tag.name}</Badge>
            ))}
          </div>
        )}
        
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
