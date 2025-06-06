
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import type { Patient } from './PatientCard';

interface PatientEvaluationDialogProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
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

const PatientEvaluationDialog = ({ patient, isOpen, onClose }: PatientEvaluationDialogProps) => {
  const handleSaveEvaluation = () => {
    if (patient) {
      console.log('Avaliação salva para paciente:', patient.name);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Avaliar Paciente</DialogTitle>
        </DialogHeader>
        
        {patient && (
          <div className="space-y-6">
            {/* Informações do Paciente */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold">{patient.name}</h3>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-600">{patient.age} anos</span>
                {getMedicationStatusBadge(patient.medicationStatus)}
                <Badge variant="outline">
                  {patient.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Clock size={14} className="mr-1" />
                <span>Enviado em {new Date(patient.date).toLocaleString('pt-BR')}</span>
              </div>
            </div>

            {/* Área de Avaliação */}
            <div className="space-y-4">
              <h4 className="font-medium">Dados da Consulta</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  Aqui você pode visualizar e avaliar os dados do paciente. 
                  Esta é uma versão simplificada da avaliação.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Tratamento
                    </label>
                    <p className="text-sm">
                      {patient.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status Medicação
                    </label>
                    <p className="text-sm">
                      {patient.medicationStatus === 'habito' ? 'Hábito' : 'Atenção'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    Para uma avaliação completa, acesse o sistema de prontuário.
                  </p>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
              <Button onClick={handleSaveEvaluation}>
                Salvar Avaliação
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PatientEvaluationDialog;
