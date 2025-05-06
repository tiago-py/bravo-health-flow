
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Trash2, 
  GripVertical, 
  ArrowLeft, 
  Save,
  CheckCircle,
  Image as ImageIcon,
  Link as LinkIcon
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConditionalLogic {
  questionId: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
  tag: string;
}

type QuestionType = 'text' | 'radio' | 'checkbox' | 'select' | 'textarea' | 'image';

interface AnamneseQuestion {
  id: string;
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  description?: string;
  imageUrl?: string;
  conditionalLogic?: ConditionalLogic[];
}

interface LinkedPlan {
  planId: string;
  name: string;
  tags: string[];
  priority: number;
}

interface AnamneseFlow {
  title: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  description: string;
  active: boolean;
  questions: AnamneseQuestion[];
  linkedPlans: LinkedPlan[];
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

const AdminAnamneseCreate = () => {
  const navigate = useNavigate();
  
  // Initial anamnese flow state
  const [anamneseFlow, setAnamneseFlow] = useState<AnamneseFlow>({
    title: '',
    type: 'queda-capilar',
    description: '',
    active: true,
    linkedPlans: [],
    questions: [
      {
        id: '1',
        question: '',
        type: 'text',
        required: true,
        options: [],
        conditionalLogic: []
      }
    ]
  });
  
  // Tags state
  const [availableTags, setAvailableTags] = useState<string[]>(['queda_leve', 'queda_moderada', 'queda_severa', 'iniciante', 'avancado']);
  const [currentQuestionWithLogic, setCurrentQuestionWithLogic] = useState<AnamneseQuestion | null>(null);
  const [currentTag, setCurrentTag] = useState('');
  
  // Plan linking state
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [planTags, setPlanTags] = useState<string[]>([]);
  const [planPriority, setPlanPriority] = useState<number>(1);
  
  // Handle change to flow details
  const handleFlowChange = (field: keyof Omit<AnamneseFlow, 'questions' | 'linkedPlans'>, value: any) => {
    setAnamneseFlow(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle change to question
  const handleQuestionChange = (questionId: string, field: keyof AnamneseQuestion, value: any) => {
    setAnamneseFlow(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            [field]: value
          };
        }
        return q;
      })
    }));
  };
  
  // Add new option to a question
  const addOption = (questionId: string) => {
    setAnamneseFlow(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [...(q.options || []), '']
          };
        }
        return q;
      })
    }));
  };
  
  // Update an option for a question
  const handleOptionChange = (questionId: string, optionIndex: number, value: string) => {
    setAnamneseFlow(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return {
            ...q,
            options: newOptions
          };
        }
        return q;
      })
    }));
  };
  
  // Remove an option from a question
  const removeOption = (questionId: string, optionIndex: number) => {
    setAnamneseFlow(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId && q.options) {
          return {
            ...q,
            options: q.options.filter((_, i) => i !== optionIndex)
          };
        }
        return q;
      })
    }));
  };
  
  // Add new question
  const addQuestion = () => {
    const newQuestionId = (anamneseFlow.questions.length + 1).toString();
    setAnamneseFlow(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: newQuestionId,
          question: '',
          type: 'text',
          required: true,
          options: [],
          conditionalLogic: []
        }
      ]
    }));
  };
  
  // Remove a question
  const removeQuestion = (questionId: string) => {
    if (anamneseFlow.questions.length === 1) {
      toast.error('É necessário ter pelo menos uma pergunta no fluxo.');
      return;
    }
    
    setAnamneseFlow(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };
  
  // Add conditional logic to a question
  const addConditionalLogic = (questionId: string) => {
    const question = anamneseFlow.questions.find(q => q.id === questionId);
    if (question) {
      setCurrentQuestionWithLogic(question);
    }
  };
  
  // Save conditional logic
  const saveConditionalLogic = () => {
    if (!currentQuestionWithLogic || !currentTag) return;
    
    setAnamneseFlow(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === currentQuestionWithLogic.id) {
          const newLogic: ConditionalLogic = {
            questionId: currentQuestionWithLogic.id,
            operator: 'equals',
            value: currentQuestionWithLogic.type === 'radio' && currentQuestionWithLogic.options ? 
                   currentQuestionWithLogic.options[0] : '',
            tag: currentTag
          };
          
          return {
            ...q,
            conditionalLogic: [...(q.conditionalLogic || []), newLogic]
          };
        }
        return q;
      })
    }));
    
    setCurrentQuestionWithLogic(null);
    setCurrentTag('');
  };
  
  // Remove conditional logic
  const removeConditionalLogic = (questionId: string, logicIndex: number) => {
    setAnamneseFlow(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId && q.conditionalLogic) {
          return {
            ...q,
            conditionalLogic: q.conditionalLogic.filter((_, i) => i !== logicIndex)
          };
        }
        return q;
      })
    }));
  };
  
  // Add plan to linked plans
  const addPlan = () => {
    if (!selectedPlan || planTags.length === 0) {
      toast.error('Selecione um plano e pelo menos uma tag para vinculá-lo');
      return;
    }
    
    const planToAdd = mockTreatmentPlans.find(p => p.id === selectedPlan);
    if (!planToAdd) return;
    
    const newLinkedPlan: LinkedPlan = {
      planId: selectedPlan,
      name: planToAdd.name,
      tags: [...planTags],
      priority: planPriority
    };
    
    setAnamneseFlow(prev => ({
      ...prev,
      linkedPlans: [...prev.linkedPlans, newLinkedPlan]
    }));
    
    // Reset form
    setSelectedPlan("");
    setPlanTags([]);
    setPlanPriority(1);
  };
  
  // Remove linked plan
  const removePlan = (index: number) => {
    setAnamneseFlow(prev => ({
      ...prev,
      linkedPlans: prev.linkedPlans.filter((_, i) => i !== index)
    }));
  };
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (planTags.includes(tag)) {
      setPlanTags(planTags.filter(t => t !== tag));
    } else {
      setPlanTags([...planTags, tag]);
    }
  };
  
  // Save anamnese flow
  const saveFlow = (publish: boolean = false) => {
    // Validate required fields
    if (!anamneseFlow.title) {
      toast.error('Informe um título para o fluxo de anamnese.');
      return;
    }
    
    if (!anamneseFlow.description) {
      toast.error('Informe uma descrição para o fluxo de anamnese.');
      return;
    }
    
    // Validate questions
    const invalidQuestions = anamneseFlow.questions.filter(q => !q.question);
    if (invalidQuestions.length > 0) {
      toast.error(`Preencha o texto das perguntas ${invalidQuestions.map(q => q.id).join(', ')}.`);
      return;
    }
    
    // Validate options for questions that need them
    const invalidOptions = anamneseFlow.questions.filter(q => 
      ['radio', 'checkbox', 'select'].includes(q.type) && 
      (!q.options || q.options.length < 2 || q.options.some(o => !o))
    );
    
    if (invalidOptions.length > 0) {
      toast.error(`Adicione pelo menos duas opções válidas para as perguntas do tipo múltipla escolha.`);
      return;
    }
    
    // In a real app, this would send an API request
    if (publish) {
      toast.success('Fluxo de anamnese salvo e publicado com sucesso!');
    } else {
      toast.success('Fluxo de anamnese salvo como rascunho!');
    }
    
    // Redirect to anamnese list
    navigate('/admin/anamnese');
  };
  
  // Filter plans based on selected type
  const filteredPlans = mockTreatmentPlans.filter(plan => plan.type === anamneseFlow.type);
  
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
            Novo Fluxo de Anamnese
          </h1>
          <p className="text-gray-600">
            Crie um novo fluxo de anamnese para seus pacientes
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Flow Details */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Fluxo</CardTitle>
            <CardDescription>
              Defina as informações básicas do fluxo de anamnese
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do fluxo*</Label>
                <Input
                  id="title"
                  value={anamneseFlow.title}
                  onChange={(e) => handleFlowChange('title', e.target.value)}
                  placeholder="Ex: Anamnese completa - Queda Capilar"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de tratamento*</Label>
                <Select
                  value={anamneseFlow.type}
                  onValueChange={(value) => handleFlowChange('type', value as 'queda-capilar' | 'disfuncao-eretil')}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo de tratamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="queda-capilar">Queda Capilar</SelectItem>
                    <SelectItem value="disfuncao-eretil">Disfunção Erétil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição do fluxo*</Label>
              <Textarea
                id="description"
                value={anamneseFlow.description}
                onChange={(e) => handleFlowChange('description', e.target.value)}
                placeholder="Descreva brevemente o objetivo deste fluxo de anamnese"
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={anamneseFlow.active}
                onCheckedChange={(checked) => handleFlowChange('active', checked)}
              />
              <Label htmlFor="active">Ativo</Label>
            </div>
          </CardContent>
        </Card>
        
        {/* Linked Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Planos Vinculados</CardTitle>
            <CardDescription>
              Configure os planos de tratamento que serão recomendados com base nas respostas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* List of linked plans */}
            {anamneseFlow.linkedPlans.map((plan, index) => (
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
                <Label>Selecione o plano</Label>
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
                <Label>Prioridade</Label>
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
                <Label>Tags ativadoras</Label>
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
                <PlusCircle size={16} className="mr-2" />
                Adicionar Plano
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Questions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Perguntas</CardTitle>
                <CardDescription>
                  Adicione as perguntas que serão feitas ao paciente
                </CardDescription>
              </div>
              <Button onClick={addQuestion}>
                <PlusCircle size={16} className="mr-2" />
                Adicionar Pergunta
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {anamneseFlow.questions.map((question, index) => (
              <Card key={question.id} className="border-dashed">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <GripVertical className="h-5 w-5 text-gray-400 mr-2" />
                      <CardTitle className="text-base">Pergunta {index + 1}</CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => removeQuestion(question.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-3 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`question-${question.id}`}>Texto da pergunta*</Label>
                    <Input
                      id={`question-${question.id}`}
                      value={question.question}
                      onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                      placeholder="Ex: Há quanto tempo você percebeu a queda capilar?"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`type-${question.id}`}>Tipo de resposta*</Label>
                      <Select
                        value={question.type}
                        onValueChange={(value) => handleQuestionChange(question.id, 'type', value as QuestionType)}
                      >
                        <SelectTrigger id={`type-${question.id}`}>
                          <SelectValue placeholder="Selecione o tipo de resposta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Texto curto</SelectItem>
                          <SelectItem value="textarea">Texto longo</SelectItem>
                          <SelectItem value="radio">Múltipla escolha (uma resposta)</SelectItem>
                          <SelectItem value="checkbox">Múltipla escolha (várias respostas)</SelectItem>
                          <SelectItem value="select">Lista suspensa</SelectItem>
                          <SelectItem value="image">Imagem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${question.id}`}>Descrição (opcional)</Label>
                      <Input
                        id={`description-${question.id}`}
                        value={question.description || ''}
                        onChange={(e) => handleQuestionChange(question.id, 'description', e.target.value)}
                        placeholder="Texto de ajuda para explicar a pergunta"
                      />
                    </div>
                  </div>
                  
                  {question.type === 'image' && (
                    <div className="space-y-2">
                      <Label htmlFor={`imageUrl-${question.id}`}>URL da imagem</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`imageUrl-${question.id}`}
                          value={question.imageUrl || ''}
                          onChange={(e) => handleQuestionChange(question.id, 'imageUrl', e.target.value)}
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
                            alt={question.question} 
                            className="w-full h-auto" 
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {question.type !== 'image' && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`required-${question.id}`}
                        checked={question.required}
                        onCheckedChange={(checked) => handleQuestionChange(question.id, 'required', checked)}
                      />
                      <Label htmlFor={`required-${question.id}`}>
                        Resposta obrigatória
                      </Label>
                    </div>
                  )}
                  
                  {/* Options for radio, checkbox, select */}
                  {['radio', 'checkbox', 'select'].includes(question.type) && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Opções de resposta*</Label>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => addOption(question.id)}
                        >
                          <PlusCircle size={14} className="mr-1" />
                          Adicionar opção
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {(question.options || []).map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <Input
                              value={option}
                              onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                              placeholder={`Opção ${optionIndex + 1}`}
                              className="flex-1"
                            />
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => removeOption(question.id, optionIndex)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))}
                        
                        {(!question.options || question.options.length < 2) && (
                          <p className="text-xs text-red-600">
                            Adicione pelo menos duas opções para este tipo de pergunta.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Conditional Logic */}
                  {question.type !== 'image' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Lógica condicional</Label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => addConditionalLogic(question.id)}>
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
                                <Label className="block mb-2">Atribuir tag</Label>
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
                                onClick={() => removeConditionalLogic(question.id, logicIndex)}
                              >
                                <Trash2 size={14} className="text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <CardFooter className="border-t border-gray-100 pt-4 flex justify-between">
            <Button variant="outline" onClick={() => navigate('/admin/anamnese')}>
              Cancelar
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => saveFlow(false)}>
                <Save size={16} className="mr-2" />
                Salvar Rascunho
              </Button>
              <Button onClick={() => saveFlow(true)}>
                <CheckCircle size={16} className="mr-2" />
                Salvar e Publicar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnamneseCreate;
