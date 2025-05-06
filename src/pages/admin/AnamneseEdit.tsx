
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Save, Plus, Eye } from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Import custom components
import { QuestionEditor } from '@/components/anamnese/QuestionEditor';
import { SortableQuestion } from '@/components/anamnese/SortableQuestion';
import { DraggableQuestion } from '@/components/anamnese/DraggableQuestion';
import { AnamnesePreview } from '@/components/anamnese/AnamnesePreview';

type QuestionType = 'text' | 'number' | 'boolean' | 'single-choice' | 'multiple-choice';

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  imageUrl?: string;
  imageSize?: 'small' | 'medium' | 'large';
}

interface LinkedPlan {
  planId: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
}

const AdminAnamneseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>();
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [linkedPlans, setLinkedPlans] = useState<LinkedPlan[]>([]);

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
      setLinkedPlans([
        {
          planId: '1',
          name: 'Plano Básico - Queda Capilar',
          price: 99.90,
          description: 'Tratamento inicial para queda leve de cabelo',
          tags: ['queda_leve', 'iniciante']
        },
        {
          planId: '2',
          name: 'Plano Premium - Queda Capilar',
          price: 199.90,
          description: 'Tratamento avançado para queda severa de cabelo',
          tags: ['queda_severa', 'avancado']
        }
      ]);
    } else if (id === '2') {
      setTitle('Anamnese para Disfunção Erétil');
      setDescription('Formulário para avaliação inicial de pacientes com disfunção erétil.');
      setQuestions([
        { id: '4', text: 'Você tem dificuldades em obter ou manter uma ereção?', type: 'boolean' },
        { id: '5', text: 'Com que frequência você consegue ter uma relação sexual satisfatória?', type: 'text' },
        { id: '6', text: 'Você está tomando alguma medicação?', type: 'boolean' },
      ]);
      setLinkedPlans([
        {
          planId: '3',
          name: 'Plano Básico - Disfunção Erétil',
          price: 129.90,
          description: 'Tratamento inicial para disfunção leve',
          tags: ['disfuncao_leve']
        },
        {
          planId: '4',
          name: 'Plano Premium - Disfunção Erétil',
          price: 249.90,
          description: 'Tratamento completo para casos moderados e severos',
          tags: ['disfuncao_severa', 'disfuncao_moderada']
        }
      ]);
    }
  }, [id]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setQuestions((questions) => {
        const oldIndex = questions.findIndex((q) => q.id === active.id);
        const newIndex = questions.findIndex((q) => q.id === over.id);
        
        return arrayMove(questions, oldIndex, newIndex);
      });
    }
    
    setActiveId(null);
  };

  const addQuestion = () => {
    setCurrentQuestion(undefined);
    setIsEditing(true);
  };

  const editQuestion = (id: string) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      setCurrentQuestion(question);
      setIsEditing(true);
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(question => question.id !== id));
    toast.success('Pergunta removida com sucesso');
  };

  const saveQuestion = (question: Question) => {
    if (currentQuestion) {
      // Edit existing question
      setQuestions(questions.map(q => 
        q.id === question.id ? question : q
      ));
      toast.success('Pergunta atualizada com sucesso');
    } else {
      // Add new question
      setQuestions([...questions, question]);
      toast.success('Pergunta adicionada com sucesso');
    }
    setIsEditing(false);
  };

  const saveAnamnese = () => {
    // Validation
    if (!title.trim()) {
      toast.error('Por favor, insira um título para a anamnese');
      return;
    }
    
    if (!description.trim()) {
      toast.error('Por favor, insira uma descrição para a anamnese');
      return;
    }
    
    if (questions.length === 0) {
      toast.error('Por favor, adicione pelo menos uma pergunta');
      return;
    }
    
    // Save logic would go here
    toast.success('Anamnese salva com sucesso!');
    navigate('/admin/anamnese');
  };

  const previewQuestion = (id: string) => {
    // In a real app, you might want to show a preview of just this question
    // For now, we'll just open the full preview
    setIsPreviewOpen(true);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">
            Editar Anamnese
          </h1>
          <p className="text-gray-600">
            Edite o formulário de anamnese para os diferentes tipos de tratamento
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
          <Button onClick={saveAnamnese}>
            <Save size={16} className="mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      {isEditing ? (
        <QuestionEditor 
          question={currentQuestion} 
          onSave={saveQuestion} 
          onCancel={() => setIsEditing(false)} 
        />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <Card className="shadow-sm">
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

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Perguntas</span>
                <Button onClick={addQuestion}>
                  <Plus size={16} className="mr-2" />
                  Adicionar Pergunta
                </Button>
              </CardTitle>
              <CardDescription>
                Arraste e solte para reorganizar as perguntas do formulário de anamnese.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={questions.map(q => q.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {questions.map((question) => (
                      <SortableQuestion
                        key={question.id}
                        id={question.id}
                        question={question}
                        onRemove={removeQuestion}
                        onEdit={editQuestion}
                        onPreview={previewQuestion}
                      />
                    ))}
                  </div>
                </SortableContext>

                <DragOverlay>
                  {activeId ? (
                    <DraggableQuestion
                      id={activeId}
                      question={questions.find(q => q.id === activeId)!}
                      onRemove={removeQuestion}
                      onEdit={editQuestion}
                      onPreview={previewQuestion}
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>

              {questions.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-md">
                  <p className="text-gray-500">Nenhuma pergunta adicionada ainda</p>
                  <Button 
                    variant="outline" 
                    onClick={addQuestion} 
                    className="mt-2"
                  >
                    <Plus size={16} className="mr-2" />
                    Adicionar Pergunta
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-4">
        <Button variant="ghost" onClick={() => navigate('/admin/anamnese')}>
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Button>
      </div>

      {/* Preview Modal */}
      <AnamnesePreview
        flow={{
          id: id || '1',
          title,
          description,
          questions
        }}
        linkedPlans={linkedPlans}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default AdminAnamneseEdit;
