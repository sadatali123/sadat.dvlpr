import { useState, useEffect } from 'react';
import { removeBackground, loadImage } from '../utils/backgroundRemoval';

interface LogoProcessorProps {
  originalSrc: string;
  alt: string;
  className?: string;
  onProcessed?: (processedUrl: string) => void;
}

const LogoProcessor = ({ originalSrc, alt, className, onProcessed }: LogoProcessorProps) => {
  const [processedSrc, setProcessedSrc] = useState<string>(originalSrc);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processLogo = async () => {
      try {
        setIsProcessing(true);
        
        // Fetch the original image
        const response = await fetch(originalSrc);
        const blob = await response.blob();
        
        // Load image
        const img = await loadImage(blob);
        
        // Remove background
        const processedBlob = await removeBackground(img);
        
        // Create URL for processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        setProcessedSrc(processedUrl);
        
        if (onProcessed) {
          onProcessed(processedUrl);
        }
        
      } catch (error) {
        console.error('Failed to process logo:', error);
        // Fallback to original image
        setProcessedSrc(originalSrc);
      } finally {
        setIsProcessing(false);
      }
    };

    processLogo();
  }, [originalSrc, onProcessed]);

  return (
    <div className={`relative ${className}`}>
      <img 
        src={processedSrc} 
        alt={alt} 
        className="w-full h-full object-contain"
      />
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LogoProcessor;