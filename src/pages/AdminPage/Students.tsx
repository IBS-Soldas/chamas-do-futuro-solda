import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, Clock, BookOpen, Award, Users } from "lucide-react";
import { useApp } from '@/contexts/AppContext';

const Students = () => {
    const navigate = useNavigate();
    const { users } = useApp()

    useEffect(() => (
        console.log(users)
    ), [])

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
                            icon: Users,
                            iconColor: "text-blue-400",
                            bgColor: "bg-blue-500/20",
                            label: "Alunos Ativos",
                            value: users.length,
                            suffix: ""
                        },
                        {
                            icon: Users,
                            iconColor: "text-green-400",
                            bgColor: "bg-green-500/20",
                            label: "Alunos com Cursos Concluídos",
                            value: users.length,
                            suffix: ""
                        },
                        {
                            icon: Award,
                            iconColor: "text-yellow-400",
                            bgColor: "bg-yellow-500/20",
                            label: "Progresso Médio dos Alunos",
                            value: users.length,
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

            {/* Lista de Alunos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-200"
                        onClick={() => navigate(`/dashboard-admin/students/${user.firebaseUid}`)}
                    >
                        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">{user.name}</CardTitle>
                                <CardDescription className="text-gray-400">{user.email}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-gray-300 space-y-1">
                                <p><strong>Cidade:</strong> {user.city}</p>
                                <p><strong>Estado:</strong> {user.state}</p>
                                <p><strong>Status:</strong> {user.isActive ? 'Ativo' : 'Inativo'}</p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Students; 