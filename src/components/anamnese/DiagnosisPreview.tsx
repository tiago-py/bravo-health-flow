
import { DiagnosisDisplay } from './DiagnosisDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

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

  if (isFullscreen) {
    return (
      <DiagnosisDisplay
        title={rule.title}
        description={rule.description}
        phaseName={rule.phaseName}
        phaseDuration={rule.phaseDuration}
        imageUrl={rule.imageUrl}
        onContinue={() => {}}
      />
    );
  }

  return (
    <Card className="border-2 border-blue-100 overflow-hidden shadow-md">
      <CardContent className="p-0">
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
