
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Plus, GripVertical, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Define types for our anamnesis form
interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple_choice' | 'single_choice' | 'image' | 'conditional';
  options?: string[];
  imageUrl?: string;
  required: boolean;
  conditionalLogic?: ConditionalLogic[];
  description?: string;
}

interface ConditionalLogic {
  questionId: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
  tag: string;
}

interface LinkedPlan {
  planId: string;
  name: string;
  tags: string[];
  priority: number;
}

interface AnamnesisFlow {
  id: string;
  title: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  description: string;
  questions: Question[];
  linkedPlans: LinkedPlan[];
  active: boolean;
}

// Mock treatment plan data
const mockTreatmentPlans = [
  {
    id: '1',
    name: 'Plano Básico - Queda Capilar',
    type: 'queda-capilar'
  },
  {
    id: '2',
    name: 'Plano Premium - Queda Capilar',
    type: 'queda-capilar'
  },
  {
    id: '3',
    name: 'Plano Básico - Disfunção Erétil',
    type: 'disfuncao-eretil'
  },
  {
    id: '4',
    name: 'Plano Premium - Disfunção Erétil',
    type: 'disfuncao-eretil'
  }
];

const AdminAnamneseEdit = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  
  // Mock data for an existing anamnesis flow
  const [anamnesisFlow, setAnamnesisFlow] = useState<AnamnesisFlow>({
    id: id || '1',
    title: 'Anamnese para Queda Capilar',
    type: 'queda-capilar',
    description: 'Formulário para avaliação inicial de pacientes com queda capilar.',
    active: true,
    linkedPlans: [
      {
        planId: '1',
        name: 'Plano Básico - Queda Capilar',
        tags: ['queda_leve', 'iniciante'],
        priority: 1
      },
      {
        planId: '2',
        name: 'Plano Premium - Queda Capilar',
        tags: ['queda_severa', 'avancado'],
        priority: 2
      }
    ],
    questions: [
      {
        id: '1',
        text: 'Há quanto tempo você percebeu a queda capilar?',
        type: 'single_choice',
        options: [
          'Menos de 6 meses',
          'Entre 6 meses e 1 ano',
          'Entre 1 e 3 anos',
          'Mais de 3 anos'
        ],
        required: true,
        conditionalLogic: [
          {
            questionId: '1',
            operator: 'equals',
            value: 'Mais de 3 anos',
            tag: 'queda_severa'
          },
          {
            questionId: '1',
            operator: 'equals',
            value: 'Menos de 6 meses',
            tag: 'queda_leve'
          }
        ]
      },
      {
        id: '2',
        text: 'Como você classificaria seu padrão de queda?',
        type: 'multiple_choice',
        options: [
          'Entradas (recuo da linha frontal)',
          'Coroa (parte superior da cabeça)',
          'Difusa (por toda a cabeça)',
          'Circular (áreas específicas)'
        ],
        required: true,
        conditionalLogic: [
          {
            questionId: '2',
            operator: 'contains',
            value: 'Difusa (por toda a cabeça)',
            tag: 'queda_severa'
          }
        ]
      },
      {
        id: '3',
        text: 'Existe histórico de calvície na sua família?',
        type: 'single_choice',
        options: [
          'Sim, do lado paterno',
          'Sim, do lado materno',
          'Sim, ambos os lados',
          'Não'
        ],
        required: true,
        conditionalLogic: [
          {
            questionId: '3',
            operator: 'equals',
            value: 'Sim, ambos os lados',
            tag: 'genetico'
          }
        ]
      },
      {
        id: '4',
        text: 'Já realizou algum tratamento para queda capilar anteriormente?',
        type: 'text',
        required: false,
        conditionalLogic: []
      },
      {
        id: '5',
        text: 'Padrões comuns de queda capilar:',
        type: 'image',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/5c6974cdf4e5310786e5f1d7/1632468649186-28XYLTJ3JX3DWCSIMK81/norwood_scale.jpg',
        required: false
      }
    ]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionWithLogic, setCurrentQuestionWithLogic] = useState<Question | null>(null);
  const [currentTag, setCurrentTag] = useState('');
  const [availableTags, setAvailableTags] = useState<string[]>(['queda_leve', 'queda_severa', 'genetico', 'iniciante', 'avancado']);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [planTags, setPlanTags] = useState<string[]>([]);
  const [planPriority, setPlanPriority] = useState<number>(1);
  
  // Filter plans by anamnesis type
  const filteredPlans = mockTreatmentPlans.filter(plan => plan.type === anamnesisFlow.type);
  
  // Extract all tags from conditional logic
  useEffect(() => {
    const tags = new Set<string>();
    anamnesisFlow.questions.forEach(q => {
      if (q.conditionalLogic) {
        q.conditionalLogic.forEach(logic => {
          tags.add(logic.tag);
        });
      }
    });
    
    const uniqueTags = Array.from(tags);
    setAvailableTags(prev => {
      const existingTags = new Set(prev);
      uniqueTags.forEach(tag => existingTags.add(tag));
      return Array.from(existingTags);
    });
  }, [anamnesisFlow.questions]);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to save anamnesis
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Anamnese atualizada com sucesso!');
      setTimeout(() => navigate('/admin/anamnese'), 1500);
    } catch (error) {
      toast.error('Erro ao salvar anamnese. Tente novamente.');
      setIsSubmitting(false);
    }
  };
  
  const updateQuestion = (index: number, updatedQuestion: Partial<Question>) => {
    const newQuestions = [...anamnesisFlow.questions];
    newQuestions[index] = { ...newQuestions[index], ...updatedQuestion };
    setAnamnesisFlow({ ...anamnesisFlow, questions: newQuestions });
  };
  
  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      type: 'text',
      required: false,
      conditionalLogic: []
    };
    
    setAnamnesisFlow({
      ...anamnesisFlow,
      questions: [...anamnesisFlow.questions, newQuestion]
    });
  };
  
  const removeQuestion = (index: number) => {
    const newQuestions = anamnesisFlow.questions.filter((_, i) => i !== index);
    setAnamnesisFlow({ ...anamnesisFlow, questions: newQuestions });
  };
  
  const addOption = (questionIndex: number) => {
    const newQuestions = [...anamnesisFlow.questions];
    const question = newQuestions[questionIndex];
    
    if (!question.options) {
      question.options = [];
    }
    
    question.options.push('');
    setAnamnesisFlow({ ...anamnesisFlow, questions: newQuestions });
  };
  
  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...anamnesisFlow.questions];
    const question = newQuestions[questionIndex];
    
    if (question.options) {
      question.options[optionIndex] = value;
      setAnamnesisFlow({ ...anamnesisFlow, questions: newQuestions });
    }
  };
  
  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...anamnesisFlow.questions];
    const question = newQuestions[questionIndex];
    
    if (question.options) {
      question.options = question.options.filter((_, i) => i !== optionIndex);
      setAnamnesisFlow({ ...anamnesisFlow, questions: newQuestions });
    }
  };

  const addConditionalLogic = (questionIndex: number) => {
    setCurrentQuestionWithLogic(anamnesisFlow.questions[questionIndex]);
  };
  
  const saveConditionalLogic = () => {
    if (!currentQuestionWithLogic || !currentTag) return;
    
    const newQuestions = [...anamnesisFlow.questions];
    const questionIndex = newQuestions.findIndex(q => q.id === currentQuestionWithLogic.id);
    
    if (questionIndex !== -1) {
      if (!newQuestions[questionIndex].conditionalLogic) {
        newQuestions[questionIndex].conditionalLogic = [];
      }
      
      const newLogic: ConditionalLogic = {
        questionId: currentQuestionWithLogic.id,
        operator: 'equals',
        value: currentQuestionWithLogic.type === 'single_choice' && currentQuestionWithLogic.options ? 
               currentQuestionWithLogic.options[0] : '',
        tag: currentTag
      };
      
      newQuestions[questionIndex].conditionalLogic.push(newLogic);
      setAnamnesisFlow({ ...anamnesisFlow, questions: newQuestions });
      setCurrentQuestionWithLogic(null);
      setCurrentTag('');
    }
  };
  
  const removeConditionalLogic = (questionIndex: number, logicIndex: number) => {
    const newQuestions = [...anamnesisFlow.questions];
    if (newQuestions[questionIndex].conditionalLogic) {
      newQuestions[questionIndex].conditionalLogic = 
        newQuestions[questionIndex].conditionalLogic!.filter((_, i) => i !== logicIndex);
      setAnamnesisFlow({ ...anamnesisFlow, questions: newQuestions });
    }
  };

  const updateConditionalLogic = (questionIndex: number, logicIndex: number, field: keyof ConditionalLogic, value: string) => {
    const newQuestions = [...anamnesisFlow.questions];
    if (newQuestions[questionIndex].conditionalLogic && newQuestions[questionIndex].conditionalLogic![logicIndex]) {
      newQuestions[questionIndex].conditionalLogic![logicIndex] = {
        ...newQuestions[questionIndex].conditionalLogic![logicIndex],
        [field]: value
      };
      setAnamnesisFlow({ ...anamnesisFlow, questions: newQuestions });
    }
  };

  const addPlan = () => {
    if (!selectedPlan || planTags.length === 0) {
      toast.error('Selecione um plano e pelo menos uma tag para vinculá-lo');
      return;
    }
    
    const planToAdd = filteredPlans.find(p => p.id === selectedPlan);
    if (!planToAdd) return;
    
    const newLinkedPlan: LinkedPlan = {
      planId: selectedPlan,
      name: planToAdd.name,
      tags: [...planTags],
      priority: planPriority
    };
    
    setAnamnesisFlow({
      ...anamnesisFlow,
      linkedPlans: [...anamnesisFlow.linkedPlans, newLinkedPlan]
    });
    
    // Reset form
    setSelectedPlan("");
    setPlanTags([]);
    setPlanPriority(1);
  };
  
  const removePlan = (index: number) => {
    const newLinkedPlans = anamnesisFlow.linkedPlans.filter((_, i) => i !== index);
    setAnamnesisFlow({ ...anamnesisFlow, linkedPlans: newLinkedPlans });
  };
  
  const toggleTag = (tag: string) => {
    if (planTags.includes(tag)) {
      setPlanTags(planTags.filter(t => t !== tag));
    } else {
      setPlanTags([...planTags, tag]);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate('/admin/anamnese')}
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue">
            Editar Anamnese
          </h1>
          <p className="text-gray-600">
            Personalize o formulário de anamnese para coletar informações relevantes
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
            <CardDescription>
              Configure as informações básicas do formulário
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <Input
                value={anamnesisFlow.title}
                onChange={(e) => setAnamnesisFlow({ ...anamnesisFlow, title: e.target.value })}
                placeholder="Título da anamnese"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <Select
                value={anamnesisFlow.type}
                onValueChange={(value: 'queda-capilar' | 'disfuncao-eretil') => 
                  setAnamnesisFlow({ ...anamnesisFlow, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="queda-capilar">Queda Capilar</SelectItem>
                  <SelectItem value="disfuncao-eretil">Disfunção Erétil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <Textarea
                value={anamnesisFlow.description}
                onChange={(e) => setAnamnesisFlow({ ...anamnesisFlow, description: e.target.value })}
                placeholder="Breve descrição do formulário"
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={anamnesisFlow.active}
                onCheckedChange={(checked) => setAnamnesisFlow({ ...anamnesisFlow, active: checked })}
              />
              <Label htmlFor="active">Ativo</Label>
            </div>
          </CardContent>
        </Card>
        
        {/* Linked Plans */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Planos Vinculados</CardTitle>
              <CardDescription>
                Configure quais planos serão recomendados com base nas respostas
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* List of linked plans */}
              {anamnesisFlow.linkedPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-4 relative"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removePlan(index)}
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </Button>
                  
                  <div className="mb-4">
                    <h3 className="font-medium">{plan.name}</h3>
                    <p className="text-sm text-gray-500">Prioridade: {plan.priority}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Tags ativadoras:</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add new plan form */}
              <div className="border border-dashed border-gray-200 rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Adicionar novo plano</h3>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Selecione o plano</label>
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um plano" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredPlans.map(plan => (
                        <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Prioridade</label>
                  <Input 
                    type="number" 
                    min={1} 
                    max={10} 
                    value={planPriority}
                    onChange={(e) => setPlanPriority(parseInt(e.target.value) || 1)}
                  />
                  <p className="text-xs text-gray-500">Prioridade maior será exibida primeiro caso múltiplas tags sejam ativadas</p>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Tags ativadoras</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant={planTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Selecione as tags que, quando presentes, ativam este plano</p>
                </div>
                
                <Button onClick={addPlan} className="w-full">
                  <Plus size={16} className="mr-2" />
                  Adicionar Plano
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Perguntas</CardTitle>
              <CardDescription>
                Configure as perguntas que serão apresentadas ao paciente
              </CardDescription>
            </div>
            <Button onClick={addQuestion} size="sm">
              <Plus size={16} className="mr-1" />
              Adicionar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {anamnesisFlow.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <GripVertical size={16} className="text-gray-400 mr-2" />
                      <h3 className="font-medium">Pergunta {index + 1}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(index)}
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Texto da pergunta
                      </label>
                      <Input
                        value={question.text}
                        onChange={(e) => updateQuestion(index, { text: e.target.value })}
                        placeholder="Digite a pergunta"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição (opcional)
                      </label>
                      <Input
                        value={question.description || ''}
                        onChange={(e) => updateQuestion(index, { description: e.target.value })}
                        placeholder="Texto adicional de ajuda"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de resposta
                        </label>
                        <Select
                          value={question.type}
                          onValueChange={(value: any) => 
                            updateQuestion(index, { type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Texto livre</SelectItem>
                            <SelectItem value="single_choice">Escolha única</SelectItem>
                            <SelectItem value="multiple_choice">Múltipla escolha</SelectItem>
                            <SelectItem value="image">Imagem</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center">
                        <label className="block text-sm font-medium text-gray-700 mr-2">
                          Obrigatória
                        </label>
                        <input
                          type="checkbox"
                          checked={question.required}
                          onChange={(e) => updateQuestion(index, { required: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300 text-bravo-blue focus:ring-bravo-blue"
                        />
                      </div>
                    </div>
                    
                    {question.type === 'image' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL da imagem
                        </label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={question.imageUrl || ''}
                            onChange={(e) => updateQuestion(index, { imageUrl: e.target.value })}
                            placeholder="https://exemplo.com/imagem.jpg"
                          />
                          <Button variant="outline" size="sm">
                            <ImageIcon size={14} className="mr-1" />
                            Upload
                          </Button>
                        </div>
                        {question.imageUrl && (
                          <div className="mt-2 max-w-sm mx-auto border rounded overflow-hidden">
                            <img 
                              src={question.imageUrl} 
                              alt={question.text} 
                              className="w-full h-auto" 
                            />
                          </div>
                        )}
                      </div>
                    )}
                    
                    {(question.type === 'single_choice' || question.type === 'multiple_choice') && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Opções
                          </label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => addOption(index)}
                          >
                            <Plus size={14} className="mr-1" />
                            Adicionar opção
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {question.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-2">
                              <Input
                                value={option}
                                onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                                placeholder={`Opção ${optionIndex + 1}`}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(index, optionIndex)}
                              >
                                <Trash2 size={14} className="text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Conditional Logic */}
                    {question.type !== 'image' && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Lógica condicional
                          </label>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => addConditionalLogic(index)}>
                                <LinkIcon size={14} className="mr-1" />
                                Adicionar condição
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Adicionar lógica condicional</DialogTitle>
                                <DialogDescription>
                                  Defina regras baseadas nas respostas para atribuir tags
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-4 gap-4 items-center">
                                  <div className="col-span-1">Se resposta</div>
                                  <Select
                                    defaultValue="equals"
                                    className="col-span-1"
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="equals">Igual a</SelectItem>
                                      <SelectItem value="contains">Contém</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  
                                  <Input 
                                    className="col-span-2"
                                    placeholder="Valor"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium mb-2">Atribuir tag</label>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {availableTags.map(tag => (
                                      <Badge 
                                        key={tag}
                                        variant={currentTag === tag ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => setCurrentTag(tag)}
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mt-2">
                                    <Input 
                                      placeholder="Nova tag..." 
                                      value={currentTag} 
                                      onChange={e => setCurrentTag(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <DialogFooter>
                                <Button onClick={() => saveConditionalLogic()}>Adicionar</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        
                        {/* Show existing logic */}
                        {question.conditionalLogic && question.conditionalLogic.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {question.conditionalLogic.map((logic, logicIndex) => (
                              <div key={logicIndex} className="flex items-center gap-2 bg-gray-50 p-2 rounded text-sm">
                                <span>Se resposta</span>
                                <span className="font-medium">{logic.operator === 'equals' ? 'igual a' : 'contém'}</span>
                                <span className="font-medium italic">"{logic.value}"</span>
                                <span>então tag:</span>
                                <Badge>{logic.tag}</Badge>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="ml-auto"
                                  onClick={() => removeConditionalLogic(index, logicIndex)}
                                >
                                  <Trash2 size={14} className="text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-100 pt-4 flex justify-end">
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <Save size={16} className="mr-2" />
              {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnamneseEdit;
