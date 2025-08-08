import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, Clock, BookOpen, Award } from "lucide-react";
import { useApp } from '@/contexts/AppContext';

const Courses = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => (
    console.log(user)
  ))

  // Dados base dos cursos
  const courseData = [
    {
      id: 1,
      title: "Fundamentos da Soldagem",
      description: "Curso completo de fundamentos de soldagem para iniciantes",
      coverImage: "https://blog.chicosoldas.com.br/wp-content/uploads/2022/06/4-instrucoes-de-soldagem.png",
      totalLessons: 12,
      duration: "40 horas",
      level: "Iniciante",
      certificate: true
    },
    {
      id: 2,
      title: "Soldagem MIG/MAG Avançada",
      description: "Técnicas avançadas de soldagem MIG/MAG para profissionais",
      coverImage: "https://www.lmsolucoesdeengenharia.com/imagens/informacoes/empresa-soldas-especiais-01.webp",
      totalLessons: 15,
      duration: "50 horas",
      level: "Intermediário",
      certificate: true
    },
    {
      id: 3,
      title: "Soldagem TIG Especializada",
      description: "Especialização em soldagem TIG para aplicações críticas",
      coverImage: "https://tse2.mm.bing.net/th/id/OIP.ljHpcpI3IWbKfscwHv6LwgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      totalLessons: 18,
      duration: "60 horas",
      level: "Avançado",
      certificate: true
    }
  ];

  // Simular dados de progresso do localStorage
  const getProgressData = (courseId: number) => {
    const stored = localStorage.getItem(`completedLessons_${courseId}`);
    const completedLessons = stored ? JSON.parse(stored) : [];
    const progress = courseData.find(course => course.id === courseId)?.totalLessons || 0;
    return {
      completedLessons: completedLessons.length,
      progress: progress > 0 ? Math.round((completedLessons.length / progress) * 100) : 0
    };
  };

  // Gerar dados dos cursos comprados usando map
  const purchasedCourses = courseData.map(course => {
    const progressData = getProgressData(course.id);
    const lastAccessedOptions = ["2 dias atrás", "1 semana atrás", "3 dias atrás", "5 dias atrás", "1 dia atrás"];
    const randomLastAccessed = lastAccessedOptions[Math.floor(Math.random() * lastAccessedOptions.length)];

    return {
      ...course,
      ...progressData,
      lastAccessed: randomLastAccessed
    };
  });

  const handleCourseClick = (courseId: number) => {
    navigate(`/dashboard-student/cursos/${courseId}/aulas`);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante": return "bg-green-500/20 text-green-400";
      case "Intermediário": return "bg-yellow-500/20 text-yellow-400";
      case "Avançado": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-500/20 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-400" />
          Meus Cursos
        </h1>
        <p className="text-gray-300 mb-4">
          Continue de onde parou e acompanhe seu progresso em cada curso.
        </p>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: BookOpen,
              iconColor: "text-blue-400",
              bgColor: "bg-blue-500/20",
              label: "Cursos Ativos",
              value: purchasedCourses.length,
              suffix: ""
            },
            {
              icon: CheckCircle,
              iconColor: "text-green-400",
              bgColor: "bg-green-500/20",
              label: "Aulas Concluídas",
              value: purchasedCourses.reduce((total, course) => total + course.completedLessons, 0),
              suffix: ""
            },
            {
              icon: Award,
              iconColor: "text-yellow-400",
              bgColor: "bg-yellow-500/20",
              label: "Progresso Médio",
              value: Math.round(purchasedCourses.reduce((total, course) => total + course.progress, 0) / purchasedCourses.length),
              suffix: "%"
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-white font-bold text-xl">{stat.value}{stat.suffix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedCourses.map((course) => (
          <Card
            key={course.id}
            className="flex flex-col bg-white/5 backdrop-blur-md border border-gray-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 cursor-pointer group"
            onClick={() => handleCourseClick(course.id)}
          >
            {/* Imagem de Capa */}
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Badge de Nível */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                {course.level}
              </div>

              {/* Badge de Certificado */}
              {course.certificate && (
                <div className="absolute top-3 left-3 p-1 bg-yellow-500/90 rounded-full">
                  <Award className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            {/* Conteúdo do Card */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progresso */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progresso</span>
                      <span className="text-white font-medium">{course.progress}%</span>
                    </div>
                    <Progress
                      value={course.progress}
                      className="h-2"
                      style={{
                        '--progress-background': getProgressColor(course.progress)
                      } as React.CSSProperties}
                    />
                    <p className="text-gray-400 text-xs">
                      {course.completedLessons} de {course.totalLessons} aulas concluídas
                    </p>
                  </div>

                  {/* Informações do Curso */}
                  <div className="space-y-2">
                    {[
                      { icon: Clock, text: course.duration },
                      { icon: BookOpen, text: `${course.totalLessons} aulas` },
                      { text: `Último acesso: ${course.lastAccessed}`, className: "text-xs" }
                    ].map((info, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                        {info.icon && <info.icon className="h-4 w-4" />}
                        <span className={info.className || ""}>{info.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Botão de Continuar */}
              <div className="p-4 mt-auto">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white group-hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCourseClick(course.id);
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {course.progress === 0 ? 'Começar Curso' : 'Continuar'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>


      {/* 
<div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-md border border-green-500/20 rounded-lg p-6">
  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
    <Award className="h-6 w-6 text-green-400" />
    Recomendações para Você
  </h2>
  <p className="text-gray-300 mb-4">
    Baseado no seu progresso, recomendamos estes cursos para expandir seus conhecimentos.
  </p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      {
        title: "Soldagem de Tubulação",
        description: "Especialização em soldagem de tubos e conexões"
      },
      {
        title: "Inspeção de Soldagem",
        description: "Aprenda a inspecionar e avaliar soldas"
      }
    ].map((recommendedCourse, index) => (
      <div key={index} className="bg-white/5 rounded-lg p-4 border border-gray-500/20">
        <h3 className="text-white font-semibold mb-2">{recommendedCourse.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{recommendedCourse.description}</p>
        <Button variant="outline" className="text-green-400 border-green-400 hover:bg-green-400/20">
          Ver Curso
        </Button>
      </div>
    ))}
  </div>
</div>
*/}

    </div>
  );
};

export default Courses; 