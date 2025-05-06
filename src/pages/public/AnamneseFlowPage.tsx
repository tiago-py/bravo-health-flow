
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Check, CircleAlert, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Question {
  id: string;
  text: string;
  type: string;
  required: boolean;
  options?: string[];
  imageUrl?: string;
  description?: string;
}

interface Anamnese {
  id: string;
  title: string;
  questions: Question[];
}

interface Answer {
  questionId: string;
  value: string | string[];
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  features: string[];
  imageUrl?: string;
  recommendedDuration?: string;
}

const AnamneseFlowPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    height: '',
    weight: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<Plan | null>(null);
  const [alternativePlans, setAlternativePlans] = useState<Plan[]>([]);
  
  // Mock anamnese data based on type
  const anamnese: Anamnese = {
    id: '1',
    title: type === 'queda-capilar' ? 'Anamnese para Queda Capilar' : 'Anamnese para Disfunção Erétil',
    questions: [
      {
        id: '1',
        text: 'Informações Pessoais',
        type: 'personal_info',
        required: true
      },
      ...(type === 'queda-capilar' ? [
        {
          id: '2',
          text: 'Há quanto tempo você percebeu a queda capilar?',
          type: 'radio',
          required: true,
          options: [
            'Menos de 6 meses',
            'Entre 6 meses e 1 ano',
            'Entre 1 e 3 anos',
            'Mais de 3 anos'
          ]
        },
        {
          id: '3',
          text: 'Padrões comuns de queda capilar:',
          type: 'image',
          required: false,
          imageUrl: 'https://images.squarespace-cdn.com/content/v1/5c6974cdf4e5310786e5f1d7/1632468649186-28XYLTJ3JX3DWCSIMK81/norwood_scale.jpg',
          description: 'Identifique seu padrão de queda na imagem acima.'
        },
        {
          id: '4',
          text: 'Como você classificaria seu padrão de queda?',
          type: 'checkbox',
          required: true,
          options: [
            'Entradas (recuo da linha frontal)',
            'Coroa (parte superior da cabeça)',
            'Difusa (por toda a cabeça)',
            'Circular (áreas específicas)'
          ]
        },
        {
          id: '5',
          text: 'Existe histórico de calvície na sua família?',
          type: 'radio',
          required: true,
          options: [
            'Sim, do lado paterno',
            'Sim, do lado materno',
            'Sim, ambos os lados',
            'Não'
          ]
        },
        {
          id: '6',
          text: 'Já realizou algum tratamento para queda capilar anteriormente?',
          type: 'text',
          required: false
        }
      ] : [
        {
          id: '2',
          text: 'Há quanto tempo você percebeu os sintomas?',
          type: 'radio',
          required: true,
          options: [
            'Menos de 1 mês',
            'Entre 1 e 6 meses',
            'Entre 6 meses e 1 ano',
            'Mais de 1 ano'
          ]
        },
        {
          id: '3',
          text: 'Como você classificaria a gravidade do problema?',
          type: 'radio',
          required: true,
          options: [
            'Leve - ocorre ocasionalmente',
            'Moderado - ocorre frequentemente',
            'Severo - ocorre na maioria das vezes'
          ]
        },
        {
          id: '4',
          text: 'Você já consultou um médico sobre este problema anteriormente?',
          type: 'radio',
          required: true,
          options: ['Sim', 'Não']
        },
        {
          id: '5',
          text: 'Se já consultou, qual foi o diagnóstico e/ou tratamento recomendado?',
          type: 'textarea',
          required: false
        }
      ]),
      {
        id: '7',
        text: 'Você tem alguma alergia?',
        type: 'radio',
        required: true,
        options: ['Sim', 'Não']
      },
      {
        id: '8',
        text: 'Se sim, quais alergias você tem?',
        type: 'text',
        required: false
      },
      {
        id: '9',
        text: 'Você tem alguma condição médica?',
        type: 'radio',
        required: true,
        options: ['Sim', 'Não']
      },
      {
        id: '10',
        text: 'Medicamentos que utiliza atualmente:',
        type: 'textarea',
        required: false
      },
      {
        id: '11',
        text: 'Você fuma?',
        type: 'radio',
        required: true,
        options: ['Não', 'Ocasionalmente', 'Regularmente']
      },
      {
        id: '12',
        text: 'Consumo de álcool:',
        type: 'radio',
        required: true,
        options: ['Não consumo', 'Raramente', 'Semanalmente', 'Diariamente']
      },
      {
        id: '13',
        text: 'Frequência de atividade física:',
        type: 'radio',
        required: true,
        options: [
          'Sedentário',
          'Leve (1-2 dias por semana)',
          'Moderado (3-4 dias por semana)',
          'Intenso (5+ dias por semana)'
        ]
      },
      {
        id: '14',
        text: 'Quais são suas expectativas com o tratamento?',
        type: 'textarea',
        required: true
      }
    ]
  };
  
  // Mock recommended plans
  const mockPlans: { [key: string]: Plan[] } = {
    'queda-capilar': [
      {
        id: '1',
        name: 'Plano Básico - Queda Capilar',
        description: 'Tratamento básico para queda capilar com medicamentos essenciais, ideal para casos leves a moderados.',
        price: 149.90,
        interval: 'mensal',
        recommendedDuration: '1-3 meses',
        features: [
          'Minoxidil 5%',
          'Finasterida 1mg',
          'Consulta médica online',
          'Entrega mensal'
        ]
      },
      {
        id: '2',
        name: 'Plano Premium - Queda Capilar',
        description: 'Tratamento avançado para queda capilar com todos os medicamentos e acompanhamento especializado.',
        price: 249.90,
        interval: 'mensal',
        recommendedDuration: '3-6 meses',
        imageUrl: 'https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d3?ixlib=rb-4.0.3&w=500',
        features: [
          'Minoxidil 5%',
          'Finasterida 1mg',
          'Consulta médica online',
          'Entrega mensal',
          'Acompanhamento semanal',
          'Complexo vitamínico'
        ]
      }
    ],
    'disfuncao-eretil': [
      {
        id: '3',
        name: 'Plano Básico - Disfunção Erétil',
        description: 'Tratamento básico para disfunção erétil com medicamentos essenciais.',
        price: 159.90,
        interval: 'mensal',
        recommendedDuration: '1-3 meses',
        features: [
          'Sildenafila 50mg',
          'Consulta médica online',
          'Entrega mensal discreta'
        ]
      },
      {
        id: '4',
        name: 'Plano Premium - Disfunção Erétil',
        description: 'Tratamento completo para disfunção erétil com medicamentos avançados e acompanhamento.',
        price: 259.90,
        interval: 'mensal',
        recommendedDuration: '3-6 meses',
        imageUrl: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&w=500',
        features: [
          'Sildenafila 50mg',
          'Tadalafila 5mg',
          'Consulta médica online',
          'Entrega mensal discreta',
          'Acompanhamento semanal'
        ]
      }
    ]
  };
  
  // Current question
  const currentQuestion = anamnese.questions[currentStep];
  
  // Handle radio answer
  const handleRadioAnswer = (value: string) => {
    const existingIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    if (existingIndex !== -1) {
      const newAnswers = [...answers];
      newAnswers[existingIndex] = { questionId: currentQuestion.id, value };
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, { questionId: currentQuestion.id, value }]);
    }
  };
  
  // Handle text answer
  const handleTextAnswer = (value: string) => {
    const existingIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    if (existingIndex !== -1) {
      const newAnswers = [...answers];
      newAnswers[existingIndex] = { questionId: currentQuestion.id, value };
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, { questionId: currentQuestion.id, value }]);
    }
  };
  
  // Handle checkbox answer
  const handleCheckboxAnswer = (value: string, checked: boolean) => {
    const existingIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    let newValue: string[] = [];
    
    if (existingIndex !== -1) {
      const currentValue = answers[existingIndex].value;
      if (Array.isArray(currentValue)) {
        newValue = checked 
          ? [...currentValue, value]
          : currentValue.filter(v => v !== value);
      } else {
        newValue = checked ? [value] : [];
      }
      
      const newAnswers = [...answers];
      newAnswers[existingIndex] = { questionId: currentQuestion.id, value: newValue };
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, { questionId: currentQuestion.id, value: checked ? [value] : [] }]);
    }
  };
  
  // Handle personal info change
  const handlePersonalInfoChange = (field: keyof typeof personalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };
  
  // Get current answer
  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion?.id)?.value || '';
  };
  
  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion.required) return true;
    
    const answer = answers.find(a => a.questionId === currentQuestion.id);
    if (!answer) return false;
    
    if (Array.isArray(answer.value)) {
      return answer.value.length > 0;
    }
    
    return answer.value.trim() !== '';
  };
  
  // Handle navigation
  const goNext = () => {
    if (!isCurrentQuestionAnswered()) {
      toast.error('Por favor, responda a pergunta antes de continuar.');
      return;
    }
    
    if (currentStep === 0 && currentQuestion.type === 'personal_info') {
      // Validate personal info
      if (!personalInfo.name || !personalInfo.email || !personalInfo.phone || !personalInfo.birthdate) {
        toast.error('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
    }
    
    if (currentStep < anamnese.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step, submit answers
      handleSubmit();
    }
  };
  
  const goPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate API call and processing
    setTimeout(() => {
      // Logic to determine the recommended plan based on answers
      // This would be handled by your backend in a real implementation
      
      // For this demo, we'll select different plans based on simple criteria
      let selectedPlan = null;
      
      if (type === 'queda-capilar') {
        // Find answer for duration of hair loss (question 2)
        const durationAnswer = answers.find(a => a.questionId === '2')?.value;
        if (
          durationAnswer === 'Mais de 3 anos' || 
          answers.find(a => a.questionId === '4')?.value?.includes('Difusa (por toda a cabeça)')
        ) {
          // Severe case - recommend premium
          selectedPlan = mockPlans['queda-capilar'][1];
          setAlternativePlans([mockPlans['queda-capilar'][0]]);
        } else {
          // Mild case - recommend basic
          selectedPlan = mockPlans['queda-capilar'][0];
          setAlternativePlans([mockPlans['queda-capilar'][1]]);
        }
      } else {
        // Disfunção erétil
        const severityAnswer = answers.find(a => a.questionId === '3')?.value;
        if (severityAnswer === 'Severo - ocorre na maioria das vezes') {
          // Severe case - recommend premium
          selectedPlan = mockPlans['disfuncao-eretil'][1];
          setAlternativePlans([mockPlans['disfuncao-eretil'][0]]);
        } else {
          // Mild case - recommend basic
          selectedPlan = mockPlans['disfuncao-eretil'][0];
          setAlternativePlans([mockPlans['disfuncao-eretil'][1]]);
        }
      }
      
      setRecommendedPlan(selectedPlan);
      setShowResults(true);
      setIsLoading(false);
    }, 2000);
  };
  
  // Choose plan
  const choosePlan = (planId: string) => {
    // In a real application, this would navigate to the checkout or plan details page
    toast.success(`Plano ${planId} selecionado! Redirecionando para o checkout...`);
    // For demo, go back to home page after a delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Render the anamnesis form
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    switch (currentQuestion.type) {
      case 'personal_info':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo*</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail*</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone*</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate">Data de nascimento*</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={personalInfo.birthdate}
                  onChange={(e) => handlePersonalInfoChange('birthdate', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={personalInfo.height}
                  onChange={(e) => handlePersonalInfoChange('height', e.target.value)}
                  placeholder="175"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={personalInfo.weight}
                  onChange={(e) => handlePersonalInfoChange('weight', e.target.value)}
                  placeholder="70"
                />
              </div>
            </div>
          </div>
        );
      
      case 'radio':
        return (
          <RadioGroup 
            value={getCurrentAnswer() as string} 
            onValueChange={handleRadioAnswer}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'checkbox':
        const checkboxValue = getCurrentAnswer();
        const selectedValues = Array.isArray(checkboxValue) ? checkboxValue : [];
        
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox 
                  id={`option-${index}`} 
                  checked={selectedValues.includes(option)}
                  onCheckedChange={(checked) => handleCheckboxAnswer(option, checked as boolean)}
                />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-2">
            <Input
              value={getCurrentAnswer() as string}
              onChange={(e) => handleTextAnswer(e.target.value)}
              placeholder="Digite sua resposta"
            />
          </div>
        );
      
      case 'textarea':
        return (
          <div className="space-y-2">
            <Textarea
              value={getCurrentAnswer() as string}
              onChange={(e) => handleTextAnswer(e.target.value)}
              placeholder="Digite sua resposta"
              rows={4}
            />
          </div>
        );
        
      case 'image':
        return (
          <div className="space-y-4">
            {currentQuestion.imageUrl && (
              <div className="w-full rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={currentQuestion.imageUrl} 
                  alt={currentQuestion.text}
                  className="w-full h-auto"
                />
              </div>
            )}
            {currentQuestion.description && (
              <p className="text-gray-600 text-sm">{currentQuestion.description}</p>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Render results page
  const renderResults = () => {
    if (!recommendedPlan) return null;
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-bravo-blue mb-2">Seu plano recomendado</h2>
          <p className="text-gray-600">
            Com base nas suas respostas, recomendamos o seguinte plano:
          </p>
        </div>
        
        {/* Recommended Plan */}
        <Card className="border-2 border-bravo-blue shadow-lg">
          <CardHeader className="bg-bravo-beige bg-opacity-20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{recommendedPlan.name}</CardTitle>
                <CardDescription>Plano recomendado para você</CardDescription>
              </div>
              <div className="flex items-center space-x-1 bg-bravo-blue text-white px-3 py-1 rounded-full text-sm">
                <Sparkles size={14} />
                <span>Recomendado</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {recommendedPlan.imageUrl && (
              <div className="mb-4 rounded-md overflow-hidden h-40">
                <img 
                  src={recommendedPlan.imageUrl} 
                  alt={recommendedPlan.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div>
              <div className="mb-2 text-gray-700">{recommendedPlan.description}</div>
              
              {recommendedPlan.recommendedDuration && (
                <div className="text-sm text-bravo-blue font-medium">
                  Duração recomendada: {recommendedPlan.recommendedDuration}
                </div>
              )}
            </div>
            
            <div className="flex items-baseline mt-2">
              <span className="text-3xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(recommendedPlan.price)}
              </span>
              <span className="text-gray-500 ml-2">/{recommendedPlan.interval}</span>
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-medium">O que está incluído:</h4>
              <ul className="space-y-1">
                {recommendedPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check size={16} className="mr-2 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 px-6 py-4">
            <Button 
              className="w-full"
              onClick={() => choosePlan(recommendedPlan.id)}
            >
              Escolher este plano
            </Button>
          </CardFooter>
        </Card>
        
        {/* Alternative Plans */}
        {alternativePlans.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Planos alternativos</h3>
            
            {alternativePlans.map((plan) => (
              <Card key={plan.id} className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-2">
                  <p className="text-gray-600">{plan.description}</p>
                  
                  <div className="flex items-baseline">
                    <span className="text-xl font-semibold">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(plan.price)}
                    </span>
                    <span className="text-gray-500 ml-2">/{plan.interval}</span>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap mt-2">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {feature}
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                        +{plan.features.length - 3} mais
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 px-6 pb-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => choosePlan(plan.id)}
                  >
                    Escolher este plano
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="mr-2" />
        Voltar
      </Button>
      
      {!showResults ? (
        <div>
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-bravo-blue">
              {anamnese.title}
            </h1>
            <p className="text-gray-600 mt-2">
              Responda às perguntas abaixo para recebermos seu plano personalizado
            </p>
          </div>
          
          <div className="mb-6 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-bravo-blue h-full rounded-full transition-all" 
              style={{ width: `${(currentStep / (anamnese.questions.length - 1)) * 100}%` }}
            />
          </div>
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>
                {currentQuestion?.text}
              </CardTitle>
              {currentQuestion?.required && (
                <CardDescription className="flex items-center text-red-500">
                  <CircleAlert size={14} className="mr-1" />
                  Resposta obrigatória
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {renderQuestion()}
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={goPrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft size={16} className="mr-2" />
                Anterior
              </Button>
              
              <Button
                onClick={goNext}
                disabled={isLoading}
              >
                {isLoading ? (
                  'Processando...'
                ) : currentStep < anamnese.questions.length - 1 ? (
                  <>Próximo <ArrowRight size={16} className="ml-2" /></>
                ) : (
                  'Finalizar'
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <p className="text-center text-xs text-gray-500 mt-6">
            Suas informações são confidenciais e serão utilizadas apenas para fins de avaliação médica.
          </p>
        </div>
      ) : (
        renderResults()
      )}
    </div>
  );
};

export default AnamneseFlowPage;
