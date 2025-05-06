
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type QuestionType = 'text' | 'number' | 'boolean' | 'single-choice' | 'multiple-choice';

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  imageUrl?: string;
  imageSize?: 'small' | 'medium' | 'large';
}

interface QuestionEditorProps {
  question?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

export function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [text, setText] = useState(question?.text || '');
  const [type, setType] = useState<QuestionType>(question?.type || 'text');
  const [options, setOptions] = useState<string[]>(question?.options || []);
  const [newOption, setNewOption] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(question?.imageUrl);
  const [imageSize, setImageSize] = useState<'small' | 'medium' | 'large'>(question?.imageSize || 'medium');

  const handleSave = () => {
    if (!text.trim()) return;

    const updatedQuestion: Question = {
      id: question?.id || Date.now().toString(),
      text,
      type,
      ...(type === 'single-choice' || type === 'multiple-choice' ? { options } : {}),
      ...(imageUrl ? { imageUrl, imageSize } : {})
    };

    onSave(updatedQuestion);
  };

  const addOption = () => {
    if (!newOption.trim() || options.includes(newOption.trim())) return;
    setOptions([...options, newOption.trim()]);
    setNewOption('');
  };

  const removeOption = (option: string) => {
    setOptions(options.filter((opt) => opt !== option));
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{question ? 'Editar Pergunta' : 'Nova Pergunta'}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="question-text">Pergunta</Label>
          <Textarea
            id="question-text"
            placeholder="Digite a pergunta..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="question-type">Tipo de resposta</Label>
          <Select 
            value={type}
            onValueChange={(value) => setType(value as QuestionType)}
          >
            <SelectTrigger id="question-type">
              <SelectValue placeholder="Selecione o tipo de pergunta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Texto</SelectItem>
              <SelectItem value="number">Número</SelectItem>
              <SelectItem value="boolean">Sim/Não</SelectItem>
              <SelectItem value="single-choice">Escolha única</SelectItem>
              <SelectItem value="multiple-choice">Múltipla escolha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(type === 'single-choice' || type === 'multiple-choice') && (
          <div className="grid gap-2">
            <Label>Opções</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Nova opção"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={addOption}>
                <Plus size={16} className="mr-1" />
                Adicionar
              </Button>
            </div>
            {options.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {options.map((option) => (
                  <Badge key={option} className="flex items-center gap-1 py-1 px-2">
                    {option}
                    <button
                      type="button"
                      onClick={() => removeOption(option)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        <ImageUploadField 
          imageUrl={imageUrl}
          imageSize={imageSize}
          onImageChange={setImageUrl}
          onImageSizeChange={setImageSize}
        />

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
