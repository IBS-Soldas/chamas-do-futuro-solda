
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Download, CheckCircle, Clock, AlertCircle } from "lucide-react";

const Certificates = () => {
  const completedLessons = 8;
  const totalLessons = 12;
  const progressPercentage = (completedLessons / totalLessons) * 100;
  const canGetCertificate = completedLessons === totalLessons;

  const certificates = [
    {
      id: 1,
      title: "Certificado de Soldagem Básica",
      description: "Certificado de conclusão do curso básico de soldagem",
      requirement: "Completar todas as 12 aulas",
      available: canGetCertificate,
      completed: canGetCertificate,
      progress: progressPercentage
    },
    {
      id: 2,
      title: "Certificado AWS D1.1",
      description: "Certificado de qualificação AWS para soldagem estrutural",
      requirement: "Completar curso + aprovação no exame prático",
      available: false,
      completed: false,
      progress: 0
    },
    {
      id: 3,
      title: "Certificado de Inspetor de Solda",
      description: "Certificado para atuar como inspetor de soldagem",
      requirement: "Completar módulo avançado + 2 anos de experiência",
      available: false,
      completed: false,
      progress: 0
    }
  ];

  const handleDownloadCertificate = (certificateId: number, title: string) => {
    // Simular download do certificado
    console.log(`Baixando certificado: ${title}`);
    // Em produção, gerar e baixar PDF do certificado
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 backdrop-blur-md border border-yellow-500/20 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <Award className="h-8 w-8 text-yellow-400" />
          Certificados
        </h1>
        <p className="text-gray-300 mb-4">
          Acompanhe seu progresso e baixe seus certificados quando disponíveis.
        </p>
        
        {/* Progresso Geral */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">Progresso do Curso Principal</span>
            <span className="text-yellow-400">{completedLessons}/{totalLessons} aulas</span>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-2" />
          <p className="text-gray-400 text-sm">
            {canGetCertificate 
              ? "Parabéns! Você pode baixar seu certificado." 
              : `Faltam ${totalLessons - completedLessons} aulas para liberar o certificado.`
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {certificates.map((certificate) => (
          <Card 
            key={certificate.id} 
            className={`bg-white/5 backdrop-blur-md border transition-all ${
              certificate.completed 
                ? 'border-green-500/40 bg-green-500/10' 
                : certificate.available
                ? 'border-yellow-500/40 bg-yellow-500/10'
                : 'border-gray-500/20'
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center gap-2">
                    {certificate.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : certificate.available ? (
                      <Award className="h-6 w-6 text-yellow-400" />
                    ) : (
                      <Clock className="h-6 w-6 text-gray-400" />
                    )}
                    {certificate.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    {certificate.description}
                  </CardDescription>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  certificate.completed 
                    ? 'bg-green-500/20 text-green-400' 
                    : certificate.available
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {certificate.completed ? 'Disponível' : certificate.available ? 'Liberado' : 'Bloqueado'}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <AlertCircle className="h-4 w-4" />
                  <span><strong>Requisito:</strong> {certificate.requirement}</span>
                </div>
                
                {certificate.id === 1 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progresso</span>
                      <span className="text-yellow-400">{Math.round(certificate.progress)}%</span>
                    </div>
                    <Progress value={certificate.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex gap-3">
                  {certificate.completed ? (
                    <Button
                      onClick={() => handleDownloadCertificate(certificate.id, certificate.title)}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Certificado
                    </Button>
                  ) : certificate.available ? (
                    <Button
                      onClick={() => handleDownloadCertificate(certificate.id, certificate.title)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Gerar Certificado
                    </Button>
                  ) : (
                    <Button disabled className="flex-1 bg-gray-500 cursor-not-allowed">
                      <Clock className="h-4 w-4 mr-2" />
                      Não Disponível
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Informações Adicionais */}
      <Card className="bg-white/5 backdrop-blur-md border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-400" />
            Informações Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-2">
          <p>• Os certificados são gerados automaticamente quando todos os requisitos são atendidos.</p>
          <p>• Certificados AWS requerem aprovação em exame prático presencial.</p>
          <p>• Todos os certificados são válidos e reconhecidos pelo mercado.</p>
          <p>• Em caso de dúvidas, entre em contato com nossa equipe de suporte.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Certificates;
