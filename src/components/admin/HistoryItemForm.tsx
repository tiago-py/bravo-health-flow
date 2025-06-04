
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';

interface HistoryItemFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  initialData?: any;
}

export const HistoryItemForm = ({ onSubmit, onCancel, initialData }: HistoryItemFormProps) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || 'anamnese',
    title: initialData?.title || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    status: initialData?.status || 'completed',
    details: initialData?.details || {}
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Tipo</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anamnese">Anamnese</SelectItem>
            <SelectItem value="prescription">Prescrição</SelectItem>
            <SelectItem value="shipment">Entrega</SelectItem>
            <SelectItem value="follow-up">Acompanhamento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Título</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Data</Label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'completed' | 'scheduled' }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="completed">Completo</SelectItem>
            <SelectItem value="scheduled">Agendado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.type === 'anamnese' && (
        <>
          <div>
            <Label>Médico</Label>
            <Input
              name="doctor"
              value={formData.details.doctor || ''}
              onChange={handleDetailsChange}
            />
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea
              name="observations"
              value={formData.details.observations || ''}
              onChange={handleDetailsChange}
            />
          </div>
        </>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
};
