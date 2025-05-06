
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Mail, Phone, AlertTriangle, FileText, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'active' | 'blocked' | 'pending';
  type: 'new' | 'returning';
  anamneseStatus: 'completed' | 'incomplete' | 'not_started';
  treatment: 'queda-capilar' | 'disfuncao-eretil' | null;
  subscription: 'active' | 'cancelled' | 'expired' | null;
}

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [treatmentFilter, setTreatmentFilter] = useState('all');
  
  // Mock users data
  const users: User[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 98765-4321',
      registrationDate: '2023-03-15',
      status: 'active',
      type: 'returning',
      anamneseStatus: 'completed',
      treatment: 'queda-capilar',
      subscription: 'active'
    },
    {
      id: '2',
      name: 'Carlos Santos',
      email: 'carlos.santos@email.com',
      phone: '(11) 97654-3210',
      registrationDate: '2023-03-20',
      status: 'pending',
      type: 'new',
      anamneseStatus: 'incomplete',
      treatment: 'disfuncao-eretil',
      subscription: null
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      phone: '(11) 96543-2109',
      registrationDate: '2023-02-10',
      status: 'blocked',
      type: 'returning',
      anamneseStatus: 'completed',
      treatment: 'queda-capilar',
      subscription: 'cancelled'
    }
  ];
  
  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesTreatment = treatmentFilter === 'all' || user.treatment === treatmentFilter;
    return matchesSearch && matchesStatus && matchesTreatment;
  });
  
  // Helper function to get status badge
  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800">Bloqueado</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pendente</Badge>;
      default:
        return null;
    }
  };
  
  // Helper function to get subscription badge
  const getSubscriptionBadge = (subscription: User['subscription']) => {
    switch (subscription) {
      case 'active':
        return <Badge variant="outline" className="border-green-500 text-green-700">Assinatura ativa</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="border-red-500 text-red-700">Assinatura cancelada</Badge>;
      case 'expired':
        return <Badge variant="outline" className="border-amber-500 text-amber-700">Assinatura expirada</Badge>;
      default:
        return <Badge variant="outline">Sem assinatura</Badge>;
    }
  };
  
  // User actions
  const blockUser = (userId: string) => {
    toast.success('Usuário bloqueado com sucesso.');
  };
  
  const unblockUser = (userId: string) => {
    toast.success('Usuário desbloqueado com sucesso.');
  };
  
  const sendEmail = (userId: string) => {
    toast.success('E-mail enviado com sucesso.');
  };
  
  const viewAnamneseHistory = (userId: string) => {
    // Navigate to anamnese history page
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Usuários</h1>
        <p className="text-gray-600">
          Gerencie e monitore os usuários da plataforma
        </p>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre e pesquise usuários
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
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
                  <SelectItem value="blocked">Bloqueados</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={treatmentFilter}
                onValueChange={setTreatmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tratamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tratamentos</SelectItem>
                  <SelectItem value="queda-capilar">Queda Capilar</SelectItem>
                  <SelectItem value="disfuncao-eretil">Disfunção Erétil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map(user => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium text-lg">{user.name}</h3>
                    <span className="ml-3">{getStatusBadge(user.status)}</span>
                    {user.type === 'new' && (
                      <Badge variant="outline" className="ml-2">Novo usuário</Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail size={14} className="mr-1" />
                      {user.email}
                    </div>
                    <div className="flex items-center">
                      <Phone size={14} className="mr-1" />
                      {user.phone}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {getSubscriptionBadge(user.subscription)}
                    
                    {user.treatment && (
                      <Badge variant="outline">
                        {user.treatment === 'queda-capilar' ? 'Queda Capilar' : 'Disfunção Erétil'}
                      </Badge>
                    )}
                    
                    {user.anamneseStatus === 'incomplete' && (
                      <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700">
                        <AlertTriangle size={14} className="mr-1" />
                        Anamnese incompleta
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => viewAnamneseHistory(user.id)}
                  >
                    <FileText size={16} className="mr-2" />
                    Anamnese
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => sendEmail(user.id)}
                  >
                    <Mail size={16} className="mr-2" />
                    Enviar e-mail
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.status === 'blocked' ? (
                        <DropdownMenuItem 
                          className="text-green-600" 
                          onClick={() => unblockUser(user.id)}
                        >
                          Desbloquear usuário
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => blockUser(user.id)}
                        >
                          Bloquear usuário
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum usuário encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
