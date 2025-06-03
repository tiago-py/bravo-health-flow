
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Search, User, Mail, Phone, Edit, MoreVertical, Shield } from 'lucide-react';
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

const AdminDoctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
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
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.crm.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: DoctorStatus) => {
    const statusConfig = {
      active: { className: "bg-green-100 text-green-800", text: "Ativo" },
      inactive: { className: "bg-gray-100 text-gray-800", text: "Inativo" },
      pending: { className: "bg-amber-100 text-amber-800", text: "Pendente" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.text}</Badge>;
  };
  
  const activateDoctor = (doctorId: string) => {
    console.log('Activating doctor:', doctorId);
    toast.success('Médico ativado com sucesso.');
  };
  
  const deactivateDoctor = (doctorId: string) => {
    console.log('Deactivating doctor:', doctorId);
    toast.success('Médico desativado com sucesso.');
  };
  
  const editDoctor = (doctorId: string) => {
    console.log('Editing doctor:', doctorId);
    toast.info('Funcionalidade de edição em desenvolvimento.');
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
        
        <Button className="mt-4 md:mt-0">
          Adicionar Médico
        </Button>
      </div>
      
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
