
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, User, Mail, Phone, Edit, MoreVertical, Shield, Plus, AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DoctorStatus = 'active' | 'inactive' | 'pending';

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  crm: string;
  specialty: string;
  status: DoctorStatus;
  patientsCount: number;
  joinedDate: string;
}

// Mock data
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    email: 'joao.silva@bravo.com.br',
    phone: '(11) 99999-1234',
    crm: 'CRM-SP 123456',
    specialty: 'Dermatologia',
    status: 'active',
    patientsCount: 47,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Dra. Maria Santos',
    email: 'maria.santos@bravo.com.br',
    phone: '(11) 98888-5678',
    crm: 'CRM-SP 654321',
    specialty: 'Urologia',
    status: 'active',
    patientsCount: 32,
    joinedDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Dr. Carlos Oliveira',
    email: 'carlos.oliveira@bravo.com.br',
    phone: '(11) 97777-9012',
    crm: 'CRM-RJ 789012',
    specialty: 'Endocrinologia',
    status: 'pending',
    patientsCount: 0,
    joinedDate: '2024-06-01'
  },
  {
    id: '4',
    name: 'Dra. Ana Costa',
    email: 'ana.costa@bravo.com.br',
    phone: '(11) 96666-3456',
    crm: 'CRM-SP 345678',
    specialty: 'Dermatologia',
    status: 'inactive',
    patientsCount: 28,
    joinedDate: '2022-11-10'
  }
];

const AdminDoctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    crm: '',
    specialty: '',
    status: 'pending' as Doctor['status']
  });

  // Load mock data instead of API call
  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    
    // Simulate loading delay
    setTimeout(() => {
      setDoctors(mockDoctors);
      setLoading(false);
    }, 500);
  };

  const createDoctor = async (doctorData: any) => {
    const newDoctor: Doctor = {
      id: Date.now().toString(),
      ...doctorData,
      patientsCount: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    setDoctors(prev => [...prev, newDoctor]);
    return newDoctor;
  };

  const updateDoctor = async (id: string, doctorData: any) => {
    setDoctors(prev => prev.map(doctor => 
      doctor.id === id ? { ...doctor, ...doctorData } : doctor
    ));
  };

  const deleteDoctor = async (id: string) => {
    setDoctors(prev => prev.filter(doctor => doctor.id !== id));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter doctors based on search query and status filter
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.crm.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor.id, formData);
      } else {
        await createDoctor(formData);
      }
      
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar médico');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      crm: '',
      specialty: '',
      status: 'pending'
    });
    setEditingDoctor(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      crm: doctor.crm,
      specialty: doctor.specialty,
      status: doctor.status
    });
    setIsDialogOpen(true);
  };
  
  const getStatusBadge = (status: Doctor['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pendente</Badge>;
      default:
        return null;
    }
  };
  
  // Doctor actions
  const activateDoctor = async (doctorId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const doctor = doctors.find(d => d.id === doctorId);
      if (doctor) {
        await updateDoctor(doctorId, { ...doctor, status: 'active' });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao ativar médico');
    } finally {
      setLoading(false);
    }
  };
  
  const deactivateDoctor = async (doctorId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const doctor = doctors.find(d => d.id === doctorId);
      if (doctor) {
        await updateDoctor(doctorId, { ...doctor, status: 'inactive' });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao desativar médico');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este médico?')) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await deleteDoctor(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar médico');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Médicos</h1>
          <p className="text-gray-600">
            Gerencie os médicos cadastrados na plataforma
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={fetchDoctors}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Atualizar'}
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingDoctor(null)} disabled={loading}>
                <Plus className="mr-2" size={16} />
                Adicionar Médico
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>
                  {editingDoctor ? 'Editar Médico' : 'Novo Médico'}
                </DialogTitle>
                <DialogDescription>
                  {editingDoctor ? 'Edite as informações do médico.' : 'Adicione um novo médico à plataforma.'}
                </DialogDescription>
              </DialogHeader>
              <div>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Dr. João Silva"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@bravo.com.br"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="crm">CRM</Label>
                      <Input
                        id="crm"
                        value={formData.crm}
                        onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                        placeholder="CRM-SP 123456"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="specialty">Especialidade</Label>
                      <Select 
                        value={formData.specialty} 
                        onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                          <SelectItem value="Urologia">Urologia</SelectItem>
                          <SelectItem value="Endocrinologia">Endocrinologia</SelectItem>
                          <SelectItem value="Clínica Geral">Clínica Geral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={formData.status} 
                        onValueChange={(value) => setFormData({ ...formData, status: value as Doctor['status'] })}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Salvando...' : editingDoctor ? 'Salvar Alterações' : 'Criar Médico'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre e pesquise médicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar por nome, email ou CRM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Doctors List */}
      <div className="space-y-4">
        {filteredDoctors.map(doctor => (
          <Card key={doctor.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium text-lg">{doctor.name}</h3>
                    <span className="ml-3">{getStatusBadge(doctor.status)}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail size={14} className="mr-1" />
                      {doctor.email}
                    </div>
                    <div className="flex items-center">
                      <Phone size={14} className="mr-1" />
                      {doctor.phone}
                    </div>
                    <div className="flex items-center">
                      <Shield size={14} className="mr-1" />
                      {doctor.crm}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">{doctor.specialty}</Badge>
                    <Badge variant="outline">{doctor.patientsCount} pacientes</Badge>
                    <Badge variant="outline">
                      Desde {new Date(doctor.joinedDate).toLocaleDateString('pt-BR')}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(doctor)}
                    disabled={loading}
                  >
                    <Edit size={16} className="mr-2" />
                    Editar
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" disabled={loading}>
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {doctor.status === 'active' ? (
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => deactivateDoctor(doctor.id)}
                        >
                          Desativar médico
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          className="text-green-600" 
                          onClick={() => activateDoctor(doctor.id)}
                        >
                          Ativar médico
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        className="text-red-600" 
                        onClick={() => handleDelete(doctor.id)}
                      >
                        Deletar médico
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {doctors.length === 0 
                ? 'Nenhum médico encontrado.' 
                : 'Nenhum médico encontrado com os filtros selecionados.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDoctors;
