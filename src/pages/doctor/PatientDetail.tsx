
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Calendar, CheckSquare } from 'lucide-react';

const DoctorPatientDetail = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  
  const [observations, setObservations] = useState('');
  const [prescription, setPrescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock patient data
  const patient = {
    id,
    name: 'João Silva',
    age: 32,
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    date: '2023-03-25T14:30:00',
    type: 'queda-capilar',
    answers: [
      {
        question: 'Há quanto tempo você percebeu a queda capilar?',
        answer: 'Entre 1 e 3 anos'
      },
      {
        question: 'Como você classificaria seu padrão de queda?',
        answer: 'Entradas (recuo da linha frontal)'
      },
      {
        question: 'Existe histórico de calvície na sua família?',
        answer: 'Sim, do lado paterno'
      },
      {
        question: 'Já realizou algum tratamento para queda capilar anteriormente?',
        answer: 'Tentei usar minoxidil por conta própria por cerca de 2 meses, mas não tive paciência para continuar.'
      },
      {
        question: 'Você tem alguma alergia?',
        answer: 'Não'
      },
      {
        question: 'Você tem alguma condição médica?',
        answer: 'Não'
      },
      {
        question: 'Medicamentos que utiliza atualmente',
        answer: 'Nenhum'
      },
      {
        question: 'Você fuma?',
        answer: 'Ocasionalmente'
      },
      {
        question: 'Consumo de álcool',
        answer: 'Semanalmente'
      },
      {
        question: 'Frequência de atividade física',
        answer: 'Leve (1-2 dias por semana)'
      },
      {
        question: 'Quais são suas expectativas com o tratamento?',
        answer: 'Gostaria de impedir o avanço da calvície e, se possível, recuperar um pouco dos fios nas entradas.'
      },
      {
        question: 'Você tem alguma preocupação ou dúvida específica?',
        answer: 'Estou preocupado com possíveis efeitos colaterais da finasterida.'
      }
    ],
    personalInfo: {
      birthdate: '1990-05-10',
      height: '178',
      weight: '75',
    },
    previousEvaluations: []
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!observations || !prescription) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Avaliação concluída com sucesso!');
      
      // Redirect back to dashboard
      setTimeout(() => {
        navigate('/medico/dashboard');
      }, 1500);
    } catch (error) {
      toast.error('Erro ao salvar avaliação. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue">
            Avaliação do Paciente
          </h1>
          <p className="text-gray-600">
            Revise as informações e forneça uma prescrição
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Paciente</CardTitle>
              <CardDescription>
                Dados pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nome</h3>
                <p className="font-medium">{patient.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Idade</h3>
                <p className="font-medium">{patient.age} anos</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data de nascimento</h3>
                <p className="font-medium">{new Date(patient.personalInfo.birthdate).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">E-mail</h3>
                <p className="font-medium">{patient.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Telefone</h3>
                <p className="font-medium">{patient.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Altura</h3>
                <p className="font-medium">{patient.personalInfo.height} cm</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Peso</h3>
                <p className="font-medium">{patient.personalInfo.weight} kg</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data da anamnese</h3>
                <p className="font-medium">{new Date(patient.date).toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tipo de tratamento</h3>
                <p className="font-medium">
                  {patient.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {/* Anamnesis Answers */}
          <Card>
            <CardHeader>
              <CardTitle>Respostas da Anamnese</CardTitle>
              <CardDescription>
                Respostas fornecidas pelo paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.answers.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-1">{item.question}</h3>
                    <p className="text-gray-900">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Medical Evaluation */}
          <Card>
            <CardHeader>
              <CardTitle>Avaliação Médica</CardTitle>
              <CardDescription>
                Forneça suas observações e prescrição
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="evaluation">
                <TabsList className="mb-4">
                  <TabsTrigger value="evaluation">Avaliação</TabsTrigger>
                  {patient.previousEvaluations.length > 0 && (
                    <TabsTrigger value="history">Histórico</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="evaluation" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações médicas
                    </label>
                    <Textarea
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      placeholder="Digite suas observações sobre o caso..."
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prescrição sugerida
                    </label>
                    <Textarea
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      placeholder="Digite a prescrição detalhada para o paciente..."
                      rows={6}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Inclua nome dos medicamentos, dosagens, frequência e outras orientações relevantes.
                    </p>
                  </div>
                </TabsContent>
                
                {patient.previousEvaluations.length > 0 && (
                  <TabsContent value="history" className="space-y-4">
                    {patient.previousEvaluations.map((evaluation, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar size={14} className="mr-1" />
                          <span>{new Date(evaluation.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="mb-3">
                          <h4 className="font-medium text-sm text-gray-700">Observações:</h4>
                          <p className="text-gray-900 mt-1">{evaluation.observations}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-700">Prescrição:</h4>
                          <p className="text-gray-900 mt-1">{evaluation.prescription}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4 flex justify-end">
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <CheckSquare size={16} className="mr-2" />
                {isSubmitting ? 'Salvando...' : 'Finalizar avaliação'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDetail;
