import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

/*
CREDENCIAIS PARA TESTE:

Admin:
Email: admin@bravohomem.com.br
Senha: admin123

Médico:
Email: dr.silva@bravohomem.com.br
Senha: medico123

Cliente:
Email: joao.cliente@gmail.com
Senha: cliente123
*/

const LoginPage = () => {
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {
    from?: {
      pathname: string;
    };
  })?.from?.pathname || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: 'Login realizado com sucesso',
        description: 'Seja bem-vindo à plataforma Bravo Homem.',
        duration: 3000
      });

      // Redirect to the original intended page or dashboard based on role
      navigate(from);
    } catch (error) {
      console.error('Login error:', error);
      setError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-montserrat font-bold text-bravo-blue">Bravo Homem</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Acesse sua conta para gerenciar seus tratamentos
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>}
              
              {/* Test Credentials Helper */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs">
                <p className="font-medium text-blue-800 mb-2">Credenciais para teste:</p>
                <div className="space-y-1 text-blue-700">
                  <p><strong>Admin:</strong> admin@bravohomem.com.br / admin123</p>
                  <p><strong>Médico:</strong> dr.silva@bravohomem.com.br / medico123</p>
                  <p><strong>Cliente:</strong> joao.cliente@gmail.com / cliente123</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/esqueci-senha" className="text-xs text-bravo-blue hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Não tem uma conta?{' '}
                <Link to="/registrar" className="text-bravo-blue hover:underline">
                  Registre-se
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-gray-600 hover:text-bravo-blue">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>;
};
export default LoginPage;