
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Patient } from './PatientCard';

interface EvaluationTabsProps {
  patients: Patient[];
  renderPatientList: (patients: Patient[], showTypeFilter?: boolean) => React.ReactNode;
}

const EvaluationTabs = ({ patients, renderPatientList }: EvaluationTabsProps) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">Todos ({patients.length})</TabsTrigger>
        <TabsTrigger value="hair">
          Queda Capilar ({patients.filter(p => p.type === 'queda-capilar').length})
        </TabsTrigger>
        <TabsTrigger value="ed">
          Disfunção Erétil ({patients.filter(p => p.type === 'disfuncao-eretil').length})
        </TabsTrigger>
        <TabsTrigger value="habitos">
          Hábitos ({patients.filter(p => p.medicationStatus === 'habito').length})
        </TabsTrigger>
        <TabsTrigger value="atencao">
          Atenção ({patients.filter(p => p.medicationStatus === 'atencao').length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        {renderPatientList(patients, true)}
      </TabsContent>
      
      <TabsContent value="hair">
        {renderPatientList(patients.filter(p => p.type === 'queda-capilar'))}
      </TabsContent>
      
      <TabsContent value="ed">
        {renderPatientList(patients.filter(p => p.type === 'disfuncao-eretil'))}
      </TabsContent>
      
      <TabsContent value="habitos">
        {renderPatientList(patients.filter(p => p.medicationStatus === 'habito'))}
      </TabsContent>
      
      <TabsContent value="atencao">
        {renderPatientList(patients.filter(p => p.medicationStatus === 'atencao'))}
      </TabsContent>
    </Tabs>
  );
};

export default EvaluationTabs;
