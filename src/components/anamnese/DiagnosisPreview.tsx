
import { DiagnosisDisplay } from './DiagnosisDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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

interface DiagnosisPreviewProps {
  rule?: DiagnosticRule;
  isFullscreen?: boolean;
}

export function DiagnosisPreview({ rule, isFullscreen = false }: DiagnosisPreviewProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);
  
  if (!rule) {
    return (
      <Card className="text-center p-8 border-2 border-dashed border-gray-200 rounded-md">
        <CardContent className="pt-4">
          <FileText className="w-12 h-12 mx-auto text-gray-300" />
          <p className="text-gray-500 mt-4">
            Selecione ou crie uma regra de diagnóstico para visualizar o preview.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isFullscreen || showFullscreen) {
    return (
      <div className="relative">
        <DiagnosisDisplay
          title={rule.title}
          description={rule.description}
          phaseName={rule.phaseName}
          phaseDuration={rule.phaseDuration}
          imageUrl={rule.imageUrl}
          onContinue={() => setShowFullscreen(false)}
        />
        {!isFullscreen && (
          <div className="absolute top-4 right-4">
            <Button 
              variant="outline" 
              onClick={() => setShowFullscreen(false)}
              className="rounded-full bg-white/80 backdrop-blur-sm"
            >
              Fechar Preview
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className="border-2 border-blue-100 overflow-hidden shadow-md relative group">
      <CardContent className="p-0">
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Button 
            onClick={() => setShowFullscreen(true)} 
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Ver em tela cheia
          </Button>
        </div>
        
        <div className="bg-blue-600 text-white py-3 px-5">
          <h3 className="text-xl font-bold">{rule.title}</h3>
        </div>
        
        <div className="p-5 space-y-4">
          <div className="flex flex-col gap-4">
            {rule.imageUrl && (
              <div className="flex justify-center">
                <img 
                  src={rule.imageUrl}
                  alt="Diagnóstico"
                  className="max-h-[120px] object-contain rounded-md"
                />
              </div>
            )}
            
            <div className="text-gray-700 whitespace-pre-wrap text-sm line-clamp-4">
              {rule.description}
            </div>
            
            <div className="flex items-center px-3 py-2 bg-blue-50 rounded-md border border-blue-100">
              <FileText className="text-blue-700 mr-2" size={18} />
              <div>
                <p className="font-medium">{rule.phaseName}</p>
                {rule.phaseDuration && (
                  <p className="text-xs text-gray-600">{rule.phaseDuration}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
