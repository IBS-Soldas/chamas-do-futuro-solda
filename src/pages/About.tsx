
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Users, Award, Target, Clock, BookOpen, Wrench, Flame, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: "15+", label: "Anos de Experiência", icon: <Clock className="h-6 w-6 text-orange-500" /> },
    { number: "500+", label: "Alunos Formados", icon: <Users className="h-6 w-6 text-blue-500" /> },
    { number: "95%", label: "Taxa de Empregabilidade", icon: <Target className="h-6 w-6 text-green-500" /> },
    { number: "3", label: "Cursos Especializados", icon: <BookOpen className="h-6 w-6 text-purple-500" /> }
  ];

  const methodologies = [
    {
      title: "Prática Intensiva",
      description: "70% do tempo em práticas com equipamentos profissionais",
      icon: <Wrench className="h-8 w-8 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"
    },
    {
      title: "Teoria Aplicada",
      description: "Conceitos fundamentais aplicados diretamente na prática",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop"
    },
    {
      title: "Mentoria Individual",
      description: "Acompanhamento personalizado durante todo o curso",
      icon: <Users className="h-8 w-8 text-green-500" />,
      image: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=400&h=300&fit=crop"
    }
  ];

  const differentials = [
    "Equipamentos de última geração",
    "Professores com experiência industrial",
    "Turmas reduzidas para melhor aprendizado",
    "Certificação reconhecida nacionalmente",
    "Suporte na colocação profissional",
    "Material didático incluso",
    "Laboratório 24/7 para práticas extras",
    "Parcerias com empresas do setor"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1563906267088-b029e7101114?w=1920&h=1080&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/95"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 animate-pulse"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10 min-h-screen flex items-center">
          <div className="w-full">
            <div className="mb-8">
              <Link to="/">
                <Button 
                  variant="outline" 
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </Link>
            </div>
            
            <div className="text-center animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
                Sobre Nossa Escola
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto drop-shadow-lg">
                Há mais de 15 anos formando os melhores profissionais em soldagem do mercado. 
                Conheça nossa história, metodologia e diferenciais que fazem a diferença.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <CardTitle className="text-3xl font-bold text-white">{stat.number}</CardTitle>
                  <CardDescription className="text-gray-300">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* História Section */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&h=1080&fit=crop')"
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Nossa História</h2>
            <p className="text-gray-300 text-lg">Uma trajetória de excelência e inovação</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                Fundada em 2008, nossa escola nasceu da visão de formar profissionais de soldagem 
                com excelência técnica e preparados para os desafios do mercado moderno.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Ao longo dos anos, construímos uma reputação sólida baseada na qualidade do ensino, 
                na modernização constante de nossos equipamentos e na dedicação de nossos instrutores.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Hoje, somos reconhecidos como referência na formação de soldadores, com ex-alunos 
                atuando em grandes empresas e projetos em todo o país.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop"
                alt="História da escola"
                className="w-full h-80 object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Metodologia Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Nossa Metodologia</h2>
            <p className="text-gray-300 text-lg">Aprendizado prático e eficiente</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodologies.map((method, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-600 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={method.image} 
                    alt={method.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    {method.icon}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white text-center">{method.title}</CardTitle>
                  <CardDescription className="text-gray-300 text-center">
                    {method.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1563906267088-b029e7101114?w=1920&h=1080&fit=crop')"
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Nossos Diferenciais</h2>
            <p className="text-gray-300 text-lg">O que nos torna únicos no mercado</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {differentials.map((differential, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-slate-700/50 rounded-lg backdrop-blur-sm hover:bg-slate-700/70 transition-all duration-300">
                <Shield className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-300">{differential}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&h=1080&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
          <div className="absolute inset-0 bg-slate-900/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-slate-700/50 border-slate-600 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-8 w-8 text-orange-500" />
                  <CardTitle className="text-white text-2xl">Nossa Missão</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Formar profissionais de soldagem altamente qualificados, proporcionando 
                  ensino de excelência que combine teoria e prática, preparando nossos 
                  alunos para os desafios do mercado de trabalho.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/50 border-slate-600 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Flame className="h-8 w-8 text-blue-500" />
                  <CardTitle className="text-white text-2xl">Nossa Visão</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Ser reconhecida como a principal escola de soldagem do país, 
                  referência em inovação, qualidade de ensino e formação de 
                  profissionais que transformam o setor industrial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&h=1080&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
          <div className="absolute inset-0 bg-slate-900/80"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Faça Parte da Nossa História</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se aos centenas de profissionais que já transformaram suas vidas 
            através da nossa escola. Sua jornada começa aqui!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25"
              >
                <Flame className="mr-2 h-5 w-5" />
                INSCREVA-SE AGORA
              </Button>
            </Link>
            <Link to="/">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg transition-all duration-300 backdrop-blur-sm"
              >
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-900"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-2xl font-bold text-white mb-4">Escola de Soldas</h3>
          <p className="text-gray-400 mb-4">Transformando vidas através da soldagem profissional</p>
          <div className="flex justify-center space-x-4 text-gray-400">
            <span>© 2024 Escola de Soldas. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
