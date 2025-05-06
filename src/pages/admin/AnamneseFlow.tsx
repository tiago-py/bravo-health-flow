
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Edit, 
  Plus, 
  Search, 
  Sparkles,
  FileText
} from 'lucide-react';

const AdminAnamneseFlow = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock anamnesis flows data
  const allFlows = [
    {
      id: '1',
      title: 'Anamnese para Queda Capilar',
      type: 'queda-capilar',
      description: 'Formulário para avaliação inicial de pacientes com queda capilar.',
      questionCount: 12,
      lastUpdated: '2023-03-20'
    },
    {
      id: '2',
      title: 'Anamnese para Disfunção Erétil',
      type: 'disfuncao-eretil',
      description: 'Formulário para avaliação inicial de pacientes com disfunção erétil.',
      questionCount: 15,
      lastUpdated: '2023-03-18'
    },
    {
      id: '3',
      title: 'Anamnese para Queda Capilar (Versão Resumida)',
      type: 'queda-capilar',
      description: 'Versão simplificada do formulário para avaliação rápida.',
      questionCount: 8,
      lastUpdated: '2023-03-10'
    },
    {
      id: '4',
      title: 'Anamnese para Disfunção Erétil (Versão Detalhada)',
      type: 'disfuncao-eretil',
      description: 'Formulário detalhado com perguntas adicionais para casos complexos.',
      questionCount: 20,
      lastUpdated: '2023-03-05'
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
          <Card key={flow.id} className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    {flow.type === 'queda-capilar' ? (
                      <Sparkles size={16} className="mr-2 text-amber-500" />
                    ) : (
                      <FileText size={16} className="mr-2 text-blue-500" />
                    )}
                    <CardTitle>{flow.title}</CardTitle>
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
              <div className="text-sm text-gray-500 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">{flow.questionCount}</span> perguntas
                </div>
                <div>
                  Atualizado em {new Date(flow.lastUpdated).toLocaleDateString('pt-BR')}
                </div>
              </div>
              
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
