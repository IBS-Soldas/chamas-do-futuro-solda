
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
import { CheckCircle, User, Mail, Phone, MapPin, CreditCard, QrCode, Loader2, Banknote } from 'lucide-react';
import { useCourses, Course } from '@/hooks/useCourses';
import { useBrazilStates, useBrazilCities, State as BrazilState, City as BrazilCity } from '@/hooks/useBrazilStatesCities';
import axios from 'axios';
import { usePoles } from '@/hooks/use-poles';

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    poleId: '',
    name: '',
    cpfCnpj: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    address: '',
    neighborhood: '',
    number: '',
    courses: [] as { id: string; time: string }[],
    value: 0,
    signature: '',
    billingType: 'PIX'
  });

  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'BOLETO' | 'CARTAO'>('PIX');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signatureRef, setSignatureRef] = useState<{ getSignatureAsBase64: () => string | null } | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  // Fetch courses from Firebase
  const { data: courses = [], isLoading: coursesLoading, error: coursesError } = useCourses();

  const activeCourses = courses.filter(course => course.isActive);
  const inactiveCourses = courses.filter(course => !course.isActive);

  const [copied, setCopied] = useState(false);

  // Fetch all states from IBGE
  const { data: states = [], isLoading: statesLoading, error: statesError } = useBrazilStates();
  const { data: poles = [], isLoading: polesLoading, error: polesError } = usePoles();
    // useEffect(() => {
    //   console.log(activeCourses)
    // }, [activeCourses])
  // Fetch cities for selected state
  const { data: cities = [], isLoading: citiesLoading, error: citiesError } = useBrazilCities(formData.state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? formatPhone(value) : value
    }));
  };

  const handleStateChange = (stateId: string) => {
    setFormData(prev => ({
      ...prev,
      state: stateId,
      city: '' // Reset city when state changes
    }));
  };

  const handlePoleChange = (poleId: string) => {
    console.log(poleId)
    setFormData(prev => ({
      ...prev,
      poleId: poleId,
    }));
  };

  const handleCityChange = (cityId: string) => {
    setFormData(prev => ({
      ...prev,
      city: cityId
    }));
  };

  const handleCourseChange = (courseId: string, checked: boolean) => {
    const course = courses.find(c => String(c.id) === String(courseId));
    let defaultTime = String(course?.time ?? '0');
    if (course?.additionalCourse) {
      const firstInactiveCourse = courses.find(c => !c.isActive);
      if (firstInactiveCourse) {
        defaultTime = String(firstInactiveCourse.time);
      }
    }

    setFormData(prev => {
      let newCourseIds = checked
        ? [...prev.courses, { id: String(courseId), time: String(defaultTime) }]
        : prev.courses.filter(obj => String(obj.id) !== String(courseId));
      return {
        ...prev,
        courses: newCourseIds
      };
    });
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
    // console.log(formData)
  }, [formData.courses]);

  function formatPhone(value: string) {
    // Remove all non-digit characters
    value = value.replace(/\D/g, '');

    // Format as (99) 99999-9999 or (99) 9999-9999
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      // Mobile
      return value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 6) {
      // Landline
      return value.replace(/^(\d{2})(\d{4,5})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      return value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      return value;
    }
  }

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

    if (formData.courses.length === 0) {
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
      setPaymentData(response.data)
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
        // description: (error as Error).message,
        description: error.response.data.detalhes.errors[0].description,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
    return formData.courses.reduce((total, obj) => {
      const course = courses.find(c => String(c.id) === String(obj.id));
      if (!course) return total;

      let price = 0;
      if (formData.billingType === 'PIX') {
        price = Number(course?.pricePix);
      } else if (formData.billingType === 'BOLETO') {
        price = Number(course?.priceBoleto);
      } else if (formData.billingType === 'CARTAO') {
        price = Number(course?.priceCartao);
      }

      return total + (price || 0);
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
              <CardContent className="space-y-1">
                <Label htmlFor="state">Polo de Estudo *</Label>
                <Select value={formData.poleId} onValueChange={handlePoleChange} disabled={polesLoading || !!polesError} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={polesLoading ? 'Carregando polos...' : polesError ? 'Erro ao carregar polos' : 'Selecione um Polo'} />
                  </SelectTrigger>
                  <SelectContent>
                    {poles.map((pole) => (
                      <SelectItem key={pole.id} value={pole.id}>
                        {pole.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
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
                      <Label htmlFor="phone">CPF *</Label>
                      <Input
                        id="cpfCnpj"
                        name="cpfCnpj"
                        value={formData.cpfCnpj}
                        onChange={handleInputChange}
                        placeholder="12345678912"
                        // required
                        className="mt-1"
                        maxLength={11}
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
                        maxLength={15}
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
                      maxLength={85}
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
                ) : activeCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum curso disponível no momento.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCourses.map((course, idx) => (
                      <div
                        key={course.id}
                        className={`flex flex-col md:flex-row items-center md:items-center p-4 border rounded-lg transition-all duration-200 min-h-[220px] md:min-h-[180px] h-full ${formData.courses.some(obj => obj.id === String(course.id))
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-400/10'
                          }`}
                        onClick={() =>
                          handleCourseChange(course.id, !formData.courses.some(obj => String(obj.id) === String(course.id)))
                        }
                        style={{ minHeight: 220, height: "100%", cursor: "pointer" }}
                      >
                        {/* Imagem */}
                        <div className="flex-shrink-0 flex justify-center items-center w-full md:w-auto mb-4 md:mb-0 md:mr-6">
                          <img
                            src={
                              idx % 3 === 0
                                ? "https://www.soldaeletrica.com.br/imagens/mpi/servicos-de-soldas-especiais-02.jpg"
                                : idx % 3 === 1
                                  ? "https://blog.chicosoldas.com.br/wp-content/uploads/2023/03/soldagem.jpg"
                                  : "https://tse1.mm.bing.net/th/id/OIP.0FHL4o5gHHvLctxgfGTF6wHaE5?w=859&h=569&rs=1&pid=ImgDetMain&o=7&rm=3"
                            }
                            alt="Capa do curso"
                            className="w-32 h-32 object-cover rounded-md border shadow-md"
                          />
                        </div>
                        {/* Conteúdo */}
                        <div className="flex-1 flex flex-row items-center w-full">
                          <div className="flex-1 flex flex-col justify-center h-full">
                            <Label htmlFor={course.id} className="font-semibold cursor-pointer">
                              {course.name}
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                            <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
                              <span className="text-sm text-gray-500">{course.time}</span>
                              <span className="font-bold text-orange-600">
                                R$ {(formData.billingType === 'PIX'
                                  ? course.pricePix
                                  : formData.billingType === 'BOLETO'
                                    ? course.priceBoleto
                                    : course.priceCartao
                                )?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>

                            {/* Two side-by-side radio options at the bottom of the card */}
                            {course?.additionalCourse && formData.courses.some(obj => obj.id === String(course.id)) && (
                              <div className="flex flex-col md:flex-row gap-2 pt-5 text-gray-600">
                                {courses
                                  .filter(optionCourse => optionCourse.isActive === false)
                                  .map(optionCourse => (
                                    <label
                                      key={optionCourse.id}
                                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded 
                                        ${optionCourse.isActive ? 'bg-gray-200 text-gray-500 line-through cursor-not-allowed' : 'cursor-pointer'}
                                      `}
                                      onClick={e => {
                                        if (!optionCourse.isActive) e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                    >
                                      <input
                                        className='cursor-pointer'
                                        type="radio"
                                        name={`courseOption-${course.id}`}
                                        value={optionCourse.time}
                                        checked={formData.courses.find(obj => obj.id === String(course.id))?.time === optionCourse.time}                                        onClick={e => e.stopPropagation()}
                                        onChange={e => {
                                          const value = e.target.value
                                          setFormData(prev => ({
                                            ...prev,
                                            courses: prev.courses.map(obj =>
                                              String(obj.id) === String(course.id)
                                                ? { ...obj, time: String(value) }
                                                : obj)
                                          }));
                                        }}
                                      />
                                      {optionCourse.name} {optionCourse.time}
                                    </label>
                                  ))}
                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {formData.courses.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total dos Cursos Selecionados:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {formData.courses.length} curso(s) selecionado(s)
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
                  onValueChange={(value: 'PIX' | 'BOLETO' | 'CARTAO') => {
                    setFormData(prev => ({
                      ...prev,
                      billingType: value
                    }));
                    setPaymentMethod(value);
                  }}
                  required>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="PIX" id="PIX" />
                    <Label htmlFor="PIX" className="flex items-center gap-2 cursor-pointer">
                      <QrCode className="h-4 w-4" />
                      PIX - R$ {formData.courses.reduce((total, obj) => {
                        const course = courses.find(c => String(c.id) === String(obj.id));
                        return total + (Number(course?.pricePix) || 0);
                      }, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="BOLETO" id="BOLETO" />
                    <Label htmlFor="BOLETO" className="flex items-center gap-2 cursor-pointer">
                      <Banknote className="h-4 w-4" />
                      Boleto - R$ {formData.courses.reduce((total, obj) => {
                        const course = courses.find(c => String(c.id) === String(obj.id));
                        return total + (Number(course?.priceBoleto) || 0);
                      }, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CARTAO" id="CARTAO" />
                    <Label htmlFor="CARTAO" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      Cartão - R$ {formData.courses.reduce((total, obj) => {
                        const course = courses.find(c => String(c.id) === String(obj.id));
                        return total + (Number(course?.priceCartao) || 0);
                      }, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
      </div >

      {/* Payment Modal */}
      < Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal} >
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
                    <img
                      src={paymentData?.qrCode ? `data:image/png;base64,${paymentData.qrCode}` : ""}
                      alt="QR Code do PIX"
                      className="h-48 w-48 object-contain text-gray-400"
                    />
                    <p className="text-center text-sm text-gray-500 mt-2">QR Code do PIX</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Código PIX:</Label>
                  <div className="flex gap-2">
                    <Input
                      value={paymentData?.payload || "000201..."}
                      readOnly
                      className="bg-gray-100 text-gray-600 text-xs"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(paymentData?.payload || '');
                        toast({
                          title: "Código copiado!",
                          description: "O código PIX foi copiado para a área de transferência.",
                        });
                      }}
                    >
                      Copiar
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <a
                    className="bg-white p-4 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-orange-500 transition-colors"
                    href={paymentData?.bankSlipUrl || ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={`boleto-${Date.now()}.pdf`}
                  >
                    <div className="w-48 h-48 bg-gray-100 rounded flex items-center justify-center">
                      <div className="text-center">
                        <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Clique para baixar</p>
                        <p className="text-xs text-gray-500">Boleto Bancário</p>
                      </div>
                    </div>
                  </a>
                </div>

                {/* <div className="space-y-2">
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
                </div> */}
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
                // onClick={handlePaymentConfirmation}
                // onClick={() => {
                //   setShowPaymentModal(false)
                //   onClose()
                // }}
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
    </div >
  );
};
