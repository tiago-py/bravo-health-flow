
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, X, Search, CheckCircle2, Tag } from 'lucide-react';

interface TagSelectorProps {
  selectedTags: string[];
  availableTags: string[];
  onChange: (selectedTags: string[]) => void;
}

const TagSelector = ({ selectedTags, availableTags, onChange }: TagSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSelectTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onChange([...selectedTags, tag]);
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    onChange(selectedTags.filter(t => t !== tag));
  };
  
  const filteredAvailableTags = availableTags
    .filter(tag => !selectedTags.includes(tag))
    .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-3">
      {selectedTags.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Tags Selecionadas</h4>
          <div className="flex flex-wrap gap-1">
            {selectedTags.map(tag => (
              <Badge key={tag} className="pl-3 pr-2 py-1.5 flex items-center gap-1">
                {tag}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 hover:bg-gray-200 ml-1"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center px-2 py-1 border rounded-md">
        <Search className="text-gray-400 mr-2" size={18} />
        <Input
          placeholder="Buscar tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Tags Disponíveis</h4>
        {filteredAvailableTags.length > 0 ? (
          <ScrollArea className="h-[120px]">
            <div className="flex flex-wrap gap-2 p-1">
              {filteredAvailableTags.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 border-dashed"
                  onClick={() => handleSelectTag(tag)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-4 text-sm text-gray-500">
            {searchTerm ? (
              <p>Nenhuma tag encontrada para "{searchTerm}"</p>
            ) : availableTags.length === selectedTags.length ? (
              <p>Todas as tags já foram selecionadas</p>
            ) : (
              <p>Nenhuma tag disponível</p>
            )}
          </div>
        )}
      </div>
      
      {selectedTags.length === 0 && (
        <div className="flex items-center justify-center py-3 border border-dashed rounded-md">
          <div className="text-center text-sm text-gray-500">
            <Tag className="h-5 w-5 mx-auto mb-1 text-gray-400" />
            <p>Nenhuma tag selecionada</p>
            <p className="text-xs">Selecione tags acima para estabelecer regras.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;
