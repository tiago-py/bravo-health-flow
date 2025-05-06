import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type QuestionType = 'text' | 'number' | 'boolean' | 'single-choice' | 'multiple-choice';

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
}

const AdminAnamneseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState<string>('');
  const [questionType, setQuestionType] = useState<QuestionType>('text');
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>('');

  useEffect(() => {
    // Mock data loading based on ID
    if (id === '1') {
      setTitle('Anamnese para Queda Capilar');
      setDescription('Formulário para avaliação inicial de pacientes com queda capilar.');
      setQuestions([
        { id: '1', text: 'Você notou um aumento na queda de cabelo?', type: 'boolean' },
        { id: '2', text: 'Quantos fios de cabelo você perde por dia?', type: 'number' },
        { id: '3', text: 'Você tem histórico familiar de calvície?', type: 'boolean' },
      ]);
    } else if (id === '2') {
      setTitle('Anamnese para Disfunção Erétil');
      setDescription('Formulário para avaliação inicial de pacientes com disfunção erétil.');
      setQuestions([
        { id: '4', text: 'Você tem dificuldades em obter ou manter uma ereção?', type: 'boolean' },
        { id: '5', text: 'Com que frequência você consegue ter uma relação sexual satisfatória?', type: 'text' },
        { id: '6', text: 'Você está tomando alguma medicação?', type: 'boolean' },
      ]);
    }
  }, [id]);

  const addQuestion = () => {
    if (questionText.trim() === '') {
      toast.error('Por favor, insira o texto da pergunta.');
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText,
      type: questionType,
      options: questionType === 'single-choice' || questionType === 'multiple-choice' ? options : undefined,
    };

    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setQuestionType('text');
    setOptions([]);
    setNewOption('');
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const addOption = () => {
    if (newOption.trim() === '') {
      toast.error('Por favor, insira uma opção.');
      return;
    }

    setOptions([...options, newOption]);
    setNewOption('');
  };

  const removeOption = (option: string) => {
    setOptions(options.filter(opt => opt !== option));
  };

  const saveAnamnese = () => {
    toast.success('Anamnese salva com sucesso!');
    navigate('/admin/anamnese');
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">
            Editar Anamnese
          </h1>
          <p className="text-gray-600">
            Edite o formulário de anamnese para os diferentes tipos de tratamento
          </p>
        </div>
        <Button onClick={saveAnamnese}>
          <Save size={16} className="mr-2" />
          Salvar
        </Button>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Informações da Anamnese</CardTitle>
          <CardDescription>
            Atualize as informações gerais do formulário de anamnese.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Título da Anamnese"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descrição da Anamnese"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Perguntas</CardTitle>
          <CardDescription>
            Adicione, edite e remova perguntas do formulário de anamnese.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map(question => (
            <div key={question.id} className="flex items-center justify-between border rounded-md p-4">
              <span>{question.text} ({question.type})</span>
              <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                <Trash2 size={16} className="text-red-500" />
              </Button>
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="question">Nova Pergunta</Label>
            <Input
              id="question"
              placeholder="Texto da Pergunta"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Pergunta</Label>
            <Select 
              defaultValue="text" 
              onValueChange={(value) => setQuestionType(value as QuestionType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo de pergunta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="number">Número</SelectItem>
                <SelectItem value="boolean">Sim/Não</SelectItem>
                <SelectItem value="single-choice">Escolha única</SelectItem>
                <SelectItem value="multiple-choice">Múltipla escolha</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(questionType === 'single-choice' || questionType === 'multiple-choice') && (
            <div className="space-y-2">
              <Label>Opções</Label>
              {options.map(option => (
                <div key={option} className="flex items-center justify-between border rounded-md p-2">
                  <span>{option}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeOption(option)}>
                    <Trash2 size={14} className="text-red-500" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Nova Opção"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
                <Button size="sm" onClick={addOption}>
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          )}

          <Button onClick={addQuestion}>
            <Plus size={16} className="mr-2" />
            Adicionar Pergunta
          </Button>
        </CardContent>
      </Card>

      <Button variant="ghost" asChild>
        <ArrowLeft size={16} className="mr-2" />
        <a href="/admin/anamnese">Voltar</a>
      </Button>
    </div>
  );
};

export default AdminAnamneseEdit;
