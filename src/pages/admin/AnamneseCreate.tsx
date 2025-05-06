
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
import { 
  PlusCircle, 
  Trash2, 
  GripVertical, 
  ArrowLeft, 
  Save,
  CheckCircle
} from 'lucide-react';

type QuestionType = 'text' | 'radio' | 'checkbox' | 'select' | 'textarea';

interface AnamneseQuestion {
  id: string;
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  description?: string;
}

interface AnamneseFlow {
  title: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  description: string;
  questions: AnamneseQuestion[];
}

const AdminAnamneseCreate = () => {
  const navigate = useNavigate();
  
  // Initial anamnese flow state
  const [anamneseFlow, setAnamneseFlow] = useState<AnamneseFlow>({
    title: '',
    type: 'queda-capilar',
    description: '',
    questions: [
      {
        id: '1',
        question: '',
        type: 'text',
        required: true,
        options: []
      }
    ]
  });
  
  // Handle change to flow details
  const handleFlowChange = (field: keyof Omit<AnamneseFlow, 'questions'>, value: string) => {
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
          options: []
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
