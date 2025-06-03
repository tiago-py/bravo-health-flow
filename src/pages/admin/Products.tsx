
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  status: string;
}

const Products = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Mock products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Finasterida 1mg',
      description: 'Medicamento para tratamento de queda capilar masculina',
      type: 'queda-capilar',
      price: 89.90,
      status: 'active'
    },
    {
      id: '2',
      name: 'Sildenafila 50mg',
      description: 'Medicamento para tratamento de disfunção erétil',
      type: 'disfuncao-eretil',
      price: 12.50,
      status: 'active'
    },
    {
      id: '3',
      name: 'Minoxidil 5%',
      description: 'Solução tópica para crescimento capilar',
      type: 'queda-capilar',
      price: 45.90,
      status: 'active'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    price: '',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...editingProduct, ...formData, price: parseFloat(formData.price) }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        price: parseFloat(formData.price)
      };
      setProducts([...products, newProduct]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: '',
      price: '',
      status: 'active'
    });
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      type: product.type,
      price: product.price.toString(),
      status: product.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'queda-capilar':
        return 'Queda Capilar';
      case 'disfuncao-eretil':
        return 'Disfunção Erétil';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
    }
    return <Badge variant="secondary">Inativo</Badge>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">
            Produtos
          </h1>
          <p className="text-gray-600">
            Gerencie os produtos disponíveis na plataforma
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="mr-2" size={16} />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Edite as informações do produto.' : 'Adicione um novo produto à plataforma.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Finasterida 1mg"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descrição do produto..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="queda-capilar">Queda Capilar</SelectItem>
                        <SelectItem value="disfuncao-eretil">Disfunção Erétil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2" size={20} />
            Lista de Produtos
          </CardTitle>
          <CardDescription>
            {products.length} produto(s) cadastrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getTypeLabel(product.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    R$ {product.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(product.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
