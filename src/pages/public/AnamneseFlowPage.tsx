
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const AnamneseFlowPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Check if valid treatment type
  const validTypes = ['queda-capilar', 'disfuncao-eretil'];
  
  useEffect(() => {
    if (type && !validTypes.includes(type)) {
      navigate('/');
      toast.error('Tipo de tratamento inválido');
    }
  }, [type, navigate]);
  
  // Mock anamnese flow state
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal info
    name: user?.name || '',
    email: user?.email || '',
    birthdate: '',
    height: '',
    weight: '',
    
    // Medical history
    hasAllergies: false,
    allergiesDescription: '',
    hasMedicalConditions: false,
    medicalConditionsDescription: '',
    medications: '',
    
    // Lifestyle
    smokes: '',
    drinks: '',
    exercises: '',
    
    // Specific questions for hair loss
    hairLossDuration: '',
    hairLossPattern: '',
    familyHistory: '',
    previousTreatments: '',
    
    // Specific questions for ED
    edDuration: '',
    edSituation: '',
    morningErections: '',
    
    // Treatment expectations
    expectations: '',
    concerns: '',
  });
  
  // Define the steps based on treatment type
  const getSteps = () => {
    const commonSteps = [
      {
        title: 'Informações Pessoais',
        description: 'Precisamos de alguns dados básicos para iniciar seu tratamento.',
      },
      {
        title: 'Histórico Médico',
        description: 'Suas informações médicas nos ajudam a personalizar seu tratamento com segurança.',
      },
      {
        title: 'Estilo de Vida',
        description: 'Seus hábitos diários podem influenciar nos resultados do seu tratamento.',
      }
    ];
    
    const specificSteps = type === 'queda-capilar' 
      ? [
          {
            title: 'Sobre sua Queda Capilar',
            description: 'Detalhes sobre seu padrão de queda ajudam a determinar o melhor tratamento.',
          }
        ]
      : [
          {
            title: 'Sobre sua Função Erétil',
            description: 'Informações específicas para ajudar na avaliação do seu caso.',
          }
        ];
    
    const finalSteps = [
      {
        title: 'Expectativas',
        description: 'Conte-nos o que você espera do tratamento.',
      },
      {
        title: 'Revisar e Finalizar',
        description: 'Revise suas informações antes de enviar.',
      },
      {
        title: 'Escolha seu Plano',
        description: 'Selecione o plano de tratamento que melhor se adapta às suas necessidades.',
      }
    ];
    
    return [...commonSteps, ...specificSteps, ...finalSteps];
  };
  
  const steps = getSteps();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    // Simulate submitting the form
    toast.success('Anamnese enviada com sucesso!');
    
    // In a real app, this would submit to an API and then redirect
    setTimeout(() => {
      if (user) {
        navigate('/cliente/dashboard');
      } else {
        navigate('/registrar');
      }
    }, 1500);
  };
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="birthdate">Data de nascimento</Label>
              <Input
                id="birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 1: // Medical History
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasAllergies"
                  checked={formData.hasAllergies}
                  onCheckedChange={(checked) => handleCheckboxChange('hasAllergies', checked as boolean)}
                />
                <Label htmlFor="hasAllergies">Você tem alguma alergia?</Label>
              </div>
              
              {formData.hasAllergies && (
                <div>
                  <Label htmlFor="allergiesDescription">Descreva suas alergias</Label>
                  <Textarea
                    id="allergiesDescription"
                    name="allergiesDescription"
                    value={formData.allergiesDescription}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasMedicalConditions"
                  checked={formData.hasMedicalConditions}
                  onCheckedChange={(checked) => handleCheckboxChange('hasMedicalConditions', checked as boolean)}
                />
                <Label htmlFor="hasMedicalConditions">Você tem alguma condição médica?</Label>
              </div>
              
              {formData.hasMedicalConditions && (
                <div>
                  <Label htmlFor="medicalConditionsDescription">Descreva suas condições médicas</Label>
                  <Textarea
                    id="medicalConditionsDescription"
                    name="medicalConditionsDescription"
                    value={formData.medicalConditionsDescription}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="medications">Medicamentos que utiliza atualmente</Label>
              <Textarea
                id="medications"
                name="medications"
                value={formData.medications}
                onChange={handleInputChange}
                placeholder="Liste todos os medicamentos que você utiliza, incluindo suplementos"
              />
            </div>
          </div>
        );
      
      case 2: // Lifestyle
        return (
          <div className="space-y-6">
            <div>
              <Label>Você fuma?</Label>
              <RadioGroup 
                value={formData.smokes} 
                onValueChange={value => handleRadioChange('smokes', value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="smokes-never" />
                  <Label htmlFor="smokes-never">Nunca fumei</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasionally" id="smokes-occasionally" />
                  <Label htmlFor="smokes-occasionally">Ocasionalmente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regularly" id="smokes-regularly" />
                  <Label htmlFor="smokes-regularly">Regularmente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="former" id="smokes-former" />
                  <Label htmlFor="smokes-former">Ex-fumante</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Consumo de álcool</Label>
              <RadioGroup 
                value={formData.drinks} 
                onValueChange={value => handleRadioChange('drinks', value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="drinks-never" />
                  <Label htmlFor="drinks-never">Não bebo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasionally" id="drinks-occasionally" />
                  <Label htmlFor="drinks-occasionally">Ocasionalmente (eventos sociais)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="drinks-weekly" />
                  <Label htmlFor="drinks-weekly">Semanalmente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="drinks-daily" />
                  <Label htmlFor="drinks-daily">Diariamente</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Frequência de atividade física</Label>
              <RadioGroup 
                value={formData.exercises} 
                onValueChange={value => handleRadioChange('exercises', value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sedentary" id="exercises-sedentary" />
                  <Label htmlFor="exercises-sedentary">Sedentário</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="exercises-light" />
                  <Label htmlFor="exercises-light">Leve (1-2 dias por semana)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="exercises-moderate" />
                  <Label htmlFor="exercises-moderate">Moderada (3-4 dias por semana)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intense" id="exercises-intense" />
                  <Label htmlFor="exercises-intense">Intensa (5+ dias por semana)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      
      case 3: // Specific Questions (Hair Loss or ED)
        return type === 'queda-capilar' ? (
          // Hair Loss specific questions
          <div className="space-y-6">
            <div>
              <Label>Há quanto tempo você percebeu a queda capilar?</Label>
              <RadioGroup 
                value={formData.hairLossDuration} 
                onValueChange={value => handleRadioChange('hairLossDuration', value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recent" id="hairloss-recent" />
                  <Label htmlFor="hairloss-recent">Menos de 6 meses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6months-1year" id="hairloss-6months" />
                  <Label htmlFor="hairloss-6months">Entre 6 meses e 1 ano</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-3years" id="hairloss-1-3years" />
                  <Label htmlFor="hairloss-1-3years">Entre 1 e 3 anos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3+years" id="hairloss-3+years" />
                  <Label htmlFor="hairloss-3+years">Mais de 3 anos</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Como você classificaria seu padrão de queda?</Label>
              <RadioGroup 
                value={formData.hairLossPattern} 
                onValueChange={value => handleRadioChange('hairLossPattern', value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="receding" id="pattern-receding" />
                  <Label htmlFor="pattern-receding">Entrada (recuo da linha frontal)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crown" id="pattern-crown" />
                  <Label htmlFor="pattern-crown">Coroa (topo da cabeça)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="diffuse" id="pattern-diffuse" />
                  <Label htmlFor="pattern-diffuse">Difusa (por toda a cabeça)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="combined" id="pattern-combined" />
                  <Label htmlFor="pattern-combined">Combinada (entradas + coroa)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Existe histórico de calvície na sua família?</Label>
              <RadioGroup 
                value={formData.familyHistory} 
                onValueChange={value => handleRadioChange('familyHistory', value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes-father" id="family-father" />
                  <Label htmlFor="family-father">Sim, do lado paterno</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes-mother" id="family-mother" />
                  <Label htmlFor="family-mother">Sim, do lado materno</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes-both" id="family-both" />
                  <Label htmlFor="family-both">Sim, ambos os lados</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="family-no" />
                  <Label htmlFor="family-no">Não que eu saiba</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="previousTreatments">Já realizou algum tratamento para queda capilar anteriormente?</Label>
              <Textarea
                id="previousTreatments"
                name="previousTreatments"
                value={formData.previousTreatments}
                onChange={handleInputChange}
                placeholder="Se sim, descreva os tratamentos e resultados obtidos"
              />
            </div>
          </div>
        ) : (
          // ED specific questions
          <div className="space-y-6">
            <div>
              <Label>Há quanto tempo você percebeu dificuldades de ereção?</Label>
              <RadioGroup 
                value={formData.edDuration} 
                onValueChange={value => handleRadioChange('edDuration', value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recent" id="ed-recent" />
                  <Label htmlFor="ed-recent">Menos de 3 meses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-6months" id="ed-3-6months" />
                  <Label htmlFor="ed-3-6months">Entre 3 e 6 meses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6months-1year" id="ed-6months-1year" />
                  <Label htmlFor="ed-6months-1year">Entre 6 meses e 1 ano</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1+year" id="ed-1+year" />
                  <Label htmlFor="ed-1+year">Mais de 1 ano</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Em que situações você percebe dificuldade de ereção?</Label>
              <RadioGroup 
                value={formData.edSituation} 
                onValueChange={value => handleRadioChange('edSituation', value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="always" id="sit-always" />
                  <Label htmlFor="sit-always">Sempre, em todas as situações</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="most-times" id="sit-most-times" />
                  <Label htmlFor="sit-most-times">Na maioria das vezes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="sit-sometimes" />
                  <Label htmlFor="sit-sometimes">Às vezes, depende da situação</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="sit-rarely" />
                  <Label htmlFor="sit-rarely">Raramente</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Você tem ereções matinais (ao acordar)?</Label>
              <RadioGroup 
                value={formData.morningErections} 
                onValueChange={value => handleRadioChange('morningErections', value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regularly" id="morning-regularly" />
                  <Label htmlFor="morning-regularly">Sim, regularmente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="morning-sometimes" />
                  <Label htmlFor="morning-sometimes">Às vezes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="morning-rarely" />
                  <Label htmlFor="morning-rarely">Raramente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="morning-never" />
                  <Label htmlFor="morning-never">Nunca</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      
      case 4: // Expectations
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="expectations">Quais são suas expectativas com o tratamento?</Label>
              <Textarea
                id="expectations"
                name="expectations"
                value={formData.expectations}
                onChange={handleInputChange}
                rows={4}
                placeholder="O que você espera conseguir com este tratamento?"
              />
            </div>
            
            <div>
              <Label htmlFor="concerns">Você tem alguma preocupação ou dúvida específica?</Label>
              <Textarea
                id="concerns"
                name="concerns"
                value={formData.concerns}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tem algo específico que você gostaria que o médico abordasse?"
              />
            </div>
          </div>
        );
      
      case 5: // Review and finalize
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium mb-4">Informações pessoais</h3>
              <div className="space-y-2">
                <p><strong>Nome:</strong> {formData.name}</p>
                <p><strong>E-mail:</strong> {formData.email}</p>
                <p><strong>Data de nascimento:</strong> {formData.birthdate}</p>
                <p><strong>Altura:</strong> {formData.height} cm</p>
                <p><strong>Peso:</strong> {formData.weight} kg</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium mb-4">Histórico médico</h3>
              <div className="space-y-2">
                <p><strong>Alergias:</strong> {formData.hasAllergies ? 'Sim' : 'Não'}</p>
                {formData.hasAllergies && (
                  <p><strong>Descrição das alergias:</strong> {formData.allergiesDescription}</p>
                )}
                <p><strong>Condições médicas:</strong> {formData.hasMedicalConditions ? 'Sim' : 'Não'}</p>
                {formData.hasMedicalConditions && (
                  <p><strong>Descrição das condições:</strong> {formData.medicalConditionsDescription}</p>
                )}
                <p><strong>Medicamentos:</strong> {formData.medications || 'Nenhum'}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium mb-4">Estilo de vida</h3>
              <div className="space-y-2">
                <p><strong>Tabagismo:</strong> {formData.smokes || 'Não informado'}</p>
                <p><strong>Consumo de álcool:</strong> {formData.drinks || 'Não informado'}</p>
                <p><strong>Atividade física:</strong> {formData.exercises || 'Não informado'}</p>
              </div>
            </div>
            
            {type === 'queda-capilar' ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Sobre sua queda capilar</h3>
                <div className="space-y-2">
                  <p><strong>Duração:</strong> {formData.hairLossDuration || 'Não informado'}</p>
                  <p><strong>Padrão:</strong> {formData.hairLossPattern || 'Não informado'}</p>
                  <p><strong>Histórico familiar:</strong> {formData.familyHistory || 'Não informado'}</p>
                  <p><strong>Tratamentos anteriores:</strong> {formData.previousTreatments || 'Nenhum'}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Sobre sua função erétil</h3>
                <div className="space-y-2">
                  <p><strong>Duração do problema:</strong> {formData.edDuration || 'Não informado'}</p>
                  <p><strong>Ocorrência:</strong> {formData.edSituation || 'Não informado'}</p>
                  <p><strong>Ereções matinais:</strong> {formData.morningErections || 'Não informado'}</p>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium mb-4">Expectativas</h3>
              <div className="space-y-2">
                <p><strong>Expectativas do tratamento:</strong> {formData.expectations || 'Não informadas'}</p>
                <p><strong>Preocupações:</strong> {formData.concerns || 'Nenhuma'}</p>
              </div>
            </div>
          </div>
        );
      
      case 6: // Choose plan
        return (
          <div className="space-y-8">
            <div>
              <p className="text-center text-gray-700 mb-6">
                Escolha o plano que melhor se adapta às suas necessidades:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Basic Plan */}
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-xl text-center">Plano Básico</h3>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <span className="text-3xl font-bold">R$ 99</span>
                      <span className="text-gray-500">/mês</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Avaliação médica online</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Medicamentos essenciais</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Entrega mensal</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Suporte por e-mail</span>
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">Escolher Plano</Button>
                  </div>
                </div>
                
                {/* Premium Plan */}
                <div className="border-2 border-bravo-blue rounded-xl overflow-hidden shadow-md">
                  <div className="bg-bravo-beige p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-xl text-center">Plano Premium</h3>
                    <div className="bg-bravo-blue text-white text-xs px-3 py-1 rounded-full w-fit mx-auto mt-1">
                      Mais popular
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <span className="text-3xl font-bold">R$ 149</span>
                      <span className="text-gray-500">/mês</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Avaliação médica online</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Fórmula personalizada</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Suplementos adicionais</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Entrega mensal</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Suporte por WhatsApp</span>
                      </li>
                    </ul>
                    <Button className="w-full">Escolher Plano</Button>
                  </div>
                </div>
                
                {/* Complete Plan */}
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-xl text-center">Plano Completo</h3>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <span className="text-3xl font-bold">R$ 199</span>
                      <span className="text-gray-500">/mês</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Avaliação médica online</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Fórmula personalizada</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Suplementos premium</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Shampoo/loções especializados</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Entrega mensal</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight size={16} className="text-bravo-blue mr-2" />
                        <span>Acompanhamento mensal</span>
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">Escolher Plano</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-bravo-blue mb-2 text-center">
          {type === 'queda-capilar' ? 'Avaliação para Tratamento de Queda Capilar' : 'Avaliação para Tratamento de Disfunção Erétil'}
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Responda as perguntas abaixo para iniciar seu tratamento personalizado
        </p>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-bravo-blue rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Passo {currentStep + 1} de {steps.length}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
        </div>
        
        {/* Step title and description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-bravo-blue mb-1">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>
        
        {/* Form content - current step */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
          {renderStep()}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft size={16} className="mr-2" />
            Anterior
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
            >
              Próximo
              <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
            >
              Finalizar
            </Button>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default AnamneseFlowPage;
