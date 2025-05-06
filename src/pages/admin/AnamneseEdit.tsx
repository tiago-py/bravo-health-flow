
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, PlusCircle, XCircle, MoveVertical, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface QuestionProps {
  id: string;
  type: string;
  text: string;
  required: boolean;
  options?: string[];
}

interface StepProps {
  id: string;
  title: string;
  description: string;
  questions: QuestionProps[];
}

const AdminAnamneseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [flowDetails, setFlowDetails] = useState({
    name: '',
    type: '',
    description: '',
    status: '',
    lastUpdated: '',
    createdBy: '',
  });
  const [steps, setSteps] = useState<StepProps[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Mock data for initial load
  useEffect(() => {
    fetchFlowData();
  }, [id]);

  // Simulating API fetch
  const fetchFlowData = async () => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setFlowDetails({
        name: 'Queda Capilar - Principal',
        type: 'queda-capilar',
        description: 'Fluxo principal para avaliação de pacientes com queda capilar',
        status: 'active',
        lastUpdated: '2023-03-10',
        createdBy: 'Admin'
      });

      setSteps([
        {
          id: '1',
          title: 'Informações Pessoais',
          description: 'Dados básicos do paciente',
          questions: [
            {
              id: '1-1',
              type: 'text',
              text: 'Nome completo',
              required: true,
            },
            {
              id: '1-2',
              type: 'date',
              text: 'Data de nascimento',
              required: true,
            }
          ]
        }
      ]);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching flow data:', error);
      toast.error('Erro ao carregar dados do fluxo');
      setIsLoading(false);
    }
  };

  // Handle flow details change
  const handleFlowDetailsChange = (field: string, value: string) => {
    setFlowDetails({
      ...flowDetails,
      [field]: value,
    });
  };
  
  // Add new step
  const addStep = () => {
    const newStep = {
      id: `${steps.length + 1}`,
      title: `Nova Etapa ${steps.length + 1}`,
      description: 'Descrição da etapa',
      questions: [],
    };
    
    setSteps([...steps, newStep]);
    setCurrentStepIndex(steps.length);
  };
  
  // Update step details
  const updateStepDetails = (field: string, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[currentStepIndex] = {
      ...updatedSteps[currentStepIndex],
      [field]: value,
    };
    setSteps(updatedSteps);
  };
  
  // Add new question to current step
  const addQuestion = () => {
    const updatedSteps = [...steps];
    const currentStep = updatedSteps[currentStepIndex];
    
    const newQuestion = {
      id: `${currentStep.id}-${currentStep.questions.length + 1}`,
      type: 'text',
      text: 'Nova pergunta',
      required: false,
    };
    
    currentStep.questions.push(newQuestion);
    setSteps(updatedSteps);
  };
  
  // Update question
  const updateQuestion = (questionIndex: number, field: string, value: any) => {
    const updatedSteps = [...steps];
    const question = updatedSteps[currentStepIndex].questions[questionIndex];
    
    if (field === 'type' && question.type !== value) {
      // Reset options when changing question type
      question.options = value === 'multiple_choice' || value === 'single_choice' ? ['Opção 1'] : undefined;
    }
    
    question[field as keyof QuestionProps] = value;
    setSteps(updatedSteps);
  };
  
  // Add option to multiple choice question
  const addOptionToQuestion = (questionIndex: number) => {
    const updatedSteps = [...steps];
    const question = updatedSteps[currentStepIndex].questions[questionIndex];
    
    if (!question.options) {
      question.options = [];
    }
    
    question.options.push(`Opção ${question.options.length + 1}`);
    setSteps(updatedSteps);
  };
  
  // Update option text
  const updateOptionText = (questionIndex: number, optionIndex: number, text: string) => {
    const updatedSteps = [...steps];
    const question = updatedSteps[currentStepIndex].questions[questionIndex];
    
    if (question.options) {
      question.options[optionIndex] = text;
      setSteps(updatedSteps);
    }
  };
  
  // Remove option
  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updatedSteps = [...steps];
    const question = updatedSteps[currentStepIndex].questions[questionIndex];
    
    if (question.options && question.options.length > 1) {
      question.options.splice(optionIndex, 1);
      setSteps(updatedSteps);
    } else {
      toast.error('Você deve ter pelo menos uma opção.');
    }
  };
  
  // Remove question
  const removeQuestion = (questionIndex: number) => {
    const updatedSteps = [...steps];
    updatedSteps[currentStepIndex].questions.splice(questionIndex, 1);
    setSteps(updatedSteps);
  };
  
  // Remove step
  const removeStep = (stepIndex: number) => {
    if (steps.length <= 1) {
      toast.error('Você deve ter pelo menos uma etapa.');
      return;
    }
    
    const updatedSteps = [...steps];
    updatedSteps.splice(stepIndex, 1);
    setSteps(updatedSteps);
    
    // Adjust current step index if needed
    if (currentStepIndex >= updatedSteps.length) {
      setCurrentStepIndex(updatedSteps.length - 1);
    }
  };
  
  // Save changes
  const saveChanges = () => {
    // Validate flow details
    if (!flowDetails.name || !flowDetails.type) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Validate each step has a title
    const invalidStep = steps.find(step => !step.title);
    if (invalidStep) {
      toast.error('Todas as etapas devem ter um título.');
      return;
    }
    
    // Validate each step has at least one question
    const emptyStep = steps.find(step => step.questions.length === 0);
    if (emptyStep) {
      toast.error(`A etapa "${emptyStep.title}" não tem perguntas.`);
      return;
    }
    
    // In a real app, this would send an API request
    toast.success('Alterações salvas com sucesso!');
    
    // Navigate back to the list
    setTimeout(() => {
      navigate('/admin/anamnese');
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bravo-blue mb-4 mx-auto"></div>
          <p className="text-gray-500">Carregando fluxo de anamnese...</p>
        </div>
      </div>
    );
  }

  const Question = ({ question, index }: { question: QuestionProps, index: number }) => (
    <div className="border border-gray-200 rounded-md p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <MoveVertical className="h-4 w-4 text-gray-500 mr-2 cursor-move" />
          <span className="text-sm font-medium">Pergunta {index + 1}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-500"
          onClick={() => removeQuestion(index)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remover pergunta</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label>Texto da pergunta</Label>
          <Input
            value={question.text}
            onChange={(e) => updateQuestion(index, 'text', e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <Label>Tipo de pergunta</Label>
            <Select
              value={question.type}
              onValueChange={(value) => updateQuestion(index, 'type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="textarea">Texto longo</SelectItem>
                <SelectItem value="number">Número</SelectItem>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="yes_no">Sim/Não</SelectItem>
                <SelectItem value="single_choice">Múltipla escolha (única)</SelectItem>
                <SelectItem value="multiple_choice">Múltipla escolha (várias)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor={`required-${question.id}`} className="text-sm">
              Obrigatória
            </Label>
            <Switch
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={(checked) => updateQuestion(index, 'required', checked)}
            />
          </div>
        </div>
        
        {/* Options for multiple/single choice questions */}
        {(question.type === 'multiple_choice' || question.type === 'single_choice') && (
          <div className="mt-4">
            <Label>Opções</Label>
            <div className="space-y-2 mt-2">
              {question.options?.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  {question.type === 'single_choice' ? (
                    <div className="h-4 w-4 rounded-full border border-gray-300" />
                  ) : (
                    <div className="h-4 w-4 border border-gray-300 rounded-sm" />
                  )}
                  <Input
                    value={option}
                    onChange={(e) => updateOptionText(index, optionIndex, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-500"
                    onClick={() => removeOption(index, optionIndex)}
                  >
                    <XCircle className="h-4 w-4" />
                    <span className="sr-only">Remover opção</span>
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => addOptionToQuestion(index)}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Adicionar opção
            </Button>
          </div>
        )}
      </div>
    </div>
  );

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
        <div className="flex-1">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-bravo-blue">
              Editar Fluxo de Anamnese
            </h1>
            <Badge 
              className={flowDetails.status === 'active' ? 'ml-3 bg-green-100 text-green-800' : 'ml-3'} 
              variant="outline"
            >
              {flowDetails.status === 'active' ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
          <p className="text-gray-600 mt-1">
            Última atualização em {new Date(flowDetails.lastUpdated).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Flow Details */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Fluxo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="flow-name">Nome do fluxo</Label>
              <Input
                id="flow-name"
                value={flowDetails.name}
                onChange={(e) => handleFlowDetailsChange('name', e.target.value)}
                placeholder="Ex: Queda Capilar - Principal"
              />
            </div>
            
            <div>
              <Label htmlFor="flow-type">Tipo de tratamento</Label>
              <Select
                value={flowDetails.type}
                onValueChange={(value) => handleFlowDetailsChange('type', value)}
              >
                <SelectTrigger id="flow-type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="queda-capilar">Queda Capilar</SelectItem>
                  <SelectItem value="disfuncao-eretil">Disfunção Erétil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="flow-description">Descrição (opcional)</Label>
              <Textarea
                id="flow-description"
                value={flowDetails.description}
                onChange={(e) => handleFlowDetailsChange('description', e.target.value)}
                placeholder="Breve descrição do fluxo de anamnese"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Steps Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Etapas da Anamnese</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={currentStepIndex.toString()}
              onValueChange={(value) => setCurrentStepIndex(parseInt(value))}
              className="w-full"
            >
              <div className="flex items-center space-x-4 mb-4">
                <TabsList className="flex-1 overflow-x-auto">
                  {steps.map((step, index) => (
                    <TabsTrigger
                      key={step.id}
                      value={index.toString()}
                      className="flex items-center whitespace-nowrap"
                    >
                      <span>Etapa {index + 1}</span>
                      {steps.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 ml-1 text-gray-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeStep(index);
                          }}
                        >
                          <XCircle className="h-3 w-3" />
                          <span className="sr-only">Remover etapa</span>
                        </Button>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <Button size="sm" variant="outline" onClick={addStep}>
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Nova etapa
                </Button>
              </div>
              
              {steps.map((step, stepIndex) => (
                <TabsContent key={step.id} value={stepIndex.toString()}>
                  <div className="space-y-4">
                    {/* Step Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label htmlFor={`step-title-${step.id}`}>Título da etapa</Label>
                        <Input
                          id={`step-title-${step.id}`}
                          value={step.title}
                          onChange={(e) => updateStepDetails('title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`step-desc-${step.id}`}>Descrição da etapa</Label>
                        <Input
                          id={`step-desc-${step.id}`}
                          value={step.description}
                          onChange={(e) => updateStepDetails('description', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Questions */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Perguntas</h3>
                        <Button size="sm" onClick={addQuestion}>
                          <PlusCircle className="h-4 w-4 mr-1" />
                          Nova pergunta
                        </Button>
                      </div>
                      
                      {step.questions.length > 0 ? (
                        <div>
                          {step.questions.map((question, questionIndex) => (
                            <Question
                              key={question.id}
                              question={question}
                              index={questionIndex}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
                          <p className="text-gray-500">Nenhuma pergunta adicionada.</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={addQuestion}
                          >
                            <PlusCircle className="h-4 w-4 mr-1" />
                            Adicionar pergunta
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/anamnese')}
          >
            Cancelar
          </Button>
          <Button onClick={saveChanges}>
            Salvar alterações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminAnamneseEdit;
