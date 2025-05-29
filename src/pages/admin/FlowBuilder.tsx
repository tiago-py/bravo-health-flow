
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Settings, Eye, Copy, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import FlowCanvas from '@/components/flow-builder/FlowCanvas';
import FlowSettings from '@/components/flow-builder/FlowSettings';
import { Badge } from '@/components/ui/badge';

// Type definitions for the flow data structures
interface FlowItem {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  blocks: FlowBlock[];
  tags: string[];
  lastUpdated: string;
}

export interface FlowBlock {
  id: string;
  type: 'question' | 'diagnosis' | 'plan' | 'checkout';
  title: string;
  position: { x: number, y: number };
  data: any;
  next?: string | null;
}

const FlowBuilder = () => {
  const navigate = useNavigate();
  const [flows, setFlows] = useState<FlowItem[]>([
    {
      id: 'flow-1',
      name: 'Queda Capilar',
      description: 'Fluxo para diagnóstico e tratamento de queda capilar',
      isActive: true,
      blocks: [],
      tags: ['queda_leve', 'queda_moderada', 'queda_severa', 'hormonal', 'stress'],
      lastUpdated: '2023-05-07'
    },
    {
      id: 'flow-2',
      name: 'Disfunção Erétil',
      description: 'Fluxo para diagnóstico e tratamento de disfunção erétil',
      isActive: false,
      blocks: [],
      tags: ['disfunção_leve', 'disfunção_moderada', 'disfunção_severa', 'emocional', 'física'],
      lastUpdated: '2023-05-05'
    }
  ]);
  
  const [activeFlow, setActiveFlow] = useState<FlowItem | null>(null);
  const [isCreatingFlow, setIsCreatingFlow] = useState(false);
  const [newFlow, setNewFlow] = useState({ name: '', description: '', isActive: true });
  const [currentTab, setCurrentTab] = useState('flows');
  
  const handleEditFlow = (flow: FlowItem) => {
    setActiveFlow(flow);
    setCurrentTab('editor');
  };
  
  const handleCreateFlow = () => {
    if (!newFlow.name.trim()) {
      toast.error('Por favor, informe um nome para o fluxo.');
      return;
    }
    
    const flow = {
      id: `flow-${Date.now()}`,
      name: newFlow.name,
      description: newFlow.description,
      isActive: newFlow.isActive,
      blocks: [],
      tags: [],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setFlows([...flows, flow]);
    setNewFlow({ name: '', description: '', isActive: true });
    setIsCreatingFlow(false);
    toast.success('Fluxo criado com sucesso!');
  };
  
  const handleDeleteFlow = (id: string) => {
    setFlows(flows.filter(flow => flow.id !== id));
    toast.success('Fluxo excluído com sucesso!');
  };
  
  const handleDuplicateFlow = (flow: FlowItem) => {
    const newFlowCopy = {
      ...flow,
      id: `flow-${Date.now()}`,
      name: `${flow.name} (cópia)`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setFlows([...flows, newFlowCopy]);
    toast.success('Fluxo duplicado com sucesso!');
  };
  
  const handleToggleFlowStatus = (id: string, isActive: boolean) => {
    setFlows(flows.map(flow => 
      flow.id === id ? { ...flow, isActive } : flow
    ));
    toast.success(`Fluxo ${isActive ? 'ativado' : 'desativado'} com sucesso!`);
  };
  
  const handleBackToFlows = () => {
    setActiveFlow(null);
    setCurrentTab('flows');
  };
  
  const handleSaveFlow = () => {
    if (activeFlow) {
      setFlows(flows.map(flow => 
        flow.id === activeFlow.id ? activeFlow : flow
      ));
      toast.success('Fluxo salvo com sucesso!');
    }
  };
  
  const handlePreviewFlow = () => {
    toast.info('Preview do fluxo em construção.');
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          {currentTab === 'flows' ? (
            <h1 className="text-2xl font-bold">Construtor de Fluxo da Anamnese</h1>
          ) : (
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleBackToFlows} className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-2xl font-bold">Editando: {activeFlow?.name}</h1>
            </div>
          )}
          
          {currentTab === 'editor' && activeFlow && (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handlePreviewFlow}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSaveFlow}>
                Salvar Fluxo
              </Button>
            </div>
          )}
        </div>
        
        <TabsContent value="flows" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-gray-600">
              Crie e gerencie os fluxos de anamnese para diferentes tipos de tratamento.
            </p>
            <Dialog open={isCreatingFlow} onOpenChange={setIsCreatingFlow}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Fluxo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Fluxo</DialogTitle>
                  <DialogDescription>
                    Defina as informações básicas do fluxo de anamnese.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Fluxo</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Queda Capilar"
                      value={newFlow.name}
                      onChange={(e) => setNewFlow({...newFlow, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva o propósito deste fluxo de anamnese"
                      value={newFlow.description}
                      onChange={(e) => setNewFlow({...newFlow, description: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={newFlow.isActive}
                      onCheckedChange={(checked) => setNewFlow({...newFlow, isActive: checked})}
                    />
                    <Label htmlFor="isActive">Fluxo Ativo</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreatingFlow(false)}>Cancelar</Button>
                  <Button onClick={handleCreateFlow}>Criar Fluxo</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {flows.map((flow) => (
              <Card key={flow.id} className={`hover:shadow-lg transition-shadow ${flow.isActive ? 'border-green-200' : 'border-gray-200'}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{flow.name}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">{flow.description}</CardDescription>
                    </div>
                    <Badge variant={flow.isActive ? "default" : "secondary"} className="ml-2 shrink-0">
                      {flow.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500">
                      <p>Última atualização: {flow.lastUpdated}</p>
                      <p>Blocos: {flow.blocks.length}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {flow.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                      {flow.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{flow.tags.length - 3}</Badge>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDuplicateFlow(flow)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Duplicar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 flex-1"
                          onClick={() => handleDeleteFlow(flow.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Excluir
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant={flow.isActive ? "outline" : "default"}
                          size="sm"
                          className="flex-1"
                          onClick={() => handleToggleFlowStatus(flow.id, !flow.isActive)}
                        >
                          {flow.isActive ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleEditFlow(flow)}
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="editor" className="space-y-4">
          {activeFlow && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <Card className="h-[calc(100vh-300px)] overflow-hidden">
                  <CardHeader className="border-b bg-slate-50/80 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg flex flex-wrap items-center gap-2">
                          Fluxo: {activeFlow.name}
                          <Badge variant={activeFlow.isActive ? "default" : "secondary"}>
                            {activeFlow.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Arraste e organize os blocos para construir seu fluxo de anamnese.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 h-full">
                    <FlowCanvas 
                      flow={activeFlow} 
                      setFlow={(updatedFlow) => setActiveFlow(updatedFlow)}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="xl:col-span-1">
                <FlowSettings 
                  flow={activeFlow} 
                  setFlow={(updatedFlow) => setActiveFlow(updatedFlow)}
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlowBuilder;
