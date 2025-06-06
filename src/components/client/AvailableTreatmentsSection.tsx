
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight } from 'lucide-react';

interface AvailableTreatment {
  type: string;
  path: string;
  description: string;
}

interface AvailableTreatmentsSectionProps {
  availableTreatments: AvailableTreatment[];
}

export const AvailableTreatmentsSection = ({ availableTreatments }: AvailableTreatmentsSectionProps) => {
  if (availableTreatments.length === 0) {
    return null;
  }

  return (
    <Card className="border-dashed border-2 border-bravo-blue/20 bg-bravo-blue/5">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-bravo-blue flex items-center justify-center">
          <Plus className="h-6 w-6 mr-2" />
          Expandir Cuidados
        </CardTitle>
        <CardDescription className="text-base">
          Você pode iniciar outros tratamentos para cuidar ainda melhor da sua saúde
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {availableTreatments.map((treatment) => (
            <Card key={treatment.type} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{treatment.type}</CardTitle>
                <CardDescription>{treatment.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild className="w-full">
                  <Link to={treatment.path}>
                    Iniciar Avaliação
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
