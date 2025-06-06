
interface AvailableTreatment {
  type: string;
  path: string;
  description: string;
}

interface Treatment {
  type: string;
  status: 'active' | 'completed' | 'paused';
}

export const getAvailableTreatments = (treatments: Treatment[]): AvailableTreatment[] => {
  const activeTreatmentTypes = treatments
    .filter(treatment => treatment.status === 'active')
    .map(treatment => treatment.type.toLowerCase());

  const allTreatments: AvailableTreatment[] = [
    { 
      type: 'Queda Capilar', 
      path: '/anamnese/queda-capilar',
      description: 'Tratamento completo para queda de cabelo e calvície'
    },
    { 
      type: 'Disfunção Erétil', 
      path: '/anamnese/disfuncao-eretil',
      description: 'Tratamento para problemas de ereção e desempenho'
    }
  ];

  return allTreatments.filter(treatment => 
    !activeTreatmentTypes.includes(treatment.type.toLowerCase())
  );
};
