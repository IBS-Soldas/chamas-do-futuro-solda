
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, PenTool } from 'lucide-react';

interface SignatureCanvasProps {
  onSignatureChange: (signature: string) => void;
  signature: string;
  onRef?: (ref: { getSignatureAsBase64: () => string | null }) => void;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ 
  onSignatureChange, 
  signature,
  onRef
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setContext(ctx);
        // Configurar o canvas
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        
        // Definir o tamanho do canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = 200;
        
        // Preencher com fundo branco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Restaurar assinatura se existir
        if (signature) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = signature;
        }
      }
    }
  }, [signature]);

  // Expose the getSignatureAsBase64 function to parent component
  useEffect(() => {
    if (onRef) {
      onRef({ getSignatureAsBase64 });
    }
  }, [onRef]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    let x, y;
    if ('touches' in e) {
      // Don't call preventDefault on passive events
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    if (context) {
      context.closePath();
      // Salvar a assinatura como base64
      const canvas = canvasRef.current;
      if (canvas) {
        const signatureData = canvas.toDataURL('image/png', 0.8);
        console.log('Signature base64:', signatureData.substring(0, 50) + '...');
        onSignatureChange(signatureData);
      }
    }
  };

  const getSignatureAsBase64 = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      return canvas.toDataURL('image/png', 0.8);
    }
    return null;
  };

  const clearSignature = () => {
    if (!context || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    onSignatureChange('');
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-2 mb-2">
          <PenTool className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Assine no campo abaixo
          </span>
        </div>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-48 border border-gray-300 rounded bg-white cursor-crosshair"
            style={{ touchAction: 'none' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            Use o mouse ou toque para assinar
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Sua assinatura digital confirma a veracidade das informações fornecidas.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearSignature}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Limpar
        </Button>
      </div>
      
      {signature && (
        <div className="p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
          ✓ Assinatura capturada com sucesso
        </div>
      )}
    </div>
  );
};
