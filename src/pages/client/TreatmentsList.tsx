
import { useAuth } from '@/contexts/AuthContext';
import { TreatmentCard } from '@/components/client/TreatmentCard';
import { EmptyTreatmentsState } from '@/components/client/EmptyTreatmentsState';
import { AvailableTreatmentsSection } from '@/components/client/AvailableTreatmentsSection';
import { LoadingState } from '@/components/client/LoadingState';
import { ErrorState } from '@/components/client/ErrorState';
import { useTreatments } from '@/hooks/useTreatments';
import { getAvailableTreatments } from '@/utils/treatmentUtils';

const TreatmentsList = () => {
  const { user } = useAuth();
  const { treatments, loading, error, refetch } = useTreatments();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (treatments.length === 0) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meus Tratamentos</h1>
          <p className="text-gray-600">Gerencie e acompanhe todos os seus tratamentos</p>
        </div>
        <EmptyTreatmentsState />
      </div>
    );
  }

  const availableTreatments = getAvailableTreatments(treatments);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meus Tratamentos</h1>
        <p className="text-gray-600">Gerencie e acompanhe todos os seus tratamentos</p>
      </div>
      
      <div className="grid gap-6 mb-8">
        {treatments.map((treatment) => (
          <TreatmentCard key={treatment.id} treatment={treatment} />
        ))}
      </div>

      <AvailableTreatmentsSection availableTreatments={availableTreatments} />
    </div>
  );
};

export default TreatmentsList;
