
import React, { useState, useEffect } from 'react';
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
import { useBrazilStates, useBrazilCities, State as BrazilState, City as BrazilCity } from '@/hooks/useBrazilStatesCities';
import axios from 'axios';

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    cpfCnpj: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    address: '',
    neighborhood: '',
    number: '',
    courseIds: [] as string[],
    value: 0,
    signature: '',
    billingType: 'PIX'
  });

  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'BOLETO'>('PIX');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signatureRef, setSignatureRef] = useState<{ getSignatureAsBase64: () => string | null } | null>(null);

  // Fetch courses from Firebase
  const { data: courses = [], isLoading: coursesLoading, error: coursesError } = useCourses();

  // Fetch all states from IBGE
  const { data: states = [], isLoading: statesLoading, error: statesError } = useBrazilStates();
  // Fetch cities for selected state
  const { data: cities = [], isLoading: citiesLoading, error: citiesError } = useBrazilCities(formData.state);

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
      courseIds: checked
        ? [...prev.courseIds, courseId]
        : prev.courseIds.filter(id => id !== courseId)
    }));
  };

  const handleSignatureChange = (signature: string) => {
    setFormData(prev => ({
      ...prev,
      signature
    }));
  };

  // Update value when selected courses change
  useEffect(() => {
    const total = getTotalPrice();
    setFormData(prev => ({
      ...prev,
      value: total
    }));
  }, [formData.courseIds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)

    // Get the signature as base64
    const signatureBase64 = signatureRef?.getSignatureAsBase64() || formData.signature;

    const dataToSend = {
      ...formData,
      signature: signatureBase64
    };

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (formData.courseIds.length === 0) {
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
    // setShowPaymentModal(true);

    try {
      setIsSubmitting(true);
      const response = await axios.post('https://api-jljbku3rxq-uc.a.run.app/create-payment', formData);
      console.log(response.data)
      // Optionally handle the result here (e.g., show a success message, redirect, etc.)
      toast({
        title: "Inscrição enviada!",
        description: "Seus dados foram enviados com sucesso.",
      });
      setShowPaymentModal(true);
    } catch (error) {
      console.log(error)
      toast({
        title: "Erro ao enviar inscrição",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
    setShowPaymentModal(true);
  };

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);

    // try {
    //   // Simulate payment processing
    //   await new Promise(resolve => setTimeout(resolve, 2000));

    //   // Simulate form submission
    //   toast({
    //     title: "Inscrição realizada com sucesso!",
    //     description: "Entraremos em contato em breve para confirmar sua matrícula.",
    //   });
    //   onClose();
    // } catch (err) {
    //   toast({
    //     title: "Erro no pagamento",
    //     description: "Ocorreu um erro ao processar o pagamento. Tente novamente.",
    //     variant: "destructive"
    //   });
    // } finally {
    //   setIsSubmitting(false);
    //   setShowPaymentModal(false);
    // }
  };

  const getTotalPrice = () => {
    return formData.courseIds.reduce((total, courseId) => {
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
                      // required
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">CPF/CNPJ *</Label>
                      <Input
                        id="cpfCnpj"
                        name="cpfCnpj"
                        value={formData.cpfCnpj}
                        onChange={handleInputChange}
                        placeholder="12345678912"
                        // required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                        // required
                        className="mt-1"
                      />
                    </div>
                  </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      // required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Select value={formData.state} onValueChange={handleStateChange} disabled={statesLoading || !!statesError} required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={statesLoading ? 'Carregando estados...' : statesError ? 'Erro ao carregar estados' : 'Selecione um estado'} />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state: BrazilState) => (
                            <SelectItem key={state.sigla} value={state.sigla}>
                              {state.nome}
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
                        disabled={!formData.state || citiesLoading || !!citiesError}
                      // required
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={
                            !formData.state
                              ? 'Primeiro selecione um estado'
                              : citiesLoading
                                ? 'Carregando cidades...'
                                : citiesError
                                  ? 'Erro ao carregar cidades'
                                  : 'Selecione uma cidade'
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city: BrazilCity) => (
                            <SelectItem key={city.id} value={city.nome}>
                              {city.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                    // required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        placeholder="Seu bairro"
                        className="mt-1"
                      // required
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
                      // required
                      />
                    </div>
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
                        className={`p-4 border rounded-lg transition-all duration-200 ${formData.courseIds.includes(course.id)
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id={course.id}
                            checked={formData.courseIds.includes(course.id)}
                            onCheckedChange={(checked) =>
                              handleCourseChange(course.id, checked as boolean)
                            }
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor={course.id} className="font-semibold cursor-pointer">
                              {course.name}
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

                {formData.courseIds.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total dos Cursos Selecionados:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {formData.courseIds.length} curso(s) selecionado(s)
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
                <RadioGroup
                  value={formData.billingType}
                  onValueChange={(value: 'PIX' | 'BOLETO') => {
                    setFormData(prev => ({
                      ...prev,
                      billingType: value
                    }));
                    setPaymentMethod(value);
                  }}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="PIX" id="PIX" />
                    <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                      <QrCode className="h-4 w-4" />
                      PIX - R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="BOLETO" id="BOLETO" />
                    <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
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
                  onRef={setSignatureRef}
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
              {paymentMethod === 'PIX'
                ? 'Escaneie o QR Code ou copie o código para realizar o pagamento'
                : 'Clique na imagem para baixar o boleto bancário'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {paymentMethod === 'PIX' ? (
              <>
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
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <div
                    className="bg-white p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-orange-500 transition-colors"
                    onClick={() => {
                      // Create a sample PDF download (replace with your actual PDF generation)
                      const link = document.createElement('a');
                      link.href = '/boleto-example.pdf'; // Replace with your actual PDF path
                      link.download = `boleto-${Date.now()}.pdf`;
                      link.click();
                    }}
                  >
                    <div className="w-48 h-48 bg-gray-100 rounded flex items-center justify-center">
                      <div className="text-center">
                        <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Clique para baixar</p>
                        <p className="text-xs text-gray-500">Boleto Bancário</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Código do Boleto:</Label>
                  <div className="flex gap-2">
                    <Input
                      value="34191.79001 01043.510047 91020.150008 4 84410026000"
                      readOnly
                      className="bg-gray-100 text-gray-600 text-xs"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText("34191.79001 01043.510047 91020.150008 4 84410026000")}
                    >
                      Copiar
                    </Button>
                  </div>
                </div>
              </>
            )}

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
                {isSubmitting ? 'Processando...' : 'Quero perder essa oportunidade'}
              </Button>
              {/* <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
