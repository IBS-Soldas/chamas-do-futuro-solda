import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, Lock, Clock, ArrowLeft, BookOpen } from "lucide-react";

// Declarações de tipos para YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const CourseLessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const [lessonsState, setLessonsState] = useState<any[]>([]);
  const [videoWatched, setVideoWatched] = useState<boolean>(false);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const playerRef = useRef<any>(null);

  // Dados dos cursos (simulando banco de dados)
  const coursesData = {
    1: {
      id: 1,
      title: "Fundamentos da Soldagem",
      description: "Curso completo de fundamentos de soldagem para iniciantes",
      coverImage: "https://blog.chicosoldas.com.br/wp-content/uploads/2022/06/4-instrucoes-de-soldagem.png",
      lessons: [
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
          title: "Projeto Final",
          description: "Aplicação prática de todos os conceitos aprendidos",
          duration: "120 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        }
      ]
    },
    2: {
      id: 2,
      title: "Soldagem MIG/MAG Avançada",
      description: "Técnicas avançadas de soldagem MIG/MAG para profissionais",
      coverImage: "https://www.lmsolucoesdeengenharia.com/imagens/informacoes/empresa-soldas-especiais-01.webp",
      lessons: [
        {
          id: 1,
          title: "Revisão de Conceitos Básicos",
          description: "Recapitulação dos fundamentos da soldagem MIG/MAG",
          duration: "30 min",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 2,
          title: "Configuração Avançada de Equipamentos",
          description: "Ajustes finos e configurações específicas",
          duration: "45 min",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 3,
          title: "Soldagem em Posições Difíceis",
          description: "Técnicas para soldagem em posições verticais e sobrecabeça",
          duration: "60 min",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 4,
          title: "Soldagem de Chapas Espessas",
          description: "Técnicas para materiais com espessura superior a 10mm",
          duration: "75 min",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 5,
          title: "Soldagem de Tubos",
          description: "Técnicas específicas para soldagem de tubulações",
          duration: "90 min",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 6,
          title: "Soldagem de Alumínio",
          description: "Técnicas específicas para soldagem de alumínio com MIG",
          duration: "60 min",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 7,
          title: "Soldagem de Aços Inoxidáveis",
          description: "Técnicas para soldagem de aços inoxidáveis",
          duration: "60 min",
          completed: false,
          current: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 8,
          title: "Controle de Distorção",
          description: "Técnicas para minimizar distorções durante a soldagem",
          duration: "45 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 9,
          title: "Soldagem de Juntas Complexas",
          description: "Técnicas para juntas em T, sobrepostas e cantoneiras",
          duration: "90 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 10,
          title: "Soldagem de Estruturas Metálicas",
          description: "Aplicação em estruturas de grande porte",
          duration: "120 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 11,
          title: "Controle de Qualidade Avançado",
          description: "Inspeção visual e testes não destrutivos",
          duration: "60 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 12,
          title: "Manutenção de Equipamentos",
          description: "Manutenção preventiva e corretiva",
          duration: "45 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 13,
          title: "Soldagem Automatizada",
          description: "Introdução à soldagem robotizada",
          duration: "60 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 14,
          title: "Normas e Certificações",
          description: "Normas AWS, ISO e certificações profissionais",
          duration: "45 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 15,
          title: "Projeto Final Avançado",
          description: "Projeto prático aplicando todas as técnicas aprendidas",
          duration: "180 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        }
      ]
    },
    3: {
      id: 3,
      title: "Soldagem TIG Especializada",
      description: "Especialização em soldagem TIG para aplicações críticas",
      coverImage: "https://tse2.mm.bing.net/th/id/OIP.ljHpcpI3IWbKfscwHv6LwgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      lessons: [
        {
          id: 1,
          title: "Fundamentos da Soldagem TIG",
          description: "Princípios básicos e equipamentos TIG",
          duration: "60 min",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 2,
          title: "Configuração do Equipamento TIG",
          description: "Ajustes de corrente, gás e eletrodos",
          duration: "45 min",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 3,
          title: "Técnicas de Arco TIG",
          description: "Controle do arco e estabilização",
          duration: "75 min",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 4,
          title: "Soldagem TIG de Alumínio",
          description: "Técnicas específicas para alumínio",
          duration: "90 min",
          completed: false,
          current: true,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 5,
          title: "Soldagem TIG de Aços Inoxidáveis",
          description: "Técnicas para aços inoxidáveis",
          duration: "75 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 6,
          title: "Soldagem TIG de Titânio",
          description: "Técnicas para soldagem de titânio",
          duration: "90 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 7,
          title: "Soldagem TIG de Tubos",
          description: "Técnicas para tubulações críticas",
          duration: "120 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 8,
          title: "Soldagem TIG de Chapas Finas",
          description: "Técnicas para materiais com espessura inferior a 2mm",
          duration: "60 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 9,
          title: "Soldagem TIG de Chapas Espessas",
          description: "Técnicas para materiais com espessura superior a 10mm",
          duration: "90 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 10,
          title: "Soldagem TIG com Preenchimento",
          description: "Técnicas de adição de material de enchimento",
          duration: "75 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 11,
          title: "Soldagem TIG em Posições Difíceis",
          description: "Técnicas para posições verticais e sobrecabeça",
          duration: "90 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 12,
          title: "Soldagem TIG de Juntas Complexas",
          description: "Técnicas para juntas em T e cantoneiras",
          duration: "120 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 13,
          title: "Soldagem TIG de Estruturas Críticas",
          description: "Aplicações em estruturas que exigem alta qualidade",
          duration: "150 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 14,
          title: "Controle de Qualidade TIG",
          description: "Inspeção e testes específicos para soldagem TIG",
          duration: "75 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 15,
          title: "Soldagem TIG Automatizada",
          description: "Introdução à soldagem TIG robotizada",
          duration: "90 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 16,
          title: "Normas Específicas TIG",
          description: "Normas AWS, ASME e ISO para soldagem TIG",
          duration: "60 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 17,
          title: "Certificação TIG",
          description: "Preparação para certificações profissionais",
          duration: "120 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        },
        {
          id: 18,
          title: "Projeto Final TIG",
          description: "Projeto prático aplicando todas as técnicas TIG",
          duration: "240 min",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/fsV5mv4ERYs"
        }
      ]
    }
  };

  const course = coursesData[courseId as string];
const originalLessons = course?.lessons || [];
const lessons = lessonsState.length > 0 ? lessonsState : originalLessons;

// Função para carregar a YouTube Iframe API
const loadYouTubeAPI = () => {
  if (window.YT) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      resolve(true);
    };
  });
};

// Função para formatar tempo em minutos:segundos
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Função para extrair o ID do vídeo do YouTube
const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Função para inicializar o player do YouTube
const initializeYouTubePlayer = (videoUrl: string, lessonId: number) => {
  const videoId = getYouTubeVideoId(videoUrl);
  if (!videoId) return;

  loadYouTubeAPI().then(() => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onStateChange: (event: any) => {
          if (event.data === 0) {
            handleVideoEnded(lessonId);
          } else if (event.data === 1) {
            setIsVideoPlaying(true);
            setStartTime(Date.now());
          } else if (event.data === 2) {
            setIsVideoPlaying(false);
            saveVideoProgress(lessonId);
          }
        },
        onReady: () => {
          const watched = localStorage.getItem(`videoWatched_${courseId}_${lessonId}`);
          if (watched === 'true') {
            setVideoWatched(true);
          }

          const savedProgress = localStorage.getItem(`videoProgress_${courseId}_${lessonId}`);
          if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            setCurrentVideoTime(progress.currentTime || 0);

            if (progress.currentTime > 0) {
              setTimeout(() => {
                if (playerRef.current && playerRef.current.seekTo) {
                  playerRef.current.seekTo(progress.currentTime);
                }
              }, 1000);
            }
          }
        }
      }
    });
  });
};

// Função para salvar o progresso do vídeo
const saveVideoProgress = (lessonId: number) => {
  if (playerRef.current && playerRef.current.getCurrentTime) {
    const currentTime = playerRef.current.getCurrentTime();
    const totalTime = playerRef.current.getDuration();

    const progress = {
      currentTime: currentTime,
      totalTime: totalTime,
      percentage: (currentTime / totalTime) * 100,
      timestamp: Date.now()
    };

    localStorage.setItem(`videoProgress_${courseId}_${lessonId}`, JSON.stringify(progress));
    setCurrentVideoTime(currentTime);
  }
};

// Função para lidar com o fim do vídeo
const handleVideoEnded = (lessonId: number) => {
  setVideoWatched(true);
  localStorage.setItem(`videoWatched_${courseId}_${lessonId}`, 'true');

  // ✅ Remove o progresso salvo quando finaliza
  localStorage.removeItem(`videoProgress_${courseId}_${lessonId}`);

  if (!completedLessons.includes(lessonId)) {
    handleLessonComplete(lessonId);
  }
};

useEffect(() => {
  const stored = localStorage.getItem(`completedLessons_${courseId}`);
  const storedLessons = stored ? JSON.parse(stored) : [];
  setCompletedLessons(storedLessons);

  const updatedLessons = originalLessons.map(lesson => {
    const videoWatched = localStorage.getItem(`videoWatched_${courseId}_${lesson.id}`) === 'true';
    const savedProgress = localStorage.getItem(`videoProgress_${courseId}_${lesson.id}`);
    let progress = null;
    if (savedProgress) {
      progress = JSON.parse(savedProgress);
    }

    return {
      ...lesson,
      completed: storedLessons.includes(lesson.id) || videoWatched,
      current: false,
      videoWatched: videoWatched,
      progress: progress
    };
  });

  const firstIncompleteLesson = updatedLessons.find(lesson => !lesson.completed);
  if (firstIncompleteLesson) {
    firstIncompleteLesson.current = true;
  }

  setLessonsState(updatedLessons);
}, [courseId]);

if (!course) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Curso não encontrado</h2>
        <Button onClick={() => navigate('/dashboard/cursos')}>
          Voltar aos Cursos
        </Button>
      </div>
    </div>
  );
}

const totalLessons = lessons.length;
const completedCount = lessons.filter(lesson => lesson.completed).length;
const progressPercentage = (completedCount / totalLessons) * 100;

const handleLessonComplete = (lessonId: number) => {
  const newCompleted = [...completedLessons, lessonId];
  setCompletedLessons(newCompleted);
  localStorage.setItem(`completedLessons_${courseId}`, JSON.stringify(newCompleted));

  const updatedLessons = lessons.map(lesson => {
    if (lesson.id === lessonId) {
      return { ...lesson, completed: true, current: false };
    }
    return lesson;
  });

  const currentLessonIndex = updatedLessons.findIndex(lesson => lesson.id === lessonId);
  const nextLesson = updatedLessons[currentLessonIndex + 1];
  if (nextLesson && !nextLesson.completed) {
    nextLesson.current = true;
  }

  setLessonsState(updatedLessons);
};

const handleWatchLesson = (lesson: any) => {
  if (lesson.videoUrl) {
    setCurrentLessonId(lesson.id);
    setVideoWatched(false);

    const watched = localStorage.getItem(`videoWatched_${courseId}_${lesson.id}`);
    if (watched === 'true') {
      setVideoWatched(true);
    }

    setOpenVideo(lesson.videoUrl);
  }
};

const handleCloseVideo = () => {
  if (currentLessonId && playerRef.current) {
    saveVideoProgress(currentLessonId);
  }

  if (playerRef.current) {
    playerRef.current.destroy();
    playerRef.current = null;
  }
  setOpenVideo(null);
  setCurrentLessonId(null);
  setVideoWatched(false);
  setStartTime(null);
  setIsVideoPlaying(false);
};

useEffect(() => {
  if (openVideo && currentLessonId) {
    const timer = setTimeout(() => {
      initializeYouTubePlayer(openVideo, currentLessonId);
    }, 100);
    return () => clearTimeout(timer);
  }
}, [openVideo, currentLessonId, courseId]);

useEffect(() => {
  let interval: NodeJS.Timeout;

  if (isVideoPlaying && currentLessonId) {
    interval = setInterval(() => {
      saveVideoProgress(currentLessonId);
    }, 5000);
  }

  return () => {
    if (interval) {
      clearInterval(interval);
    }
    // ✅ Salva último progresso quando o componente desmonta
    if (currentLessonId && playerRef.current) {
      saveVideoProgress(currentLessonId);
    }
  };
}, [isVideoPlaying, currentLessonId]);

return (
  <div className="space-y-6">
    {/* Header do Curso */}
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-500/20 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/cursos')}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar aos Cursos
        </Button>
      </div>

      <div className="flex items-start gap-6">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-gray-300 mb-4">{course.description}</p>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Progresso do Curso</span>
              <span className="text-blue-400">{completedCount}/{totalLessons} aulas</span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-2" />
            <p className="text-gray-400 text-sm">
              {progressPercentage === 100
                ? "Parabéns! Você completou o curso!"
                : `Faltam ${totalLessons - completedCount} aulas para completar o curso.`}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Lista de Aulas */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lessons.map((lesson, index) => (
        <Card
          key={lesson.id}
          className={`flex flex-col bg-white/5 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
            lesson.completed
              ? 'border-green-500/40 bg-green-500/10'
              : lesson.current
              ? 'border-blue-500/40 bg-blue-500/10'
              : 'border-gray-500/20 hover:border-gray-400/40'
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-white flex items-center gap-2">
                  {lesson.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : lesson.current ? (
                    <Play className="h-5 w-5 text-blue-400" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                  <span className="text-sm">Aula {index + 1}</span>
                </CardTitle>
                <CardDescription className="text-gray-400 mt-1">
                  {lesson.title}
                </CardDescription>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lesson.completed
                    ? 'bg-green-500/20 text-green-400'
                    : lesson.current
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {lesson.completed
                  ? 'Concluída'
                  : lesson.current
                  ? 'Atual'
                  : 'Bloqueada'}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col flex-1">
            <div className="flex flex-col flex-1 justify-between">
              <div className="min-h-[60px]">
                <p className="text-gray-300 text-sm line-clamp-2">
                  {lesson.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400 mt-3">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration}</span>
                {!lesson.completed && lesson.progress && lesson.progress.currentTime > 0 && (
                  <span className="text-blue-400 ml-2">
                    • Parou em {formatTime(lesson.progress.currentTime)}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {lesson.completed ? (
                <Button
                  onClick={() => handleWatchLesson(lesson)}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  disabled={!lesson.videoUrl}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Revisar
                </Button>
              ) : lesson.current ? (
                <Button
                  onClick={() => handleWatchLesson(lesson)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  disabled={!lesson.videoUrl}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Assistir
                </Button>
              ) : (
                <Button disabled className="flex-1 bg-gray-500 cursor-not-allowed">
                  <Lock className="h-4 w-4 mr-2" />
                  Bloqueada
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {openVideo && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-4 max-w-4xl w-full max-h-[80vh]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Aula em Andamento</h3>
            <Button
              variant="ghost"
              onClick={handleCloseVideo}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <div
              id="youtube-player"
              className="absolute inset-0 w-full h-full rounded"
            />
            {currentVideoTime > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                <div className="flex items-center justify-between text-white text-sm">
                  <span>Progresso: {formatTime(currentVideoTime)}</span>
                  <span>Salvando automaticamente...</span>
                </div>
              </div>
            )}
          </div>
          {videoWatched && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              <p className="text-green-800 text-sm font-medium">
                ✅ Vídeo assistido! A próxima aula foi desbloqueada automaticamente.
              </p>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);
}

export default CourseLessons; 