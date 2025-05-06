
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText } from 'lucide-react';

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
    <Card className="border-2 border-blue-100 shadow-md">
      <CardHeader className="bg-blue-50 pb-3">
        <CardTitle className="text-xl text-blue-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {imageUrl && (
            <div className="md:w-1/3 flex justify-center">
              <img 
                src={imageUrl}
                alt="Diagnóstico"
                className="max-h-[180px] object-contain rounded-md"
              />
            </div>
          )}
          
          <div className={imageUrl ? "md:w-2/3" : "w-full"}>
            <div className="mb-4 text-gray-700 whitespace-pre-wrap">
              {description}
            </div>
            
            <div className="flex items-center px-3 py-2 bg-blue-50 rounded-md border border-blue-100">
              <FileText className="text-blue-700 mr-2" size={18} />
              <div>
                <p className="font-medium">{phaseName}</p>
                {phaseDuration && (
                  <p className="text-sm text-gray-600">{phaseDuration}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-center">
        <Button onClick={onContinue} className="w-full max-w-md">
          Ver plano recomendado
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}
