
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface DiagnosisDisplayProps {
  title: string;
  description: string;
  phaseName: string;
  phaseDuration?: string;
  imageUrl?: string;
  onContinue: () => void;
}

export function DiagnosisDisplay({
  title,
  description,
  phaseName,
  phaseDuration,
  imageUrl,
  onContinue
}: DiagnosisDisplayProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-10 md:py-16 bg-gradient-to-b from-blue-50 to-white"
    >
      <Card className="border-2 border-blue-100 shadow-lg max-w-3xl w-full overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-blue-600 text-white py-6 px-8">
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold mb-2"
            >
              {title}
            </motion.h2>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {imageUrl && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="md:w-1/3 flex justify-center"
                >
                  <img 
                    src={imageUrl}
                    alt="Diagnóstico"
                    className="max-h-[220px] object-contain rounded-md shadow-md"
                  />
                </motion.div>
              )}
              
              <div className={imageUrl ? "md:w-2/3" : "w-full"}>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-8 text-gray-700 whitespace-pre-wrap text-lg leading-relaxed"
                >
                  {description}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex items-center px-5 py-4 bg-blue-50 rounded-md border border-blue-100"
                >
                  <FileText className="text-blue-700 mr-3" size={24} />
                  <div>
                    <p className="font-medium text-lg text-blue-800">{phaseName}</p>
                    {phaseDuration && (
                      <p className="text-sm text-blue-700">{phaseDuration}</p>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-8 pt-4 flex justify-center bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="w-full"
          >
            <Button 
              onClick={onContinue} 
              className="w-full max-w-md mx-auto py-6 text-lg font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            >
              Ver plano recomendado
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
