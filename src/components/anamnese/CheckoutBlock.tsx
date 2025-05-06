
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, ArrowRight, Clock, ShieldCheck, Tag as TagIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  interval?: string;
  tags?: string[];
  imageUrl?: string;
}

interface CheckoutBlockProps {
  plan: Plan;
  onCheckout: () => Promise<void>;
  isLoading?: boolean;
}

export function CheckoutBlock({ plan, onCheckout, isLoading = false }: CheckoutBlockProps) {
  const [processing, setProcessing] = useState(false);
  
  const handleCheckout = async () => {
    try {
      setProcessing(true);
      await onCheckout();
    } catch (error) {
      toast.error('Erro ao processar pagamento. Tente novamente.');
      console.error('Checkout error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-3xl font-bold text-gray-800"
          >
            Seu plano personalizado
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-gray-600 mt-2"
          >
            Baseado no seu diagnóstico, preparamos o plano ideal para você
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="border-2 border-blue-200 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-blue-100 mt-1">{plan.description}</p>
                </div>
                <Badge variant="secondary" className="bg-white text-blue-600 px-3 py-1">
                  Recomendado
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {plan.imageUrl && (
                <div className="h-48 w-full overflow-hidden rounded-md mb-4">
                  <img
                    src={plan.imageUrl}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-baseline">
                <span className="flex items-end">
                  <span className="text-4xl font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(plan.price)}
                  </span>
                  {plan.interval && (
                    <span className="text-gray-500 ml-1">/{plan.interval}</span>
                  )}
                </span>
                
                {plan.tags && plan.tags.length > 0 && (
                  <div className="flex gap-2">
                    {plan.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="flex items-center">
                        <TagIcon size={12} className="mr-1 text-blue-500" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-3 pt-4">
                <h3 className="font-medium text-gray-700">O que está incluído:</h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1), duration: 0.4 }}
                      className="flex items-start"
                    >
                      <Check className="text-green-500 mr-2 mt-0.5" size={18} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 flex flex-col md:flex-row items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <ShieldCheck size={18} className="mr-2 text-blue-500" />
                  <span>Pagamento 100% seguro</span>
                </div>
                <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300"></div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-2 text-blue-500" />
                  <span>Envio em até 24 horas</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="w-full"
              >
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading || processing}
                  className="w-full py-6 text-lg font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                >
                  {isLoading || processing ? (
                    "Processando..."
                  ) : (
                    <>
                      <CreditCard className="mr-2" size={20} />
                      Finalizar Compra
                      <ArrowRight className="ml-2" size={18} />
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
