
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Eye, ArrowLeft, ArrowRight, Check, X, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DiagnosisDisplay } from './DiagnosisDisplay';
import { CheckoutBlock } from './CheckoutBlock';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/sonner';

type QuestionType = 'text' | 'number' | 'boolean' | 'single-choice' | 'multiple-choice';

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  imageUrl?: string;
  imageSize?: 'small' | 'medium' | 'large';
}

interface DiagnosticRule {
  id: string;
  internalName: string;
  title: string;
  description: string;
  phaseName: string;
  phaseDuration?: string;
  priority: number;
  activationTags: string[];
  tagLogic: 'AND' | 'OR';
  isActive: boolean;
  imageUrl?: string;
}

interface AnamneseFlow {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface LinkedPlan {
  planId: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  features?: string[];
  imageUrl?: string;
}

interface AnamnesePreviewProps {
  flow: AnamneseFlow;
  linkedPlans: LinkedPlan[];
  diagnosticRules?: DiagnosticRule[];
  isOpen: boolean;
  onClose: () => void;
}

export function AnamnesePreview({ flow, linkedPlans, diagnosticRules = [], isOpen, onClose }: AnamnesePreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [showPlanSelection, setShowPlanSelection] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [appliedTags, setAppliedTags] = useState<string[]>(['queda_moderada']); // Mock tags that would come from answers
  const [isLoading, setIsLoading] = useState(false);
  
  // Group questions in steps of 2 for simplicity in this demo
  const questionsPerStep = 1;
  const steps = Array.from(
    { length: Math.ceil(flow.questions.length / questionsPerStep) },
    (_, i) => flow.questions.slice(i * questionsPerStep, (i + 1) * questionsPerStep)
  );

  const totalSteps = steps.length + 1; // +1 for the intro screen

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - show diagnosis if available, otherwise show checkout
      if (diagnosticRules.length > 0) {
        setShowDiagnosis(true);
      } else {
        setShowPlanSelection(true);
      }
    }
  };

  const handlePrevious = () => {
    if (showCheckout) {
      setShowCheckout(false);
      setShowPlanSelection(true);
    } else if (showPlanSelection) {
      setShowPlanSelection(false);
      if (diagnosticRules.length > 0) {
        setShowDiagnosis(true);
      } else {
        setCurrentStep(totalSteps - 1);
      }
    } else if (showDiagnosis) {
      setShowDiagnosis(false);
      setCurrentStep(totalSteps - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowDiagnosis(false);
    setShowPlanSelection(false);
    setShowCheckout(false);
  };

  const handleViewPlans = () => {
    setShowDiagnosis(false);
    setShowPlanSelection(true);
  };

  const handleSelectPlan = () => {
    setShowPlanSelection(false);
    setShowCheckout(true);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    
    // Simulate API call to Stripe
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Checkout processado com sucesso!');
    setIsLoading(false);
    handleReset();
  };

  const renderQuestionByType = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <Textarea
            id={question.id}
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Digite sua resposta..."
            className="w-full"
          />
        );
      case 'number':
        return (
          <Input
            id={question.id}
            type="number"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, Number(e.target.value))}
            placeholder="0"
            className="w-full"
          />
        );
      case 'boolean':
        return (
          <RadioGroup
            value={answers[question.id]}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`${question.id}-true`} />
              <Label htmlFor={`${question.id}-true`}>Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`${question.id}-false`} />
              <Label htmlFor={`${question.id}-false`}>Não</Label>
            </div>
          </RadioGroup>
        );
      case 'single-choice':
        return (
          <RadioGroup
            value={answers[question.id]}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="space-y-2"
          >
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${i}`} />
                <Label htmlFor={`${question.id}-${i}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${i}`}
                  checked={answers[question.id]?.includes(option)}
                  onCheckedChange={(checked) => {
                    const currentValues = answers[question.id] || [];
                    const newValues = checked
                      ? [...currentValues, option]
                      : currentValues.filter((val: string) => val !== option);
                    handleAnswerChange(question.id, newValues);
                  }}
                />
                <Label htmlFor={`${question.id}-${i}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const getProgress = () => {
    if (showCheckout) return 100;
    if (showPlanSelection) return 90;
    if (showDiagnosis) return 80;
    return ((currentStep) / totalSteps) * 70; // Max 70% when questions are done
  };

  // Find the applicable diagnostic rule based on applied tags
  const findApplicableDiagnosticRule = () => {
    if (!diagnosticRules || diagnosticRules.length === 0) return null;
    
    // Sort rules by priority
    const activeRules = diagnosticRules
      .filter(rule => rule.isActive)
      .sort((a, b) => a.priority - b.priority);
    
    // Find first matching rule
    return activeRules.find(rule => {
      if (rule.tagLogic === 'AND') {
        return rule.activationTags.every(tag => appliedTags.includes(tag));
      } else {
        return rule.activationTags.some(tag => appliedTags.includes(tag));
      }
    });
  };

  // Simplified logic to determine plan - in reality this would match tags from answers
  const recommendedPlan = linkedPlans.length > 0 ? linkedPlans[0] : null;
  const applicableDiagnosticRule = findApplicableDiagnosticRule();

  const renderContent = () => {
    if (showCheckout && recommendedPlan) {
      return (
        <CheckoutBlock 
          plan={{
            id: recommendedPlan.planId, // Adding the id field and mapping from planId
            name: recommendedPlan.name,
            price: recommendedPlan.price,
            description: recommendedPlan.description,
            features: recommendedPlan.features || [
              'Consulta médica online',
              'Medicamentos por 1 mês',
              'Entrega em domicílio',
              'Acompanhamento personalizado',
              'Acesso ao app exclusivo'
            ],
            interval: 'mensal',
            tags: recommendedPlan.tags
          }} 
          onCheckout={handleCheckout}
          isLoading={isLoading}
        />
      );
    }

    if (showPlanSelection) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-10 md:py-16 bg-gradient-to-b from-blue-50 to-white"
        >
          <div className="w-full max-w-3xl">
            <div className="text-center mb-8">
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-3xl font-bold text-gray-800"
              >
                Plano recomendado para você
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-gray-600 mt-2"
              >
                Com base no seu diagnóstico, selecionamos o melhor tratamento
              </motion.p>
            </div>
            
            {recommendedPlan ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Card className="border-2 border-green-100 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{recommendedPlan.name}</CardTitle>
                        <p className="text-green-100 mt-1">{recommendedPlan.description}</p>
                      </div>
                      <Badge variant="secondary" className="bg-white text-green-600 px-3 py-1">
                        Recomendado
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-3xl font-bold">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(recommendedPlan.price)}
                        <span className="text-gray-500 text-base ml-1">/mês</span>
                      </span>
                      
                      {recommendedPlan.tags && recommendedPlan.tags.length > 0 && (
                        <div className="flex gap-2">
                          {recommendedPlan.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="flex items-center">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <h3 className="font-medium">O que está incluído:</h3>
                      <ul className="space-y-2">
                        {(recommendedPlan.features || [
                          'Consulta médica online',
                          'Medicamentos por 1 mês',
                          'Entrega em domicílio',
                          'Acompanhamento personalizado'
                        ]).map((feature, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (index * 0.1), duration: 0.4 }}
                            className="flex items-center"
                          >
                            <Check className="text-green-500 mr-2" size={18} />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 bg-gray-50">
                    <Button 
                      onClick={handleSelectPlan} 
                      className="w-full py-6 text-lg font-medium bg-green-600 hover:bg-green-700"
                    >
                      Escolher este plano
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p>Nenhum plano disponível</p>
                </CardContent>
              </Card>
            )}
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft size={16} className="mr-2" />
                Voltar para o diagnóstico
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reiniciar Preview
              </Button>
            </div>
          </div>
        </motion.div>
      );
    }

    if (showDiagnosis && applicableDiagnosticRule) {
      return (
        <>
          <DiagnosisDisplay
            title={applicableDiagnosticRule.title}
            description={applicableDiagnosticRule.description}
            phaseName={applicableDiagnosticRule.phaseName}
            phaseDuration={applicableDiagnosticRule.phaseDuration}
            imageUrl={applicableDiagnosticRule.imageUrl}
            onContinue={handleViewPlans}
          />
          
          <div className="fixed bottom-6 left-6">
            <Button variant="outline" onClick={handlePrevious} className="rounded-full px-4">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para o questionário
            </Button>
          </div>
          
          <div className="fixed bottom-6 right-6">
            <Button variant="outline" onClick={handleReset} className="rounded-full px-4">
              Reiniciar
              <X size={16} className="ml-2" />
            </Button>
          </div>
        </>
      );
    }

    return (
      <div className="min-h-[80vh] flex flex-col justify-center">
        <div className="w-full max-w-3xl mx-auto p-6">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{width: `${getProgress()}%`}}
            ></div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px] flex flex-col"
            >
              {currentStep === 0 ? (
                /* Introduction screen */
                <div className="text-center py-12 flex-1 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4 text-blue-800">{flow.title}</h2>
                  <p className="text-gray-600 mb-10 max-w-lg mx-auto">{flow.description}</p>
                  <Button onClick={handleNext} size="lg" className="mx-auto w-64 py-6 text-lg">
                    Iniciar Avaliação
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              ) : (
                /* Question screens */
                <div className="space-y-8 py-8">
                  {steps[currentStep - 1].map((question) => (
                    <div key={question.id} className="space-y-4">
                      <h3 className="text-2xl font-medium text-blue-800">{question.text}</h3>
                      
                      {question.imageUrl && (
                        <div className={`
                          rounded-lg overflow-hidden bg-gray-50 flex justify-center my-6
                          ${question.imageSize === 'small' ? 'max-h-32' : ''}
                          ${question.imageSize === 'medium' ? 'max-h-64' : ''}
                          ${question.imageSize === 'large' ? 'max-h-96' : ''}
                        `}>
                          <img 
                            src={question.imageUrl} 
                            alt=""
                            className={`
                              object-contain
                              ${question.imageSize === 'small' ? 'max-h-28' : ''}
                              ${question.imageSize === 'medium' ? 'max-h-60' : ''}
                              ${question.imageSize === 'large' ? 'max-h-92' : ''}
                            `}
                          />
                        </div>
                      )}
                      
                      <div className="mt-4">
                        {renderQuestionByType(question)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-10">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft size={16} className="mr-1" />
              Voltar
            </Button>
            <Button onClick={handleNext} size="lg" className="bg-blue-600 hover:bg-blue-700">
              {currentStep === totalSteps - 1 ? 'Ver diagnóstico' : 'Próximo'}
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 overflow-hidden">
        <div className="fixed top-4 right-4 z-50">
          <Button variant="outline" onClick={onClose} className="rounded-full bg-white/80 backdrop-blur-sm">
            <X size={18} />
          </Button>
        </div>
        
        <div className="h-full overflow-y-auto">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
