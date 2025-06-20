import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { FlowQuiz } from './_components/FlowQuiz';
import { Recommendation } from './_components/Recommendation';
import { CheckCircle } from 'lucide-react';
import { ListProducts } from './_components/ListProducts';
import { set } from 'date-fns';

interface modesTypes {
  id: string | number;
  name: string;
  mode: "hairLoss" | "erectileDysfunction";
  image: string;
}

const RegisterPage = () => {
  const { register, user, validate, setUser } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [finishQuiz, setFinishQuiz] = useState<boolean>(false);
  const [finishRecommendation, setFinishRecommendation] = useState<boolean>(false);
  const [modeQuiz, setModeQuiz] = useState<"hairLoss" | "erectileDysfunction">("hairLoss");
  const [logged, setLogged] = useState<boolean>(true);

  const modes: modesTypes[] = [
    {
      id: 1,
      name: "Queda Capilar",
      mode: "hairLoss",
      image: "/img/hairLoss.jpg"
    },
    {
      id: 2,
      name: "Disfunção Erétil",
      mode: "erectileDysfunction",
      image: "/img/erectileDysfunction.jpg"
    }
  ];

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if(token) {
        try {
          // const verifyValidate = await validate(token);
          setLogged(true);
          setQuizStarted(true)
          setFinishQuiz(true);
        } catch(e) {
          console.log(e);
          setLogged(false);
        }
      } else {
        setLogged(false);
      }
    };

    verifyAuth()
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!agreeTerms) {
      setError('Você precisa concordar com os termos de uso e política de privacidade.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber,
          cpf
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
      }
      
      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Bem-vindo à plataforma Bravo Homem.',
        duration: 3000,
      });
      
      const token = localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if(localStorage.getItem('token')) {
          setLogged(true);
          setQuizStarted(true)
          setFinishQuiz(true);
      };

      setUser(data.user);

      // navigate('/cliente/dashboard');
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Tratamento de erro mais específico
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Falha ao criar conta. Verifique seus dados e tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const finishQuizFunc = () => {
    setFinishQuiz(v => !v);
  }

  const finishRecommendationFunc = () => {
    setFinishRecommendation(v => !v);
  }

  if (!quizStarted) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='p-2'>
          <h1 className='text-2xl font-bold'>Vamos fazer algumas perguntas para <br /> encontrar seu tratamento ideal.</h1>
          <p className='text-sm my-3 text-bravo-blue'>Antes, qual tratamento você está precisando ?</p>

          <div>
            {modes.map(v => (
              <Card onClick={() => {
                setModeQuiz(v.mode);
                setQuizStarted(true);
              }} key={v.id} className='flex hover:scale-105 transition-all ease-in-out items-center justify-center flex-col cursor-pointer my-2'>
                <CardHeader>
                  <CardTitle>{v.name}</CardTitle>
                </CardHeader>
                <CardContent className='flex items-center'>
                  <img className='max-w-20' src={v.image} alt={v.name} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    )
  }

  return (
    <div>

      {!finishQuiz && (
        <FlowQuiz finishQuiz={finishQuizFunc} mode={modeQuiz} />
      )}

      {(finishQuiz && !finishRecommendation) && (
        <div className='flex items-center justify-center p-5'>
          <Recommendation mode={modeQuiz} finishRecommendation={finishRecommendationFunc} />
        </div>
      )}

      {(finishQuiz && finishRecommendation) && (
        <div className="min-h-screen flex items-center gap-2 flex-wrap justify-center bg-bravo-beige p-4">
          {logged ? (
            <div className='max-w-md w-full'>
              <div className='flex items-center gap-2 text-bravo-blue'>
                <CheckCircle />
                <h2>Você está ativo.</h2>
              </div>
              <h1 className='text-xl'>Olá, {user.name}</h1>
            </div>
          ) : (
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <Link to="/" className="inline-block">
                  <span className="text-2xl font-montserrat font-bold text-bravo-blue">Bravo Homem</span>
                </Link>
              </div>
  
              <Card>
                <CardHeader>
                  <CardTitle>Criar conta</CardTitle>
                  <CardDescription>
                    Registre-se para iniciar seu tratamento personalizado
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}
  
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
  
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
  
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Whatsapp</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="5593991000000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
  
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        type="text"
                        placeholder="12345678910"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                        minLength={11}
                      />
                    </div>
  
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-gray-500">
                        Mínimo de 6 caracteres
                      </p>
                    </div>
  
                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreeTerms} 
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                      />
                      <Label htmlFor="terms" className="text-sm leading-tight">
                        Concordo com os{' '}
                        <Link to="/termos" className="text-bravo-blue hover:underline" target="_blank">
                          Termos de Uso
                        </Link>{' '}
                        e a{' '}
                        <Link to="/politica-de-privacidade" className="text-bravo-blue hover:underline" target="_blank">
                          Política de Privacidade
                        </Link>
                      </Label>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Registrando...' : 'Criar conta'}
                    </Button>
  
                    <div className="text-center text-sm text-gray-600">
                      Já tem uma conta?{' '}
                      <Link to="/login" className="text-bravo-blue hover:underline">
                        Entrar
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
          )}

          <div>
            <ListProducts />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;