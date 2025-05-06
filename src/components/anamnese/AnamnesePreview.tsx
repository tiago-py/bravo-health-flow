
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Eye, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DiagnosisDisplay } from './DiagnosisDisplay';

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
  const [showCheckout, setShowCheckout] = useState(false);
  const [appliedTags, setAppliedTags] = useState<string[]>(['queda_moderada']); // Mock tags that would come from answers
  
  // Group questions in steps of 2 for simplicity in this demo
  const questionsPerStep = 2;
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
        setShowCheckout(true);
      }
    }
  };

  const handlePrevious = () => {
    if (showCheckout) {
      setShowCheckout(false);
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
    setShowCheckout(false);
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
    if (showDiagnosis) return 90;
    return ((currentStep) / totalSteps) * 80; // Max 80% when questions are done
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye size={18} /> 
            Preview da Anamnese
          </DialogTitle>
          <DialogDescription>
            Visualize como o cliente verá o formulário de anamnese
          </DialogDescription>
        </DialogHeader>

        {!showDiagnosis && !showCheckout ? (
          <div className="mt-2">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{width: `${getProgress()}%`}}
              ></div>
            </div>

            {currentStep === 0 ? (
              /* Introduction screen */
              <div className="text-center py-6">
                <h2 className="text-2xl font-bold mb-2">{flow.title}</h2>
                <p className="text-gray-600 mb-6">{flow.description}</p>
                <Button onClick={handleNext} size="lg">
                  Iniciar Avaliação
                </Button>
              </div>
            ) : (
              /* Question screens */
              <div className="space-y-6">
                {steps[currentStep - 1].map((question) => (
                  <div key={question.id} className="space-y-3">
                    <Label htmlFor={question.id} className="text-lg font-medium">{question.text}</Label>
                    
                    {question.imageUrl && (
                      <div className={`
                        rounded overflow-hidden bg-gray-50 flex justify-center
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
                    
                    {renderQuestionByType(question)}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft size={16} className="mr-1" />
                Voltar
              </Button>
              <Button onClick={handleNext}>
                {currentStep === totalSteps - 1 ? 'Finalizar' : 'Próximo'}
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        ) : showDiagnosis ? (
          /* Diagnosis screen */
          <div className="mt-2">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{width: `${getProgress()}%`}}
              ></div>
            </div>
            
            {applicableDiagnosticRule ? (
              <DiagnosisDisplay
                title={applicableDiagnosticRule.title}
                description={applicableDiagnosticRule.description}
                phaseName={applicableDiagnosticRule.phaseName}
                phaseDuration={applicableDiagnosticRule.phaseDuration}
                imageUrl={applicableDiagnosticRule.imageUrl}
                onContinue={() => setShowCheckout(true)}
              />
            ) : (
              <div className="text-center py-6">
                <h2 className="text-xl font-bold mb-2">Diagnóstico não encontrado</h2>
                <p className="text-gray-600 mb-6">
                  Não encontramos uma regra de diagnóstico aplicável para suas respostas.
                </p>
                <Button onClick={() => setShowCheckout(true)}>
                  Ver planos disponíveis
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft size={16} className="mr-1" />
                Voltar
              </Button>
            </div>
          </div>
        ) : (
          /* Checkout screen */
          <div className="mt-2">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{width: `${getProgress()}%`}}
              ></div>
            </div>
            
            <Card className="mb-6 border-green-100">
              <CardHeader className="bg-green-50 pb-2">
                <CardTitle className="text-lg">Plano recomendado com base nas suas respostas</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {recommendedPlan ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{recommendedPlan.name}</h3>
                      <p className="text-gray-600">{recommendedPlan.description}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">R$ {recommendedPlan.price.toFixed(2)}</span>
                      <span className="text-gray-500 ml-2">/mês</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {recommendedPlan.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>Nenhum plano recomendado disponível.</div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Check size={16} className="mr-2" />
                  Escolher este plano
                </Button>
              </CardFooter>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft size={16} className="mr-1" />
                Voltar
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reiniciar Preview
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
