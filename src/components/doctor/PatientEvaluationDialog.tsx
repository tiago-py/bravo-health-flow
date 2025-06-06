
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Upload, Check } from 'lucide-react';
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

  const handleUploadPrescription = () => {
    // Mock file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Upload da prescrição:', file.name);
        // Aqui seria implementada a lógica de upload
      }
    };
    input.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações do Paciente - Dados Básicos */}
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Informações do Paciente</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <p className="text-sm text-gray-600 mb-4">Dados pessoais</p>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Nome</span>
                      <p className="text-sm">{patient.name}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Idade</span>
                      <p className="text-sm">{patient.age} anos</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Data de nascimento</span>
                      <p className="text-sm">09/05/1990</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">E-mail</span>
                      <p className="text-sm">joao.silva@email.com</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Telefone</span>
                      <p className="text-sm">(11) 98765-4321</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Altura</span>
                      <p className="text-sm">178 cm</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Peso</span>
                      <p className="text-sm">75 kg</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Data da anamnese</span>
                      <p className="text-sm">25/03/2023, 14:30:00</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Tipo de tratamento</span>
                      <p className="text-sm">{patient.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Respostas da Anamnese */}
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Respostas da Anamnese</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <p className="text-sm text-gray-600 mb-4">Respostas fornecidas pelo paciente</p>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Há quanto tempo você percebeu a queda capilar?</span>
                      <p className="text-sm mt-1">Entre 1 e 3 anos</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Como você classificaria seu padrão de queda?</span>
                      <p className="text-sm mt-1">Entradas (recuo da linha frontal)</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Existe histórico de calvície na sua família?</span>
                      <p className="text-sm mt-1">Sim, do lado paterno</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Já realizou algum tratamento para queda capilar anteriormente?</span>
                      <p className="text-sm mt-1">Tentei usar minoxidil por conta própria por cerca de 2 meses, mas não tive paciência para continuar.</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Você tem alguma alergia?</span>
                      <p className="text-sm mt-1">Não</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Você tem alguma condição médica?</span>
                      <p className="text-sm mt-1">Não</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      {getMedicationStatusBadge(patient.medicationStatus)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-between pt-4 border-t">
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleUploadPrescription}>
                  <Upload size={16} className="mr-2" />
                  Upload Prescrição
                </Button>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Fechar
                </Button>
                <Button onClick={handleSaveEvaluation}>
                  Salvar Avaliação
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PatientEvaluationDialog;
