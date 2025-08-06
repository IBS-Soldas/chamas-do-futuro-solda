import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, Clock, BookOpen, Award } from "lucide-react";

const Students = () => {
    const navigate = useNavigate();

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
        navigate(`/dashboard/cursos/${courseId}/aulas`);
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
                    Alunos
                </h1>
                <p className="text-gray-300 mb-4">
                    Acompanhe o desempenho de cada aluno.
                </p>

                {/* Estatísticas Gerais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            icon: BookOpen,
                            iconColor: "text-blue-400",
                            bgColor: "bg-blue-500/20",
                            label: "Alunos Ativos",
                            value: purchasedCourses.length,
                            suffix: ""
                        },
                        {
                            icon: CheckCircle,
                            iconColor: "text-green-400",
                            bgColor: "bg-green-500/20",
                            label: "Alunos com Cursos Concluídos",
                            value: purchasedCourses.reduce((total, course) => total + course.completedLessons, 0),
                            suffix: ""
                        },
                        {
                            icon: Award,
                            iconColor: "text-yellow-400",
                            bgColor: "bg-yellow-500/20",
                            label: "Progresso Médio dos Alunos",
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

            
        </div>
    );
};

export default Students; 