
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Download } from 'lucide-react';
import { useState } from 'react';

const DoctorEvaluations = () => {
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  
  // Mock data for patients awaiting evaluation
  const pendingEvaluations = [
    {
      id: '1',
      name: 'João Silva',
      age: 32,
      date: '2023-03-25T14:30:00',
      type: 'queda-capilar',
      medicationStatus: 'habito' as const
    },
    {
      id: '3',
      name: 'André Costa',
      age: 28,
      date: '2023-03-24T16:45:00',
      type: 'queda-capilar',
      medicationStatus: 'atencao' as const
    },
    {
      id: '4',
      name: 'Ricardo Mendes',
      age: 37,
      date: '2023-03-24T09:20:00',
      type: 'disfuncao-eretil',
      medicationStatus: 'habito' as const
    },
    {
      id: '8',
      name: 'Fernando Santos',
      age: 39,
      date: '2023-03-23T13:45:00',
      type: 'queda-capilar',
      medicationStatus: 'habito' as const
    },
    {
      id: '9',
      name: 'Gabriel Lima',
      age: 26,
      date: '2023-03-23T08:30:00',
      type: 'disfuncao-eretil',
      medicationStatus: 'atencao' as const
    },
    {
      id: '11',
      name: 'Rafael Pereira',
      age: 31,
      date: '2023-03-22T11:15:00',
      type: 'disfuncao-eretil',
      medicationStatus: 'habito' as const
    },
  ];

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

  const handlePatientSelection = (patientId: string, checked: boolean) => {
    if (checked) {
      setSelectedPatients(prev => [...prev, patientId]);
    } else {
      setSelectedPatients(prev => prev.filter(id => id !== patientId));
    }
  };

  const handleSelectAll = (patients: typeof pendingEvaluations, checked: boolean) => {
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

  const renderPatientList = (patients: typeof pendingEvaluations, showTypeFilter = false) => (
    <div className="space-y-4">
      {patients.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={patients.every(p => selectedPatients.includes(p.id))}
              onCheckedChange={(checked) => handleSelectAll(patients, checked as boolean)}
            />
            <span className="text-sm font-medium">Selecionar todos</span>
          </div>
          {selectedPatients.length > 0 && (
            <Button 
              onClick={downloadExcel}
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Download size={16} />
              <span>Baixar Excel ({selectedPatients.length})</span>
            </Button>
          )}
        </div>
      )}
      
      {patients.map((patient) => (
        <div key={patient.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-gray-200 transition-all">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={selectedPatients.includes(patient.id)}
              onCheckedChange={(checked) => handlePatientSelection(patient.id, checked as boolean)}
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
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Clock size={14} className="mr-1" />
                <span>Enviado em {new Date(patient.date).toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>
          <Button asChild>
            <Link to={`/medico/paciente/${patient.id}`}>
              Avaliar
            </Link>
          </Button>
        </div>
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
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos ({pendingEvaluations.length})</TabsTrigger>
              <TabsTrigger value="hair">
                Queda Capilar ({pendingEvaluations.filter(p => p.type === 'queda-capilar').length})
              </TabsTrigger>
              <TabsTrigger value="ed">
                Disfunção Erétil ({pendingEvaluations.filter(p => p.type === 'disfuncao-eretil').length})
              </TabsTrigger>
              <TabsTrigger value="habitos">
                Hábitos ({pendingEvaluations.filter(p => p.medicationStatus === 'habito').length})
              </TabsTrigger>
              <TabsTrigger value="atencao">
                Atenção ({pendingEvaluations.filter(p => p.medicationStatus === 'atencao').length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {renderPatientList(pendingEvaluations, true)}
            </TabsContent>
            
            <TabsContent value="hair">
              {renderPatientList(pendingEvaluations.filter(p => p.type === 'queda-capilar'))}
            </TabsContent>
            
            <TabsContent value="ed">
              {renderPatientList(pendingEvaluations.filter(p => p.type === 'disfuncao-eretil'))}
            </TabsContent>
            
            <TabsContent value="habitos">
              {renderPatientList(pendingEvaluations.filter(p => p.medicationStatus === 'habito'))}
            </TabsContent>
            
            <TabsContent value="atencao">
              {renderPatientList(pendingEvaluations.filter(p => p.medicationStatus === 'atencao'))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorEvaluations;
