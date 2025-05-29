import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Search, User, Mail, Phone, Edit, MoreVertical, Shield, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  crm: string;
  specialty: string;
  status: 'active' | 'inactive' | 'pending';
  patientsCount: number;
  joinedDate: string;
}

interface AddDoctorForm {
  name: string;
  email: string;
  phone: string;
  crm: string;
  specialty: string;
}

const AdminDoctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const form = useForm<AddDoctorForm>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      crm: '',
      specialty: '',
    },
  });
  
  // Mock doctors data
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Bruno Almeida',
      email: 'bruno.almeida@bravohomem.com',
      phone: '(11) 98765-4321',
      crm: 'CRM/SP 123456',
      specialty: 'Dermatologia',
      status: 'active',
      patientsCount: 152,
      joinedDate: '2022-06-15'
    },
    {
      id: '2',
      name: 'Dra. Carla Santos',
      email: 'carla.santos@bravohomem.com',
      phone: '(11) 97654-3210',
      crm: 'CRM/SP 234567',
      specialty: 'Urologia',
      status: 'active',
      patientsCount: 98,
      joinedDate: '2022-08-22'
    },
    {
      id: '3',
      name: 'Dr. Roberto Oliveira',
      email: 'roberto.oliveira@bravohomem.com',
      phone: '(11) 96543-2109',
      crm: 'CRM/RJ 345678',
      specialty: 'Dermatologia',
      status: 'inactive',
      patientsCount: 43,
      joinedDate: '2022-11-10'
    },
    {
      id: '4',
      name: 'Dr. André Costa',
      email: 'andre.costa@bravohomem.com',
      phone: '(21) 95432-1098',
      crm: 'CRM/RJ 456789',
      specialty: 'Urologia',
      status: 'pending',
      patientsCount: 0,
      joinedDate: '2023-03-05'
    }
  ];
  
  // Filter doctors based on search query and status filter
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.crm.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Helper function to get status badge
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
  const activateDoctor = (doctorId: string) => {
    toast.success('Médico ativado com sucesso.');
  };
  
  const deactivateDoctor = (doctorId: string) => {
    toast.success('Médico desativado com sucesso.');
  };
  
  const editDoctor = (doctorId: string) => {
    toast.info('Funcionalidade de edição em desenvolvimento.');
  };

  const onSubmit = (data: AddDoctorForm) => {
    console.log('Dados do médico:', data);
    toast.success('Médico adicionado com sucesso!');
    setIsModalOpen(false);
    form.reset();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">Médicos</h1>
          <p className="text-gray-600">
            Gerencie os médicos cadastrados na plataforma
          </p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Médico
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Médico</DialogTitle>
              <DialogDescription>
                Preencha os dados do médico para adicionar à plataforma.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="joao@bravohomem.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-9999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="crm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CRM</FormLabel>
                      <FormControl>
                        <Input placeholder="CRM/SP 123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a especialidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                          <SelectItem value="Urologia">Urologia</SelectItem>
                          <SelectItem value="Endocrinologia">Endocrinologia</SelectItem>
                          <SelectItem value="Clínica Geral">Clínica Geral</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Adicionar Médico
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
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
                  placeholder="Buscar por nome, e-mail ou CRM..."
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
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium text-lg">{doctor.name}</h3>
                    <span className="ml-3">{getStatusBadge(doctor.status)}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail size={14} className="mr-1" />
                      {doctor.email}
                    </div>
                    <div className="flex items-center">
                      <Phone size={14} className="mr-1" />
                      {doctor.phone}
                    </div>
                    <div className="flex items-start">
                      <Shield size={14} className="mr-1 mt-0.5" />
                      <div>
                        <div>{doctor.crm}</div>
                        <div>{doctor.specialty}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {doctor.patientsCount} pacientes atribuídos
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => editDoctor(doctor.id)}
                  >
                    <Edit size={16} className="mr-2" />
                    Editar
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {doctor.status === 'inactive' || doctor.status === 'pending' ? (
                        <DropdownMenuItem 
                          className="text-green-600" 
                          onClick={() => activateDoctor(doctor.id)}
                        >
                          Ativar médico
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          className="text-amber-600" 
                          onClick={() => deactivateDoctor(doctor.id)}
                        >
                          Desativar médico
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        Visualizar detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Ver pacientes atribuídos
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
            <p className="text-gray-500">Nenhum médico encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDoctors;
