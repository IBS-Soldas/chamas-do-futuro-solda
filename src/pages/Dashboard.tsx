
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileText, Award, Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'Aluno';

  const stats = [
    {
      title: "Aulas Concluídas",
      value: "8",
      total: "12",
      percentage: 67,
      icon: BookOpen,
      color: "text-blue-400"
    },
    {
      title: "Apostilas Baixadas",
      value: "5",
      total: "8",
      percentage: 63,
      icon: FileText,
      color: "text-green-400"
    },
    {
      title: "Progresso Geral",
      value: "65%",
      total: "100%",
      percentage: 65,
      icon: TrendingUp,
      color: "text-orange-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-md border border-orange-500/20 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Bem-vindo de volta, {userEmail.split('@')[0]}!
        </h1>
        <p className="text-gray-300">
          Continue seus estudos e torne-se um soldador profissional.
        </p>
      </div>

      {/* Stats Grid */}
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
                <span className="text-sm font-normal text-gray-400 ml-1">
                  / {stat.total}
                </span>
              </div>
              <Progress value={stat.percentage} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">
                {stat.percentage}% concluído
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/5 backdrop-blur-md border-orange-500/20 hover:border-orange-500/40 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-white">Continuar Aulas</CardTitle>
                <CardDescription className="text-gray-400">
                  Próxima aula: Soldagem MIG
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/dashboard/aulas')}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Ir para Aulas
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-orange-500/20 hover:border-orange-500/40 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FileText className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-white">Material de Apoio</CardTitle>
                <CardDescription className="text-gray-400">
                  Apostilas e guias práticos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/dashboard/apostilas')}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Ver Apostilas
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-orange-500/20 hover:border-orange-500/40 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <CardTitle className="text-white">Certificados</CardTitle>
                <CardDescription className="text-gray-400">
                  Baixe seus certificados
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/dashboard/certificados')}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Ver Certificados
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/5 backdrop-blur-md border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <div className="flex-1">
                <p className="text-white font-medium">Aula concluída: Introdução à Soldagem</p>
                <p className="text-gray-400 text-sm">Há 2 dias</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <FileText className="h-5 w-5 text-green-400" />
              <div className="flex-1">
                <p className="text-white font-medium">Apostila baixada: Segurança em Soldagem</p>
                <p className="text-gray-400 text-sm">Há 5 dias</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
