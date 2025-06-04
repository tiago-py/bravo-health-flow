import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Calendar, Search, FileText, Download, Eye, UserCheck, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Prescription {
  id: string;
  patientName: string;
  patientAge: number;
  doctorName: string;
  doctorCRM: string;
  type: 'queda-capilar' | 'disfuncao-eretil';
  uploadDate: string;
  observations: string;
  prescriptionFile: string;
}

// Mock data
const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientName: 'João Silva Santos',
    patientAge: 32,
    doctorName: 'Dr. Carlos Oliveira',
    doctorCRM: 'CRM-SP 123456',
    type: 'queda-capilar',
    uploadDate: '2024-06-03',
    observations: 'Paciente apresenta alopecia androgenética grau 3. Indicado tratamento com finasterida 1mg e minoxidil 5%.',
    prescriptionFile: 'prescricao_joao_silva_03062024.pdf'
  },
  {
    id: '2',
    patientName: 'Maria Oliveira Costa',
    patientAge: 28,
    doctorName: 'Dra. Ana Santos',
    doctorCRM: 'CRM-RJ 654321',
    type: 'disfuncao-eretil',
    uploadDate: '2024-06-02',
    observations: 'Paciente relata dificuldades de ereção há 4 meses. Prescrito tadalafila 5mg uso diário.',
    prescriptionFile: 'prescricao_maria_costa_02062024.pdf'
  },
  {
    id: '3',
    patientName: 'Carlos Eduardo Lima',
    patientAge: 45,
    doctorName: 'Dr. Pedro Martins',
    doctorCRM: 'CRM-SP 789012',
    type: 'queda-capilar',
    uploadDate: '2024-06-01',
    observations: 'Calvície em estágio inicial. Tratamento preventivo com finasterida 1mg.',
    prescriptionFile: 'prescricao_carlos_lima_01062024.pdf'
  },
  {
    id: '4',
    patientName: 'Roberto Almeida',
    patientAge: 38,
    doctorName: 'Dr. Carlos Oliveira',
    doctorCRM: 'CRM-SP 123456',
    type: 'disfuncao-eretil',
    uploadDate: '2024-05-31',
    observations: 'DE moderada. Prescrito sildenafila 50mg conforme necessário.',
    prescriptionFile: 'prescricao_roberto_almeida_31052024.pdf'
  },
  {
    id: '5',
    patientName: 'André Costa Silva',
    patientAge: 29,
    doctorName: 'Dra. Ana Santos',
    doctorCRM: 'CRM-RJ 654321',
    type: 'queda-capilar',
    uploadDate: '2024-05-30',
    observations: 'Alopecia androgenética inicial. Kit completo com finasterida + minoxidil.',
    prescriptionFile: 'prescricao_andre_silva_30052024.pdf'
  },
  {
    id: '6',
    patientName: 'Paulo Henrique Vieira',
    patientAge: 41,
    doctorName: 'Dr. Pedro Martins',
    doctorCRM: 'CRM-SP 789012',
    type: 'disfuncao-eretil',
    uploadDate: '2024-05-29',
    observations: 'Disfunção erétil severa. Tadalafila 20mg conforme necessário.',
    prescriptionFile: 'prescricao_paulo_vieira_29052024.pdf'
  }
];

const AllPrescriptions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<string[]>([]);
  const [downloadingMass, setDownloadingMass] = useState(false);

  // Fetch prescriptions (mock data)
  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate loading delay
      setTimeout(() => {
        setPrescriptions(mockPrescriptions);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error('Erro ao buscar prescrições:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar prescrições');
      setLoading(false);
    }
  };

  // Load prescriptions on component mount
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // Get unique doctors for filter
  const uniqueDoctors = Array.from(new Set(prescriptions.map(p => p.doctorName)));
  
  // Filter prescriptions based on search query and filters
  const filteredPrescriptions = prescriptions.filter(prescription => {
    // Search filter (patient name or doctor name)
    const matchesSearch = 
      prescription.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.doctorName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = typeFilter === 'all' || prescription.type === typeFilter;
    
    // Doctor filter
    const matchesDoctor = doctorFilter === 'all' || prescription.doctorName === doctorFilter;
    
    // Date filter (based on upload date)
    let matchesDate = true;
    if (prescription.uploadDate && dateFilter !== 'all') {
      const uploadDate = new Date(prescription.uploadDate);
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      if (dateFilter === 'today') {
        matchesDate = uploadDate.toDateString() === today.toDateString();
      } else if (dateFilter === 'week') {
        matchesDate = uploadDate >= lastWeek;
      } else if (dateFilter === 'month') {
        matchesDate = uploadDate >= lastMonth;
      }
    }
    
    return matchesSearch && matchesType && matchesDoctor && matchesDate;
  });

  // Handle individual prescription selection
  const handleSelectPrescription = (prescriptionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPrescriptions(prev => [...prev, prescriptionId]);
    } else {
      setSelectedPrescriptions(prev => prev.filter(id => id !== prescriptionId));
    }
  };

  // Handle select all toggle
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPrescriptions(filteredPrescriptions.map(p => p.id));
    } else {
      setSelectedPrescriptions([]);
    }
  };

  // Handle mass download
  const handleMassDownload = async () => {
    if (selectedPrescriptions.length === 0) {
      alert('Selecione pelo menos uma prescrição para download');
      return;
    }

    try {
      setDownloadingMass(true);
      
      // Simulate mass download
      const selectedFiles = prescriptions
        .filter(p => selectedPrescriptions.includes(p.id))
        .map(p => p.prescriptionFile);
      
      console.log('Downloading files:', selectedFiles);
      
      // Mock download delay
      setTimeout(() => {
        alert(`Download iniciado para ${selectedPrescriptions.length} prescrições`);
        setSelectedPrescriptions([]);
        setDownloadingMass(false);
      }, 1000);
    } catch (err) {
      console.error('Erro no download em massa:', err);
      alert('Erro ao fazer download em massa');
      setDownloadingMass(false);
    }
  };

  // Download prescription file (mock)
  const handleDownload = async (prescriptionId: string, filename: string) => {
    try {
      // Mock download functionality
      console.log('Downloading prescription:', prescriptionId, filename);
      alert(`Download iniciado: ${filename}`);
    } catch (err) {
      console.error('Erro ao baixar arquivo:', err);
      alert('Erro ao baixar arquivo');
    }
  };

  // View prescription file (mock)
  const handleView = async (prescriptionId: string) => {
    try {
      // Mock view functionality  
      console.log('Viewing prescription:', prescriptionId);
      alert('Visualizando prescrição...');
    } catch (err) {
      console.error('Erro ao visualizar arquivo:', err);
      alert('Erro ao visualizar arquivo');
    }
  };

  // Retry loading
  const handleRetry = () => {
    fetchPrescriptions();
  };

  if (loading) {
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
        
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#58819d] mb-4" />
              <p className="text-gray-600">Carregando prescrições...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
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
        
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex items-center justify-between">
              <span>Erro ao carregar prescrições: {error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetry}
                className="ml-4"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Tentar novamente
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#58819d] mb-2">
            Todas as Prescrições
          </h1>
          <p className="text-gray-600">
            Visualize e gerencie todas as prescrições dos médicos
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedPrescriptions.length > 0 && (
            <Button 
              onClick={handleMassDownload}
              disabled={downloadingMass}
              className="bg-[#58819d] hover:bg-[#4a6d84]"
            >
              {downloadingMass ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-1" />
              )}
              Download ({selectedPrescriptions.length})
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={handleRetry}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre por paciente, médico, tipo de tratamento ou data de upload
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
              <Select
                value={doctorFilter}
                onValueChange={setDoctorFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Médico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os médicos</SelectItem>
                  {uniqueDoctors.map(doctor => (
                    <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="queda-capilar">Queda Capilar</SelectItem>
                  <SelectItem value="disfuncao-eretil">Disfunção Erétil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={dateFilter}
                onValueChange={setDateFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Data upload" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as datas</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
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
              {filteredPrescriptions.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedPrescriptions.length === filteredPrescriptions.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="text-sm font-medium">
                    Selecionar todos
                  </label>
                </div>
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
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700 w-10">
                          <Checkbox
                            checked={selectedPrescriptions.length === filteredPrescriptions.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Paciente</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Médico</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Data Upload</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Observações</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPrescriptions.map(prescription => (
                        <tr key={prescription.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <Checkbox
                              checked={selectedPrescriptions.includes(prescription.id)}
                              onCheckedChange={(checked) => handleSelectPrescription(prescription.id, !!checked)}
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <User size={16} className="mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">{prescription.patientName}</div>
                                <div className="text-sm text-gray-500">{prescription.patientAge} anos</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <UserCheck size={16} className="mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">{prescription.doctorName}</div>
                                <div className="text-sm text-gray-500">{prescription.doctorCRM}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">
                              {prescription.type === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center text-sm">
                              <Calendar size={14} className="mr-1 text-gray-400" />
                              {prescription.uploadDate ? new Date(prescription.uploadDate).toLocaleDateString('pt-BR') : 'N/A'}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="max-w-xs">
                              <p className="text-sm text-gray-600 truncate" title={prescription.observations}>
                                {prescription.observations || 'Sem observações'}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleView(prescription.id)}
                              >
                                <Eye size={14} className="mr-1" />
                                Ver
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownload(prescription.id, prescription.prescriptionFile)}
                              >
                                <Download size={14} className="mr-1" />
                                Download
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile/Tablet Cards */}
              <div className="xl:hidden space-y-4">
                {filteredPrescriptions.map(prescription => (
                  <Card key={prescription.id} className={selectedPrescriptions.includes(prescription.id) ? 'ring-2 ring-[#58819d]' : ''}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedPrescriptions.includes(prescription.id)}
                              onCheckedChange={(checked) => handleSelectPrescription(prescription.id, !!checked)}
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
                          Upload: {prescription.uploadDate ? new Date(prescription.uploadDate).toLocaleDateString('pt-BR') : 'N/A'}
                        </div>
                        
                        <p className="text-sm text-gray-600">{prescription.observations || 'Sem observações'}</p>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(prescription.id)}
                            className="flex-1"
                          >
                            <Eye size={14} className="mr-1" />
                            Ver
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(prescription.id, prescription.prescriptionFile)}
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
                {prescriptions.length === 0 
                  ? 'Nenhuma prescrição cadastrada no sistema.'
                  : 'Nenhuma prescrição encontrada com os filtros selecionados.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllPrescriptions;
