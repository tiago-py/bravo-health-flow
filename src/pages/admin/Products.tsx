
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Package, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  stock: number;
  status: string;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Finasterida 1mg',
    description: 'Medicamento para tratamento da calvície masculina',
    type: 'queda-capilar',
    price: 89.90,
    stock: 150,
    status: 'active'
  },
  {
    id: '2',
    name: 'Minoxidil 5%',
    description: 'Solução tópica para estimular o crescimento capilar',
    type: 'queda-capilar',
    price: 65.50,
    stock: 89,
    status: 'active'
  },
  {
    id: '3',
    name: 'Tadalafila 5mg',
    description: 'Medicamento para disfunção erétil uso diário',
    type: 'disfuncao-eretil',
    price: 125.00,
    stock: 45,
    status: 'active'
  },
  {
    id: '4',
    name: 'Sildenafila 50mg',
    description: 'Medicamento para disfunção erétil uso conforme necessário',
    type: 'disfuncao-eretil',
    price: 95.75,
    stock: 8,
    status: 'active'
  },
  {
    id: '5',
    name: 'Kit Completo Capilar',
    description: 'Kit com finasterida + minoxidil para 3 meses',
    type: 'queda-capilar',
    price: 285.00,
    stock: 25,
    status: 'active'
  },
  {
    id: '6',
    name: 'Dutasterida 0.5mg',
    description: 'Alternativa à finasterida para casos mais severos',
    type: 'queda-capilar',
    price: 145.90,
    stock: 0,
    status: 'inactive'
  }
];

const Products = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    price: '',
    stock: '',
    status: 'active'
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    // Simulate loading delay
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  };

  const createProduct = async (productData: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: productData.name,
      description: productData.description,
      type: productData.type,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
      status: productData.status
    };
    
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id: string, productData: any) => {
    const updatedProduct = {
      name: productData.name,
      description: productData.description,
      type: productData.type,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
      status: productData.status
    };
    
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
    
    return updatedProduct;
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        price: formData.price,
        stock: formData.stock,
        status: formData.status
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar produto');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: '',
      price: '',
      stock: '',
      status: 'active'
    });
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      type: product.type,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await deleteProduct(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar produto');
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            Produtos
          </h1>
          <p className="text-gray-600">
            Gerencie os produtos disponíveis na plataforma
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)} disabled={loading}>
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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Finasterida 1mg"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição do produto..."
                  disabled={loading}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                    disabled={loading}
                  >
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
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                    disabled={loading}
                  >
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
              
              <div className="grid grid-cols-2 gap-4">
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
                    disabled={loading}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="stock">Estoque</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Salvando...' : editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2" size={20} />
            Lista de Produtos
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchProducts}
              disabled={loading}
              className="ml-auto"
            >
              {loading ? 'Carregando...' : 'Atualizar'}
            </Button>
          </CardTitle>
          <CardDescription>
            {products.length} produto(s) cadastrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && products.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">Carregando produtos...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Nome</th>
                    <th className="text-left p-3 font-medium">Tipo</th>
                    <th className="text-left p-3 font-medium">Preço</th>
                    <th className="text-left p-3 font-medium">Estoque</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium w-[100px]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">
                          {getTypeLabel(product.type)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        R$ {product.price?.toFixed(2)}
                      </td>
                      <td className="p-3">
                        <span className={product.stock < 10 ? 'text-red-600 font-medium' : ''}>
                          {product.stock} unidades
                        </span>
                      </td>
                      <td className="p-3">
                        {getStatusBadge(product.status)}
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                            disabled={loading}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            disabled={loading}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-500">
                        Nenhum produto cadastrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
