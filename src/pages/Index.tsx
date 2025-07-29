import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { 
  Flame, 
  Shield, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  Wrench,
  Building,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: Flame,
      title: "Equipamentos Modernos",
      description: "Laboratórios com equipamentos de última geração para prática profissional"
    },
    {
      icon: Shield,
      title: "Segurança em Primeiro Lugar",
      description: "Treinamento completo em normas de segurança e uso de EPIs"
    },
    {
      icon: Users,
      title: "Instrutores Qualificados",
      description: "Professores certificados com anos de experiência no mercado"
    },
    {
      icon: Award,
      title: "Certificação Reconhecida",
      description: "Certificados válidos e reconhecidos pelo mercado de trabalho"
    }
  ];

  const courses = [
    // Cursos originais
    {
      title: "Soldagem por Eletrodo",
      description: "Curso básico de soldagem por eletrodo revestido (SMAW)",
      duration: "40 horas",
      price: "R$ 890",
      features: ["Teoria e prática", "Material incluído", "Certificado"]
    },
    {
      title: "Soldagem MIG/MAG",
      description: "Soldagem semi-automática com proteção gasosa",
      duration: "60 horas", 
      price: "R$ 1.290",
      features: ["Equipamentos modernos", "Práticas intensivas", "Suporte pós-curso"]
    },
    {
      title: "Soldagem TIG",
      description: "Soldagem TIG para acabamento profissional",
      duration: "80 horas",
      price: "R$ 1.890",
      features: ["Técnicas avançadas", "Projeto final", "Mentoria individual"]
    },

    // Novos cursos (sem imagem, sem features)
    {
      title: "Fundamentos da Soldagem",
      description: "Melhor curso de Fundamentos de Soldagem do mercado, se torne um melhor profissional",
      duration: "35 horas",
      price: "R$ 1.700,00",
      features: ["Técnicas avançadas", "Projeto final", "Mentoria individual"]
    },
    {
      title: "Corte por Plasma",
      description: "Técnicas avançadas para soldagem de estruturas metálicas de grande porte",
      duration: "40 horas",
      price: "R$ 999,00",
      features: ["Equipamentos modernos", "Práticas intensivas", "Suporte pós-curso"]
    },
    {
      title: "Chaparia - 3G",
      description: "A área da indústria da soldagem oferece diversas oportunidades! 🚀 Você pode atuar em setores como: �� Indústria naval",
      duration: "30 horas",
      price: "R$ 2.500,00",
      features: ["Técnicas avançadas", "Projeto final", "Mentoria individual"]
    },
    {
      title: "MIG/MAG",
      description: "O Curso de Soldador MIG/MAG - 3G (Chaparia) é a oportunidade que você esperava para conquistar sua qualificação profissional e atuar nos setores mais valorizados do mercado",
      duration: "40 horas",
      price: "R$ 2.500,00",
      features: ["Equipamentos modernos", "Práticas intensivas", "Suporte pós-curso"]
    },
    {
      title: "Tubulação - 6G",
      description: "O curso de Soldador 6G - Tubulação (Qualificação Máxima) 🛠️ é ideal para quem quer se destacar na indústria e conquistar as melhores oportunidades!",
      duration: "30 horas",
      price: "R$ 3.800,00",
      features: ["Técnicas avançadas", "Projeto final", "Mentoria individual"]
    },
    {
      title: "Maçariqueiro Industrial",
      description: "O mercado está com alta demanda por Maçariqueiros Industriais venha se profissionalizar conosco",
      duration: "50 horas",
      price: "R$ 1.400,00",
      features: ["Equipamentos modernos", "Práticas intensivas", "Suporte pós-curso"]
    },
    {
      title: "Inspetor de soldagem N1",
      description: "O mercado está com alta demanda por Maçariqueiros Industriais venha se profissionalizar conosco",
      duration: "35 horas",
      price: "R$ 997,00",
      features: ["Técnicas avançadas", "Projeto final", "Mentoria individual"]
    },
    {
      title: "Eletrodo Revestido",
      description: "O mercado está com alta demanda por Maçariqueiros Industriais venha se profissionalizar conosco",
      duration: "35 horas",
      price: "R$ 3.500,00",
      features: ["Técnicas avançadas", "Projeto final", "Mentoria individual"]
    },
    {
      title: "TIG Chaparia",
      description: "Melhor curso de TIG Chaparia do mercado, se torne um melhor profissional",
      duration: "40 horas",
      price: "R$ 2.500,00",
      features: ["Técnicas avançadas", "Projeto final", "Mentoria individual"]
    },
    {
      title: "Soldas em Ferros Grandes",
      description: "Técnicas avançadas para soldagem de estruturas metálicas de grande porte",
      duration: "40 horas",
      price: "R$ 1.200,00",
      features: ["Equipamentos modernos", "Práticas intensivas", "Suporte pós-curso"]
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Soldador Industrial",
      content: "Excelente escola! Consegui meu emprego logo após terminar o curso. Os instrutores são muito competentes.",
      rating: 5
    },
    {
      name: "Maria Santos",
      role: "Soldadora Naval",
      content: "Recomendo para todos. O curso é muito completo e prático. Hoje trabalho em um estaleiro.",
      rating: 5
    },
    {
      name: "João Oliveira", 
      role: "Soldador Estrutural",
      content: "Mudou minha vida profissional. Saí do curso direto para uma empresa de estruturas metálicas.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header/Navigation */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-orange-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg welding-glow">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Escola de Soldagem</h1>
                <p className="text-sm text-gray-400">Profissional & Certificada</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center justify-center space-x-8">
              <a href="#cursos" className="text-white hover:text-orange-400 transition-colors">Cursos</a>
              <a href="#sobre" className="text-white hover:text-orange-400 transition-colors">Sobre</a>
              <a href="#depoimentos" className="text-white hover:text-orange-400 transition-colors">Depoimentos</a>
              <a href="#contato" className="text-white hover:text-orange-400 transition-colors">Contato</a>
              <Button
                variant="outline"
                onClick={() => navigate('/sobre')}
                className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
              >
                Saiba Mais
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              >
                <User className="h-4 w-4 mr-2" />
                Área do Aluno
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f97316%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow">
              Domine a Arte da
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent animate-gradient">
                {" "}Soldagem
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Torne-se um soldador profissional com nossos cursos práticos e certificação reconhecida pelo mercado. 
              Equipamentos modernos, instrutores experientes e metodologia comprovada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setIsEnrollmentOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 glow-orange"
              >
                Matricule-se Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 glow-blue"
              >
                <User className="h-5 w-5 mr-2" />
                Área do Aluno
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="sobre" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Por que escolher nossa escola?</h2>
            <p className="text-xl text-gray-400">Excelência em ensino e preparação para o mercado</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-orange-400" />
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="cursos" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Nossos Cursos</h2>
            <p className="text-xl text-gray-400">Programas completos para todos os níveis</p>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex gap-8 pb-2" style={{ minWidth: 320 }}>
              {courses.map((course, index) => (
                <div style={{ minWidth: 320, maxWidth: 340, flex: "0 0 auto" }}>
                  {/* Card do curso */}
                  <Card
                    key={index}
                    className="bg-white/10 backdrop-blur-md border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group scale-95 hover:scale-100 h-full flex flex-col"
                  >
                    <CardHeader>
                      <CardTitle className="text-white text-xl text-center">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-center min-h-[56px] max-h-[56px] overflow-hidden text-ellipsis">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Duração:</span>
                          <span className="text-orange-400 font-semibold">
                            {course.duration}
                          </span>
                        </div>
                        <div className="space-y-2 mt-2">
                          {(course.features && course.features.length > 0
                            ? course.features
                            : [
                                "Certificado reconhecido",
                                "Aulas práticas",
                                "Instrutores experientes"
                              ]
                          ).slice(0, 3).map((feature, idx) => (
                            <div key={feature + idx} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-600">
                        <div className="text-center">
                          <span className="text-3xl font-bold text-orange-400">
                            {course.price}
                          </span>
                          <p className="text-gray-400 text-sm">Parcelamento disponível</p>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        onClick={() => setIsEnrollmentOpen(true)}
                      >
                        Matricular-se
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">O que nossos alunos dizem</h2>
            <p className="text-xl text-gray-400">Histórias de sucesso reais</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-orange-500/20">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-white">{testimonial.name}</CardTitle>
                  <CardDescription className="text-orange-400">{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Pronto para começar sua carreira?</h2>
          <p className="text-xl text-gray-300 mb-8">Junte-se a centenas de profissionais formados em nossa escola</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setIsEnrollmentOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold"
            >
              Inscrever-se Agora
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 text-lg font-semibold"
            >
              <User className="h-5 w-5 mr-2" />
              Portal do Aluno
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-slate-900 py-16 border-t border-orange-500/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg welding-glow">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Escola de Soldagem</h3>
                  <p className="text-sm text-gray-400">Formando profissionais desde 2010</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Nossa missão é formar soldadores qualificados e preparados para o mercado de trabalho, 
                com ensino prático e certificação reconhecida.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(24) 9 7400-8059</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>comercialbrsoldas@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-6 w-6" />
                  <span>Rua Isalino Gomes da Silva, 993 - Paraíso, Barra Mansa - RJ, Brasil</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Horários</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Seg-Sex: 8h às 18h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Sáb: 8h às 12h</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Escola de Soldagem. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Enrollment Form Modal */}
      <EnrollmentForm 
        isOpen={isEnrollmentOpen} 
        onClose={() => setIsEnrollmentOpen(false)} 
      />
    </div>
  );
};

export default Index;
