
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft } from 'lucide-react';

const AdminAnamneseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">
            Editar Anamnese
          </h1>
          <p className="text-gray-600">
            Esta página está em construção. Por favor, use a nova página de Construtor de Fluxo.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <p className="mb-4">
            Estamos migrando para o novo Construtor de Fluxo de Anamnese com funcionalidades avançadas!
          </p>
          <Button onClick={() => navigate('/admin/flow-builder')}>
            Ir para o Construtor de Fluxo
          </Button>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default AdminAnamneseEdit;
