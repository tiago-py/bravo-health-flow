
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, ArrowRight, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features?: string[];
  interval?: string;
  tags?: string[];
}

interface CheckoutBlockProps {
  plan: Plan;
  onCheckout: () => Promise<void>;
  isLoading: boolean;
}

export function CheckoutBlock({ plan, onCheckout, isLoading }: CheckoutBlockProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      
      // In a real app, this would call the Stripe checkout endpoint
      // const { data } = await supabase.functions.invoke('create-checkout', {
      //   body: { planId: plan.id },
      // });
      
      // if (data?.url) {
      //   window.location.href = data.url;
      // }
      
      // For now, we'll simulate the checkout flow
      await onCheckout();
      toast.success('Checkout processado com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro ao processar o pagamento.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

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
            Finalize seu pedido
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-gray-600 mt-2"
          >
            Você está adquirindo o tratamento personalizado
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="border-2 border-green-100 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white">
              <CardTitle className="text-2xl flex justify-between items-start">
                <span>{plan.name}</span>
                <span className="text-green-100">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(plan.price)}
                  {plan.interval && <span className="text-sm">/{plan.interval}</span>}
                </span>
              </CardTitle>
              <p className="text-green-100 mt-1">{plan.description}</p>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="mt-4 space-y-3">
                <h3 className="font-medium">O que está incluído:</h3>
                <ul className="space-y-2">
                  {(plan.features || [
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
                onClick={handleCheckout} 
                disabled={isProcessing || isLoading}
                className="w-full py-6 text-lg font-medium bg-green-600 hover:bg-green-700 transition-all duration-300"
              >
                {isProcessing || isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2" size={18} />
                    Finalizar pagamento com Stripe
                  </>
                )}
              </Button>
              
              <div className="w-full text-center mt-4 text-sm text-gray-500">
                Pagamento processado de forma segura pela <span className="font-medium">Stripe</span>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
