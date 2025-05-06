
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast({
        title: 'Email enviado',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
        duration: 5000,
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('Não foi possível enviar o email de redefinição. Verifique seu email e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bravo-beige p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-montserrat font-bold text-bravo-blue">Bravo Homem</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recuperar Senha</CardTitle>
            <CardDescription>
              Enviaremos um link para redefinir sua senha
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar link'}
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  Lembrou sua senha?{' '}
                  <Link to="/login" className="text-bravo-blue hover:underline">
                    Voltar ao login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-6 py-6">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <p className="text-sm font-medium">Email enviado com sucesso!</p>
                <p className="text-xs mt-1">
                  Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Não recebeu o email?
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    handleSubmit(new Event('submit') as any);
                  }}
                >
                  Tentar novamente
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
        
        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-gray-600 hover:text-bravo-blue">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
