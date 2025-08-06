
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from '@/contexts/FirebaseContext';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast'; // If you have a toast hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const { user, loading } = useFirebase();
  const { signIn, error } = useAuth();
  const { toast } = useToast(); // If you use a toast system

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (loading) return;

    try {
      const user = await signIn(email, password);
      console.log('Login successful');
      toast({
        title: 'Login realizado com sucesso',
        // description: 'Bem vindo a área do aluno',
        variant: 'default',
        duration: 2000,
      });
      console.log(user)
      if (user.accessLevel === 1) {
        navigate('/dashboard');
      } else if (user.accessLevel === 3) {
        navigate('/dashboard-admin');
      } else {
        navigate('/dashboard');
      }

    } catch (err: any) {
      // Show toast if available, otherwise set error state
      console.log(err)
      if (toast) {
        toast({
          title: 'Erro ao fazer login',
          description:  'Não foi possível conectar. Verifique suas credenciais e conexão.',
          variant: 'destructive',
        });
      } else {
        setFormError( 'Não foi possível conectar. Verifique suas credenciais e conexão.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f97316%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-orange-500/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
              {/* <Flame className="h-8 w-8 text-white" /> */}
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full welding-glow">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Área do Aluno
          </CardTitle>
          <CardDescription className="text-gray-300">
            Entre com suas credenciais para acessar o portal
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {formError && (
              <div className="text-red-500 text-sm mt-2">{formError}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 glow-orange"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              className="text-orange-400 hover:text-orange-300"
              onClick={() => navigate('/')}
            >
              Voltar à página inicial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
