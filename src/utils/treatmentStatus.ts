
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const getTreatmentStatus = (treatment: any) => {
  if (!treatment) return { status: 'none', color: 'gray', icon: Clock, text: 'Sem tratamento' };
  
  switch (treatment.status?.toLowerCase()) {
    case 'active':
    case 'ativo':
      return { status: 'active', color: 'green', icon: CheckCircle, text: 'Ativo' };
    case 'pending':
    case 'pendente':
      return { status: 'pending', color: 'amber', icon: Clock, text: 'Pendente' };
    case 'awaiting_review':
    case 'em_analise':
      return { status: 'awaiting_review', color: 'blue', icon: Clock, text: 'Em análise médica' };
    default:
      return { status: 'unknown', color: 'gray', icon: AlertCircle, text: 'Status desconhecido' };
  }
};
