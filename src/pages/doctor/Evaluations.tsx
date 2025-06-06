
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import PatientCard, { type Patient } from '@/components/doctor/PatientCard';
import PatientListHeader from '@/components/doctor/PatientListHeader';
import PatientEvaluationDialog from '@/components/doctor/PatientEvaluationDialog';
import EvaluationTabs from '@/components/doctor/EvaluationTabs';

const DoctorEvaluations = () => {
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Mock data for patients awaiting evaluation
  const pendingEvaluations: Patient[] = [
    {
      id: '1',
      name: 'João Silva',
      age: 32,
      date: '2023-03-25T14:30:00',
      type: 'queda-capilar',
      medicationStatus: 'habito'
    },
    {
      id: '3',
      name: 'André Costa',
      age: 28,
      date: '2023-03-24T16:45:00',
      type: 'queda-capilar',
      medicationStatus: 'atencao'
    },
    {
      id: '4',
      name: 'Ricardo Mendes',
      age: 37,
      date: '2023-03-24T09:20:00',
      type: 'disfuncao-eretil',
      medicationStatus: 'habito'
    },
    {
      id: '8',
      name: 'Fernando Santos',
      age: 39,
      date: '2023-03-23T13:45:00',
      type: 'queda-capilar',
      medicationStatus: 'habito'
    },
    {
      id: '9',
      name: 'Gabriel Lima',
      age: 26,
      date: '2023-03-23T08:30:00',
      type: 'disfuncao-eretil',
      medicationStatus: 'atencao'
    },
    {
      id: '11',
      name: 'Rafael Pereira',
      age: 31,
      date: '2023-03-22T11:15:00',
      type: 'disfuncao-eretil',
      medicationStatus: 'habito'
    },
  ];

  const handlePatientSelection = (patientId: string, checked: boolean) => {
    if (checked) {
      setSelectedPatients(prev => [...prev, patientId]);
    } else {
      setSelectedPatients(prev => prev.filter(id => id !== patientId));
    }
  };

  const handleSelectAll = (patients: Patient[], checked: boolean) => {
    if (checked) {
      const patientIds = patients.map(p => p.id);
      setSelectedPatients(prev => [...new Set([...prev, ...patientIds])]);
    } else {
      const patientIds = patients.map(p => p.id);
      setSelectedPatients(prev => prev.filter(id => !patientIds.includes(id)));
    }
  };

  const downloadExcel = () => {
    // Mock function to simulate Excel download
    const selectedPatientsData = pendingEvaluations.filter(p => selectedPatients.includes(p.id));
    
    // Create Excel-compatible content (tab-separated values)
    const excelContent = [
      ['Nome', 'Idade', 'Data', 'Tipo', 'Status Medicação'].join('\t'),
      ...selectedPatientsData.map(patient => [
        patient.name,
        patient.age.toString(),
        new Date(patient.date).toLocaleString('pt-BR'),
        patient.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil',
        patient.medicationStatus === 'habito' ? 'Hábito' : 'Atenção'
      ].join('\t'))
    ].join('\n');

    // Create and download file as Excel (.xls)
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `pacientes_selecionados_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Download Excel para pacientes:', selectedPatientsData);
  };

  const handleEvaluatePatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  const renderPatientList = (patients: Patient[], showTypeFilter = false) => (
    <div className="space-y-4">
      <PatientListHeader
        patients={patients}
        selectedPatients={selectedPatients}
        onSelectAll={handleSelectAll}
        onDownloadExcel={downloadExcel}
      />
      
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          isSelected={selectedPatients.includes(patient.id)}
          showTypeFilter={showTypeFilter}
          onSelectionChange={handlePatientSelection}
          onEvaluate={handleEvaluatePatient}
        />
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue">
            Fila de Avaliação
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie e avalie os pacientes aguardando consulta
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Aguardando Avaliação</CardTitle>
          <CardDescription>
            {pendingEvaluations.length} pacientes na fila de avaliação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EvaluationTabs
            patients={pendingEvaluations}
            renderPatientList={renderPatientList}
          />
        </CardContent>
      </Card>

      <PatientEvaluationDialog
        patient={selectedPatient}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default DoctorEvaluations;
