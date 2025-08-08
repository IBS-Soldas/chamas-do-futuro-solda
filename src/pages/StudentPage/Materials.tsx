"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Eye,
  BookOpen,
  X,
  ArrowLeft,
} from "lucide-react";

const DRIVE_PREVIEW_URL =
  "https://drive.google.com/file/d/1dW3dKdgq-anXoXiai5fJV-VMSTXGXq4w/preview";
const DRIVE_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1dW3dKdgq-anXoXiai5fJV-VMSTXGXq4w";

const Materials = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<any | null>(null);

  const materials = [
    {
      id: 1,
      title: "Manual Completo de Soldagem",
      description: "Guia completo com todos os processos de soldagem",
      pages: 150,
      size: "2.7 MB",
      category: "Teoria Geral",
      available: true,
      fileUrl: DRIVE_PREVIEW_URL,
      downloadUrl: DRIVE_DOWNLOAD_URL,
      imageUrl:
        "https://alusolda.com.br/wp-content/uploads/2020/06/como-soldar-mig-sem-gas.jpg",
    },
    {
      id: 2,
      title: "Segurança em Soldagem",
      description: "Normas de segurança e uso de EPIs",
      pages: 45,
      size: "320 KB",
      category: "Segurança",
      available: true,
      fileUrl: DRIVE_PREVIEW_URL,
      downloadUrl: DRIVE_DOWNLOAD_URL,
      imageUrl:
        "https://alusolda.com.br/wp-content/uploads/2020/06/como-soldar-mig-sem-gas.jpg",
    },
    {
      id: 3,
      title: "Soldagem por Eletrodo",
      description: "Técnicas e exercícios para soldagem por eletrodo",
      pages: 80,
      size: "1.2 MB",
      category: "Eletrodo",
      available: true,
      fileUrl: DRIVE_PREVIEW_URL,
      downloadUrl: DRIVE_DOWNLOAD_URL,
      imageUrl:
        "https://alusolda.com.br/wp-content/uploads/2020/06/como-soldar-mig-sem-gas.jpg",
    },
    {
      id: 4,
      title: "Soldagem MIG/MAG",
      description: "Guia prático para soldagem MIG e MAG",
      pages: 95,
      size: "18 MB",
      category: "MIG/MAG",
      available: true,
      fileUrl: DRIVE_PREVIEW_URL,
      downloadUrl: DRIVE_DOWNLOAD_URL,
      imageUrl:
        "https://alusolda.com.br/wp-content/uploads/2020/06/como-soldar-mig-sem-gas.jpg",
    },
    {
      id: 5,
      title: "Soldagem TIG",
      description: "Técnicas avançadas de soldagem TIG",
      pages: 110,
      size: "22 MB",
      category: "TIG",
      available: true,
      fileUrl: DRIVE_PREVIEW_URL,
      downloadUrl: DRIVE_DOWNLOAD_URL,
      imageUrl:
        "https://alusolda.com.br/wp-content/uploads/2020/06/como-soldar-mig-sem-gas.jpg",
    },
    {
      id: 6,
      title: "Metalurgia para Soldadores",
      description: "Propriedades dos metais e ligas",
      pages: 65,
      size: "12 MB",
      category: "Teoria",
      available: false,
    },
    {
      id: 7,
      title: "Inspeção de Soldas",
      description: "Métodos de inspeção e controle de qualidade",
      pages: 70,
      size: "14 MB",
      category: "Qualidade",
      available: false,
    },
    {
      id: 8,
      title: "Certificação AWS",
      description: "Preparação para certificação AWS",
      pages: 120,
      size: "20 MB",
      category: "Certificação",
      available: false,
    },
  ];

  const handleDownload = (downloadUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const availableMaterials = materials.filter((m) => m.available);
  const lockedMaterials = materials.filter((m) => !m.available);

  return (
    <div className="space-y-6 relative">
      {/* Visualização da imagem */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={previewImage}
              alt="Visualização"
              className="rounded-lg shadow-lg max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/20 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {selectedMaterial ? "Apostila" : "Material de Apoio"}
        </h1>
        <p className="text-gray-300">
          {selectedMaterial
            ? "Materiais da apostila"
            : "Baixe as apostilas e materiais complementares para seus estudos."}
        </p>
        {!selectedMaterial && (
          <div className="mt-4 text-sm text-green-400">
            {availableMaterials.length} de {materials.length} materiais disponíveis
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="space-y-4">
        {selectedMaterial ? (
          <>
            <Button
              variant="outline"
              onClick={() => setSelectedMaterial(null)}
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para lista
            </Button>

            <div className="rounded-lg overflow-hidden border border-green-500/20 shadow-md">
              <iframe
                src={selectedMaterial.fileUrl}
                width="100%"
                height="700px"
                className="w-full"
                style={{ border: "none" }}
                title={selectedMaterial.title}
              ></iframe>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-400" />
              Materiais Disponíveis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="bg-white/5 backdrop-blur-md border-green-500/20 hover:border-green-500/40 transition-colors"
                >
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
                        onClick={() => setSelectedMaterial(material)}
                        variant="outline"
                        className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button
                        onClick={() =>
                          handleDownload(material.downloadUrl, material.title)
                        }
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
          </>
        )}
      </div>

      {/* Materiais futuros */}
      {!selectedMaterial && lockedMaterials.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-400" />
            Materiais Futuros
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lockedMaterials.map((material) => (
              <Card
                key={material.id}
                className="bg-white/5 backdrop-blur-md border-gray-500/20 opacity-60"
              >
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
