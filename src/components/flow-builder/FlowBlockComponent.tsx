
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { FlowBlock } from '@/pages/admin/FlowBuilder';
import { 
  HelpCircle, 
  FileText,
  Star, 
  CreditCard,
  Pencil,
  Trash2,
  Link,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Draggable } from '@/components/flow-builder/Draggable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import BlockEditor from './BlockEditor';

interface FlowBlockComponentProps {
  block: FlowBlock;
  onUpdate: (block: FlowBlock) => void;
  onDelete: (id: string) => void;
  onConnect: (sourceId: string, targetId: string) => void;
  availableBlocks: FlowBlock[];
  tags: string[];
}

const FlowBlockComponent = ({ 
  block, 
  onUpdate, 
  onDelete,
  onConnect,
  availableBlocks,
  tags
}: FlowBlockComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  
  const blockTypeIcons = {
    question: <HelpCircle className="h-4 w-4" />,
    diagnosis: <FileText className="h-4 w-4" />,
    plan: <Star className="h-4 w-4" />,
    checkout: <CreditCard className="h-4 w-4" />
  };
  
  const blockTypeColors = {
    question: 'border-blue-200 bg-blue-50',
    diagnosis: 'border-amber-200 bg-amber-50',
    plan: 'border-green-200 bg-green-50',
    checkout: 'border-purple-200 bg-purple-50'
  };
  
  const blockTypeTitles = {
    question: 'Pergunta',
    diagnosis: 'Diagnóstico',
    plan: 'Plano',
    checkout: 'Checkout'
  };
  
  const handlePositionChange = (newPosition: { x: number, y: number }) => {
    onUpdate({
      ...block,
      position: newPosition
    });
  };

  return (
    <>
      <Draggable
        initialPosition={block.position}
        onPositionChange={handlePositionChange}
        className="absolute"
        style={{
          left: `${block.position.x}px`,
          top: `${block.position.y}px`,
          width: '240px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className={`shadow-md cursor-move ${blockTypeColors[block.type]}`}>
            <CardHeader className="p-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center">
                  {blockTypeIcons[block.type]}
                  <span className="ml-1">{blockTypeTitles[block.type]}</span>
                </CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Link className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {availableBlocks.length > 0 ? (
                        availableBlocks.map((targetBlock) => (
                          <DropdownMenuItem 
                            key={targetBlock.id}
                            onClick={() => onConnect(block.id, targetBlock.id)}
                          >
                            {blockTypeIcons[targetBlock.type]}
                            <span className="ml-2">
                              {targetBlock.title || blockTypeTitles[targetBlock.type]}
                            </span>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled>
                          Nenhum bloco disponível
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onDelete(block.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div>
                <h4 className="font-medium text-sm">{block.title}</h4>
                {block.type === 'question' && block.data.question && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {block.data.question}
                  </p>
                )}
                {block.type === 'diagnosis' && block.data.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {block.data.description}
                  </p>
                )}
                {block.type === 'plan' && block.data.price && (
                  <p className="text-xs text-gray-500 mt-1">
                    R$ {block.data.price.toFixed(2)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Draggable>
      
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{`Editar ${blockTypeTitles[block.type]}`}</DialogTitle>
            <DialogDescription>
              Configure os detalhes e a lógica deste bloco.
            </DialogDescription>
          </DialogHeader>
          
          <BlockEditor 
            block={block}
            onUpdate={(updatedBlock) => {
              onUpdate(updatedBlock);
            }}
            tags={tags}
            onClose={() => setIsEditing(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlowBlockComponent;
