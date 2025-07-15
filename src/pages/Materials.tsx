
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, BookOpen } from "lucide-react";

const Materials = () => {
  const materials = [
    {
      id: 1,
      title: "Manual Completo de Soldagem",
      description: "Guia completo com todos os processos de soldagem",
      pages: 150,
      size: "25 MB",
      category: "Teoria Geral",
      available: true
    },
    {
      id: 2,
      title: "Segurança em Soldagem",
      description: "Normas de segurança e uso de EPIs",
      pages: 45,
      size: "8 MB",
      category: "Segurança",
      available: true
    },
    {
      id: 3,
      title: "Soldagem por Eletrodo",
      description: "Técnicas e exercícios para soldagem por eletrodo",
      pages: 80,
      size: "15 MB",
      category: "Eletrodo",
      available: true
    },
    {
      id: 4,
      title: "Soldagem MIG/MAG",
      description: "Guia prático para soldagem MIG e MAG",
      pages: 95,
      size: "18 MB",
      category: "MIG/MAG",
      available: true
    },
    {
      id: 5,
      title: "Soldagem TIG",
      description: "Técnicas avançadas de soldagem TIG",
      pages: 110,
      size: "22 MB",
      category: "TIG",
      available: true
    },
    {
      id: 6,
      title: "Metalurgia para Soldadores",
      description: "Propriedades dos metais e ligas",
      pages: 65,
      size: "12 MB",
      category: "Teoria",
      available: false
    },
    {
      id: 7,
      title: "Inspeção de Soldas",
      description: "Métodos de inspeção e controle de qualidade",
      pages: 70,
      size: "14 MB",
      category: "Qualidade",
      available: false
    },
    {
      id: 8,
      title: "Certificação AWS",
      description: "Preparação para certificação AWS",
      pages: 120,
      size: "20 MB",
      category: "Certificação",
      available: false
    }
  ];

  const handleDownload = (materialId: number, title: string) => {
    // Simular download
    console.log(`Baixando: ${title}`);
    // Em produção, fazer download real do arquivo
  };

  const handlePreview = (materialId: number, title: string) => {
    // Simular visualização
    console.log(`Visualizando: ${title}`);
    // Em produção, abrir preview do PDF
  };

  const availableMaterials = materials.filter(m => m.available);
  const lockedMaterials = materials.filter(m => !m.available);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/20 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Material de Apoio</h1>
        <p className="text-gray-300">
          Baixe as apostilas e materiais complementares para seus estudos.
        </p>
        <div className="mt-4 text-sm text-green-400">
          {availableMaterials.length} de {materials.length} materiais disponíveis
        </div>
      </div>

      {/* Materiais Disponíveis */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-green-400" />
          Materiais Disponíveis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableMaterials.map((material) => (
            <Card key={material.id} className="bg-white/5 backdrop-blur-md border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-400" />
                      {material.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {material.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                    {material.category}
                  </span>
                  <span>{material.pages} páginas</span>
                  <span>{material.size}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handlePreview(material.id, material.title)}
                    variant="outline"
                    className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button
                    onClick={() => handleDownload(material.id, material.title)}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Materiais Bloqueados */}
      {lockedMaterials.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-400" />
            Materiais Futuros
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lockedMaterials.map((material) => (
              <Card key={material.id} className="bg-white/5 backdrop-blur-md border-gray-500/20 opacity-60">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-gray-400 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-gray-500" />
                        {material.title}
                      </CardTitle>
                      <CardDescription className="text-gray-500 mt-1">
                        {material.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="bg-gray-500/20 text-gray-500 px-2 py-1 rounded text-xs">
                      {material.category}
                    </span>
                    <span>{material.pages} páginas</span>
                    <span>{material.size}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button disabled className="w-full bg-gray-500 cursor-not-allowed">
                    Disponível em breve
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
