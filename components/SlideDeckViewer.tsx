import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SlideDeck, ModalContent, ElementInteraction, ElementActionType, ResponsivePosition, PanZoomActionPayload, SlideElement } from '../types';
import InteractiveSlide from './InteractiveSlide';
import Modal from './Modal';
import { useResponsive } from '../hooks/useResponsive';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import CloseIcon from './icons/CloseIcon';

interface SlideDeckViewerProps {
  deck: SlideDeck;
}

const SlideDeckViewer: React.FC<SlideDeckViewerProps> = ({ deck }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    content: ModalContent | null;
  }>({ isOpen: false, content: null });
  const [dynamicElementVisibility, setDynamicElementVisibility] = useState<Record<string, boolean>>({});
  
  const [spotlight, setSpotlight] = useState<{ isActive: boolean; position: ResponsivePosition | null }>({ isActive: false, position: null });
  const [panZoom, setPanZoom] = useState<{ isActive: boolean; transform: string; banner: PanZoomActionPayload['banner'] | null }>({ isActive: false, transform: 'scale(1) translate(0, 0)', banner: null });

  const deviceType = useResponsive();
  const currentSlide = deck.slides[currentSlideIndex];
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const resetViewState = useCallback(() => {
    setSpotlight({ isActive: false, position: null });
    setPanZoom({ isActive: false, transform: 'scale(1) translate(0, 0)', banner: null });
  }, []);

  useEffect(() => {
    const initialVisibility: Record<string, boolean> = {};
    currentSlide.elements.forEach(el => {
      initialVisibility[el.id] = el.initiallyVisible !== false;
    });
    setDynamicElementVisibility(initialVisibility);
    resetViewState();
  }, [currentSlide, resetViewState]);

  const handleInteraction = useCallback((interaction: ElementInteraction) => {
    const { action } = interaction;
    switch (action.type) {
      case ElementActionType.Navigate:
        const targetSlideIndex = deck.slides.findIndex(s => s.id === action.payload.slideId);
        if (targetSlideIndex !== -1) {
          setCurrentSlideIndex(targetSlideIndex);
        }
        break;
      case ElementActionType.OpenModal:
        setModalState({ isOpen: true, content: action.payload.content });
        break;
      case ElementActionType.ShowElement:
        setDynamicElementVisibility(prev => ({ ...prev, [action.payload.elementId]: true }));
        break;
      case ElementActionType.HideElement:
        setDynamicElementVisibility(prev => ({ ...prev, [action.payload.elementId]: false }));
        break;
      case ElementActionType.Spotlight:
        setSpotlight({ isActive: true, position: action.payload.position });
        setPanZoom({ isActive: false, transform: 'scale(1) translate(0, 0)', banner: null });
        break;
      case ElementActionType.PanZoom: {
        const targetElement = currentSlide.elements.find(el => el.id === action.payload.elementId);
        if (targetElement && slideContainerRef.current) {
          const viewerRect = slideContainerRef.current.getBoundingClientRect();
          const elementPos = targetElement.position[deviceType];
          
          const targetX = (parseFloat(elementPos.left) / 100) * viewerRect.width;
          const targetY = (parseFloat(elementPos.top) / 100) * viewerRect.height;
          const targetW = (parseFloat(elementPos.width) / 100) * viewerRect.width;
          const targetH = (parseFloat(elementPos.height) / 100) * viewerRect.height;
  
          const centerX = targetX + targetW / 2;
          const centerY = targetY + targetH / 2;
  
          const { zoom, banner } = action.payload;
  
          const translateX = viewerRect.width / 2 - centerX;
          const translateY = viewerRect.height / 2 - centerY;
  
          const transform = `scale(${zoom}) translate(${translateX}px, ${translateY}px)`;
  
          setPanZoom({ isActive: true, transform, banner });
          setSpotlight({ isActive: false, position: null });
        }
        break;
      }
      case ElementActionType.ResetView:
        resetViewState();
        break;
      default:
        console.warn('Unknown interaction action type');
    }
  }, [deck.slides, currentSlide.elements, deviceType, resetViewState]);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % deck.slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + deck.slides.length) % deck.slides.length);
  };

  return (
    <div ref={slideContainerRef} className="w-full max-w-7xl aspect-video relative flex flex-col items-center justify-center bg-black rounded-lg shadow-2xl shadow-[#ad2122]/30 overflow-hidden">
      <div
        className="w-full h-full"
        style={{
            transform: panZoom.transform,
            transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <InteractiveSlide
            key={currentSlide.id}
            slide={currentSlide}
            deviceType={deviceType}
            onInteract={handleInteraction}
            dynamicElementVisibility={dynamicElementVisibility}
        />
      </div>

      {/* Spotlight Overlay */}
      {spotlight.isActive && spotlight.position && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div 
            className="absolute"
            style={{
              ...spotlight.position[deviceType],
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
              borderRadius: '8px',
            }}
          />
        </div>
      )}

      {/* Pan/Zoom Banner */}
      {panZoom.isActive && panZoom.banner && (
        <div 
          className={`absolute left-4 right-4 ${panZoom.banner.position === 'bottom' ? 'bottom-4' : 'top-4'} z-20 p-4 bg-black bg-opacity-80 text-white rounded-lg shadow-lg transition-opacity duration-500 ${panZoom.isActive ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-center">{panZoom.banner.text}</p>
        </div>
      )}

      {/* Universal Reset Button */}
      {(spotlight.isActive || panZoom.isActive) && (
        <button
          onClick={resetViewState}
          className="absolute top-4 right-4 z-30 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 text-white transition-all"
          aria-label="Reset View"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4 z-20 pointer-events-none">
        <button
          onClick={goToPrevSlide}
          className="pointer-events-auto bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all transform hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeftIcon className="w-8 h-8 md:w-10 md:h-10" />
        </button>
        <button
          onClick={goToNextSlide}
          className="pointer-events-auto bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all transform hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRightIcon className="w-8 h-8 md:w-10 md:h-10" />
        </button>
      </div>

      {/* Slide Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
        {deck.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlideIndex === index ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, content: null })}
        content={modalState.content}
      />
    </div>
  );
};

export default SlideDeckViewer;