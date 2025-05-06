
import { DiagnosisDisplay } from './DiagnosisDisplay';

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
}

export function DiagnosisPreview({ rule }: DiagnosisPreviewProps) {
  if (!rule) {
    return (
      <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-md">
        <p className="text-gray-500">
          Selecione ou crie uma regra de diagnóstico para visualizar o preview.
        </p>
      </div>
    );
  }

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
