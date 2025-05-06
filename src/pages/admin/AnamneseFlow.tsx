
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { 
  Search, 
  Plus, 
  FileSparkles, 
  FileEdit, 
  Copy, 
  MoreVertical,
  ArrowRight 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AnamneseFlow {
  id: string;
  title: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  questionsCount: number;
  status: 'active' | 'draft';
  lastUpdated: string;
  publishedAt?: string;
}

const AdminAnamneseFlow = () => {
  const [activeTab, setActiveTab] = useState('queda-capilar');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock anamnese flow data
  const anamneseFlows: AnamneseFlow[] = [
    {
      id: '1',
      title: 'Fluxo padrão - Queda Capilar',
      type: 'queda-capilar',
      questionsCount: 15,
      status: 'active',
      lastUpdated: '2023-05-15',
      publishedAt: '2023-05-16',
    },
    {
      id: '2',
      title: 'Fluxo detalhado - Queda Capilar',
      type: 'queda-capilar',
      questionsCount: 22,
      status: 'draft',
      lastUpdated: '2023-06-10',
    },
    {
      id: '3',
      title: 'Fluxo padrão - Disfunção Erétil',
      type: 'disfuncao-eretil',
      questionsCount: 18,
      status: 'active',
      lastUpdated: '2023-04-20',
      publishedAt: '2023-04-22',
    },
    {
      id: '4',
      title: 'Anamnese completa - Disfunção Erétil',
      type: 'disfuncao-eretil',
      questionsCount: 25,
      status: 'draft',
      lastUpdated: '2023-07-05',
    },
  ];
  
  // Filter anamnese flows based on search and active tab
  const filteredFlows = anamneseFlows.filter(flow => {
    const matchesType = flow.type === activeTab;
    const matchesSearch = searchQuery === '' || flow.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  // Clone flow
  const cloneFlow = (flowId: string) => {
    toast.success('Fluxo clonado com sucesso. Editando nova versão.');
  };
  
  // Delete flow
  const deleteFlow = (flowId: string) => {
    toast.error('Fluxo excluído com sucesso.');
  };
  
  // Publish flow
  const publishFlow = (flowId: string) => {
    toast.success('Fluxo publicado com sucesso.');
  };
  
  // Unpublish flow
  const unpublishFlow = (flowId: string) => {
    toast.success('Fluxo despublicado com sucesso.');
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">
            Fluxos de Anamnese
          </h1>
          <p className="text-gray-600">
            Gerencie os fluxos de anamnese para cada tipo de tratamento
          </p>
        </div>
        
        <Button asChild className="mt-4 md:mt-0">
          <Link to="/admin/anamnese/criar">
            <Plus size={16} className="mr-2" />
            Criar Novo Fluxo
          </Link>
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <CardTitle>Fluxos disponíveis</CardTitle>
            <div className="relative w-full md:w-60 mt-2 md:mt-0">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Buscar fluxos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="queda-capilar" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="queda-capilar">Queda Capilar</TabsTrigger>
              <TabsTrigger value="disfuncao-eretil">Disfunção Erétil</TabsTrigger>
            </TabsList>
            
            <TabsContent value="queda-capilar">
              <div className="space-y-4">
                {filteredFlows.length > 0 ? (
                  filteredFlows.map(flow => (
                    <div 
                      key={flow.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start mb-4 md:mb-0">
                        <div className="bg-bravo-beige bg-opacity-20 p-2 rounded-lg mr-3">
                          <FileSparkles className="h-6 w-6 text-bravo-blue" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium">
                              {flow.title}
                            </h3>
                            <Badge className={`ml-2 ${flow.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}>
                              {flow.status === 'active' ? 'Publicado' : 'Rascunho'}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-gray-500 mt-1">
                            <span>{flow.questionsCount} perguntas</span>
                            <span className="mx-2">•</span>
                            <span>Atualizado em {new Date(flow.lastUpdated).toLocaleDateString('pt-BR')}</span>
                            {flow.publishedAt && (
                              <>
                                <span className="mx-2">•</span>
                                <span>Publicado em {new Date(flow.publishedAt).toLocaleDateString('pt-BR')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/anamnese/${flow.id}`}>
                            <FileEdit className="h-4 w-4 mr-1" />
                            Editar
                          </Link>
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => cloneFlow(flow.id)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicar
                            </DropdownMenuItem>
                            {flow.status === 'draft' ? (
                              <DropdownMenuItem onClick={() => publishFlow(flow.id)}>
                                Publicar
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => unpublishFlow(flow.id)}>
                                Despublicar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => deleteFlow(flow.id)}
                              className="text-red-600"
                            >
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum fluxo encontrado para Queda Capilar.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/admin/anamnese/criar">
                        Criar novo fluxo
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="disfuncao-eretil">
              <div className="space-y-4">
                {filteredFlows.length > 0 ? (
                  filteredFlows.map(flow => (
                    <div 
                      key={flow.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start mb-4 md:mb-0">
                        <div className="bg-bravo-beige bg-opacity-20 p-2 rounded-lg mr-3">
                          <FileSparkles className="h-6 w-6 text-bravo-blue" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium">
                              {flow.title}
                            </h3>
                            <Badge className={`ml-2 ${flow.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}>
                              {flow.status === 'active' ? 'Publicado' : 'Rascunho'}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-gray-500 mt-1">
                            <span>{flow.questionsCount} perguntas</span>
                            <span className="mx-2">•</span>
                            <span>Atualizado em {new Date(flow.lastUpdated).toLocaleDateString('pt-BR')}</span>
                            {flow.publishedAt && (
                              <>
                                <span className="mx-2">•</span>
                                <span>Publicado em {new Date(flow.publishedAt).toLocaleDateString('pt-BR')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/anamnese/${flow.id}`}>
                            <FileEdit className="h-4 w-4 mr-1" />
                            Editar
                          </Link>
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => cloneFlow(flow.id)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicar
                            </DropdownMenuItem>
                            {flow.status === 'draft' ? (
                              <DropdownMenuItem onClick={() => publishFlow(flow.id)}>
                                Publicar
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => unpublishFlow(flow.id)}>
                                Despublicar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => deleteFlow(flow.id)}
                              className="text-red-600"
                            >
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum fluxo encontrado para Disfunção Erétil.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/admin/anamnese/criar">
                        Criar novo fluxo
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnamneseFlow;
