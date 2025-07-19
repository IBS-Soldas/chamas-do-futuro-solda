import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, Lock, Clock } from "lucide-react";

const Lessons = () => {
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const lessons = [
    {
      id: 1,
      title: "Introdução à Soldagem",
      description: "Conceitos básicos e história da soldagem",
      duration: "45 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 2,
      title: "Equipamentos de Segurança",
      description: "EPIs essenciais para soldagem",
      duration: "30 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 3,
      title: "Tipos de Soldagem",
      description: "Soldagem por eletrodo, MIG, TIG e outros",
      duration: "60 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 4,
      title: "Preparação de Materiais",
      description: "Como preparar metais para soldagem",
      duration: "40 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 5,
      title: "Soldagem por Eletrodo - Teoria",
      description: "Fundamentos da soldagem por eletrodo",
      duration: "50 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 6,
      title: "Soldagem por Eletrodo - Prática",
      description: "Exercícios práticos básicos",
      duration: "90 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 7,
      title: "Soldagem MIG - Teoria",
      description: "Princípios da soldagem MIG/MAG",
      duration: "45 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 8,
      title: "Soldagem MIG - Prática",
      description: "Exercícios práticos com MIG",
      duration: "90 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 9,
      title: "Soldagem TIG - Teoria",
      description: "Fundamentos da soldagem TIG",
      duration: "45 min",
      completed: false,
      current: true,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 10,
      title: "Soldagem TIG - Prática",
      description: "Exercícios práticos com TIG",
      duration: "90 min",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 11,
      title: "Inspeção e Qualidade",
      description: "Como avaliar a qualidade da soldagem",
      duration: "35 min",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    },
    {
      id: 12,
      title: "Certificação Final",
      description: "Teste prático para certificação",
      duration: "120 min",
      completed: false,
      videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
    }
  ];

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  const handleWatchLesson = (lessonId: number, video: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }

    setVideoUrl(video);
    setVideoOpen(true);
  };

  return (
    <div className="space-y-6">

  
      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl p-4">
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title="YouTube player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg w-full h-full"
              ></iframe>
            </div>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-2 right-2 text-white text-xl bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}

   
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-md border border-blue-500/20 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-4">Aulas do Curso</h1>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Progresso do Curso</span>
            <span className="text-blue-400">{completedLessons.length}/{lessons.length} aulas</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-gray-400 text-sm">
            {Math.round(progressPercentage)}% concluído
          </p>
        </div>
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isAvailable = lesson.id === 1 || completedLessons.includes(lesson.id - 1);
          const isCurrent = lesson.current;

          return (
            <Card 
              key={lesson.id} 
              className={`bg-white/5 backdrop-blur-md border transition-all ${
                isCompleted 
                  ? 'border-green-500/40 bg-green-500/10' 
                  : isCurrent
                  ? 'border-blue-500/40 bg-blue-500/10'
                  : isAvailable
                  ? 'border-orange-500/20 hover:border-orange-500/40'
                  : 'border-gray-500/20 bg-gray-500/5'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : !isAvailable ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Play className="h-5 w-5 text-blue-400" />
                      )}
                      Aula {lesson.id}: {lesson.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {lesson.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="h-4 w-4" />
                    {lesson.duration}
                  </div>
                  <Button
                    onClick={() => handleWatchLesson(lesson.id, lesson.videoUrl)}
                    disabled={!isAvailable}
                    className={
                      isCompleted
                        ? "bg-green-500 hover:bg-green-600"
                        : isCurrent
                        ? "bg-blue-500 hover:bg-blue-600"
                        : isAvailable
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-500 cursor-not-allowed"
                    }
                  >
                    {isCompleted ? "Revisar" : !isAvailable ? "Bloqueada" : "Assistir"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Lessons;
