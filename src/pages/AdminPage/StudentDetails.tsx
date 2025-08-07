import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StudentDetails = () => {
    const { firebaseUid } = useParams();
    const navigate = useNavigate();
    const { users } = useApp();

    const student = users.find(user => user.firebaseUid === firebaseUid);

    if (!student) {
        return (
            <div className="text-white p-8 text-center">
                <p>Aluno não encontrado.</p>
                <Button className="mt-4" onClick={() => navigate(-1)}>Voltar</Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 text-white">
            <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-white">{student.name}</CardTitle>
                    <CardDescription>{student.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300">
                    <p><strong>CPF/CNPJ:</strong> {student.cpfCnpj}</p>
                    <p><strong>Telefone:</strong> {student.phone}</p>
                    <p><strong>Cidade:</strong> {student.city}</p>
                    <p><strong>Bairro:</strong> {student.neighborhood}</p>
                    <p><strong>Endereço:</strong> Nº {student.number}, {student.state}</p>
                    <p><strong>Status:</strong> {student.isActive ? 'Ativo' : 'Inativo'}</p>
                    <p><strong>Nivel de Acesso:</strong> {student.accessLevel}</p>
                    <p><strong>Motivo Inadimplência:</strong> {student.motivoInadimplencia}</p>
                    <p><strong>Contrato:</strong> <a href={student.contratoUrl} target="_blank" className="text-blue-400 underline cursor-pointer">Ver contrato</a></p>
                    <p><strong>Criado em:</strong> {student.createdAt.toDate().toLocaleString()}</p>
                    <p><strong>Atualizado em:</strong> {student.updatedAt.toDate().toLocaleString()}</p>
                </CardContent>
            </Card>
            <Button onClick={() => navigate(-1)}>Voltar</Button>
        </div>
    );
};

export default StudentDetails;