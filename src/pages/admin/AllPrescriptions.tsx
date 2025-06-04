import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Calendar, Search, FileText, Download, Eye, UserCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const AllPrescriptions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<string[]>([]);
  
  // Mock prescriptions data with doctor info
  const allPrescriptions = [
    {
      id: '1',
      patientName: 'João Silva',
      patientAge: 32,
      doctorName: 'Dr. Carlos Mendes',
      doctorCRM: 'CRM/SP 123456',
      evaluationDate: '2023-03-25',
      uploadDate: '2023-03-25',
      type: 'queda-capilar',
      observations: 'Paciente apresenta alopecia androgenética grau 3. Indicado tratamento com finasterida e minoxidil.',
      prescriptionFile: 'prescricao_joao_silva_25032023.pdf'
    },
    {
      id: '2',
      patientName: 'Marcos Oliveira',
      patientAge: 45,
      doctorName: 'Dr. Ana Santos',
      doctorCRM: 'CRM/RJ 789012',
      evaluationDate: '2023-03-25',
      uploadDate: '2023-03-26',
      type: 'disfuncao-eretil',
      observations: 'Paciente relata dificuldades de ereção há 6 meses. Indicado tadalafila 5mg.',
      prescriptionFile: 'prescricao_marcos_oliveira_25032023.pdf'
    },
    {
      id: '3',
      patientName: 'André Costa',
      patientAge: 28,
      doctorName: 'Dr. Carlos Mendes',
      doctorCRM: 'CRM/SP 123456',
      evaluationDate: '2023-03-24',
      uploadDate: '2023-03-24',
      type: 'queda-capilar',
      observations: 'Início de calvície masculina. Tratamento preventivo com finasterida.',
      prescriptionFile: 'prescricao_andre_costa_24032023.pdf'
    },
    {
      id: '4',
      patientName: 'Carlos Eduardo',
      patientAge: 41,
      doctorName: 'Dr. Roberto Silva',
      doctorCRM: 'CRM/MG 345678',
      evaluationDate: '2023-03-23',
      uploadDate: '2023-03-23',
      type: 'disfuncao-eretil',
      observations: 'DE moderada. Prescrito sildenafila 50mg conforme necessário.',
      prescriptionFile: 'prescricao_carlos_eduardo_23032023.pdf'
    },
    {
      id: '5',
      patientName: 'Paulo Vieira',
      patientAge: 35,
      doctorName: 'Dr. Ana Santos',
      doctorCRM: 'CRM/RJ 789012',
      evaluationDate: '2023-03-22',
      uploadDate: '2023-03-23',
      type: 'queda-capilar',
      observations: 'Calvície avançada. Combinação de finasterida 1mg e minoxidil 5%.',
      prescriptionFile: 'prescricao_paulo_vieira_22032023.pdf'
    },
  ];
  
  // Filter prescriptions based on search query and filters
  const filteredPrescriptions = allPrescriptions.filter(prescription => {
    // Search filter (patient name or doctor name)
    const matchesSearch = 
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = typeFilter === 'all' || prescription.type === typeFilter;
    
    // Date range filter (based on upload date)
    let matchesDateRange = true;
    const uploadDate = new Date(prescription.uploadDate);
    
    if (startDate) {
      const start = new Date(startDate);
      matchesDateRange = matchesDateRange && uploadDate >= start;
    }
    
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include the entire end date
      matchesDateRange = matchesDateRange && uploadDate <= end;
    }
    
    return matchesSearch && matchesType && matchesDateRange;
  });

  const handleDownload = (filename: string) => {
    console.log('Downloading:', filename);
  };

  const handleView = (filename: string) => {
    console.log('Viewing:', filename);
  };

  const handleSelectPrescription = (prescriptionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPrescriptions([...selectedPrescriptions, prescriptionId]);
    } else {
      setSelectedPrescriptions(selectedPrescriptions.filter(id => id !== prescriptionId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPrescriptions(filteredPrescriptions.map(p => p.id));
    } else {
      setSelectedPrescriptions([]);
    }
  };

  const handleDownloadSelected = () => {
    const selectedFiles = filteredPrescriptions
      .filter(p => selectedPrescriptions.includes(p.id))
      .map(p => p.prescriptionFile);
    
    console.log('Downloading selected prescriptions:', selectedFiles);
    // Aqui você implementaria o download em lote dos PDFs
  };

  const isAllSelected = filteredPrescriptions.length > 0 && 
    filteredPrescriptions.every(p => selectedPrescriptions.includes(p.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#58819d] mb-2">
          Todas as Prescrições
        </h1>
        <p className="text-gray-600">
          Visualize e gerencie todas as prescrições dos médicos
        </p>
      </div>
      
      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre por paciente, tipo de tratamento ou período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="sm:col-span-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar por paciente ou médico..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="start-date" className="text-sm font-medium">Data Início</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="end-date" className="text-sm font-medium">Data Fim</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Tipo</Label>
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="queda-capilar">Queda Capilar</SelectItem>
                  <SelectItem value="disfuncao-eretil">Disfunção Erétil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Results */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Prescrições</CardTitle>
            <div className="flex items-center gap-4">
              {selectedPrescriptions.length > 0 && (
                <Button
                  onClick={handleDownloadSelected}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Baixar Selecionados ({selectedPrescriptions.length})
                </Button>
              )}
              <span className="text-sm text-gray-500">
                {filteredPrescriptions.length} {filteredPrescriptions.length === 1 ? 'prescrição' : 'prescrições'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPrescriptions.length > 0 ? (
            <div className="space-y-4">
              {/* Desktop Table */}
              <div className="hidden xl:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={handleSelectAll}
                          aria-label="Selecionar todos"
                        />
                      </TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Médico</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data Upload</TableHead>
                      <TableHead>Observações</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrescriptions.map(prescription => (
                      <TableRow key={prescription.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedPrescriptions.includes(prescription.id)}
                            onCheckedChange={(checked) => handleSelectPrescription(prescription.id, checked as boolean)}
                            aria-label={`Selecionar prescrição de ${prescription.patientName}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User size={16} className="mr-2 text-gray-400" />
                            <div>
                              <div className="font-medium">{prescription.patientName}</div>
                              <div className="text-sm text-gray-500">{prescription.patientAge} anos</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <UserCheck size={16} className="mr-2 text-gray-400" />
                            <div>
                              <div className="font-medium">{prescription.doctorName}</div>
                              <div className="text-sm text-gray-500">{prescription.doctorCRM}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {prescription.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            {new Date(prescription.uploadDate).toLocaleDateString('pt-BR')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="text-sm text-gray-600 truncate" title={prescription.observations}>
                              {prescription.observations}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(prescription.prescriptionFile)}
                            >
                              <Eye size={14} className="mr-1" />
                              Ver
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(prescription.prescriptionFile)}
                            >
                              <Download size={14} className="mr-1" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile/Tablet Cards */}
              <div className="xl:hidden space-y-4">
                {filteredPrescriptions.map(prescription => (
                  <Card key={prescription.id}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedPrescriptions.includes(prescription.id)}
                              onCheckedChange={(checked) => handleSelectPrescription(prescription.id, checked as boolean)}
                              aria-label={`Selecionar prescrição de ${prescription.patientName}`}
                            />
                            <div className="flex items-center">
                              <User size={16} className="mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">{prescription.patientName}</div>
                                <div className="text-sm text-gray-500">{prescription.patientAge} anos</div>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">
                            {prescription.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center">
                          <UserCheck size={16} className="mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium text-sm">{prescription.doctorName}</div>
                            <div className="text-xs text-gray-500">{prescription.doctorCRM}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={14} className="mr-1 text-gray-400" />
                          Upload: {new Date(prescription.uploadDate).toLocaleDateString('pt-BR')}
                        </div>
                        
                        <p className="text-sm text-gray-600">{prescription.observations}</p>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(prescription.prescriptionFile)}
                            className="flex-1"
                          >
                            <Eye size={14} className="mr-1" />
                            Ver
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(prescription.prescriptionFile)}
                            className="flex-1"
                          >
                            <Download size={14} className="mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">Nenhuma prescrição encontrada</p>
              <p className="text-sm text-gray-400">
                Nenhuma prescrição encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllPrescriptions;
