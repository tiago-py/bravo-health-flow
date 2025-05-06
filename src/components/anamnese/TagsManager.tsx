
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, X, Tag as TagIcon, Search, CircleCheck, 
  CircleX, Tag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

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
  tagSourceType?: 'diagnosis' | 'question' | 'plan';
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
  onTagLogicChange,
  tagSourceType = 'diagnosis'
}: TagsManagerProps) {
  const [newTag, setNewTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('selected');
  const [showTagHelp, setShowTagHelp] = useState(false);

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

  const getTagSourceIcon = () => {
    switch(tagSourceType) {
      case 'diagnosis':
        return <FileText size={18} className="text-blue-600" />;
      case 'question':
        return <CircleCheck size={18} className="text-green-600" />;
      case 'plan':
        return <Tag size={18} className="text-amber-600" />;
      default:
        return <TagIcon size={18} />;
    }
  };

  const getTagSourceTitle = () => {
    switch(tagSourceType) {
      case 'diagnosis':
        return "Tags para Diagnóstico";
      case 'question':
        return "Tags da Pergunta";
      case 'plan':
        return "Tags do Plano";
      default:
        return title;
    }
  };

  const getTagSourceDescription = () => {
    switch(tagSourceType) {
      case 'diagnosis':
        return "Estas tags determinam quando este diagnóstico será exibido ao cliente";
      case 'question':
        return "Estas tags serão atribuídas ao cliente quando ele responder a esta pergunta";
      case 'plan':
        return "Estas tags determinam se este plano será exibido ao cliente";
      default:
        return "";
    }
  };

  return (
    <Card className="shadow-sm border-2 border-gray-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTagSourceIcon()}
            <span>{getTagSourceTitle()}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowTagHelp(!showTagHelp)}
                >
                  <span className="text-xs font-bold border-2 border-gray-400 rounded-full h-5 w-5 flex items-center justify-center">?</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-80 p-4">
                <p className="text-sm">
                  {getTagSourceDescription()}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        {showTagHelp && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md mt-2 border border-blue-100"
          >
            {getTagSourceDescription()}
            <p className="mt-2">As tags são usadas para conectar todas as partes do fluxo: perguntas geram tags, que ativam diagnósticos, que direcionam para planos específicos.</p>
          </motion.div>
        )}
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
                    <CircleX size={14} className="mr-1" />
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
                  <Badge 
                    variant="secondary" 
                    className={`pl-3 pr-2 py-1.5 flex items-center gap-1 ${
                      tagSourceType === 'diagnosis' ? 'bg-blue-100 text-blue-800' : 
                      tagSourceType === 'question' ? 'bg-green-100 text-green-800' : 
                      'bg-amber-100 text-amber-800'
                    }`}
                  >
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
              className={
                tagSourceType === 'diagnosis' ? 'bg-blue-600 hover:bg-blue-700' : 
                tagSourceType === 'question' ? 'bg-green-600 hover:bg-green-700' : 
                'bg-amber-600 hover:bg-amber-700'
              }
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
                          className={`cursor-pointer hover:bg-gray-100 px-3 py-1.5 border-dashed ${
                            tagSourceType === 'diagnosis' ? 'hover:bg-blue-50 hover:border-blue-300' : 
                            tagSourceType === 'question' ? 'hover:bg-green-50 hover:border-green-300' : 
                            'hover:bg-amber-50 hover:border-amber-300'
                          }`}
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
                        className={`pl-3 pr-2 py-1.5 flex items-center gap-1 ${
                          tagSourceType === 'diagnosis' ? 'bg-blue-100 text-blue-800' : 
                          tagSourceType === 'question' ? 'bg-green-100 text-green-800' : 
                          'bg-amber-100 text-amber-800'
                        }`}
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
