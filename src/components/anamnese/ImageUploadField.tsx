
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageIcon, Trash2, Move } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImageUploadFieldProps {
  imageUrl?: string;
  imageSize?: 'small' | 'medium' | 'large';
  onImageChange: (url: string | undefined) => void;
  onImageSizeChange: (size: 'small' | 'medium' | 'large') => void;
}

export function ImageUploadField({ 
  imageUrl, 
  imageSize = 'medium',
  onImageChange, 
  onImageSizeChange 
}: ImageUploadFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server. For demo, create local URL
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewUrl(undefined);
    onImageChange(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Imagem (opcional)</Label>
        <div className="flex gap-2 items-center">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="flex-1"
          />
          {previewUrl && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={removeImage}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="imageSize">Tamanho da imagem</Label>
            <Select 
              value={imageSize} 
              onValueChange={(value) => onImageSizeChange(value as 'small' | 'medium' | 'large')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tamanho da imagem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequena</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="overflow-hidden">
            <div className={`
              p-2 flex items-center justify-center bg-gray-50
              ${imageSize === 'small' ? 'max-h-32' : ''}
              ${imageSize === 'medium' ? 'max-h-64' : ''}
              ${imageSize === 'large' ? 'max-h-96' : ''}
            `}>
              <img 
                src={previewUrl} 
                alt="Preview" 
                className={`
                  object-contain
                  ${imageSize === 'small' ? 'max-h-28' : ''}
                  ${imageSize === 'medium' ? 'max-h-60' : ''}
                  ${imageSize === 'large' ? 'max-h-92' : ''}
                `}
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
