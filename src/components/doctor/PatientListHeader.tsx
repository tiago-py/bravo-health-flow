
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download } from 'lucide-react';
import type { Patient } from './PatientCard';

interface PatientListHeaderProps {
  patients: Patient[];
  selectedPatients: string[];
  onSelectAll: (patients: Patient[], checked: boolean) => void;
  onDownloadExcel: () => void;
}

const PatientListHeader = ({ 
  patients, 
  selectedPatients, 
  onSelectAll, 
  onDownloadExcel 
}: PatientListHeaderProps) => {
  if (patients.length === 0) return null;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={patients.every(p => selectedPatients.includes(p.id))}
          onCheckedChange={(checked) => onSelectAll(patients, checked as boolean)}
        />
        <span className="text-sm font-medium">Selecionar todos</span>
      </div>
      {selectedPatients.length > 0 && (
        <Button 
          onClick={onDownloadExcel}
          variant="outline"
          size="sm"
          className="flex items-center space-x-1"
        >
          <Download size={16} />
          <span>Baixar Excel ({selectedPatients.length})</span>
        </Button>
      )}
    </div>
  );
};

export default PatientListHeader;
