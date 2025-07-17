
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { SignatureCanvas } from "@/components/SignatureCanvas";
import { CheckCircle, User, Mail, Phone, MapPin, CreditCard, QrCode, Loader2 } from 'lucide-react';
import { useCourses, Course } from '@/hooks/useCourses';
import { brazilStates, getCitiesByState, City } from '@/data/brazil-states-cities';

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    address: '',
    neighboorhood: '',
    number: '',
    selectedCourses: [] as string[],
    signature: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'boleto'>('pix');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch courses from Firebase
  const { data: courses = [], isLoading: coursesLoading, error: coursesError } = useCourses();

  // Get available cities based on selected state
  const availableCities = formData.state ? getCitiesByState(formData.state) : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStateChange = (stateId: string) => {
    setFormData(prev => ({
      ...prev,
      state: stateId,
      city: '' // Reset city when state changes
    }));
  };

  const handleCityChange = (cityId: string) => {
    setFormData(prev => ({
      ...prev,
      city: cityId
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

    // Show payment modal instead of submitting directly
    setShowPaymentModal(true);
  };

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate form submission
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Entraremos em contato em breve para confirmar sua matrícula.",
      });
      onClose();
    } catch (err) {
      toast({
        title: "Erro no pagamento",
        description: "Ocorreu um erro ao processar o pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      setShowPaymentModal(false);
    }
  };

  const getTotalPrice = () => {
    return formData.selectedCourses.reduce((total, courseId) => {
      const course = courses.find(c => c.id === courseId);
      return total + (course?.price || 0);
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
                </div>

                {/* Estado e Cidade */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Select value={formData.state} onValueChange={handleStateChange}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione um estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {brazilStates.map((state) => (
                          <SelectItem key={state.id} value={state.id}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={handleCityChange}
                      disabled={!formData.state}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={formData.state ? "Selecione uma cidade" : "Primeiro selecione um estado"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  
                </div>
                {/* <div>
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
                <div>
                  <Label htmlFor="neighboorhood">Bairro</Label>
                  <Input
                    id="neighboorhood"
                    name="neighboorhood"
                    value={formData.neighboorhood}
                    onChange={handleInputChange}
                    placeholder="Seu bairro"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    placeholder="Seu número"
                    className="mt-1"
                  />
                </div> */}
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
                {coursesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                    <span className="ml-2 text-gray-600">Carregando cursos...</span>
                  </div>
                ) : coursesError ? (
                  <div className="text-center py-8">
                    <p className="text-red-500">Erro ao carregar cursos. Tente novamente.</p>
                    <Button
                      variant="outline"
                      onClick={() => window.location.reload()}
                      className="mt-2"
                    >
                      Recarregar
                    </Button>
                  </div>
                ) : courses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum curso disponível no momento.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className={`p-4 border rounded-lg transition-all duration-200 ${formData.selectedCourses.includes(course.id)
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
                              <span className="font-bold text-orange-600">
                                R$ {course.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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

            {/* Forma de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
                <CardDescription>
                  Escolha como deseja realizar o pagamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value: 'pix' | 'boleto') => setPaymentMethod(value)}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                      <QrCode className="h-4 w-4" />
                      PIX - R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      Boleto - R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Label>
                  </div>
                </RadioGroup>
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

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-white/95 backdrop-blur-md border-orange-500/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Pagamento via {paymentMethod.toUpperCase()}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Escaneie o QR Code ou copie o código para realizar o pagamento
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <QrCode className="h-48 w-48 text-gray-400" />
                <p className="text-center text-sm text-gray-500 mt-2">QR Code do PIX</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Código PIX:</Label>
              <div className="flex gap-2">
                <Input
                  value="00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540599.005802BR5913Chamas do Futuro6009Sao Paulo62070503***6304E2CA"
                  readOnly
                  className="bg-gray-100 text-gray-600 text-xs"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540599.005802BR5913Chamas do Futuro6009Sao Paulo62070503***6304E2CA")}
                >
                  Copiar
                </Button>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-800">
                <strong>Valor:</strong> R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
                <strong>Vencimento:</strong> 24 horas<br />
                <strong>Após o pagamento:</strong> Sua inscrição será confirmada automaticamente
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handlePaymentConfirmation}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                {isSubmitting ? 'Processando...' : 'Já Paguei'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
