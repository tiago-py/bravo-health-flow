
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, X, Tag as TagIcon, Search, CircleCheck, 
  CircleAlert, Edit, Trash2 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Define interfaces
interface Tag {
  id: string;
  name: string;
  color?: string;
  usageCount?: number;
}

interface TagsManagerProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  onCreateTag?: (tagName: string) => void;
  showTagsList?: boolean;
  showTagsInput?: boolean;
  title?: string;
  tagLogic?: 'AND' | 'OR';
  onTagLogicChange?: (logic: 'AND' | 'OR') => void;
}

export function TagsManager({
  availableTags,
  selectedTags,
  onTagsChange,
  onCreateTag,
  showTagsList = true,
  showTagsInput = true,
  title = "Tags",
  tagLogic,
  onTagLogicChange
}: TagsManagerProps) {
  const [newTag, setNewTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('selected');

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
    }
    setNewTag('');
  };

  const removeTag = (tag: string) => {
    onTagsChange(selectedTags.filter(t => t !== tag));
  };

  const handleCreateTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag.trim()) && onCreateTag) {
      onCreateTag(newTag.trim());
      addTag(newTag.trim());
    }
  };

  const filteredAvailableTags = availableTags
    .filter(tag => !selectedTags.includes(tag))
    .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TagIcon size={18} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Tags */}
        {selectedTags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-500">Tags selecionadas</h4>
              
              {tagLogic !== undefined && onTagLogicChange && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={tagLogic === 'AND' ? 'default' : 'outline'}
                    onClick={() => onTagLogicChange('AND')}
                    className="h-7 px-2 text-xs"
                  >
                    <CircleCheck size={14} className="mr-1" />
                    Todas (E)
                  </Button>
                  <Button
                    size="sm"
                    variant={tagLogic === 'OR' ? 'default' : 'outline'}
                    onClick={() => onTagLogicChange('OR')}
                    className="h-7 px-2 text-xs"
                  >
                    <CircleAlert size={14} className="mr-1" />
                    Qualquer (OU)
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge variant="secondary" className="pl-3 pr-2 py-1.5 flex items-center gap-1">
                    {tag}
                    {index < selectedTags.length - 1 && tagLogic && (
                      <span className="font-medium text-gray-400 ml-1">
                        {tagLogic === 'AND' ? '+' : '|'}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 hover:bg-gray-200 ml-1"
                      onClick={() => removeTag(tag)}
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* New tag input */}
        {showTagsInput && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <div className="md:col-span-4">
              <Input
                placeholder="Digite uma nova tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (availableTags.includes(newTag)) {
                      addTag(newTag);
                    } else if (onCreateTag) {
                      handleCreateTag();
                    }
                  }
                }}
              />
            </div>
            <Button
              type="button"
              onClick={() => {
                if (availableTags.includes(newTag)) {
                  addTag(newTag);
                } else if (onCreateTag) {
                  handleCreateTag();
                }
              }}
            >
              <Plus size={16} className="mr-1" />
              Adicionar
            </Button>
          </div>
        )}

        {/* Available tags browsing */}
        {showTagsList && availableTags.length > 0 && (
          <div className="space-y-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="selected">Selecionadas ({selectedTags.length})</TabsTrigger>
                <TabsTrigger value="available">Disponíveis ({availableTags.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="available" className="space-y-3">
                <div className="flex items-center px-2 py-1 border rounded-md">
                  <Search size={18} className="text-gray-400 mr-2" />
                  <Input
                    placeholder="Buscar tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                
                <ScrollArea className="h-[180px]">
                  {filteredAvailableTags.length > 0 ? (
                    <div className="flex flex-wrap gap-2 p-1">
                      {filteredAvailableTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100 px-3 py-1.5 border-dashed"
                          onClick={() => addTag(tag)}
                        >
                          + {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-6">
                      {searchTerm ? "Nenhuma tag encontrada" : "Nenhuma tag disponível"}
                    </p>
                  )}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="selected">
                {selectedTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="pl-3 pr-2 py-1.5 flex items-center gap-1"
                      >
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 p-0 hover:bg-gray-200 ml-1"
                          onClick={() => removeTag(tag)}
                        >
                          <X size={12} />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-6">
                    Nenhuma tag selecionada
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
