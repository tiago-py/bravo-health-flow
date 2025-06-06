
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

interface Treatment {
  id: string;
  title: string;
  type: string;
  startDate: string;
  currentPhase: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  duration: string;
  timeElapsed: string;
  timeRemaining: string;
  lastUpdate: string;
}

export const useTreatments = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data para demonstração
  const mockTreatments: Treatment[] = [
    {
      id: '1',
      title: 'Tratamento Capilar Premium',
      type: 'Queda Capilar',
      startDate: '2024-03-01T00:00:00Z',
      currentPhase: 'Fase de Crescimento',
      progress: 65,
      status: 'active',
      duration: '6 meses',
      timeElapsed: '3 meses e 5 dias',
      timeRemaining: '2 meses e 25 dias',
      lastUpdate: '2024-06-01T00:00:00Z'
    },
    {
      id: '2',
      title: 'Tratamento de Manutenção',
      type: 'Queda Capilar',
      startDate: '2023-09-01T00:00:00Z',
      currentPhase: 'Finalizado',
      progress: 100,
      status: 'completed',
      duration: '6 meses',
      timeElapsed: '6 meses',
      timeRemaining: 'Concluído',
      lastUpdate: '2024-03-01T00:00:00Z'
    }
  ];

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usar dados mock
      setTreatments(mockTreatments);
      
    } catch (err) {
      console.error('Erro ao carregar tratamentos:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      toast.error('Falha ao carregar tratamentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  return {
    treatments,
    loading,
    error,
    refetch: fetchTreatments
  };
};
