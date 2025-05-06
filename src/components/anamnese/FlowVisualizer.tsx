
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  MessageSquare, ShieldCheck, CreditCard, Tag, ArrowRight,
  ChevronDown, ChevronUp, Eye, FileText, Star, AlertTriangle
} from 'lucide-react';

// Define types
interface Question {
  id: string;
  text: string;
  outputTags: string[];
}

interface DiagnosticRule {
  id: string;
  title: string;
  inputTags: string[];
  tagLogic: 'AND' | 'OR';
}

interface TreatmentPlan {
  id: string;
  name: string;
  price: number;
  inputTags: string[];
  tagLogic: 'AND' | 'OR';
}

interface FlowVisualizerProps {
  questions: Question[];
  diagnosticRules: DiagnosticRule[];
  treatmentPlans: TreatmentPlan[];
  onPreviewFlow?: () => void;
}

export function FlowVisualizer({
  questions,
  diagnosticRules,
  treatmentPlans,
  onPreviewFlow
}: FlowVisualizerProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Collect all unique tags
  const allTags = new Set<string>();
  questions.forEach(q => q.outputTags.forEach(tag => allTags.add(tag)));
  diagnosticRules.forEach(d => d.inputTags.forEach(tag => allTags.add(tag)));
  treatmentPlans.forEach(p => p.inputTags.forEach(tag => allTags.add(tag)));
  
  const uniqueTags = Array.from(allTags);
  
  // Check if flow is properly connected
  const hasQuestions = questions.length > 0;
  const hasDiagnosticRules = diagnosticRules.length > 0;
  const hasTreatmentPlans = treatmentPlans.length > 0;
  const hasTagsFromQuestions = questions.some(q => q.outputTags.length > 0);
  const hasTagsForDiagnosis = diagnosticRules.some(d => d.inputTags.length > 0);
  const hasTagsForPlans = treatmentPlans.some(p => p.inputTags.length > 0);
  
  const isFlowComplete = hasQuestions && hasDiagnosticRules && hasTreatmentPlans &&
                         hasTagsFromQuestions && hasTagsForDiagnosis && hasTagsForPlans;

  return (
    <Card className="border-2 shadow-sm">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText size={18} />
          Visualização do Fluxo
        </CardTitle>
        <div className="flex items-center gap-2">
          {onPreviewFlow && (
            <Button size="sm" variant="outline" onClick={onPreviewFlow}>
              <Eye size={14} className="mr-1" />
              Preview
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!expanded ? (
          <div className="p-2 text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                <MessageSquare size={12} className="mr-1" />
                {questions.length} {questions.length === 1 ? 'Pergunta' : 'Perguntas'}
              </Badge>
              <ArrowRight size={12} className="text-gray-400" />
              <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                <Tag size={12} className="mr-1" />
                {uniqueTags.length} {uniqueTags.length === 1 ? 'Tag' : 'Tags'}
              </Badge>
              <ArrowRight size={12} className="text-gray-400" />
              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                <ShieldCheck size={12} className="mr-1" />
                {diagnosticRules.length} {diagnosticRules.length === 1 ? 'Diagnóstico' : 'Diagnósticos'}
              </Badge>
              <ArrowRight size={12} className="text-gray-400" />
              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                <Star size={12} className="mr-1" />
                {treatmentPlans.length} {treatmentPlans.length === 1 ? 'Plano' : 'Planos'}
              </Badge>
              <ArrowRight size={12} className="text-gray-400" />
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                <CreditCard size={12} className="mr-1" />
                Checkout
              </Badge>
            </div>
            
            {!isFlowComplete && (
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 p-2 rounded-md mt-3 border border-amber-200">
                <AlertTriangle size={14} />
                <span className="text-xs">Fluxo incompleto! Clique para ver detalhes.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 mt-2">
            {/* Visual Flow Map */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Mapa do Fluxo</h3>
              <div className="overflow-auto">
                <div className="min-w-[800px] flex justify-between items-start">
                  {/* Questions */}
                  <div className="w-1/5">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare size={16} className="text-green-600" />
                        <h4 className="font-medium text-green-800">Perguntas</h4>
                      </div>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {questions.map((question, i) => (
                          <motion.div 
                            key={question.id} 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-2 rounded border border-green-100 text-sm"
                          >
                            <div className="line-clamp-1 mb-1">{question.text}</div>
                            {question.outputTags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {question.outputTags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs py-0 px-1 bg-green-50">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                        {questions.length === 0 && (
                          <div className="text-xs text-gray-500 p-2 bg-white rounded border border-gray-200">
                            Nenhuma pergunta configurada
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center my-1">
                      <ArrowRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="w-1/5">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag size={16} className="text-purple-600" />
                        <h4 className="font-medium text-purple-800">Tags</h4>
                      </div>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        <div className="bg-white p-2 rounded border border-purple-100 text-sm flex flex-wrap gap-1">
                          {uniqueTags.map((tag, i) => (
                            <motion.div
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800 border border-purple-200">
                                {tag}
                              </Badge>
                            </motion.div>
                          ))}
                          {uniqueTags.length === 0 && (
                            <div className="text-xs text-gray-500 w-full">
                              Nenhuma tag configurada
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center my-1">
                      <ArrowRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Diagnostic Rules */}
                  <div className="w-1/5">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck size={16} className="text-blue-600" />
                        <h4 className="font-medium text-blue-800">Diagnósticos</h4>
                      </div>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {diagnosticRules.map((rule, i) => (
                          <motion.div 
                            key={rule.id} 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-2 rounded border border-blue-100 text-sm"
                          >
                            <div className="line-clamp-1 mb-1">{rule.title}</div>
                            <div className="text-xs text-gray-500 mb-1">
                              Ativação: {rule.tagLogic === 'AND' ? 'Todas as tags' : 'Qualquer tag'}
                            </div>
                            {rule.inputTags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {rule.inputTags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs py-0 px-1 bg-blue-50">
                                    {tag}
                                    {i < rule.inputTags.length - 1 && rule.tagLogic === 'AND' && (
                                      <span className="ml-1">+</span>
                                    )}
                                    {i < rule.inputTags.length - 1 && rule.tagLogic === 'OR' && (
                                      <span className="ml-1">|</span>
                                    )}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                        {diagnosticRules.length === 0 && (
                          <div className="text-xs text-gray-500 p-2 bg-white rounded border border-gray-200">
                            Nenhum diagnóstico configurado
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center my-1">
                      <ArrowRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Treatment Plans */}
                  <div className="w-1/5">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Star size={16} className="text-amber-600" />
                        <h4 className="font-medium text-amber-800">Planos</h4>
                      </div>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {treatmentPlans.map((plan, i) => (
                          <motion.div 
                            key={plan.id} 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-2 rounded border border-amber-100 text-sm"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="line-clamp-1">{plan.name}</div>
                              <Badge variant="outline" className="text-xs">
                                {new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                }).format(plan.price)}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500 mb-1">
                              Ativação: {plan.tagLogic === 'AND' ? 'Todas as tags' : 'Qualquer tag'}
                            </div>
                            {plan.inputTags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {plan.inputTags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs py-0 px-1 bg-amber-50">
                                    {tag}
                                    {i < plan.inputTags.length - 1 && plan.tagLogic === 'AND' && (
                                      <span className="ml-1">+</span>
                                    )}
                                    {i < plan.inputTags.length - 1 && plan.tagLogic === 'OR' && (
                                      <span className="ml-1">|</span>
                                    )}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                        {treatmentPlans.length === 0 && (
                          <div className="text-xs text-gray-500 p-2 bg-white rounded border border-gray-200">
                            Nenhum plano configurado
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center my-1">
                      <ArrowRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Checkout */}
                  <div className="w-1/5">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard size={16} className="text-green-600" />
                        <h4 className="font-medium text-green-800">Checkout</h4>
                      </div>
                      <div className="p-3 bg-white rounded border border-green-100">
                        <div className="flex items-center justify-center mb-2">
                          <CreditCard size={24} className="text-green-500" />
                        </div>
                        <div className="text-center text-sm">
                          <p>Pagamento via Stripe</p>
                          <p className="text-xs text-gray-500 mt-1">O checkout receberá o plano selecionado</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {!isFlowComplete && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h3 className="flex items-center gap-2 text-amber-800 font-medium mb-2">
                  <AlertTriangle size={16} />
                  Problemas no Fluxo
                </h3>
                <ul className="space-y-2 text-sm text-amber-700">
                  {!hasQuestions && (
                    <li className="flex items-center gap-2">
                      <span>• Adicione pelo menos uma pergunta ao fluxo</span>
                    </li>
                  )}
                  {!hasDiagnosticRules && (
                    <li className="flex items-center gap-2">
                      <span>• Adicione pelo menos um diagnóstico ao fluxo</span>
                    </li>
                  )}
                  {!hasTreatmentPlans && (
                    <li className="flex items-center gap-2">
                      <span>• Adicione pelo menos um plano de tratamento ao fluxo</span>
                    </li>
                  )}
                  {hasQuestions && !hasTagsFromQuestions && (
                    <li className="flex items-center gap-2">
                      <span>• Configure tags de saída para as perguntas</span>
                    </li>
                  )}
                  {hasDiagnosticRules && !hasTagsForDiagnosis && (
                    <li className="flex items-center gap-2">
                      <span>• Configure tags de ativação para os diagnósticos</span>
                    </li>
                  )}
                  {hasTreatmentPlans && !hasTagsForPlans && (
                    <li className="flex items-center gap-2">
                      <span>• Configure tags de ativação para os planos</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
