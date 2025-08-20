
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
        const pulseColor = (element as HotspotElement).content.pulseColor || 'cyan';
        const animationClass = `animate-pulse border-2 border-${pulseColor}-400`;
        return (
          <div
            className={`w-full h-full rounded-full bg-${pulseColor}-400 bg-opacity-40 ${animationClass} cursor-pointer`}
          ></div>
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
            <button className="w-full h-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xl transition-colors">
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
      style={positionStyle}
      className={`${baseClasses} ${visibilityClasses}`}
      onClick={() => element.interaction && onInteract(element.interaction)}
    >
      {renderElementContent()}
    </div>
  );
};

export default SlideElementComponent;
