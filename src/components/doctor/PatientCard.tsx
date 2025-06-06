
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Upload, Check } from 'lucide-react';
import { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  age: number;
  date: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  medicationStatus: 'habito' | 'atencao';
  isEvaluated?: boolean;
}

interface PatientCardProps {
  patient: Patient;
  isSelected: boolean;
  showTypeFilter?: boolean;
  onSelectionChange: (patientId: string, checked: boolean) => void;
  onEvaluate: (patient: Patient) => void;
}

const getMedicationStatusBadge = (status: 'habito' | 'atencao') => {
  switch (status) {
    case 'habito':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Hábito
        </Badge>
      );
    case 'atencao':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          Atenção
        </Badge>
      );
  }
};

const PatientCard = ({ 
  patient, 
  isSelected, 
  showTypeFilter = false, 
  onSelectionChange, 
  onEvaluate 
}: PatientCardProps) => {
  const [isEvaluated, setIsEvaluated] = useState(patient.isEvaluated || false);

  const handleUpload = () => {
    // Mock file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Upload da prescrição para paciente:', patient.name, 'arquivo:', file.name);
        // Aqui seria implementada a lógica de upload
      }
    };
    input.click();
  };

  const handleMarkAsEvaluated = () => {
    setIsEvaluated(true);
    console.log('Paciente marcado como avaliado:', patient.name);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200 transition-all">
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectionChange(patient.id, checked as boolean)}
        />
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-medium">{patient.name}</h3>
            <span className="text-sm text-gray-500 ml-2">{patient.age} anos</span>
            {getMedicationStatusBadge(patient.medicationStatus)}
            {showTypeFilter && (
              <Badge className="ml-2" variant="outline">
                {patient.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
              </Badge>
            )}
            {isEvaluated && (
              <div className="ml-2 flex items-center">
                <Check size={16} className="text-green-600" />
                <span className="text-xs text-green-600 ml-1">Avaliado</span>
              </div>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock size={14} className="mr-1" />
            <span>Enviado em {new Date(patient.date).toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleUpload}>
          <Upload size={14} className="mr-1" />
          Upload
        </Button>
        {!isEvaluated ? (
          <Button variant="outline" size="sm" onClick={handleMarkAsEvaluated}>
            <Check size={14} className="mr-1" />
            Avaliado
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled className="bg-green-50 text-green-600 border-green-200">
            <Check size={14} className="mr-1" />
            Avaliado
          </Button>
        )}
        <Button onClick={() => onEvaluate(patient)}>
          Avaliar
        </Button>
      </div>
    </div>
  );
};

export default PatientCard;
export type { Patient };
