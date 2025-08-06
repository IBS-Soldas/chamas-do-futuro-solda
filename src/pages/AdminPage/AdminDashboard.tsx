import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, FileText, Award, ShoppingCart, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
    const stats = [
        {
            title: "Alunos Ativos",
            value: "120",
            icon: Users,
            color: "text-blue-400"
        },
        {
            title: "Aulas Assistidas",
            value: "980",
            icon: BookOpen,
            color: "text-green-400"
        },
        {
            title: "Materiais Baixados",
            value: "430",
            icon: FileText,
            color: "text-yellow-400"
        },
        {
            title: "Cursos Comprados",
            value: "140",
            icon: ShoppingCart,
            color: "text-red-400"
        },
        {
            title: "Certificados Emitidos",
            value: "87",
            icon: Award,
            color: "text-purple-400"
        },
        {
            title: "Progresso Médio Geral",
            value: "72%",
            icon: TrendingUp,
            color: "text-orange-400"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-md border border-orange-500/20 rounded-lg p-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Painel Administrativo
                </h1>
                <p className="text-gray-300">
                    Acompanhe o desempenho geral dos alunos e estatísticas da plataforma.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="bg-white/5 backdrop-blur-md border-orange-500/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white mb-2">
                                {stat.value}
                            </div>
                            {stat.title === "Progresso Médio Geral" && (
                                <>
                                    <Progress value={parseInt(stat.value)} className="h-2" />
                                    <p className="text-xs text-gray-400 mt-1">
                                        {stat.value} do conteúdo concluído pelos alunos
                                    </p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
