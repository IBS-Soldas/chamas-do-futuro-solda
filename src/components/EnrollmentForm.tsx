
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { SignatureCanvas } from "@/components/SignatureCanvas";
import { CheckCircle, User, Mail, Phone, MapPin } from 'lucide-react';

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    selectedCourses: [] as string[],
    signature: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    {
      id: 'soldas-ferros-grandes',
      title: 'Soldas em Ferros Grandes',
      price: 'R$ 1.200,00',
      duration: '40 horas',
      description: 'Técnicas avançadas para soldagem de estruturas metálicas de grande porte'
    },
    {
      id: 'soldagem-ferros-menores',
      title: 'Soldagem em Ferros Menores',
      price: 'R$ 800,00',
      duration: '20 horas',
      description: 'Soldagem de precisão para peças pequenas e delicadas'
    },
    {
      id: 'soldas-especiais-tig',
      title: 'Soldas Especiais TIG',
      price: 'R$ 1.800,00',
      duration: '60 horas',
      description: 'Soldagem TIG para materiais especiais e acabamentos profissionais'
    },
    {
      id: 'soldagem-eletrodo',
      title: 'Soldagem com Eletrodo',
      price: 'R$ 600,00',
      duration: '15 horas',
      description: 'Fundamentos da soldagem com eletrodo para iniciantes'
    },
    {
      id: 'soldagem-mig-mag',
      title: 'Soldagem MIG/MAG',
      price: 'R$ 1.500,00',
      duration: '50 horas',
      description: 'Soldagem semi-automática para alta produtividade'
    },
    {
      id: 'soldagem-oxiacetilenica',
      title: 'Soldagem Oxiacetilênica',
      price: 'R$ 900,00',
      duration: '30 horas',
      description: 'Soldagem e corte com chama oxiacetilênica'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseChange = (courseId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedCourses: checked
        ? [...prev.selectedCourses, courseId]
        : prev.selectedCourses.filter(id => id !== courseId)
    }));
  };

  const handleSignatureChange = (signature: string) => {
    setFormData(prev => ({
      ...prev,
      signature
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (formData.selectedCourses.length === 0) {
      toast({
        title: "Selecione um curso",
        description: "Por favor, selecione pelo menos um curso.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.signature) {
      toast({
        title: "Assinatura obrigatória",
        description: "Por favor, assine digitalmente no campo de assinatura.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simular envío do formulário
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Entraremos em contato em breve para confirmar sua matrícula.",
      });
      onClose();
    }, 2000);
  };

  const getTotalPrice = () => {
    return formData.selectedCourses.reduce((total, courseId) => {
      const course = courses.find(c => c.id === courseId);
      const price = course ? parseFloat(course.price.replace('R$ ', '').replace('.', '').replace(',', '.')) : 0;
      return total + price;
    }, 0);
  };

  // Se o modal não estiver aberto, não renderizar nada
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Formulário de Inscrição</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados Pessoais
                </CardTitle>
                <CardDescription>
                  Preencha suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Seu endereço completo"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seleção de Cursos */}
            <Card>
              <CardHeader>
                <CardTitle>Selecione os Cursos</CardTitle>
                <CardDescription>
                  Escolha um ou mais cursos que deseja realizar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className={`p-4 border rounded-lg transition-all duration-200 ${
                        formData.selectedCourses.includes(course.id)
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={course.id}
                          checked={formData.selectedCourses.includes(course.id)}
                          onCheckedChange={(checked) => 
                            handleCourseChange(course.id, checked as boolean)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={course.id} className="font-semibold cursor-pointer">
                            {course.title}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">{course.duration}</span>
                            <span className="font-bold text-orange-600">{course.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {formData.selectedCourses.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total dos Cursos Selecionados:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {formData.selectedCourses.length} curso(s) selecionado(s)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Campo de Assinatura */}
            <Card>
              <CardHeader>
                <CardTitle>Assinatura Digital</CardTitle>
                <CardDescription>
                  Assine digitalmente para confirmar sua inscrição
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignatureCanvas
                  onSignatureChange={handleSignatureChange}
                  signature={formData.signature}
                />
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirmar Inscrição
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
