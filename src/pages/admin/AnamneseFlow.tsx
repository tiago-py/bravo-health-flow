
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Edit, 
  Plus, 
  Search, 
  Sparkles,
  FileText,
  Tag,
  Link as LinkIcon
} from 'lucide-react';

interface LinkedPlan {
  planId: string;
  name: string;
  tags: string[];
}

interface AnamneseFlow {
  id: string;
  title: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  description: string;
  questionCount: number;
  lastUpdated: string;
  active: boolean;
  linkedPlans: LinkedPlan[];
}

const AdminAnamneseFlow = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock anamnesis flows data with linked plans
  const allFlows: AnamneseFlow[] = [
    {
      id: '1',
      title: 'Anamnese para Queda Capilar',
      type: 'queda-capilar',
      description: 'Formulário para avaliação inicial de pacientes com queda capilar.',
      questionCount: 12,
      lastUpdated: '2023-03-20',
      active: true,
      linkedPlans: [
        {
          planId: '1',
          name: 'Plano Básico - Queda Capilar',
          tags: ['queda_leve', 'iniciante']
        },
        {
          planId: '2',
          name: 'Plano Premium - Queda Capilar',
          tags: ['queda_severa', 'avancado']
        }
      ]
    },
    {
      id: '2',
      title: 'Anamnese para Disfunção Erétil',
      type: 'disfuncao-eretil',
      description: 'Formulário para avaliação inicial de pacientes com disfunção erétil.',
      questionCount: 15,
      lastUpdated: '2023-03-18',
      active: true,
      linkedPlans: [
        {
          planId: '3',
          name: 'Plano Básico - Disfunção Erétil',
          tags: ['disfuncao_leve']
        },
        {
          planId: '4',
          name: 'Plano Premium - Disfunção Erétil',
          tags: ['disfuncao_severa', 'disfuncao_moderada']
        }
      ]
    },
    {
      id: '3',
      title: 'Anamnese para Queda Capilar (Versão Resumida)',
      type: 'queda-capilar',
      description: 'Versão simplificada do formulário para avaliação rápida.',
      questionCount: 8,
      lastUpdated: '2023-03-10',
      active: false,
      linkedPlans: [
        {
          planId: '1',
          name: 'Plano Básico - Queda Capilar',
          tags: ['queda_leve']
        }
      ]
    },
    {
      id: '4',
      title: 'Anamnese para Disfunção Erétil (Versão Detalhada)',
      type: 'disfuncao-eretil',
      description: 'Formulário detalhado com perguntas adicionais para casos complexos.',
      questionCount: 20,
      lastUpdated: '2023-03-05',
      active: true,
      linkedPlans: [
        {
          planId: '3',
          name: 'Plano Básico - Disfunção Erétil',
          tags: ['disfuncao_leve']
        },
        {
          planId: '4',
          name: 'Plano Premium - Disfunção Erétil',
          tags: ['disfuncao_severa']
        }
      ]
    }
  ];
  
  // Filter flows based on search query
  const filteredFlows = allFlows.filter(flow =>
    flow.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flow.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">
            Fluxos de Anamnese
          </h1>
          <p className="text-gray-600">
            Gerencie os formulários de anamnese para os diferentes tipos de tratamento
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/anamnese/criar">
            <Plus size={16} className="mr-2" />
            Nova Anamnese
          </Link>
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder="Buscar anamnese..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFlows.map((flow) => (
          <Card key={flow.id} className={`shadow-sm hover:shadow transition-shadow ${!flow.active ? 'opacity-70' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    {flow.type === 'queda-capilar' ? (
                      <Sparkles size={16} className="mr-2 text-amber-500" />
                    ) : (
                      <FileText size={16} className="mr-2 text-blue-500" />
                    )}
                    <CardTitle className="flex items-center gap-2">
                      {flow.title}
                      {!flow.active && (
                        <Badge variant="outline" className="text-gray-500">Inativo</Badge>
                      )}
                      {flow.active && flow.id === '1' && (
                        <Badge variant="default" className="bg-green-600">Ativo</Badge>
                      )}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-1">
                    {flow.description}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/admin/anamnese/${flow.id}`}>
                    <Edit size={14} className="mr-1" />
                    Editar
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 flex items-center justify-between mb-3">
                <div>
                  <span className="font-medium text-gray-900">{flow.questionCount}</span> perguntas
                </div>
                <div>
                  Atualizado em {new Date(flow.lastUpdated).toLocaleDateString('pt-BR')}
                </div>
              </div>
              
              {flow.linkedPlans.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <LinkIcon size={14} className="mr-1" />
                    Planos vinculados:
                  </div>
                  <div className="space-y-2">
                    {flow.linkedPlans.map((plan, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-2 text-sm">
                        <span className="font-medium">{plan.name}</span>
                        <div className="flex items-center gap-1">
                          {plan.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              <Tag size={10} className="mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/admin/anamnese/${flow.id}`}>
                    Ver detalhes <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAnamneseFlow;
