import React from 'react';
import { SlideElement, DeviceType, ElementInteraction, SlideElementType, HotspotElement, TextElement, ImageElement, ButtonElement } from '../types';

interface SlideElementProps {
  element: SlideElement;
  deviceType: DeviceType;
  onInteract: (interaction: ElementInteraction) => void;
  isVisible: boolean;
}

const SlideElementComponent: React.FC<SlideElementProps> = ({ element, deviceType, onInteract, isVisible }) => {
  const positionStyle = element.position[deviceType];
  
  const baseClasses = "absolute transition-all duration-500 ease-in-out";
  const visibilityClasses = isVisible ? "opacity-100" : "opacity-0 pointer-events-none";

  const renderElementContent = () => {
    switch (element.type) {
      case SlideElementType.Hotspot: {
        const pulseColor = (element as HotspotElement).content.pulseColor || '#ad2122';
        return (
          <div
            className={`w-full h-full rounded-full cursor-pointer transition-all duration-300 animate-pulse-strong backdrop-blur-sm`}
            style={{
              backgroundColor: `${pulseColor}4D`, // 30% opacity
              border: `2px solid ${pulseColor}B3`, // 70% opacity
              boxShadow: `0 0 15px 3px ${pulseColor}80` // 50% opacity glow
            }}
          >
            <div className="w-full h-full rounded-full" style={{
              boxShadow: `inset 0 0 10px ${pulseColor}B3` // Inner glow
            }}></div>
          </div>
        );
      }
      case SlideElementType.Text: {
        const content = (element as TextElement).content;
        return (
          <p
            style={{ 
              fontSize: content.fontSize[deviceType],
              fontWeight: content.fontWeight || 'normal',
              textAlign: content.textAlign || 'left'
            }}
          >
            {content.text}
          </p>
        );
      }
      case SlideElementType.Image: {
        const content = (element as ImageElement).content;
        return (
          <img
            src={content.src}
            alt={content.alt}
            className="w-full h-full object-contain"
          />
        );
      }
      case SlideElementType.Button: {
        const content = (element as ButtonElement).content;
        return (
            <button className="w-full h-full bg-gradient-to-br from-[#ad2122] to-[#c13435] hover:from-[#c13435] hover:to-[#ad2122] text-white font-bold rounded-lg text-lg md:text-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl shadow-black/40 border-2 border-white/20 hover:border-white/40">
                {content.text}
            </button>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div
      id={element.id}
      style={positionStyle}
      className={`${baseClasses} ${visibilityClasses}`}
      onClick={() => element.interaction && onInteract(element.interaction)}
    >
      {renderElementContent()}
    </div>
  );
};

export default SlideElementComponent;