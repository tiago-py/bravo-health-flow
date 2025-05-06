
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Plus, GripVertical } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Define types for our anamnesis form
interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple_choice' | 'single_choice';
  options?: string[];
  required: boolean;
}

interface AnamnesisFlow {
  id: string;
  title: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  description: string;
  questions: Question[];
}

const AdminAnamneseEdit = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  
  // Mock data for an existing anamnesis flow
  const [anamnesisFlow, setAnamnesisFlow] = useState<AnamnesisFlow>({
    id: id || '1',
    title: 'Anamnese para Queda Capilar',
    type: 'queda-capilar',
    description: 'Formulário para avaliação inicial de pacientes com queda capilar.',
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
        required: true
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
        required: true
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
        required: true
      },
      {
        id: '4',
        text: 'Já realizou algum tratamento para queda capilar anteriormente?',
        type: 'text',
        required: false
      }
    ]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      required: false
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
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de resposta
                        </label>
                        <Select
                          value={question.type}
                          onValueChange={(value: 'text' | 'multiple_choice' | 'single_choice') => 
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
